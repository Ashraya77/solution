"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

const organization = {
  name: "Solution Computer House",
  address: "Pokhara-25, Hemja, Gandaki Province, Nepal",
  phone: "+977 (XX) XXX-XXXX",
  email: "info@solutioncomputerhouse.com",
  mapLink: "https://maps.app.goo.gl/example",
};

const contactItems = [
  {
    title: "Call Us",
    value: organization.phone,
    action: "Click to call",
    href: `tel:${organization.phone}`,
    icon: <Phone size={22} />,
  },
  {
    title: "Email Us",
    value: organization.email,
    action: "Send an email",
    href: `mailto:${organization.email}`,
    icon: <Mail size={22} />,
  },
  {
    title: "Visit Our Institute",
    value: organization.address,
    action: "Get directions",
    href: organization.mapLink,
    icon: <MapPin size={22} />,
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

export default function ContactPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Message sent. We will get back to you shortly.");
  };

  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      <section className="relative isolate px-4 pb-14 pt-32 sm:px-6 sm:pb-20 sm:pt-36 lg:px-8">
        <div className="absolute inset-0 -z-30 bg-[linear-gradient(to_right,rgba(91,33,182,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(75,68,88,0.045)_1px,transparent_1px)] bg-[size:96px_96px]" />
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_1px_1px,rgba(91,33,182,0.12)_1px,transparent_0)] bg-[length:26px_26px] opacity-[0.32]" />
        <div className="absolute right-[8%] top-28 -z-10 h-56 w-56 bg-primary/10 blur-3xl" />
        <div className="absolute bottom-10 left-[8%] -z-10 h-44 w-44 bg-accent/12 blur-3xl" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_0.62fr] lg:items-end"
        >
          <div>
            <motion.p
              variants={itemVariants}
              className="text-xs font-semibold uppercase tracking-[0.25em] text-primary"
            >
              Contact {organization.name}
            </motion.p>
            <motion.h1
              variants={itemVariants}
              className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-normal text-foreground sm:text-6xl lg:text-7xl"
            >
              Ask about courses, enrollment, or diploma training.
            </motion.h1>
          </div>

          <motion.p
            variants={itemVariants}
            className="max-w-xl text-base leading-8 text-muted sm:text-lg lg:justify-self-end"
          >
            Whether you are choosing a basic course, diploma program, or
            practical skill track, our team can help you understand the right
            next step.
          </motion.p>
        </motion.div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.62fr]">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="bg-background p-6 shadow-[inset_0_0_0_1px_rgba(91,33,182,0.10),0_24px_70px_rgba(40,20,80,0.08)] sm:p-8 lg:p-10"
          >
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Send a Message
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
                Tell us what you want to learn.
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-bold text-foreground"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="min-h-12 w-full rounded-xl border border-border-subtle bg-soft-purple px-4 text-foreground outline-none transition duration-300 placeholder:text-muted focus:border-primary focus:bg-background"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-bold text-foreground"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="min-h-12 w-full rounded-xl border border-border-subtle bg-soft-purple px-4 text-foreground outline-none transition duration-300 placeholder:text-muted focus:border-primary focus:bg-background"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-bold text-foreground"
                >
                  Course Interest
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="min-h-12 w-full rounded-xl border border-border-subtle bg-soft-purple px-4 text-foreground outline-none transition duration-300 focus:border-primary focus:bg-background"
                >
                  <option value="">Select a course or inquiry type</option>
                  <option value="diploma">Diploma Courses</option>
                  <option value="basic">Basic Computer Skills</option>
                  <option value="web-development">Web Development Training</option>
                  <option value="enrollment">Enrollment Process</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-bold text-foreground"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full resize-none rounded-xl border border-border-subtle bg-soft-purple px-4 py-3 text-foreground outline-none transition duration-300 placeholder:text-muted focus:border-primary focus:bg-background"
                  placeholder="Tell us about the course you are interested in."
                />
              </div>

              <button
                type="submit"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-background shadow-[0_18px_34px_rgba(91,33,182,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-primary-dark sm:w-fit"
              >
                Submit Inquiry
                <ArrowRight size={17} />
              </button>
            </form>
          </motion.div>

          <motion.aside
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-4 self-start"
          >
            {contactItems.map((item) => (
              <motion.article
                key={item.title}
                variants={itemVariants}
                className="bg-soft-purple p-6 shadow-[inset_0_0_0_1px_rgba(91,33,182,0.08)]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-background text-primary">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-muted">
                  {item.value}
                </p>
                <a
                  href={item.href}
                  target={item.title === "Visit Our Institute" ? "_blank" : undefined}
                  rel={
                    item.title === "Visit Our Institute"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary transition duration-300 hover:gap-3"
                >
                  {item.action}
                  <ArrowRight size={15} />
                </a>
              </motion.article>
            ))}

            <div className="bg-foreground p-6 text-background">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                Visit
              </p>
              <p className="mt-4 text-2xl font-semibold">
                We are based in Hemja, Pokhara.
              </p>
              <p className="mt-4 text-sm leading-7 text-background/70">
                Reach out before visiting so we can guide you to the right
                course counselor or instructor.
              </p>
            </div>
          </motion.aside>
        </div>
      </section>
    </main>
  );
}
