import Link from "next/link";

import { fetchEquipments } from "../../requests/fetchEquipments";

import type { NextPage, GetStaticProps } from "next";
import type { Equipment } from "../api/fetchEquipments";

interface Props {
  equipments: Equipment[];
}

const EquipmentsHome: NextPage<Props> = (props) => {
  return (
    <div>
      <ul>
        {props.equipments.map((e) => (
          <li key={e.バーコード}>
            <Link passHref href={`/equipments/${e.バーコード}`}>
              <a>{e.バーコード}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EquipmentsHome;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { equipments } = await fetchEquipments();

  const props: Props = {
    equipments: equipments,
  };

  return { props };
};
