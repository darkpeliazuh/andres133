import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Story } from "@/components/sections/story";
import { Menu } from "@/components/sections/menu";
import { Chef } from "@/components/sections/chef";
import { Cellar } from "@/components/sections/cellar";
import { Gallery } from "@/components/sections/gallery";
import { Press } from "@/components/sections/press";
import { Reserve } from "@/components/sections/reserve";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Story />
      <Menu />
      <Chef />
      <Cellar />
      <Gallery />
      <Press />
      <Reserve />
      <Footer />
    </>
  );
}
