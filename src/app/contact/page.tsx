"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ContactPage() {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    alert(`Thanks! We received your inquiry, ${data.name}. We'll get back to you shortly.`);
    e.currentTarget.reset();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Contact & Enrollment</h1>
        <p className="text-muted-foreground mt-2">Visit us in Abu Dhabi or send an inquiry to enroll in upcoming cohorts.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
            <CardDescription>Find our campus on the map</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-72 overflow-hidden rounded-md">
              <iframe
                title="Abu Dhabi Map"
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Abu%20Dhabi&z=12&output=embed"
              />
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Al Maryah Island, Abu Dhabi • Sun–Thu 9:00–18:00 • +971 2 123 4567
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enrollment Form</CardTitle>
            <CardDescription>We'll respond within 1 business day</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" name="name" placeholder="Your name" required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" placeholder="+971 ..." />
                </div>
                <div>
                  <Label>Interested program</Label>
                  <Select name="program">
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ai-foundations">AI Foundations</SelectItem>
                      <SelectItem value="ml-engineer">Machine Learning Engineer</SelectItem>
                      <SelectItem value="deep-learning-pytorch">Deep Learning with PyTorch</SelectItem>
                      <SelectItem value="genai-llms">Generative AI & LLMs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" placeholder="Tell us about your goals..." rows={4} />
              </div>
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}