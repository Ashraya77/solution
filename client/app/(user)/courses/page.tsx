"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, Award, BookOpen, CheckCircle2, Clock, Code2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type Course = {
  title: string;
  level: string;
  description: string;
  duration: string;
  image: string;
  imageAlt: string;
  objectPosition: string;
  icon: ReactNode;
  modules: string[];
};

const courses: Course[] = [
  {
    title: "Basic Computer Skills",
    level: "Foundational",
    description:
      "A focused starting point for students who need confidence with essential computer use, office tools, typing, internet safety, and everyday digital workflows.",
    duration: "2 months",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Student practicing computer skills on a laptop",
    objectPosition: "object-[58%_50%]",
    icon: <BookOpen size={22} />,
    modules: [
      "Microsoft Office fundamentals",
      "Typing and document formatting",
      "Email, internet, and file management",
      "Digital safety and everyday computer care",
    ],
  },
  {
    title: "Diploma Computer Program",
    level: "Diploma",
    description:
      "A structured diploma pathway for learners who want broader practical training in office productivity, accounting tools, design basics, and professional computer use.",
    duration: "6-12 months",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Students collaborating in a classroom training environment",
    objectPosition: "object-[48%_50%]",
    icon: <Award size={22} />,
    modules: [
      "Advanced office applications",
      "Tally and accounting basics",
      "Graphic design fundamentals",
      "Spreadsheet and data handling",
    ],
  },
  {
    title: "Web Development Training",
    level: "Career Track",
    description:
      "A practical development course for students ready to build portfolio projects, understand modern web tools, and learn how real applications are planned and shipped.",
    duration: "4-6 months",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Instructor guiding students through practical computer training",
    objectPosition: "object-[58%_50%]",
    icon: <Code2 size={22} />,
    modules: [
      "HTML, CSS, and JavaScript foundations",
      "React component development",
      "Backend and API fundamentals",
      "Project workflow and Git basics",
    ],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function CoursePage() {
  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      <section className="relative isolate px-4 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-36 lg:px-8">
        <div className="absolute inset-0 -z-30 bg-[linear-gradient(to_right,rgba(91,33,182,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(75,68,88,0.045)_1px,transparent_1px)] bg-[size:96px_96px]" />
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_1px_1px,rgba(91,33,182,0.12)_1px,transparent_0)] bg-[length:26px_26px] opacity-[0.32]" />
        <div className="absolute right-[10%] top-28 -z-10 h-56 w-56 bg-primary/10 blur-3xl" />
        <div className="absolute bottom-4 left-[8%] -z-10 h-44 w-44 bg-accent/12 blur-3xl" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-7xl"
        >
          <motion.p
            variants={itemVariants}
            className="text-xs font-semibold uppercase tracking-[0.25em] text-primary"
          >
            Course Catalog
          </motion.p>

          <div className="mt-6 grid gap-8 lg:grid-cols-[0.86fr_0.64fr] lg:items-end">
            <motion.h1
              variants={itemVariants}
              className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-normal text-foreground sm:text-6xl lg:text-7xl"
            >
              Practical courses for focused computer training.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="max-w-xl text-base leading-8 text-muted sm:text-lg lg:justify-self-end"
            >
              Explore basic training, diploma programs, and practical skill
              tracks designed for clear guidance, hands-on learning, and steady
              progress.
            </motion.p>
          </div>
        </motion.div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="mx-auto grid max-w-7xl gap-6"
        >
          {courses.map((course, index) => (
            <motion.article
              key={course.title}
              variants={itemVariants}
              className="grid overflow-hidden bg-soft-purple shadow-[0_24px_70px_rgba(40,20,80,0.08)] lg:grid-cols-[0.78fr_1fr]"
            >
              <div
                className={`relative min-h-[280px] lg:min-h-[420px] ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={course.image}
                  alt={course.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className={`object-cover ${course.objectPosition}`}
                />
              </div>

              <div className="flex flex-col justify-between gap-10 bg-background p-7 sm:p-9 lg:p-12">
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-soft-purple text-primary">
                      {course.icon}
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                        {course.level}
                      </p>
                      <p className="mt-1 flex items-center gap-2 text-sm text-muted">
                        <Clock size={15} className="text-primary" />
                        {course.duration}
                      </p>
                    </div>
                  </div>

                  <h2 className="max-w-2xl text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                    {course.title}
                  </h2>

                  <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
                    {course.description}
                  </p>

                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {course.modules.map((module) => (
                      <li
                        key={module}
                        className="flex items-start gap-3 text-sm font-medium leading-6 text-foreground"
                      >
                        <CheckCircle2
                          size={18}
                          className="mt-0.5 shrink-0 text-primary"
                        />
                        <span>{module}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/enroll"
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-background shadow-[0_14px_28px_rgba(91,33,182,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-primary-dark"
                >
                  Apply for this course
                  <ArrowRight size={17} />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
