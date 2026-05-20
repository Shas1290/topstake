"use client";

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styled from 'styled-components';

// 1. Styled Components for layout
const ParallaxContainer = styled.div`
  width: 100%;
  height: 60vh; /* Adjust height based on your design */
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 130%; /* Taller than container to allow room for movement */
  will-change: transform;
`;

// 2. The Component
interface ParallaxProps {
  src: string;
  alt: string;
  speed?: number; // 1 = normal parallax, higher = faster
}

export default function ParallaxImage({ src, alt, speed = 1 }: ParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // useGSAP is the React-safe way to use GSAP
  useGSAP(() => {
    if (!containerRef.current || !imageRef.current) return;

    gsap.to(imageRef.current, {
      yPercent: 20 * speed, // Moves the image down as you scroll
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom', // Animation starts when container top hits viewport bottom
        end: 'bottom top',   // Animation ends when container bottom hits viewport top
        scrub: true,         // Links animation directly to the scrollbar
      },
    });
  }, { scope: containerRef }); // Scoping prevents memory leaks in React

  return (
    <ParallaxContainer ref={containerRef}>
      <ImageWrapper ref={imageRef}>
        <Image 
          src={src} 
          alt={alt} 
          fill 
          style={{ objectFit: 'cover' }}
          priority
        />
      </ImageWrapper>
    </ParallaxContainer>
  );
}