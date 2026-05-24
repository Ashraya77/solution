import React from "react";
import { Cpu, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden bg-background px-6 pt-16 text-sm text-muted md:px-16 lg:px-24 xl:px-32">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-soft-purple opacity-50 blur-3xl" />

      <div className="mb-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="mb-6 flex items-center gap-2">
            <div className="rounded-lg bg-primary p-2">
              <Cpu className="text-background" size={24} />
            </div>
            <span className="text-xl font-black uppercase tracking-tighter text-foreground">
              Solution<span className="text-primary">House</span>
            </span>
          </div>
          <p className="mb-6 text-sm leading-relaxed text-muted">
            Your premier destination for high-performance computing, expert
            hardware solutions, and dedicated technical support. Building the
            future, one byte at a time.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-primary" />
              <span>123 Tech Avenue, Computer Market</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-primary" />
              <span>+1 (555) 000-TECH</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-foreground">
            Services
          </h2>
          <nav className="flex flex-col space-y-4">
            <a className="transition-colors hover:text-primary" href="#">
              Custom PC Builds
            </a>
            <a className="transition-colors hover:text-primary" href="#">
              Laptop Repair
            </a>
            <a className="transition-colors hover:text-primary" href="#">
              Networking
            </a>
            <a className="transition-colors hover:text-primary" href="#">
              Enterprise Solutions
            </a>
          </nav>
        </div>

        <div className="flex flex-col">
          <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-foreground">
            Support
          </h2>
          <nav className="flex flex-col space-y-4">
            <a className="transition-colors hover:text-primary" href="#">
              Track Service
            </a>
            <a className="transition-colors hover:text-primary" href="#">
              Warranty Policy
            </a>
            <a className="transition-colors hover:text-primary" href="#">
              Consultation
            </a>
            <a className="transition-colors hover:text-primary" href="#">
              Contact Us
            </a>
          </nav>
        </div>

        <div>
          <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-foreground">
            Newsletter
          </h2>
          <p className="mb-6">Get technical updates and exclusive hardware deals.</p>
          <div className="relative group">
            <input
              className="w-full rounded-xl border border-border-subtle bg-soft-purple px-4 py-3 pr-12 outline-none transition-all focus:border-primary"
              type="email"
              placeholder="Email address"
            />
            <button className="absolute right-2 top-1.5 rounded-lg bg-foreground p-2 text-background transition-colors hover:bg-primary">
              <Mail size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center justify-between gap-6 border-t border-border-subtle py-8 md:flex-row">
        <p className="font-medium text-muted">
          &copy; {currentYear}{" "}
          <span className="text-foreground">Solution Computer House.</span> All
          Rights Reserved.
        </p>
        <div className="flex items-center gap-8 font-semibold text-muted">
          <a href="#" className="transition-colors hover:text-foreground">
            Privacy
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            Terms
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  );
}
