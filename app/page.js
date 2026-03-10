import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import CaseStudies from "@/components/CaseStudy";
import Principles from "@/components/Principles";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import Playground from "@/components/Playground";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <CaseStudies />
        <Principles />
        <Skills />
        <Timeline />
        <Playground />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
