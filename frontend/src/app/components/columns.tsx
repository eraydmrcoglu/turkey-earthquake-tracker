"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Deprem } from "@/types/deprem";

export const columns: ColumnDef<Deprem>[] = [
  {
    accessorKey: "tarih",
    header: "Tarih",
  },
  {
    accessorKey: "saat",
    header: "Saat",
  },
  {
    accessorKey: "yer",
    header: "Yer",
  },
  {
    accessorKey: "buyukluk",
    header: "Büyüklük",
    cell: ({ row }) => {
      const value = parseFloat(row.getValue("buyukluk"));
      const renk =
        value >= 5
          ? "text-red-600"
          : value >= 4
          ? "text-orange-500"
          : "text-green-600";

      return <span className={`font-semibold ${renk}`}>{value}</span>;
    },
  },
  {
    accessorKey: "derinlik",
    header: "Derinlik (km)",
  },
];
