import { fetchEquipments } from "../../requests/fetchEquipments";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Equipment } from "../../requests/fetchEquipments";

export interface ResponseBody {
  equipments: Equipment[];
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<ResponseBody>
) {
  try {
    const equipments = await fetchEquipments();
    res.status(200).json({ equipments });
  } catch (error) {
    res.status(500).json({ equipments: [] });
  }
}
