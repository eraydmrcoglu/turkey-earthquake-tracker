import Navbar from "./components/Navbar";
import DepremHaritasi from "./components/DepremHaritasi";
import { getDepremler } from "./api/api";
import { DepremTable } from "./components/DepremTable";
import { Deprem } from "@/types/deprem";

export default async function Home() {
  const depremler: Deprem[] = await getDepremler();

  return (
    <div className="w-full min-h-screen bg-gray-50 text-black overflow-x-hidden">
      {/* Sabit Navbar */}
      <div className="sticky top-0 z-50 bg-black text-white">
        <Navbar />
      </div>

      {/* Sayfa içeriği */}
      <main className="w-full flex flex-col items-center px-4 mt-8">
        {/* Harita */}
        <div className="w-full max-w-7xl">
          <DepremHaritasi />
        </div>

        {/* Tablo */}
        <div className="w-full max-w-6xl mt-16 mb-20">
          <h2 className="text-2xl font-bold text-center mb-6">
            Bugünkü Son Depremler
          </h2>
          <DepremTable data={depremler} />
        </div>
      </main>
    </div>
  );
}
