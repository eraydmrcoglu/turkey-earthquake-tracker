"use client";

import { useEffect, useState, useRef } from "react";
import { getDepremler } from "../api/api";
import { ReactSVG } from "react-svg";

function normalizeCityName(name: string) {
  return name
    .toLowerCase()
    .replaceAll("ı", "i")
    .replaceAll("ş", "s")
    .replaceAll("ç", "c")
    .replaceAll("ö", "o")
    .replaceAll("ü", "u")
    .replaceAll("ğ", "g")
    .trim();
}

export default function DepremHaritasi() {
  const [depremler, setDepremler] = useState<any[]>([]);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [hoveredPath, setHoveredPath] = useState<SVGPathElement | null>(null);
  const [hoveredPosition, setHoveredPosition] = useState({ x: 0, y: 0 });
  const [cityDepremler, setCityDepremler] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getDepremler();
      setDepremler(data);
    }
    setTimeout(() => setVisible(true), 100);
    fetchData();
  }, []);

  // Hover başlat
  const handleMouseEnter = (event: MouseEvent, cityName: string) => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    setHoveredCity(cityName);
    setHoveredPath(event.target as SVGPathElement);

    const rect = (event.target as SVGPathElement).getBoundingClientRect();
    setHoveredPosition({
      x: rect.left + window.scrollX + rect.width / 2,
      y: rect.top + window.scrollY - 30,
    });

    const filtered = depremler.filter((deprem) => {
      const yer = normalizeCityName(deprem.yer || "");
      const sehir = normalizeCityName(cityName);
      return yer.includes(sehir);
    });

    setCityDepremler(filtered);
  };

  // Hover bırakıldığında (ama biraz gecikmeli)
  const handleMouseLeave = (event: MouseEvent) => {
    hideTimeout.current = setTimeout(() => {
      if (event.target === hoveredPath) {
        setHoveredCity(null);
        setCityDepremler([]);
      }
    }, 400);
  };

  // Tooltip üzerindeyken kapanmasın
  const handleTooltipEnter = () => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
  };

  // Tooltip'ten çıkınca kapanabilir
  const handleTooltipLeave = () => {
    hideTimeout.current = setTimeout(() => {
      setHoveredCity(null);
      setCityDepremler([]);
    }, 300);
  };

  // 🔥 Fare harita dışına çıkarsa tooltip’i tamamen kapat
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Tooltip veya harita dışında bir yere girildiyse kapat
      if (!target.closest("svg") && !target.closest(".tooltip")) {
        setHoveredCity(null);
        setCityDepremler([]);
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="relative w-full flex justify-center">
        <ReactSVG
          src="/assets/turkey-map.svg"
          className="w-[1150px] h-[600px]"
          beforeInjection={(svg) => {
            svg.setAttribute("width", "180%");
            svg.setAttribute("height", "100%");
            svg.setAttribute("viewBox", "0 0 1400 1000");
            svg.style.display = "block";
            svg.style.margin = "auto";

            svg.querySelectorAll("path").forEach((path) => {
              const cityName = path.getAttribute("name") || "";
              const sehir = normalizeCityName(cityName);

              const hasDeprem = depremler.some((deprem) => {
                const yer = normalizeCityName(deprem.yer || "");
                return (
                  yer.includes(sehir) ||
                  sehir.includes(yer.split(" ")[0]) ||
                  yer.endsWith(sehir)
                );
              });

              path.setAttribute("fill", hasDeprem ? "#ff0000" : "#0e7fd4");
              path.setAttribute("stroke", "#ffffff");
              path.setAttribute("stroke-width", "1.5");
              path.style.cursor = "pointer";

              path.addEventListener("mouseenter", (e: any) => {
                handleMouseEnter(e, cityName);
                e.target.setAttribute("fill", hasDeprem ? "#ff6417" : "#1094F6");
              });

              path.addEventListener("mouseleave", (e: any) => {
                handleMouseLeave(e);
                e.target.setAttribute("fill", hasDeprem ? "#E74C3C" : "#2C3E50");
              });
            });
          }}
        />

        {/* Renk açıklamaları kutusu */}
        <div
          className={`absolute bottom-5 left-[85%] min-w-[220px] bg-white shadow-md rounded-lg p-3 border border-gray-300 transition-all duration-700 transform ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h3 className="text-sm font-semibold text-gray-700">
            Renk Anlamları
          </h3>
          <div className="flex items-center mt-2">
            <span className="w-4 h-4 bg-red-600 inline-block rounded-md mr-2"></span>
            <span className="text-xs text-gray-800">Deprem olan şehirler</span>
          </div>
          <div className="flex items-center mt-1">
            <span className="w-4 h-4 bg-blue-600 inline-block rounded-md mr-2"></span>
            <span className="text-xs text-gray-800">
              Deprem olmayan şehirler
            </span>
          </div>
        </div>
      </div>

      {/* Tooltip (hover + scroll + dışarı çıkınca kapanır) */}
      {hoveredCity && (
        <div
          className="tooltip absolute p-2 rounded-xl bg-white/95 shadow-lg border border-gray-200 transition-all transform scale-100 hover:scale-105"
          onMouseEnter={handleTooltipEnter}
          onMouseLeave={handleTooltipLeave}
          style={{
            top: hoveredPosition.y,
            left: hoveredPosition.x,
            transform: "translate(-50%, -100%)",
            minWidth: "220px",
            textAlign: "center",
            zIndex: 1000,
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.25)",
          }}
        >
          <h3 className="text-md font-bold text-gray-800">{hoveredCity}</h3>
          {cityDepremler.length > 0 ? (
            <ul className="mt-2 space-y-1 max-h-[160px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {cityDepremler.map((deprem, index) => (
                <li
                  key={index}
                  className="text-xs text-gray-700 flex justify-between items-center"
                >
                  <span className="font-semibold text-gray-900">
                    {deprem.tarih} - {deprem.saat}
                  </span>
                  <span className="text-gray-600 mx-1">|</span>
                  <span className="inline-flex items-center">
                    <span className="text-gray-700">Büyüklük:</span>
                    <strong
                      className={`px-1 py-0.5 rounded-md ${
                        deprem.buyukluk >= 5
                          ? "text-red-600"
                          : deprem.buyukluk >= 4
                          ? "text-orange-600"
                          : "text-green-600"
                      }`}
                    >
                      {deprem.buyukluk}
                    </strong>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-gray-600">
              Bu bölgede son deprem kaydı yok.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
