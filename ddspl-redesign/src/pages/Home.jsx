import Hero from "../components/sections/home/Hero";
import AboutIntro from "../components/sections/home/AboutIntro";
import SignageUniverse from "../components/sections/home/SignageUniverse";
import KeyPartners from "../components/sections/home/KeyPartners";
import SpecialtiesMarquee from "../components/sections/home/SpecialtiesMarquee";
import AwardsHighlight from "../components/sections/home/AwardsHighlight";
import ContactCTA from "../components/sections/home/ContactCTA";
import MoreWork from "../components/sections/home/MoreWork";
export default function Home() {
  return (
    <main className="bg-[#080808]">
      <Hero />

       <AboutIntro />
       <SpecialtiesMarquee/>
       <SignageUniverse/>
       <KeyPartners/>
       <AwardsHighlight/>
       <MoreWork/>
       <ContactCTA/>
    </main>
  );
}