"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

type Course = {
  id: number;
  slug: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  durationWeeks: number;
  priceAed: number;
  imageUrl: string;
  description: string;
};

export default function CoursesPage() {
  const [tab, setTab] = useState("all");
  const [data, setData] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const token = typeof window !== "undefined" ? localStorage.getItem("bearer_token") : null;
    setLoading(true);
    setError(null);

    const levelParam = tab === "beginner" ? "Beginner" : tab === "intermediate" ? "Intermediate" : tab === "advanced" ? "Advanced" : null;
    const url = levelParam ? `/api/courses?level=${encodeURIComponent(levelParam)}` : "/api/courses";

    fetch(url, {
      signal: controller.signal,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.error || `Request failed (${res.status})`);
        }
        return res.json();
      })
      .then((json: Course[]) => {
        setData(json);
      })
      .catch((e: any) => {
        if (e?.name !== "AbortError") setError(e?.message || "Failed to load courses");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [tab]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">AI & Machine Learning Courses</h1>
        <p className="text-muted-foreground mt-2">Industry-aligned programs in Abu Dhabi with certifications and flexible schedules.</p>
      </header>

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="beginner">Beginner</TabsTrigger>
          <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <CourseGrid items={data} loading={loading} error={error} />
        </TabsContent>
        <TabsContent value="beginner" className="mt-6">
          <CourseGrid items={data} loading={loading} error={error} />
        </TabsContent>
        <TabsContent value="intermediate" className="mt-6">
          <CourseGrid items={data} loading={loading} error={error} />
        </TabsContent>
        <TabsContent value="advanced" className="mt-6">
          <CourseGrid items={data} loading={loading} error={error} />
        </TabsContent>
      </Tabs>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Certification Tracks & Pricing</h2>
        <p className="text-sm text-muted-foreground mt-1">Choose a plan that fits your goals. All prices include lab access and capstone guidance.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card className="relative">
            <CardHeader>
              <CardTitle>Starter</CardTitle>
              <CardDescription>Best for newcomers</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">AED 2,500</p>
              <ul className="mt-4 text-sm space-y-2 text-muted-foreground">
                <li>AI Foundations</li>
                <li>Evening classes</li>
                <li>Certificate of Completion</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Enroll</Button>
            </CardFooter>
          </Card>

          <Card className="border-primary/40 relative">
            <Badge className="absolute -top-2 right-3" variant="secondary">Popular</Badge>
            <CardHeader>
              <CardTitle>Professional</CardTitle>
              <CardDescription>Career acceleration</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">AED 4,800</p>
              <ul className="mt-4 text-sm space-y-2 text-muted-foreground">
                <li>ML Engineer Program</li>
                <li>Weekend bootcamps</li>
                <li>Career services</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Enroll</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Expert</CardTitle>
              <CardDescription>Advanced specialization</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">AED 6,200</p>
              <ul className="mt-4 text-sm space-y-2 text-muted-foreground">
                <li>Deep Learning + GenAI</li>
                <li>1:1 mentorship</li>
                <li>Capstone project review</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Enroll</Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}

function CourseGrid({ items, loading, error }: { items: Course[]; loading: boolean; error: string | null }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-40 w-full rounded-md bg-muted" />
              <div className="mt-3 h-5 w-2/3 bg-muted rounded" />
              <div className="mt-2 h-4 w-full bg-muted rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-4 w-full bg-muted rounded" />
              <div className="mt-2 h-4 w-2/3 bg-muted rounded" />
            </CardContent>
            <CardFooter>
              <div className="h-9 w-full bg-muted rounded" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return <p className="text-sm text-muted-foreground">No courses found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((c) => (
        <Card key={c.id}>
          <CardHeader>
            <div className="relative h-40 w-full overflow-hidden rounded-md">
              <Image src={c.imageUrl} alt={c.title} fill className="object-cover" />
            </div>
            <div className="flex items-center justify-between mt-3">
              <CardTitle className="text-base">{c.title}</CardTitle>
              <Badge variant="secondary">{c.level}</Badge>
            </div>
            <CardDescription>{c.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Duration</span>
              <span className="font-medium">{c.durationWeeks} weeks</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-muted-foreground">Tuition</span>
              <span className="font-medium">AED {c.priceAed.toLocaleString()}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <a href={`/contact?course=${encodeURIComponent(c.slug)}`}>Enroll</a>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}