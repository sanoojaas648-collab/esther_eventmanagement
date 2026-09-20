import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";


const About = lazy(() => import("./components/About"));
const Team = lazy(() => import("./components/Team"));
const Services = lazy(() => import("./components/Services"));
const Gallery = lazy(() => import("./components/Gallery"));
const Timeline = lazy(() => import("./components/Timeline"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const Pricing = lazy(() => import("./components/Pricing"));
const CTA = lazy(() => import("./components/CTA"));
const Footer = lazy(() => import("./components/Footer"));


const Empty = () => null;

export default function App() {
  return (
    <div className="bg-bg-primary min-h-screen">
      <Navbar />
      <Hero />
      <Suspense fallback={<Empty />}>
        <About />
        <Team />
        <Services />
        <Gallery />
        <Timeline />
        <Testimonials />
        <Pricing />
        <CTA />
        <Footer />
      </Suspense>
    </div>
  );
}