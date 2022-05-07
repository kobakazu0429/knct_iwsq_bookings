import { useEffect, useState } from "react";
import Link from "next/link";

import { fetchEquipments } from "../../requests/fetchEquipments";

import type { FC } from "react";
import type { NextPage, GetStaticProps } from "next";
import type { Equipment } from "../../requests/fetchEquipments";

interface Props {
  equipments: Equipment[];
  equipmentTypes: Equipment["種別"][];
}

const Card: FC<{ equipment: Equipment }> = (props) => {
  return (
    <Link passHref href={`/equipments/${props.equipment.バーコード}`}>
      <a className="relative block bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          loading="lazy"
          alt="Build Your Own Drone"
          className="object-contain w-full h-56 lg:h-72"
          src="/toy-1.jpeg"
        />

        <div className="p-6">
          <h5 className="text-lg font-bold">{props.equipment.バーコード}</h5>

          <button
            name="add"
            type="button"
            className="flex items-center justify-center w-full px-8 py-4 mt-4 bg-yellow-500 rounded-sm"
          >
            <span className="text-sm font-medium">予約する</span>
          </button>
        </div>
      </a>
    </Link>
  );
};

const EquipmentsHome: NextPage<Props> = (props) => {
  return (
    <section>
      <div className="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:items-start">
          <Filter equipmentTypes={props.equipmentTypes} />

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 gap-px bg-gray-200 border border-gray-200 sm:grid-cols-2 lg:grid-cols-3">
              {props.equipments.map((e) => (
                <Card key={e.バーコード} equipment={e} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Filter: FC<{ equipmentTypes: string[] }> = (props) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  useEffect(() => {
    if (window) {
      setIsFilterOpen(window.innerWidth > 1280);
    }
  }, []);

  return (
    <div className="lg:sticky lg:top-4">
      <details
        open={isFilterOpen}
        className="overflow-hidden border border-gray-200 rounded"
      >
        <summary className="flex items-center justify-between px-5 py-3 bg-gray-100 lg:hidden">
          <span className="text-sm font-medium text-center w-full">
            絞り込みの表示/非表示
          </span>
        </summary>

        <form action="" className="border-t border-gray-200 lg:border-t-0">
          <fieldset>
            <legend className="block w-full px-5 py-3 text-xs font-medium bg-gray-50">
              種別
            </legend>

            <div className="px-5 py-6 space-y-2">
              {props.equipmentTypes.map((type) => (
                <div className="flex items-center" key={type}>
                  <input
                    id="toy"
                    type="checkbox"
                    name="type[toy]"
                    className="w-5 h-5 border-gray-300 rounded"
                  />

                  <label htmlFor="toy" className="ml-3 text-sm font-medium">
                    {type}
                  </label>
                </div>
              ))}

              <div className="pt-2">
                <button
                  type="button"
                  className="text-xs text-gray-500 underline"
                >
                  リセット
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </details>
    </div>
  );
};

export default EquipmentsHome;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const equipments = await fetchEquipments();
  const equipmentTypes = Array.from(
    new Set(equipments.map((e) => e.種別)).values()
  );

  const props: Props = {
    equipments: equipments,
    equipmentTypes,
  };

  return { props };
};
