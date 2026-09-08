import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-background">
        <img src="/landscape.png" alt="Landscape Picture" width={200} height={200} className="w-48 aspect-square rounded-full object-cover ring-4 ring-brand shadow-lg"  />
        <h1 className="mt-8 text-3xl font-bold text-foreground">Tailwind CSS Practice</h1>
        <p className="mt-2 text-center sm:text-left text-foreground/70 leading-relaxed">Tailwind CSS is a utility-first CSS framework for <br/> rapidly building custom user interfaces.</p>
      </main>
    </div>
  );
}
