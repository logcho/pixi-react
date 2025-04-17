'use client'
import { extend } from "@pixi/react";
import { Container, Sprite, Assets, Texture, Spritesheet } from "pixi.js";
import { useState, useEffect } from "react";

extend({
    Container,
    Sprite,
});

interface ToolOverlayProps {
    pointerCoordinates: { x: number, y: number };
}

export default function ToolOverlay({ pointerCoordinates }: ToolOverlayProps) {
    const [texture, setTexture] = useState(Texture.EMPTY);
    const [spritesheet, setSpritesheet] = useState<Spritesheet | null>(null);

    useEffect(() => {
        Assets.load('/img/tools.png').then(tex => {
            setTexture(tex);
        });
    }, []);

    useEffect(() => {
        const frames = [
            { x: 0, y: 0, w: 3, h: 3 }, // residential
            { x: 3, y: 0, w: 3, h: 3 }, // commercial
            { x: 6, y: 0, w: 3, h: 3 }, // industrial
            { x: 0, y: 3, w: 3, h: 3 }, // fire station
            { x: 3, y: 3, w: 3, h: 3 }, // police station
            { x: 6, y: 3, w: 1, h: 1 }, // inspect
            { x: 7, y: 3, w: 1, h: 1 }, // wire
            { x: 8, y: 3, w: 1, h: 1 }, // bulldozer
            { x: 6, y: 4, w: 1, h: 1 }, // railroad
            { x: 7, y: 4, w: 1, h: 1 }, // road
            { x: 0, y: 6, w: 4, h: 4 }, // stadium
            { x: 8, y: 4, w: 1, h: 1 }, // park
            { x: 4, y: 6, w: 4, h: 4 }, // seaport
            { x: 0, y: 10, w: 4, h: 4 }, // coal power
            { x: 4, y: 10, w: 4, h: 4 }, // nuclear power
            { x: 0, y: 14, w: 6, h: 6 }, // airport
            { x: 7, y: 3, w: 1, h: 1 }, // network
            { x: 6, y: 5, w: 1, h: 1 }, // water
            { x: 7, y: 5, w: 1, h: 1 }, // land
            { x: 8, y: 5, w: 1, h: 1 }, // forest
        ].map(({ x, y, w, h }) => ({
            frame: { x: 16 * x, y: 16 * y, w: 16 * w, h: 16 * h },
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

    const x = 16 * (pointerCoordinates.x - Math.floor((3 - 1) / 2));  
    const y = 16 * (pointerCoordinates.y - Math.floor((3 - 1) / 2));

    return (
        <pixiContainer>
            {spritesheet && 
                <pixiSprite 
                    texture={spritesheet.textures[0]} 
                    x={x} 
                    y={y} 
                />
            }
        </pixiContainer>
    );
}