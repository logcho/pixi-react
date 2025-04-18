"use client";
import Image from "next/image";
import Map from "../components/map";
import { useState } from "react";
export default function Home() {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  return (
    <div>
      <h1>Hello World</h1>
      <p>Coordinates: {coordinates.x}, {coordinates.y}</p>
      <div className="h-100 overflow-auto">
        <Map setCoordinates={setCoordinates} />
      </div>
    </div>
  );
}
