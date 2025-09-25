"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  CheckCircle,
  Circle,
  Clock,
  AlertCircle,
  Calendar,
  Target,
  Award,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressStep {
  id: string;
  title: string;
  description: string;
  status: "completed" | "current" | "pending" | "blocked";
  dueDate?: string;
  completedDate?: string;
  priority: "low" | "medium" | "high";
}

interface CaseProgress {
  currentStep: number;
  totalSteps: number;
  overallProgress: number;
  nextMilestone: string;
  estimatedCompletion: string;
}

const mockProgressData: CaseProgress = {
  currentStep: 3,
  totalSteps: 6,
  overallProgress: 50,
  nextMilestone: "File formal complaint",
  estimatedCompletion: "2024-02-15"
};

const progressSteps: ProgressStep[] = [
  {
    id: "1",
    title: "Initial Assessment",
    description: "AI case analysis completed",
    status: "completed",
    completedDate: "2024-01-10",
    priority: "high"
  },
  {
    id: "2",
    title: "Evidence Collection",
    description: "Gather supporting documents",
    status: "completed",
    completedDate: "2024-01-15",
    priority: "high"
  },
  {
    id: "3",
    title: "Documentation Review",
    description: "Organize and review evidence",
    status: "current",
    priority: "medium"
  },
  {
    id: "4",
    title: "Legal Strategy",
    description: "Develop case strategy",
    status: "pending",
    dueDate: "2024-02-01",
    priority: "high"
  },
  {
    id: "5",
    title: "File Complaint",
    description: "Submit formal complaint",
    status: "pending",
    dueDate: "2024-02-15",
    priority: "high"
  },
  {
    id: "6",
    title: "Case Resolution",
    description: "Achieve case outcome",
    status: "pending",
    priority: "medium"
  }
];

export function ProgressTracker() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "current":
        return <Clock className="w-4 h-4 text-legal-secondary animate-pulse" />;
      case "blocked":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/10 text-red-500";
      case "medium": return "bg-yellow-500/10 text-yellow-500";
      case "low": return "bg-green-500/10 text-green-500";
      default: return "bg-gray-500/10 text-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500/10 text-green-500";
      case "current": return "bg-legal-secondary/10 text-legal-secondary";
      case "blocked": return "bg-red-500/10 text-red-500";
      default: return "bg-gray-500/10 text-gray-400";
    }
  };

  return (
    <Card className="bg-legal-card-bg border-legal-secondary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-legal-secondary" />
          <CardTitle className="text-legal-text-light">Case Progress Timeline</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">
          Track your case progress and upcoming milestones
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-3 p-4 bg-legal-secondary/5 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-sm font-medium text-legal-text-light">Overall Progress</h4>
              <p className="text-xs text-muted-foreground">
                Step {mockProgressData.currentStep} of {mockProgressData.totalSteps}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-legal-secondary">
                {mockProgressData.overallProgress}%
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Target className="w-3 h-3" />
                <span>{mockProgressData.estimatedCompletion}</span>
              </div>
            </div>
          </div>

          <Progress
            value={mockProgressData.overallProgress}
            className="h-2"
          />

          <div className="flex items-center gap-2 text-sm">
            <Award className="w-4 h-4 text-legal-secondary" />
            <span className="text-legal-text-light">Next Milestone:</span>
            <span className="text-legal-secondary font-medium">
              {mockProgressData.nextMilestone}
            </span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-legal-text-light">Timeline Steps</h4>

          <div className="space-y-3 max-h-48 overflow-y-auto">
            {progressSteps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Connecting Line */}
                {index < progressSteps.length - 1 && (
                  <div className="absolute left-2 top-8 w-px h-6 bg-legal-secondary/20" />
                )}

                <div className={cn(
                  "flex items-start gap-3 p-3 rounded-lg transition-colors",
                  step.status === "current" ? "bg-legal-secondary/10" : "bg-legal-secondary/5"
                )}>
                  <div className="flex-shrink-0 mt-0.5">
                    {getStatusIcon(step.status)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="text-sm font-medium text-legal-text-light">
                        {step.title}
                      </h5>
                      <Badge className={cn("text-xs px-1.5 py-0.5", getPriorityColor(step.priority))}>
                        {step.priority}
                      </Badge>
                      <Badge className={cn("text-xs px-1.5 py-0.5", getStatusColor(step.status))}>
                        {step.status}
                      </Badge>
                    </div>

                    <p className="text-xs text-muted-foreground mb-2">
                      {step.description}
                    </p>

                    {(step.dueDate || step.completedDate) && (
                      <div className="flex items-center gap-1 text-xs">
                        <Calendar className="w-3 h-3 text-legal-secondary" />
                        {step.completedDate ? (
                          <span className="text-green-500">
                            Completed: {new Date(step.completedDate).toLocaleDateString()}
                          </span>
                        ) : step.dueDate ? (
                          <span className="text-legal-secondary">
                            Due: {new Date(step.dueDate).toLocaleDateString()}
                          </span>
                        ) : null}
                      </div>
                    )}
                  </div>

                  {step.status === "current" && (
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-legal-secondary text-legal-secondary hover:bg-legal-secondary hover:text-legal-secondary-foreground"
          >
            <Calendar className="w-3 h-3 mr-1" />
            Schedule
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-legal-secondary text-legal-secondary hover:bg-legal-secondary hover:text-legal-secondary-foreground"
          >
            <TrendingUp className="w-3 h-3 mr-1" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}