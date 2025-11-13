
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileUp, ScanLine, FolderOpen, BookText, ChevronRight } from "lucide-react";

type Subject = {
  name: string;
  formUrl: string;
  driveUrl: string;
};

const subjects: Subject[] = [
  { name: 'Physics', formUrl: 'https://stage-n8n.10minuteschool.com/form/60c33afc-a5c8-4dac-b94c-0db4da3d6bbc', driveUrl: 'https://drive.google.com/drive/folders/1VwKPCcckg3EnHDyeIKrbhss629wzLIT4' },
  { name: 'Chemistry', formUrl: 'https://stage-n8n.10minuteschool.com/form/3fc4d21a-3299-46a1-b947-2b8cd744ccc4', driveUrl: 'https://drive.google.com/drive/folders/10xxGJLD6bZizQhmqJp4zeE0LPalgAbTJ' },
  { name: 'Math', formUrl: 'https://stage-n8n.10minuteschool.com/form/a8969775-0788-47ae-b236-058b1b0c841f', driveUrl: 'https://drive.google.com/drive/folders/1tb2EI68rq3qWUPa3eLUqsvjTzI94BuNl' },
  { name: 'Biology', formUrl: 'https://stage-n8n.10minuteschool.com/form/541e701f-507d-4d82-9080-3fa1f5fb9fb3', driveUrl: 'https://drive.google.com/drive/folders/1omKchck0lRHoi1bxzhcjVgOwSz3Sh_Rt' },
  { name: 'BEI', formUrl: 'https://stage-n8n.10minuteschool.com/form/52def22b-9d57-41b4-b5e6-0bcdcea5d3e1', driveUrl: 'https://drive.google.com/drive/folders/1fc8BheEFALeDFIBuFqrpy-_dKUM6rrm4' },
];

const SINGLE_PAGE_OCR_URL = 'https://advanced-ocr-tool-omega.vercel.app/';
const MCQ_FORMATION_URL = 'https://sojibseucse62.github.io/pptx-doc-to-quiz-format/';

const TOTAL_TIME = 150; // Original: 2.5 minutes in seconds
// const TOTAL_TIME = 10; // Test time: 10 seconds

export default function Home() {
  const [timerState, setTimerState] = useState<'idle' | 'selectingSubject' | 'running' | 'finished'>('idle');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
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
    setTimerState('selectingSubject');
  };

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
    window.open(subject.formUrl, '_blank', 'noopener,noreferrer');
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

  const renderContent = () => {
    switch (timerState) {
      case 'idle':
        return (
          <div className="animate-fade-in text-center">
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
        );

      case 'selectingSubject':
        return (
          <div className="animate-fade-in text-center w-full max-w-md">
            <h2 className="text-3xl font-bold text-primary mb-8">
              Choose Your Subject
            </h2>
            <div className="flex flex-col gap-4">
              {subjects.map((subject) => (
                <Button
                  key={subject.name}
                  size="lg"
                  variant="outline"
                  className="w-full justify-between hover:bg-accent/50"
                  onClick={() => handleSubjectSelect(subject)}
                >
                  <span>{subject.name}</span>
                  <ChevronRight className="h-5 w-5" />
                </Button>
              ))}
            </div>
          </div>
        );

      case 'running':
        return (
          <div className="w-full max-w-md animate-fade-in space-y-6 text-center">
             <h2 className="text-3xl font-bold text-primary">Processing: {selectedSubject?.name}</h2>
             <p className="text-muted-foreground">Please keep this page open. Your results will be available shortly.</p>
            <div className="space-y-3">
              <Progress value={progress} className="h-4" />
              <div className="flex justify-between text-lg font-mono font-semibold text-accent">
                <span>Time Remaining</span>
                <span>{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>
        );

      case 'finished':
        return (
          <div className="animate-fade-in text-center">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Find your OCRed file here
            </h2>
            <p className="text-muted-foreground mb-8">Your {selectedSubject?.name} file has been processed. You can now access the results.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {selectedSubject && (
                <Button size="lg" onClick={() => handleOpenLink(selectedSubject.driveUrl)}>
                  <FolderOpen className="mr-2 h-5 w-5" />
                  Open {selectedSubject.name} Folder
                </Button>
              )}
              <Button size="lg" variant="secondary" onClick={() => handleOpenLink(MCQ_FORMATION_URL)}>
                <BookText className="mr-2 h-5 w-5" />
                360 MCQ Formation
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
      <div className="flex flex-col items-center justify-center w-full max-w-2xl">
        {renderContent()}
      </div>
    </main>
  );
}
