"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const featuredCourses = [
  {
    title: "AI Foundations",
    level: "Beginner",
    duration: "6 weeks",
    img: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Machine Learning Engineer",
    level: "Intermediate",
    duration: "8 weeks",
    img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Generative AI & LLMs",
    level: "Advanced",
    duration: "6 weeks",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1400&auto=format&fit=crop",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1601397922721-4326ae07bbc0?q=80&w=2000&auto=format&fit=crop"
            alt="Abu Dhabi skyline at sunset"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background/60" />
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 left-1/2 size-[560px] -translate-x-1/2 rounded-full bg-fuchsia-500/25 blur-3xl" />
            <div className="absolute bottom-[-120px] right-[-80px] size-[460px] rounded-full bg-cyan-400/30 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.15),transparent_60%)]" />
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center text-white">
          <Badge className="mb-4 bg-white/10 text-white border-white/20 backdrop-blur" variant="secondary">Abu Dhabi • UAE</Badge>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300 bg-clip-text text-transparent drop-shadow-[0_1px_10px_rgba(255,255,255,0.15)]">
            Build your AI career in Abu Dhabi
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-white/90">
            Hands-on AI and Machine Learning training with expert mentors, modern labs, and career support. Evening and weekend cohorts available.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link href="/courses"><Button size="lg" className="transition-shadow shadow-[0_0_0_0_rgba(34,211,238,0.0)] hover:shadow-[0_0_35px_10px_rgba(34,211,238,0.35)]">Explore Courses</Button></Link>
            <Link href="/contact"><Button size="lg" variant="secondary" className="bg-white/15 backdrop-blur hover:bg-white/25 transition-colors">Enroll Now</Button></Link>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-white/10 bg-white/5 backdrop-blur supports-[backdrop-filter]:bg-white/5">
            <CardHeader>
              <CardTitle>Industry-aligned</CardTitle>
              <CardDescription>Curriculum co-designed with UAE tech leaders</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Projects in computer vision, NLP, MLOps, and GenAI mapped to in-demand roles across the GCC.</p>
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5 backdrop-blur supports-[backdrop-filter]:bg-white/5">
            <CardHeader>
              <CardTitle>Hands-on Labs</CardTitle>
              <CardDescription>GPU-enabled campus in Abu Dhabi</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Work with real datasets, deploy models, and build a capstone portfolio guided by mentors.</p>
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5 backdrop-blur supports-[backdrop-filter]:bg-white/5">
            <CardHeader>
              <CardTitle>Career Support</CardTitle>
              <CardDescription>Placement and certification prep</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Interview prep, CV workshops, and connections to partner employers in the UAE.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 pb-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-white bg-clip-text text-transparent">Featured Courses</h2>
            <p className="text-sm text-muted-foreground mt-1">Our most popular programs in Abu Dhabi</p>
          </div>
          <Link href="/courses" className="hidden md:inline-block">
            <Button variant="outline" className="border-white/20 hover:bg-white/10">View all</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {featuredCourses.map((c) => (
            <Card key={c.title} className="overflow-hidden group border-white/10 bg-white/5 backdrop-blur supports-[backdrop-filter]:bg-white/5 transition-transform hover:scale-[1.01]">
              <div className="relative h-40 w-full">
                <Image src={c.img} alt={c.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{c.title}</CardTitle>
                  <Badge variant="secondary" className="bg-white/10 backdrop-blur">{c.level}</Badge>
                </div>
                <CardDescription>{c.duration}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full transition-shadow shadow-[0_0_0_0_rgba(244,114,182,0)] hover:shadow-[0_0_30px_8px_rgba(244,114,182,0.25)]">
                  <Link href="/courses">Learn more</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}