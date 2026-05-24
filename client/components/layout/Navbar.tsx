"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8"
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-7xl items-center justify-between rounded-full bg-background px-4 py-2.5 shadow-[0_16px_42px_rgba(39,25,61,0.10)] ring-1 ring-primary/10 sm:px-5 lg:px-6"
      >
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          aria-label="Solution Computer House home"
          className="group leading-none"
        >
          <span className="block text-[1.05rem] font-bold tracking-normal text-foreground transition duration-300 group-hover:text-primary">
            Solution
          </span>
          <span className="mt-1 block text-[0.61rem] font-bold uppercase tracking-[0.22em] text-primary/75">
            Computer House
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex lg:gap-9">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-bold transition duration-300 hover:text-primary ${
                isActive(item.href) ? "text-primary" : "text-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/enroll"
          className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-background shadow-[0_12px_26px_rgba(91,33,182,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-primary-dark md:inline-flex"
        >
          Apply Now
        </Link>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center text-foreground transition duration-300 hover:text-primary md:hidden"
        >
          {isOpen ? (
            <X size={23} strokeWidth={1.8} aria-hidden="true" />
          ) : (
            <Menu size={23} strokeWidth={1.8} aria-hidden="true" />
          )}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mx-auto mt-3 max-w-7xl rounded-[1.75rem] bg-background px-6 py-5 shadow-[0_18px_45px_rgba(39,25,61,0.12)] ring-1 ring-primary/10 md:hidden"
          >
            <div className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`py-3 text-sm font-bold transition duration-300 hover:text-primary ${
                    isActive(item.href) ? "text-primary" : "text-muted"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <Link
              href="/enroll"
              onClick={() => setIsOpen(false)}
              className="mt-4 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-background transition duration-300 hover:bg-primary-dark"
            >
              Apply Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
