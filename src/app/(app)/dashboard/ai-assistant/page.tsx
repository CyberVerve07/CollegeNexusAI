"use client";

import { useState } from "react";
import { summarizeNotes } from "@/ai/flows/ai-summarize-notes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Loader2, Sparkles } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AiAssistantPage() {
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSummarize = async () => {
    if (!notes.trim()) {
      setError("Please enter some notes to summarize.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setSummary("");
    try {
      const result = await summarizeNotes({ notes });
      setSummary(result.summary);
    } catch (e) {
      console.error(e);
      setError("An error occurred while summarizing the notes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center">
        <Bot className="mx-auto h-12 w-12 text-primary" />
        <h1 className="text-3xl font-bold font-headline mt-4">AI Assistant</h1>
        <p className="text-muted-foreground mt-2">
          Get help with your studies. Summarize notes, get explanations, and solve doubts.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Note Summarizer</CardTitle>
          <CardDescription>
            Paste your notes below and the AI will generate a concise summary for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your lecture notes, a chapter from a book, or any text here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={10}
            className="text-base"
          />
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button onClick={handleSummarize} disabled={isLoading} className="w-full md:w-auto">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Summarizing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Summary
              </>
            )}
          </Button>
        </CardContent>
      </Card>
      
      {summary && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="text-accent" />
              AI Generated Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none text-foreground">
                {summary.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
