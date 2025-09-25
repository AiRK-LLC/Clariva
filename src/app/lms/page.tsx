import { Metadata } from "next";
import { LmsShell } from "@/components/lms/LmsShell";

export const metadata: Metadata = {
  title: "LMS – Learn with AiRK | AiRK",
  description:
    "AiRK LMS: simple, modern learning experience for individuals, companies, and students. Explore catalog, track progress, and view certifications.",
};

export default function LmsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <LmsShell />
    </div>
  );
}