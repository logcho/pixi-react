"use client"
import { Application, extend } from "@pixi/react";
import { Container, Sprite, Assets, Texture, Spritesheet } from "pixi.js";
import { useEffect, useRef, useState } from "react";
import { Hex } from "viem";

extend({
    Container,
    Sprite,
});

export type Tile = {
    x: number;
    y: number;
    powered: boolean;
    conductor: boolean;
    burnable: boolean;
    bulldozable: boolean;
    animated: boolean;
    center: boolean;
    type: number;
};

const decodeTile = (x: number, y: number, tile: number): Tile => ({
    x,
    y,
    powered: (tile & 0x8000) !== 0,
    conductor: (tile & 0x4000) !== 0,
    burnable: (tile & 0x2000) !== 0,
    bulldozable: (tile & 0x1000) !== 0,
    animated: (tile & 0x0800) !== 0,
    center: (tile & 0x0400) !== 0,
    type: tile & 0x03ff,
});

const width = 120;
const height = 100;
const rows = [...Array(height).keys()];
const cols = [...Array(width).keys()];

const coordinates = Array.from(rows, (_, y) =>
    Array.from(cols, (_, x) => ({ x, y }))
).flat();

interface MapProps {    
    setCoordinates: (coordinates: { x: number; y: number }) => void;
}

export default function Map({ setCoordinates }: MapProps) {
    const [texture, setTexture] = useState(Texture.EMPTY);
    const [spritesheet, setSpritesheet] = useState<Spritesheet | null>(null);

    const value = `0x${[...Array(width * height).keys()].map(() => "0000").join("")}`;
    // Split the hex string into pairs of characters
    const pairs = value.substring(2).match(/.{1,4}/g);

    // Convert each pair to a decimal number and create a Uint16Array
    const map = new Uint16Array(pairs!.map((pair) => parseInt(pair, 16)));

    useEffect(() => {
        Assets.load('/img/tiles.png').then(tex => {
            setTexture(tex);
        });
    }, []);

    console.log(texture);
    useEffect(() => {
        const frames = [...Array(1024).keys()].map((i) => ({
            frame: {
                x: (i % 32) * 16,
                y: Math.floor(i / 32) * 16,
                w: 16,
                h: 16,
            },
        }));
        if (texture) {
            const sheet = new Spritesheet(texture, {
                frames: frames.reduce(
                    (acc, frame, index) => ({ ...acc, [index]: frame }),
                    {}
                ),
                meta: {
                    scale: "1",
                },
            });
            sheet.parse().then((_texture) => {
                setSpritesheet(sheet);
            });
        }
    }, [texture]);

    return (
        <Application width={width * 16} height={height * 16}>
            <pixiContainer>
                {spritesheet && coordinates.map((coord, index) => {
                    const t = map[coord.x * 100 + coord.y];
                    const tile = decodeTile(coord.x, coord.y, t);
                    const coordStr = `(${coord.x},${coord.y})`;
                    return (
                        <pixiSprite
                            key={coordStr}
                            texture={spritesheet?.textures[tile.type]}
                            x={coord.x * 16}
                            y={coord.y * 16}
                            width={16}
                            height={16}
                            onPointerOver={() => setCoordinates({ x: coord.x, y: coord.y })}
                            onPointerDown={() => setCoordinates({ x: coord.x, y: coord.y })}
                            interactive={true}
                        />
                    );
                })}
            </pixiContainer>
        </Application>
    );
}