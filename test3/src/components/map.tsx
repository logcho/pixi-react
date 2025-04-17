"use client";
import { Application, extend } from "@pixi/react";
import { Assets, Container, Graphics, Sprite, Spritesheet, Texture } from "pixi.js";
import { useEffect, useState } from "react";

extend({
    Container,
    Graphics,
    Sprite,
});

interface MapProps {
    setCoordinates: (coordinates: { x: number; y: number }) => void;
}



export default function Map({ setCoordinates }: MapProps) {
    const [texture, setTexture] = useState<Texture | null>(null);
    const [spritesheet, setSpritesheet] = useState<Spritesheet | null>(null);
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
    if (spritesheet) {
        console.log(spritesheet);
    }
    

    return (
        <Application background={0x00FF00} >
            <pixiContainer>

                {texture && (
                    // Add your sprite or other components using the texture here
                    [...Array(100)].map((_, row) => (
                        [...Array(100)].map((_, col) => (
                            <pixiSprite
                                key={`${row}-${col}`}
                                texture={spritesheet?.textures[0]}
                                x={col * 16}
                                y={row * 16}
                                width={16}
                                height={16}
                                onPointerOver={() => setCoordinates({ x: col, y: row })}
                                onClick={() => setCoordinates({ x: col, y: row })}
                                interactive={true}
                            />
                        ))
                    ))
                )}
            </pixiContainer>
        </Application>
    );
}
