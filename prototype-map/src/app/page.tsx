'use client'
import Image from "next/image";
import Map from "../components/map";
import { useState } from "react";
export default function Home() {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  return (
    <div className="flex">
      <div className="w-1/6! h-screen overflow-auto">
        <p>Coordinates: {coordinates.x}, {coordinates.y}</p>
      </div>
      <div className="w-5/6! h-screen overflow-auto">
        <Map 
        setCoordinates={setCoordinates}
        pointerCoordinates={coordinates}
        />
      </div>
    </div>
  );
}
