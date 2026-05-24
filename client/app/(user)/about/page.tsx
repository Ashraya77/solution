"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, BookOpenCheck, MapPin, MonitorCheck, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const organization = {
  name: "Solution Computer House",
  address: "Pokhara-25, Hemja, Gandaki Province, Nepal",
  phone: "+977 (XX) XXX-XXXX",
  email: "info@solutioncomputerhouse.com",
  mapLink: "https://maps.app.goo.gl/YourActualMapLinkHere",
};

type Owner = {
  name: string;
  role: string;
  bio: string;
  image: string;
  imageAlt: string;
  objectPosition: string;
};

const owners: Owner[] = [
  {
    name: "Owner Name",
    role: "Founder & Academic Director",
    bio: "Leads the academic direction of the institute, with a focus on practical course structure, student guidance, and consistent learning outcomes.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=85",
    imageAlt: "Portrait placeholder for institution owner",
    objectPosition: "object-[50%_35%]",
  },
  {
    name: "Owner Name",
    role: "Managing Director",
    bio: "Oversees operations, student support, partnerships, and the day-to-day systems that keep training focused and professionally delivered.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=85",
    imageAlt: "Portrait placeholder for institution owner",
    objectPosition: "object-[50%_35%]",
  },
];

type Value = {
  title: string;
  description: string;
  icon: ReactNode;
};

const values: Value[] = [
  {
    title: "Guided Learning",
    description:
      "Students learn with clear instruction, practical examples, and steady support from instructors.",
    icon: <Users size={22} />,
  },
  {
    title: "Hands-on Practice",
    description:
      "Courses are built around doing the work, not only reading theory or watching demonstrations.",
    icon: <MonitorCheck size={22} />,
  },
  {
    title: "Career Confidence",
    description:
      "Programs help students build the discipline, tools, and confidence needed for real opportunities.",
    icon: <BookOpenCheck size={22} />,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.12,
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

export default function AboutPage() {
  return (
    <main className="relative overflow-hidden bg-soft-purple text-foreground">
      <section className="relative isolate px-4 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-36 lg:px-8">
        <div className="absolute inset-0 -z-30 bg-[linear-gradient(to_right,rgba(91,33,182,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(75,68,88,0.045)_1px,transparent_1px)] bg-[size:96px_96px]" />
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_1px_1px,rgba(91,33,182,0.12)_1px,transparent_0)] bg-[length:26px_26px] opacity-[0.32]" />
        <div className="absolute right-[8%] top-28 -z-10 h-56 w-56 bg-primary/10 blur-3xl" />
        <div className="absolute bottom-8 left-[7%] -z-10 h-44 w-44 bg-accent/12 blur-3xl" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_0.72fr] lg:items-end"
        >
          <div>
            <motion.p
              variants={itemVariants}
              className="text-xs font-semibold uppercase tracking-[0.25em] text-primary"
            >
              About {organization.name}
            </motion.p>
            <motion.h1
              variants={itemVariants}
              className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-normal text-foreground sm:text-6xl lg:text-7xl"
            >
              Practical computer education rooted in Hemja, Pokhara.
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mt-7 max-w-2xl text-base leading-8 text-muted sm:text-lg"
            >
              We help students build real digital skills through focused
              instruction, hands-on practice, and diploma-level training that
              prepares them for confident next steps.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/courses"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-semibold text-background shadow-[0_18px_34px_rgba(91,33,182,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-primary-dark"
              >
                Explore Courses
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-background px-7 text-sm font-semibold text-primary shadow-[inset_0_0_0_1px_rgba(91,33,182,0.15),0_12px_26px_rgba(39,25,61,0.06)] transition duration-300 hover:-translate-y-0.5 hover:bg-accent-soft"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>

          <motion.figure
            variants={itemVariants}
            className="relative h-[380px] overflow-hidden bg-soft-purple shadow-[0_28px_74px_rgba(40,20,80,0.14)] sm:h-[480px] lg:h-[560px]"
          >
            <Image
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=85"
              alt="Students learning together in a classroom"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-[48%_50%]"
            />
          </motion.figure>
        </motion.div>
      </section>

      <section className="bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Our Story
            </p>
            <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              Built for students who need clear, practical guidance.
            </h2>
          </div>

          <div className="grid gap-6 text-base leading-8 text-muted">
            <p>
              {organization.name} exists to make computer education more useful,
              approachable, and relevant for local students. Our approach is
              simple: teach the fundamentals clearly, give students enough
              practice, and help them understand how those skills are used in
              real work.
            </p>
            <p>
              From basic computer literacy to diploma programs and practical
              skill tracks, the institute is designed for learners who want
              structure, confidence, and consistent instructor support.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-soft-purple px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Leadership
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              Meet the owners behind the institute.
            </h2>
            <p className="mt-5 text-base leading-8 text-muted">
              Replace these placeholder portraits, names, and bios with your
              real institution owners whenever you are ready.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {owners.map((owner) => (
              <article
                key={owner.role}
                className="grid overflow-hidden bg-background shadow-[0_22px_60px_rgba(40,20,80,0.08)] sm:grid-cols-[0.72fr_1fr]"
              >
                <div className="relative min-h-[320px] sm:min-h-full">
                  <Image
                    src={owner.image}
                    alt={owner.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 28vw"
                    className={`object-cover ${owner.objectPosition}`}
                  />
                </div>
                <div className="flex flex-col justify-end p-7 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    {owner.role}
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold text-foreground">
                    {owner.name}
                  </h3>
                  <p className="mt-5 text-sm leading-7 text-muted">
                    {owner.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.title}
              className="bg-background p-7 shadow-[inset_0_0_0_1px_rgba(91,33,182,0.10),0_18px_48px_rgba(40,20,80,0.06)]"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-soft-purple text-primary">
                {value.icon}
              </div>
              <h3 className="text-2xl font-semibold text-foreground">
                {value.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 bg-foreground p-7 text-background sm:p-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Visit Us
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Find us in Hemja, Pokhara.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-background/70">
              {organization.address}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <a
              href={organization.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-foreground transition duration-300 hover:-translate-y-0.5 hover:bg-accent-soft"
            >
              <MapPin size={17} />
              View on Map
            </a>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-background/10 px-6 text-sm font-semibold text-background transition duration-300 hover:-translate-y-0.5 hover:bg-background/15"
            >
              Ask a Question
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
