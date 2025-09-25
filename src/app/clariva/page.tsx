import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClarivaChat } from "@/components/clariva/ClarivaChat";

export const metadata: Metadata = {
  title: "Clariva – Your AI Health Buddy | AiRK",
  description:
    "Clariva™ is a human-centric AI health and clarity assistant. Clear, compassionate, fact-based guidance to help you make wise health decisions.",
};

export default function ClarivaPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Clariva™ — Your AI Health Buddy</CardTitle>
          <CardDescription>
            Clear, compassionate, fact-based guidance. Clariva does not replace professional medical or legal advice.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-muted-foreground list-disc pl-6 space-y-1">
            <li>Clarity over complexity — simple, human explanations</li>
            <li>Truth over assumption — based on facts and best practices</li>
            <li>Empowerment — offers choices so you stay in control</li>
            <li>Privacy & empathy — neutral, respectful tone</li>
            <li>Timeliness — focuses on what matters right now</li>
          </ul>
        </CardContent>
      </Card>

      <ClarivaChat />
    </div>
  );
}