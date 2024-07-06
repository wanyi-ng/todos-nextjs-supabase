import Link from "next/link";
import AuthButton from "@/components/AuthButton";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <Link href="/">Home</Link>
          <AuthButton />
        </div>
      </nav>

      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <Hero />
      </div>

      <Footer />
    </div>
  );
}
