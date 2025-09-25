"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary font-bold">AI</span>
              <div className="leading-tight">
                <div className="font-semibold">AiRK Artificial Intelligence Training LLC</div>
                <div className="text-xs text-muted-foreground">Abu Dhabi • ACTVET Approved</div>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link className="text-sm text-muted-foreground hover:text-foreground transition" href="/courses">Courses</Link>
            <Link className="text-sm text-muted-foreground hover:text-foreground transition" href="/lms">LMS</Link>
            <Link className="text-sm text-muted-foreground hover:text-foreground transition" href="/clariva">Clariva</Link>
            <Link className="text-sm text-muted-foreground hover:text-foreground transition" href="/lab">AiRK Lab</Link>
            <Link className="text-sm text-muted-foreground hover:text-foreground transition" href="/about">About</Link>
            <Link className="text-sm text-muted-foreground hover:text-foreground transition" href="/contact">Contact</Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/contact">
              <Button size="sm">Enroll Now</Button>
            </Link>
          </div>

          <button
            className="inline-flex md:hidden h-9 w-9 items-center justify-center rounded-md border"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t py-4 animate-in fade-in zoom-in-95">
            <div className="flex flex-col gap-4">
              <Link onClick={() => setOpen(false)} className="text-sm" href="/courses">Courses</Link>
              <Link onClick={() => setOpen(false)} className="text-sm" href="/lms">LMS</Link>
              <Link onClick={() => setOpen(false)} className="text-sm" href="/clariva">Clariva</Link>
              <Link onClick={() => setOpen(false)} className="text-sm" href="/lab">AiRK Lab</Link>
              <Link onClick={() => setOpen(false)} className="text-sm" href="/about">About</Link>
              <Link onClick={() => setOpen(false)} className="text-sm" href="/contact">Contact</Link>
              <Link onClick={() => setOpen(false)} href="/contact" className="pt-2">
                <Button className="w-full">Enroll Now</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}