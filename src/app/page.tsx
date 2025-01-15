"use client"

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";

const useTypewriter = (text: string, speed = 20) => {
  const [index, setIndex] = useState(0);
  const displayText = useMemo(() => text.slice(0, index), [index]);
  useEffect(() => {
    if (index >= text.length)
      return;
      
    const timeoutId = setTimeout(() => {
      setIndex(i => i + 1);
    }, speed);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [index, text, speed]);

  return displayText;
};

export default function Home() {
  const text = useTypewriter("Meet Shreddy: Your Virtual Guitar Hero!", 80);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="min-h-2 text-lg md:text-3xl mb-4 font-bold"  style={{ minHeight: "1.2em" }}>{text}</h1>
        {/* Main shreddy image */}
        <Image
          className="rounded-xl mx-auto"
          src="/shreddy-main.png"
          alt="Shreddy AI"
          width={250}
          height={50}
          priority
        />
        <div className="mx-auto">More details to come!</div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://x.com/ShreddyA67473"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          X
        </a>
      </footer>
      {/* TODO: Spotify embed song on bottom right of site */}
      {/* <div className="fixed bottom-1 right-4 text-white rounded-full flex items-center justify-center">
      <iframe src="https://open.spotify.com/embed/track/08mG3Y1vljYA6bvDt4Wqkj?utm_source=generator" width="100%" height="200" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      </div> */}
    </div>
  );
}
