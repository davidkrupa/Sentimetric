"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { getAiResponse } from "@/lib/openai";
import { ShadcnInputForm } from "@/components/ShadcnInputForm";

const page = () => {
  const [text, setText] = useState("");

  const handleGenerateAnalysis = async () => {
    const response = await fetch("/api/openai", {
      method: "POST",
      body: JSON.stringify(text),
    });

    const data = await response.json();

    console.log(`GPT: ${data}`);
  };

  return (
    <div className="flex gap-3 text-white">
      <div className="flex flex-col flex-1 gap-3">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your text here"
        />
        <Button onClick={() => handleGenerateAnalysis()}>
          Generate Analysis
        </Button>
      </div>

      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>

      <ShadcnInputForm />
    </div>
  );
};

export default page;
