import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Tonight } from "@/components/sections/tonight";
import { Story } from "@/components/sections/story";
import { Menu } from "@/components/sections/menu";
import { CarteVivante } from "@/components/sections/carte-vivante";
import { Chef } from "@/components/sections/chef";
import { Cellar } from "@/components/sections/cellar";
import { Gallery } from "@/components/sections/gallery";
import { PressWall } from "@/components/sections/press-wall";
import { Press } from "@/components/sections/press";
import { Location } from "@/components/sections/location";
import { Reserve } from "@/components/sections/reserve";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Tonight />
      <Story />
      <Menu />
      <CarteVivante />
      <Chef />
      <Cellar />
      <Gallery />
      <PressWall />
      <Press />
      <Location />
      <Reserve />
      <Footer />
    </>
  );
}
