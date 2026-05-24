"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type HeroImage = {
  src: string;
  alt: string;
  objectPosition: string;
};

const heroImages: HeroImage[] = [
  {
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=85",
    alt: "Students collaborating during a classroom training session",
    objectPosition: "object-[48%_50%]",
  },
  {
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=85",
    alt: "Student practicing computer skills on a laptop",
    objectPosition: "object-[58%_50%]",
  },
  {
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=85",
    alt: "Instructor leading a practical classroom lesson",
    objectPosition: "object-[44%_50%]",
  },
];

const textContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.14,
      staggerChildren: 0.12,
    },
  },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const frameVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.28 + index * 0.08,
      duration: 0.68,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-background px-4 pb-18 pt-32 text-foreground sm:px-6 sm:pb-24 sm:pt-36 lg:min-h-screen lg:px-8 lg:pb-28 lg:pt-40">
      <div className="absolute inset-0 -z-30 bg-[linear-gradient(to_right,rgba(91,33,182,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(75,68,88,0.05)_1px,transparent_1px)] bg-[size:96px_96px] opacity-55" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_1px_1px,rgba(91,33,182,0.12)_1px,transparent_0)] bg-[length:26px_26px] opacity-[0.38]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-56 bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(251,248,242,0))]" />
      <div className="absolute right-[6%] top-36 -z-10 h-48 w-48 bg-accent/10 blur-3xl" />
      <div className="absolute bottom-20 left-[4%] -z-10 h-52 w-52 bg-primary/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.86fr_1.14fr] lg:gap-16">
        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.p
            variants={textItemVariants}
            className="text-xs font-semibold uppercase tracking-[0.25em] text-primary"
          >
            Basic & Diploma Training Institute
          </motion.p>

          <motion.h1
            variants={textItemVariants}
            className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.02] tracking-normal text-foreground sm:text-6xl lg:text-7xl"
          >
            Practical training for students ready to build real skills.
          </motion.h1>

          <motion.p
            variants={textItemVariants}
            className="mt-7 max-w-xl text-base leading-8 text-muted sm:text-lg"
          >
            Explore basic courses and diploma programs designed around guided
            learning, hands-on practice, and career-ready confidence.
          </motion.p>

          <motion.div
            variants={textItemVariants}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/courses"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-semibold text-background shadow-[0_18px_34px_rgba(91,33,182,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              Explore Courses
            </Link>
            <Link
              href="/enroll"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-background px-7 text-sm font-semibold text-primary shadow-[inset_0_0_0_1px_rgba(91,33,182,0.15),0_12px_26px_rgba(39,25,61,0.06)] transition duration-300 hover:-translate-y-0.5 hover:bg-accent-soft"
            >
              Apply Now
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          className="relative mx-auto w-full max-w-[720px] overflow-hidden py-3 sm:py-6 lg:max-w-none"
          aria-label="Editorial training institute photography"
        >
          <div className="pointer-events-none absolute inset-[-14%] bg-[radial-gradient(circle_at_62%_34%,rgba(124,58,237,0.20),transparent_40%),radial-gradient(circle_at_34%_70%,rgba(250,204,21,0.18),transparent_38%)] opacity-70 blur-3xl" />

          <div className="relative z-10 grid h-[420px] grid-cols-[1.42fr_0.9fr] gap-2 sm:h-[520px] sm:gap-3 lg:h-[600px]">
            <motion.figure
              custom={0}
              variants={frameVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative h-full overflow-hidden bg-soft-purple shadow-[0_28px_74px_rgba(40,20,80,0.16)]"
            >
              <Image
                src={heroImages[0].src}
                alt={heroImages[0].alt}
                fill
                priority
                sizes="(max-width: 1024px) 58vw, 36vw"
                className={`object-cover ${heroImages[0].objectPosition}`}
              />
            </motion.figure>

            <div className="grid min-h-0 gap-2 sm:gap-3">
              {heroImages.slice(1).map((image, index) => (
                <motion.figure
                  key={image.src}
                  custom={index + 1}
                  variants={frameVariants}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative min-h-0 overflow-hidden bg-soft-purple shadow-[0_22px_54px_rgba(40,20,80,0.13)]"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1024px) 38vw, 24vw"
                    className={`object-cover ${image.objectPosition}`}
                  />
                </motion.figure>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
