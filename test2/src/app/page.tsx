'use client';
import Image from "next/image";
import ApplicationComponent from "./components/application";
import { useState } from "react";
export default function Home() {
  const [coordinates, setCoordinates] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  return (
    <div>
      <h1>Hello World</h1>
      <p>Coordinates: {coordinates.x}, {coordinates.y}</p>
        <div className="w-100 h-full bg-blue-500 overflow-auto">
          <ApplicationComponent setCoordinates={setCoordinates} />
        </div>
    </div>
  );
}
