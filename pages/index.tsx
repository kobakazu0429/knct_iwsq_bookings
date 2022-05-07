import Link from "next/link";

import type { NextPage } from "next";

const pages = [
  {
    path: "/equipments",
    name: "設備予約",
  },
  {
    path: "/events",
    name: "イベントワークショップ",
  },
  {
    path: "/lectures",
    name: "講習予約",
  },
  {
    path: "/admin",
    name: "管理ページ",
  },
];

const Home: NextPage = () => {
  return (
    <div className="flex flex-col">
      <div>
        <h1>トップページ</h1>
      </div>

      <div className="flex mt-4">
        {pages.map((p) => (
          <Link passHref href={p.path} key={p.path}>
            <a className="relative block p-8 border border-gray-100 shadow-md rounded-xl w-80">
              <h2 className="text-xl font-bold text-gray-900">{p.name}</h2>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
