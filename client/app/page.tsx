import Enroll from "@/components/layout/Enroll";
import Gallery from "@/components/layout/Gallery";
import Review from "@/components/layout/Review";
import TrainingFeatures from "@/components/layout/TrainingFeatures";
import Courses from "@/components/section/Courses";
import HeroSection from "@/components/section/HeroSection";

export default function Home() {
  return (
    <>
    <HeroSection/>
    <Courses/>
    <TrainingFeatures/>
    <Gallery/>
    <Review/>
    <Enroll/>
    </>
  );
}
