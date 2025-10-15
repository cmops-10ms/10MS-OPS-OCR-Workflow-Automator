
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileUp, ScanLine, FolderOpen, BookText } from "lucide-react";

const N8N_FORM_URL = 'https://stage-n8n.10minuteschool.com/form/d899018a-7eea-4aea-8230-16834de918cc';
const SINGLE_PAGE_OCR_URL = 'https://advanced-ocr-tool-omega.vercel.app/';
const GOOGLE_DRIVE_URL = 'https://drive.google.com/drive/folders/1eG6eECy0ky0drrf8YUUqqmra5dVoKsqs?usp=sharing';
const MCQ_FORMATION_URL = 'https://sojibseucse62.github.io/pptx-doc-to-quiz-format/';

const TOTAL_TIME = 150; // 2.5 minutes in seconds

export default function Home() {
  const [timerState, setTimerState] = useState<'idle' | 'running' | 'finished'>('idle');
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  useEffect(() => {
    if (timerState !== 'running') return;

    if (timeLeft <= 0) {
      setTimerState('finished');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timerState, timeLeft]);

  const handleStartProcess = () => {
    window.open(N8N_FORM_URL, '_blank', 'noopener,noreferrer');
    setTimerState('running');
  };

  const handleSinglePageOcr = () => {
    window.open(SINGLE_PAGE_OCR_URL, '_blank', 'noopener,noreferrer');
  };

  const handleOpenLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const progress = ((TOTAL_TIME - timeLeft) / TOTAL_TIME) * 100;

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-background p-8 transition-all duration-500">
      <header className="absolute top-8 left-8 text-left">
        <h1 className="text-xl font-bold text-foreground">10 Minute School</h1>
        <p className="text-md text-muted-foreground">Content Operations</p>
      </header>
      <div className="absolute top-8 right-8">
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
        >
          HOME
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center w-full max-w-2xl text-center">
        {timerState === 'idle' && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
                OCR Workflow Pro
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Click a button below to begin an automated OCR process.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        )}

        {timerState === 'running' && (
          <div className="w-full max-w-md animate-fade-in space-y-6">
             <h2 className="text-3xl font-bold text-primary">Processing your file...</h2>
             <p className="text-muted-foreground">Please keep this page open. Your results will be available shortly.</p>
            <div className="space-y-3">
              <Progress value={progress} className="h-4" />
              <div className="flex justify-between text-lg font-mono font-semibold text-accent">
                <span>Time Remaining</span>
                <span>{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>
        )}

        {timerState === 'finished' && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Find your OCRed file here
            </h2>
            <p className="text-muted-foreground mb-8">Your file has been processed. You can now access the results.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => handleOpenLink(GOOGLE_DRIVE_URL)}>
                <FolderOpen className="mr-2 h-5 w-5" />
                Open Google Drive Folder
              </Button>
              <Button size="lg" variant="secondary" onClick={() => handleOpenLink(MCQ_FORMATION_URL)}>
                <BookText className="mr-2 h-5 w-5" />
                360 MCQ Formation
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
