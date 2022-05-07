/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
// import { fetchEquipments } from "../../requests/fetchEquipments";

import type { NextPage, GetStaticProps } from "next";
// import type { Equipment } from "../api/fetchEquipments";

interface Props {
  // equipments: Equipment[];
}

const LecturesHome: NextPage<Props> = (props) => {
  return (
    <div>
      <h1>講習予約</h1>
    </div>
  );
};

export default LecturesHome;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const props: Props = {};

  return { props };
};
