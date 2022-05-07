import type { ResponseBody } from "../pages/api/fetchEquipments";

export const fetchEquipments = async () => {
  const res: ResponseBody = await fetch(
    "http://localhost:3000/api/fetchEquipments"
  ).then((r) => r.json());
  return res;
};
