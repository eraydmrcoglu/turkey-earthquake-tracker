import "../app/styles/globals.css";

export const metadata = {
  title: "Türkiye Güncel Deprem Haritası",
  description:
    "Türkiye'deki son depremleri anlık olarak takip edin ve harita üzerinde görüntüleyin.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="bg-gray-100 min-h-screen">{children}</body>
    </html>
  );
}
