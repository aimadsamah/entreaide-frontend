import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import QuickSearch from "@/components/QuickSearch";
import UrgentCarousel from "@/components/UrgentCarousel";

export default function Home() {
  return (
    <div className=" min-h-screen  ">
      <div className="relative pb-24 ">
        <Hero />
      </div>

      <QuickSearch />
      <UrgentCarousel />
    </div>
  );
}
