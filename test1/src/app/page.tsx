'use client';
import {
  Application,
  extend,
} from '@pixi/react';
import {
  Container,
  Graphics,
  Sprite,
} from 'pixi.js';

import { BunnySprite } from '@/components/BunnySprite';
import { useRef } from 'react';
extend({
  Container,
  Graphics,
  Sprite,
});

export default function Home() {
  const parentRef = useRef(null);
  return (
    <div style={{
      width: '50%',
      height: '100vh',
      overflow: 'auto',
      position: 'relative'
    }}>
      <div 
        ref={parentRef} 
        style={{
          width: '100%',
          height: '100vh',
          overflow: 'auto',
          position: 'relative'
        }}
      >
        <Application background={0xFF0000} resizeTo={parentRef}>
          <BunnySprite />
        </Application>
      </div>
    </div>
  );
}
