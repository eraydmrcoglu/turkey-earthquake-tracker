<div align="center">
  <img src="https://github.com/user-attachments/assets/301ef2c9-e7a0-497d-81e2-bde295a4bdb4" alt="Home Page" /> 
</div>

# 🌍 Turkey Earthquake Tracker

A full-stack web application that visualizes **real-time earthquake data across Turkey** on an interactive SVG map. The **backend (NestJS)** fetches and processes earthquake data from official sources such as **Kandilli Observatory** or **AFAD**,  while the **frontend (Next.js)** displays it dynamically with responsive UI, hover tooltips, and clean visual design.

---

## ✨ Features

- 🗺️ Interactive map with color-coded earthquake locations  
- 📊 Displays magnitude, date, and time of recent earthquakes  
- 🔁 Real-time API data updates  
- 💬 Smooth hover tooltips with scrollable details  
- 🎨 Fully responsive TailwindCSS design  
- 🧩 Modular full-stack architecture (Next.js + NestJS)

---

## 🧠 Tech Stack

### 🎨 Frontend
- **Next.js 15** – React-based frontend framework  
- **TypeScript** – Type-safe development  
- **TailwindCSS** – Utility-first CSS framework  
- **ReactSVG** – Interactive SVG rendering  
- **Axios / Fetch** – For API communication  

### ⚙️ Backend
- **NestJS** – Scalable Node.js backend framework  
- **TypeScript** – Strongly typed backend logic  
- **Axios** – Fetches live earthquake data  
- **Cron Jobs** – Periodic data updates  
- **Express Adapter** – REST API endpoints  

---

## ⚙️ Installation & Setup

### 🧱 Backend (NestJS)
```bash
cd backend
npm install
npm run start:dev
```
- Runs on → http://localhost:3000
- API endpoint → /api/depremler

## 💻 Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
- Runs on → http://localhost:3001
- Automatically connects to backend via the getDepremler() API call

## 🔗 API Endpoints

| Endpoint              | Method | Description                        |
|------------------------|--------|------------------------------------|
| /api/depremler         | GET    | Returns all recent earthquakes     |
| /api/depremler/:city   | GET    | Returns earthquakes for a city     |
| /health                | GET    | Health check endpoint              |

## 📄 Example Response
```bash
[
  {
    "yer": "Balikesir - Sindirgi",
    "tarih": "2025-11-09",
    "saat": "10:24:58",
    "buyukluk": 2.9
  },
  {
    "yer": "Manisa - Akhisar",
    "tarih": "2025-11-09",
    "saat": "10:15:12",
    "buyukluk": 1.8
  },
  {
    "yer": "Izmir - Seferihisar",
    "tarih": "2025-11-09",
    "saat": "09:48:05",
    "buyukluk": 3.2
  }
]
```

## 🧰 Developer Notes
- 🗺️ Turkey map SVG → frontend/public/assets/turkey-map.svg
- 🔁 Data fetching logic → frontend/src/api/api.ts
- 💬 Tooltip + hover events → DepremHaritasi.tsx
- 🎨 Styling → TailwindCSS for all components
- 🧠 Backend services → deprem.service.ts

## 🚀 Future Improvements
- ⚡ Real-time WebSocket support
- 🔔 Push notifications for major earthquakes
- 📱 Mobile optimization
- 📍 Epicenter markers with zoom support
