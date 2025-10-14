"use client";

import { Button } from "@/components/ui/button";
import { FileUp, ScanLine } from "lucide-react";

// This is the URL for your n8n form.
const N8N_FORM_URL = 'https://stage-n8n.10minuteschool.com/form/d899018a-7eea-4aea-8230-16834de918cc';
const SINGLE_PAGE_OCR_URL = 'https://advanced-ocr-tool-omega.vercel.app/';

export default function Home() {
  const handleStartProcess = () => {
    window.open(N8N_FORM_URL, '_blank', 'noopener,noreferrer');
  };

  const handleSinglePageOcr = () => {
    window.open(SINGLE_PAGE_OCR_URL, '_blank', 'noopener,noreferrer');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="flex flex-col items-center justify-center w-full max-w-2xl text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
            OCR Workflow Pro
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Click a button below to begin an automated OCR process.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            className="shadow-lg hover:shadow-xl transition-shadow"
            onClick={handleStartProcess}
          >
            <FileUp className="mr-2 h-5 w-5" />
            Start OCR Process
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="shadow-lg hover:shadow-xl transition-shadow"
            onClick={handleSinglePageOcr}
          >
            <ScanLine className="mr-2 h-5 w-5" />
            Single Page OCR
          </Button>
        </div>

        <p className="mt-12 text-sm text-muted-foreground">
          You will be redirected to our secure portal to complete your task.
        </p>
      </div>
    </main>
  );
}
