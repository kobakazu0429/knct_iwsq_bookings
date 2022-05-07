/* eslint-disable @typescript-eslint/no-empty-interface */
// import { fetchEquipments } from "../../requests/fetchEquipments";

import type { NextPage, GetStaticProps } from "next";
// import type { Equipment } from "../api/fetchEquipments";

interface Props {
  // equipments: Equipment[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EventsHome: NextPage<Props> = (props) => {
  return (
    <div>
      <h1>イベント、ワークショップページ</h1>
    </div>
  );
};

export default EventsHome;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const props: Props = {};

  return { props };
};
