import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const getDepremler = async () => {
  try {
    console.log(`API'ye istek atılıyor: ${API_URL}/depremler`);
    const response = await axios.get(`${API_URL}/depremler`, {
      headers: { "Content-Type": "application/json" },
      timeout: 5000,
    });
    console.log("API'den gelen veri:", response.data);
    return response.data;
  } catch (error) {
    console.error("API'den veri alınamadı:", error);
    return [];
  }
};
