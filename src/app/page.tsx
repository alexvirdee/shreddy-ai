import Image from "next/image";



export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-lg md:text-2xl mb-4 font-bold">Meet Shreddy: Your Virtual Guitar Hero!</h1>
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
    </div>
  );
}
