"use client";

import { useState } from "react";

const APP_URL = "https://ashdodance-fest-2026.vercel.app";

const IPHONE_IMAGES = [
  "/images/install/iphone-1.jpg",
  "/images/install/iphone-2.jpg",
  "/images/install/iphone-3.jpg",
  "/images/install/iphone-4.jpg",
  "/images/install/iphone-5.jpg",
  "/images/install/iphone-6.jpg",
];

const ANDROID_IMAGES = [
  "/images/install/android-1.jpg",
  "/images/install/android-2.jpg",
  "/images/install/android-3.jpg",
  "/images/install/android-4.jpg",
  "/images/install/android-5.jpg",
];

function AppLink({ label }) {
  return (
    <a
      href={APP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full text-center rounded-xl py-3.5 font-bold mt-6"
      style={{ background: "#E8A93D", color: "#241623", fontSize: "0.95rem" }}
    >
      {label}
    </a>
  );
}

export default function InstallPage() {
  const [platform, setPlatform] = useState("iphone");
  const images = platform === "iphone" ? IPHONE_IMAGES : ANDROID_IMAGES;

  return (
    <div className="min-h-screen flex justify-center" style={{ background: "#EDE3D0" }} dir="rtl" lang="he">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@700;900&family=Rubik:wght@400;500;600;700&display=swap');
        body { font-family: 'Rubik', sans-serif; }
        .display-font { font-family: 'Frank Ruhl Libre', serif; }
      `}</style>

      <div className="w-full max-w-md" style={{ background: "#FBF3E6" }}>
        {/* Header */}
        <div className="px-6 pt-8 pb-6 text-center" style={{ background: "#241623" }}>
          <p style={{ color: "#E8A93D", fontSize: "0.7rem", letterSpacing: "0.2em" }}>מדריך התקנה</p>
          <h1 className="display-font font-bold mt-1" style={{ color: "#FBF3E6", fontSize: "1.6rem" }}>
            אשדודאנס 2026 - התוכנייה שלי
          </h1>
          <p className="mt-2" style={{ color: "#C9BBB0", fontSize: "0.85rem" }}>
            30 שניות, בלי חנות אפליקציות, בלי הרשמה
          </p>
        </div>

        {/* Platform toggle */}
        <div className="flex gap-2 px-6 pt-5">
          <button
            onClick={() => setPlatform("iphone")}
            className="flex-1 py-2.5 rounded-full font-bold"
            style={{
              background: platform === "iphone" ? "#241623" : "#F3ECDF",
              color: platform === "iphone" ? "#FBF3E6" : "#6B5B63",
              fontSize: "0.9rem",
            }}
          >
            אייפון
          </button>
          <button
            onClick={() => setPlatform("android")}
            className="flex-1 py-2.5 rounded-full font-bold"
            style={{
              background: platform === "android" ? "#241623" : "#F3ECDF",
              color: platform === "android" ? "#FBF3E6" : "#6B5B63",
              fontSize: "0.9rem",
            }}
          >
            אנדרואיד
          </button>
        </div>

        {/* Quick link at top too, for anyone in a hurry */}
        <div className="px-6">
          <AppLink label="כבר יודעים איך? מעבר ישיר לאפליקציה ←" />
        </div>

        {/* Step-by-step images */}
        <div className="px-6 py-6 flex flex-col gap-4">
          {images.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt={`שלב ${i + 1} - התקנה ב${platform === "iphone" ? "אייפון" : "אנדרואיד"}`}
              className="w-full rounded-xl"
              style={{ boxShadow: "0 1px 6px rgba(36,22,35,0.15)" }}
              loading={i === 0 ? "eager" : "lazy"}
            />
          ))}
        </div>

        {/* Bottom link */}
        <div className="px-6 pb-10">
          <AppLink label="פתחו את האפליקציה ←" />
          <p className="text-center mt-3" style={{ color: "#8A7B84", fontSize: "0.75rem" }}>
            הקישור נפתח בטאב נפרד - המדריך הזה נשאר פתוח כדי שתוכלו לחזור אליו.
          </p>
        </div>
      </div>
    </div>
  );
}
