import Link from "next/link";
import { Linkedin, Youtube, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary font-bold">AI</span>
              <span className="font-semibold">Abu Dhabi AI Institute</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Premier AI and ML training institute in the UAE. Empowering professionals with practical, industry-aligned skills.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-3">Institute</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link className="hover:text-foreground" href="/about">About</Link></li>
              <li><Link className="hover:text-foreground" href="/courses">Courses</Link></li>
              <li><Link className="hover:text-foreground" href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Al Maryah Island, Abu Dhabi</li>
              <li>+971 2 123 4567</li>
              <li>ad.ai.institute@example.com</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-3">Follow</h4>
            <div className="flex items-center gap-3">
              <Link aria-label="LinkedIn" href="https://www.linkedin.com" target="_blank" className="inline-flex h-9 w-9 items-center justify-center rounded-md border hover:bg-accent">
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link aria-label="X" href="https://x.com" target="_blank" className="inline-flex h-9 w-9 items-center justify-center rounded-md border hover:bg-accent">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link aria-label="YouTube" href="https://youtube.com" target="_blank" className="inline-flex h-9 w-9 items-center justify-center rounded-md border hover:bg-accent">
                <Youtube className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-4">
              <p className="text-xs text-muted-foreground mb-2">Accreditations</p>
              <div className="flex gap-3">
                <img alt="ISO 9001" className="h-8 w-auto rounded border" src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=200&auto=format&fit=crop" />
                <img alt="Pearson VUE" className="h-8 w-auto rounded border" src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=200&auto=format&fit=crop" />
                <img alt="CISCO" className="h-8 w-auto rounded border" src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=200&auto=format&fit=crop" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Abu Dhabi AI Institute. All rights reserved.</p>
          <p>Made with ❤️ in Abu Dhabi</p>
        </div>
      </div>
    </footer>
  );
}