"use client";
import { Application, extend } from "@pixi/react";
import { useEffect, useRef, useState } from "react";
import { Assets, Container, Graphics, Sprite, Texture } from "pixi.js";
extend({
    Container,
    Graphics,
    Sprite,
    Text,
});

interface ApplicationProps {
    setCoordinates: (coordinates: { x: number; y: number }) => void;
}

export default function ApplicationComponent({ setCoordinates }: ApplicationProps) {
    const parentRef = useRef(null);
    const [texture, setTexture] = useState(Texture.EMPTY);
    const [sprites, setSprites] = useState<Array<{ x: number; y: number; isHovered: boolean; isActive: boolean }>>([]);

    useEffect(() => {
        if (texture === Texture.EMPTY) {
            Assets
                .load('https://pixijs.com/assets/bunny.png')
                .then((result) => {
                    setTexture(result);
                    // Create a 3x3 grid of sprites
                    const newSprites = [];
                    for (let row = 0; row < 3; row++) {
                        for (let col = 0; col < 3; col++) {
                            newSprites.push({
                                x: 100 + col * 100,
                                y: 100 + row * 100,
                                isHovered: false,
                                isActive: false
                            });
                        }
                    }
                    setSprites(newSprites);
                });
        }
    }, [texture]);

    const handleSpriteClick = (index: number) => {
        setSprites(prevSprites => 
            prevSprites.map((sprite, i) => 
                i === index ? { ...sprite, isActive: !sprite.isActive } : sprite
            )
        );
    };

    const handleSpriteHover = (index: number, isHovered: boolean) => {
        setSprites(prevSprites => 
            prevSprites.map((sprite, i) => 
                i === index ? { ...sprite, isHovered } : sprite
            )
        );
        setCoordinates({
            x: sprites[index].x,
            y: sprites[index].y
        });
    };
    
    return (
        <Application background={0x00FF00} resizeTo={parentRef}>
            {sprites.map((sprite, index) => (
                <pixiSprite
                    key={index}
                    anchor={0.5}
                    eventMode={'static'}
                    onClick={() => handleSpriteClick(index)}
                    onPointerOver={() => handleSpriteHover(index, true)}
                    onPointerOut={() => handleSpriteHover(index, false)}
                    scale={sprite.isActive ? 1 : 1.5}
                    texture={texture}
                    x={sprite.x}
                    y={sprite.y}
                />
            ))}
        </Application>
    );
}