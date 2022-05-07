import { parse } from "papaparse";
import type { NextApiRequest, NextApiResponse } from "next";

interface OriginalCSVEquipment {
  種別: string;
  設備名: string;
  管理番号: string;
  バーコード: string;
  Scrapbox: string;
  要講習: string;
  教員の立ち会い: string;
  TAの立ち会い: string;
  メモ?: string;
  予約リンク?: string;
  使い方?: string;
  ""?: string;
}

export interface Equipment
  extends Weaken<
    Omit<OriginalCSVEquipment, "メモ" | "予約リンク" | "使い方" | "">,
    "要講習" | "教員の立ち会い" | "TAの立ち会い"
  > {
  要講習: boolean;
  教員の立ち会い: boolean;
  TAの立ち会い: boolean;
}

export interface ResponseBody {
  equipments: Equipment[];
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<ResponseBody>
) {
  try {
    const url =
      "https://docs.google.com/spreadsheets/d/17bUAbWthyCc2-FSCc7-p73wFMiaLZpDEs0srM2-5d5o/gviz/tq?tqx=out:csv&gid=0";
    const csvString = await fetch(url).then((r) => r.text());
    const parsedCsv = parse<OriginalCSVEquipment>(csvString, {
      header: true,
    });

    const csv = parsedCsv.data
      .filter((row) => row["設備名"] !== "")
      .map((row) => {
        delete row["メモ"];
        delete row["予約リンク"];
        delete row["使い方"];
        delete row[""];

        // @ts-expect-error
        row["要講習"] = row["要講習"] === "TRUE";
        // @ts-expect-error
        row["教員の立ち会い"] = row["教員の立ち会い"] === "TRUE";
        // @ts-expect-error
        row["TAの立ち会い"] = row["TAの立ち会い"] === "TRUE";

        return row as any as Equipment;
      });

    res.status(200).json({ equipments: csv });
  } catch (error) {
    res.status(500).json({ equipments: [] });
  }
}
