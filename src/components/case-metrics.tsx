"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Image,
  Video,
  Mic,
  TrendingUp,
  Clock,
  Target,
  AlertCircle
} from "lucide-react";

interface MetricCard {
  title: string;
  value: string | number;
  icon: typeof FileText;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  color: string;
}

const metrics: MetricCard[] = [
  {
    title: "Total Evidence Items",
    value: 23,
    icon: FileText,
    change: "+3 this week",
    changeType: "positive",
    color: "text-blue-500"
  },
  {
    title: "Documents",
    value: 8,
    icon: FileText,
    color: "text-green-500"
  },
  {
    title: "Photos & Images",
    value: 12,
    icon: Image,
    color: "text-purple-500"
  },
  {
    title: "Audio Recordings",
    value: 3,
    icon: Mic,
    color: "text-yellow-500"
  },
  {
    title: "Case Strength",
    value: "78%",
    icon: TrendingUp,
    change: "+5% improvement",
    changeType: "positive",
    color: "text-legal-secondary"
  },
  {
    title: "Days Active",
    value: 42,
    icon: Clock,
    color: "text-orange-500"
  },
  {
    title: "Milestones Completed",
    value: "3/6",
    icon: Target,
    color: "text-indigo-500"
  },
  {
    title: "Priority Actions",
    value: 2,
    icon: AlertCircle,
    change: "Urgent",
    changeType: "negative",
    color: "text-red-500"
  }
];

export function CaseMetrics() {
  const getChangeColor = (type?: string) => {
    switch (type) {
      case "positive": return "text-green-500";
      case "negative": return "text-red-500";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const IconComponent = metric.icon;

        return (
          <Card key={index} className="bg-legal-card-bg border-legal-secondary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-legal-secondary/10`}>
                  <IconComponent className={`w-4 h-4 ${metric.color}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground truncate">
                    {metric.title}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <p className="text-lg font-semibold text-legal-text-light">
                      {metric.value}
                    </p>
                    {metric.change && (
                      <p className={`text-xs ${getChangeColor(metric.changeType)}`}>
                        {metric.change}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}