import { useEffect } from "react";
import "./globals.css";
import SelectBox from "./provider/SelectBox";

export const metadata = {
  title: "IDLaps",
  description: "Succeced your race with IDLaps",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SelectBox>
        {children}
        </SelectBox>
        </body>
    </html>
  );
}
