import Image from "next/image";
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
  return (
    <div>
      <ul>
        {Object.keys(props.equipment).map((e) => (
          <li key={e}>
            {/* @ts-ignore */}
            {e}: {props.equipment[e].toString()}
          </li>
        ))}
      </ul>
      <Image src={props.image} alt="" width={400} height={400} />
    </div>
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
