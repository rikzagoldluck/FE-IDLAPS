"use client";
import React, { useEffect, useState } from "react";
import { themeChange } from "theme-change";

export default function SelectTheme() {
  const themeValue = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
  ];

  useEffect(() => {
    themeChange(false);
  });

  return (
    <select className="select w-full" data-choose-theme>
      <option disabled>Select Theme</option>
      {themeValue.sort().map((theme) => (
        <option key={theme} value={theme.toLowerCase()}>
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </option>
      ))}
    </select>
  );
}
