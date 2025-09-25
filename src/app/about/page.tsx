"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const instructors = [
  { name: "Dr. Sara Al Nahyan", title: "Head of AI Research", img: "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=600&auto=format&fit=crop" },
  { name: "Omar Al Mansoori", title: "Senior ML Engineer", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop" },
  { name: "Layla Haddad", title: "NLP Scientist", img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=600&auto=format&fit=crop" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">About Abu Dhabi AI Institute</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Our mission is to advance AI literacy and create high-impact ML talent in the UAE through rigorous, hands-on education and research partnerships.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-lg">
          <Image
            src="https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=1400&auto=format&fit=crop"
            alt="Abu Dhabi campus"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">World-class facilities in Abu Dhabi</h2>
          <p className="text-muted-foreground mt-2">
            Located in the heart of Abu Dhabi, our campus features state-of-the-art labs, GPU clusters, and collaborative classrooms to facilitate project-based learning.
          </p>
          <ul className="list-disc pl-5 text-sm text-muted-foreground mt-3 space-y-2">
            <li>Dedicated ML Ops lab with Kubernetes</li>
            <li>Industry mentors from leading AI companies</li>
            <li>Career placement support across the GCC</li>
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Expert Instructors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {instructors.map((i) => (
            <Card key={i.name}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={i.img} alt={i.name} />
                    <AvatarFallback>{i.name.split(" ").map(x=>x[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{i.name}</CardTitle>
                    <CardDescription>{i.title}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  10+ years in applied AI, publications in top venues, and extensive industry consulting across healthcare, energy, and finance.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}