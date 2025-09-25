"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export const LmsShell = () => {
  const [tab, setTab] = useState("catalog");

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">AiRK LMS</h1>
        <p className="text-muted-foreground max-w-2xl">Simple, modern learning experience. Browse courses, track your progress, and access certifications.</p>
      </header>

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList>
          <TabsTrigger value="catalog">Catalog</TabsTrigger>
          <TabsTrigger value="progress">My Progress</TabsTrigger>
          <TabsTrigger value="certs">Certifications</TabsTrigger>
        </TabsList>

        <TabsContent value="catalog" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Catalog</CardTitle>
              <CardDescription>Explore available programs and enroll.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Integrated catalog coming soon. Visit the Courses page to explore offerings.
              </div>
              <Button className="mt-4" asChild>
                <a href="/courses">Browse Courses</a>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
              <CardDescription>Your enrolled courses and milestones.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Sign in experience coming soon. Your progress will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certs" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
              <CardDescription>View and download earned certificates.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Once you complete a course, certificates will be listed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LmsShell;