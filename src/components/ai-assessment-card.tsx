"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, ArrowRight, Scale, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssessmentResult {
  caseStrength: number;
  violationType: string;
  recommendedActions: string[];
  riskLevel: "low" | "medium" | "high";
  estimatedTimeline: string;
}

const mockAssessmentData: AssessmentResult = {
  caseStrength: 78,
  violationType: "Workplace Discrimination",
  recommendedActions: [
    "Document all incidents with dates",
    "Collect witness statements",
    "File formal complaint with HR",
    "Consult employment attorney"
  ],
  riskLevel: "medium",
  estimatedTimeline: "3-6 months"
};

export function AIAssessmentCard() {
  const [isAssessing, setIsAssessing] = useState(false);
  const [hasAssessment, setHasAssessment] = useState(false);
  const [assessment, setAssessment] = useState<AssessmentResult | null>(null);

  const handleStartAssessment = () => {
    setIsAssessing(true);
    // Simulate AI assessment process
    setTimeout(() => {
      setAssessment(mockAssessmentData);
      setHasAssessment(true);
      setIsAssessing(false);
    }, 3000);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "text-green-500";
      case "medium": return "text-yellow-500";
      case "high": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  const getProgressColor = (strength: number) => {
    if (strength >= 70) return "bg-green-500";
    if (strength >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="h-full bg-legal-card-bg border-legal-secondary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-legal-secondary" />
          <CardTitle className="text-legal-text-light">AI Case Assessment</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">
          Get instant analysis of your legal rights violation case
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {!hasAssessment && !isAssessing && (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-legal-secondary/10 rounded-full flex items-center justify-center">
              <Scale className="w-8 h-8 text-legal-secondary" />
            </div>
            <p className="text-sm text-muted-foreground">
              Our AI will analyze your case details and provide a comprehensive assessment
            </p>
            <Button
              onClick={handleStartAssessment}
              className="w-full bg-legal-secondary hover:bg-legal-secondary/80 text-legal-secondary-foreground"
            >
              Start AI Assessment
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        )}

        {isAssessing && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-legal-secondary/10 rounded-full flex items-center justify-center animate-pulse">
                <Brain className="w-8 h-8 text-legal-secondary animate-spin" />
              </div>
              <p className="text-sm font-medium text-legal-text-light">Analyzing your case...</p>
              <p className="text-xs text-muted-foreground mt-1">This may take a few moments</p>
            </div>
            <Progress value={33} className="animate-pulse" />
          </div>
        )}

        {hasAssessment && assessment && (
          <div className="space-y-6">
            {/* Case Strength Meter */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-legal-text-light">Case Strength</span>
                <span className="text-2xl font-bold text-legal-secondary">{assessment.caseStrength}%</span>
              </div>
              <div className="relative">
                <Progress
                  value={assessment.caseStrength}
                  className="h-3"
                />
                <div
                  className={cn(
                    "absolute inset-y-0 left-0 h-3 rounded-full transition-all",
                    getProgressColor(assessment.caseStrength)
                  )}
                  style={{ width: `${assessment.caseStrength}%` }}
                />
              </div>
            </div>

            {/* Violation Type */}
            <div className="space-y-2">
              <span className="text-sm font-medium text-legal-text-light">Violation Type</span>
              <Badge variant="secondary" className="bg-legal-secondary/20 text-legal-secondary">
                {assessment.violationType}
              </Badge>
            </div>

            {/* Risk Level */}
            <div className="flex items-center gap-2">
              <AlertTriangle className={cn("w-4 h-4", getRiskColor(assessment.riskLevel))} />
              <span className="text-sm text-legal-text-light">Risk Level: </span>
              <span className={cn("text-sm font-medium capitalize", getRiskColor(assessment.riskLevel))}>
                {assessment.riskLevel}
              </span>
            </div>

            {/* Recommended Actions */}
            <div className="space-y-3">
              <span className="text-sm font-medium text-legal-text-light">Recommended Actions</span>
              <div className="space-y-2">
                {assessment.recommendedActions.slice(0, 3).map((action, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-legal-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="p-3 bg-legal-secondary/10 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-legal-text-light">Estimated Timeline</span>
                <span className="text-sm font-medium text-legal-secondary">{assessment.estimatedTimeline}</span>
              </div>
            </div>

            <Button variant="outline" className="w-full border-legal-secondary text-legal-secondary hover:bg-legal-secondary hover:text-legal-secondary-foreground">
              View Detailed Report
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}