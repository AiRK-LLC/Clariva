"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sparkles, Send, Wand2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// Lightweight client-only demo chat following Clariva principles
export const ClarivaChat = () => {
  const [messages, setMessages] = useState<Message[]>([{
    id: "m1",
    role: "assistant",
    content:
      "Hi, I’m Clariva. Briefly tell me what’s going on (symptoms, concern, or decision). I’ll clarify, simplify, and offer safe next steps. I don’t replace a professional—when needed, I’ll suggest seeing one.",
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const enhancePrompt = () => {
    if (!input.trim()) return;
    const enhanced = `Context: Health guidance request.\nUser intent (guess): clarify situation and options.\nConstraints: fact-based, compassionate, simple language.\nTask: ${input}`;
    setInput(enhanced);
  };

  const framework = useMemo(() => (
    <div className="text-xs text-muted-foreground">
      <div className="font-medium mb-1">Response framework Clariva follows:</div>
      <ol className="list-decimal pl-5 space-y-0.5">
        <li>Clarify context</li>
        <li>Simplify information</li>
        <li>Guide decision (2–3 options)</li>
        <li>Empower action (clear takeaway)</li>
        <li>Safety reminder (when appropriate)</li>
      </ol>
    </div>
  ), []);

  const onSend = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    // Simulated assistant reply (no backend). Applies Clariva framework.
    setTimeout(() => {
      const reply: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: [
          `Context: You asked — "${userMsg.content.slice(0, 160)}"`,
          "\nWhat this likely means: you're seeking clarity and safe options.",
          "\nOptions:",
          "• Option A: Simple step you can do now (track symptoms, hydrate, rest).",
          "• Option B: Use a trusted source to compare causes and red flags.",
          "• Option C: If severe, new, or persistent — consult a licensed professional.",
          "\nTakeaway: You have safe choices. Start with A, escalate to C if red flags.",
          "\nReminder: I don’t replace medical or legal professionals.",
        ].join(" "),
      };
      setMessages((m) => [...m, reply]);
      setLoading(false);
    }, 700);
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex flex-col h-[70vh] max-h-[720px]">
          <div className="p-4 flex items-center gap-2 border-b bg-secondary/40">
            <Sparkles className="h-4 w-4 text-primary" />
            <div className="text-sm font-medium">Clariva Chat</div>
            <Badge variant="secondary" className="ml-auto">Demo</Badge>
          </div>

          <div ref={listRef} className="flex-1 overflow-auto p-4 space-y-3">
            {messages.map((m) => (
              <div key={m.id} className={m.role === "assistant" ? "max-w-[85%]" : "ml-auto max-w-[85%]"}>
                <div className={
                  "whitespace-pre-wrap rounded-lg border p-3 text-sm " +
                  (m.role === "assistant" ? "bg-card" : "bg-primary text-primary-foreground")
                }>
                  {m.content}
                </div>
              </div>
            ))}
            {framework}
          </div>

          <Separator />

          <div className="p-3 grid gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your situation in a sentence or two…"
              className="min-h-28"
            />
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" onClick={enhancePrompt} disabled={!input.trim()}>
                <Wand2 className="h-4 w-4 mr-1" /> Enhance prompt
              </Button>
              <Button type="button" onClick={onSend} disabled={loading || !input.trim()} className="ml-auto">
                <Send className="h-4 w-4 mr-1" /> {loading ? "Sending…" : "Send"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};