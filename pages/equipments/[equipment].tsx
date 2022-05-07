import { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchEquipments } from "../../requests/fetchEquipments";

import type { ParsedUrlQuery } from "node:querystring";
import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import type { Equipment } from "../../requests/fetchEquipments";
import { fetchScrapboxPage } from "../../requests/fetchScrapboxPage";

interface Props {
  equipment: Equipment;
  image: string;
}

const EquipmentPage: NextPage<Props> = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <section>
      <h1 className="sr-only">Checkout</h1>

      <div className="relative mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="py-12 bg-gray-50 md:py-24">
            <div className="max-w-lg px-4 mx-auto lg:px-8">
              <Image src={props.image} alt="" width={400} height={400} />
              <ul>
                {Object.keys(props.equipment).map((e) => (
                  <li key={e}>
                    {/* @ts-ignore */}
                    {e}: {props.equipment[e].toString()}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="py-12 bg-white md:py-24">
            <div className="max-w-lg px-4 mx-auto lg:px-8">
              <form className="grid grid-cols-6 gap-4">
                <div className="col-span-3">
                  <label
                    className="block mb-1 text-sm text-gray-600"
                    htmlFor="start_date"
                  >
                    開始時間
                  </label>

                  <DatePicker
                    id="start_date"
                    selected={startDate}
                    onChange={(date) => setStartDate(date!)}
                    showTimeSelect
                    dateFormat="yyyy/MM/dd HH:mm"
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    className="border border-gray-200 rounded-lg w-full text-sm p-2.5"
                  />
                </div>

                <div className="col-span-3">
                  <label
                    className="block mb-1 text-sm text-gray-600"
                    htmlFor="end_date"
                  >
                    修了時間
                  </label>

                  <DatePicker
                    id="end_date"
                    selected={endDate}
                    onChange={(date) => setEndDate(date!)}
                    showTimeSelect
                    dateFormat="yyyy/MM/dd HH:mm"
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    className="border border-gray-200 rounded-lg w-full text-sm p-2.5"
                  />
                </div>

                <div className="col-span-3">
                  <label
                    className="block mb-1 text-sm text-gray-600"
                    htmlFor="last_name"
                  >
                    学科
                  </label>

                  <select
                    className="border border-gray-200 rounded-lg w-full text-sm p-2.5"
                    id="country"
                    name="country"
                  >
                    <option>M</option>
                    <option>E</option>
                    <option>C</option>
                    <option>A</option>
                    <option>教職員</option>
                  </select>
                </div>

                <div className="col-span-3">
                  <label
                    className="block mb-1 text-sm text-gray-600"
                    htmlFor="first_name"
                  >
                    学年
                  </label>

                  <select
                    className="border border-gray-200 rounded-lg w-full text-sm p-2.5"
                    id="country"
                    name="country"
                  >
                    <option>1年</option>
                    <option>2年</option>
                    <option>3年</option>
                    <option>4年</option>
                    <option>5年</option>
                    <option>専攻科1年</option>
                    <option>専攻科2年</option>
                    <option>教職員</option>
                  </select>
                </div>

                <div className="col-span-6">
                  <label
                    className="block mb-1 text-sm text-gray-600"
                    htmlFor="phone"
                  >
                    名前
                  </label>

                  <input
                    className="rounded-lg shadow-sm border border-gray-200 w-full text-sm p-2.5"
                    type="tel"
                    id="phone"
                  />
                </div>

                <div className="col-span-6">
                  <label
                    className="block mb-1 text-sm text-gray-600"
                    htmlFor="email"
                  >
                    メールアドレス
                  </label>

                  <input
                    className="rounded-lg shadow-sm border border-gray-200 w-full text-sm p-2.5"
                    type="email"
                    id="email"
                  />
                </div>

                <div className="col-span-6">
                  <button
                    className="rounded-lg bg-black text-sm p-2.5 text-white w-full block"
                    type="submit"
                  >
                    予約する
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EquipmentPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const equipments = await fetchEquipments();

  const paths = equipments.map((equipment) => ({
    params: { equipment: equipment.バーコード },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

interface Params extends ParsedUrlQuery {
  equipment: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const { equipment } = context.params!;
  const equipments = await fetchEquipments();
  const equipmentDetail = equipments.find((e) => e.バーコード === equipment);
  const { image } = await fetchScrapboxPage(
    equipmentDetail!.Scrapbox.slice("https://scrapbox.io/iwsq/".length)
  );
  if (!image) console.warn(equipment);

  const props: Props = {
    equipment: equipmentDetail!,
    image,
  };

  // 本来はここで getBook(id) のように API を呼び出してデータを取得する
  return { props };
};
