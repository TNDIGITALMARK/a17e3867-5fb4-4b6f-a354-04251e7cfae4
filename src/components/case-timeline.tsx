"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Timeline,
  CheckCircle,
  Circle,
  Clock,
  AlertCircle,
  Upload,
  FileText,
  MessageSquare,
  Calendar,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: "upload" | "document" | "meeting" | "deadline" | "milestone";
  status: "completed" | "current" | "upcoming" | "overdue";
  importance: "low" | "medium" | "high";
}

const timelineEvents: TimelineEvent[] = [
  {
    id: "1",
    title: "Incident Report Uploaded",
    description: "Initial incident documentation uploaded to case file",
    date: "2024-01-15",
    time: "10:30 AM",
    type: "upload",
    status: "completed",
    importance: "high"
  },
  {
    id: "2",
    title: "Photo Evidence Added",
    description: "Workplace photos and documentation uploaded",
    date: "2024-01-16",
    time: "2:15 PM",
    type: "upload",
    status: "completed",
    importance: "medium"
  },
  {
    id: "3",
    title: "Witness Statement Recorded",
    description: "Audio recording of witness testimony",
    date: "2024-01-18",
    time: "11:00 AM",
    type: "document",
    status: "completed",
    importance: "high"
  },
  {
    id: "4",
    title: "Legal Consultation Scheduled",
    description: "Meeting with employment attorney scheduled",
    date: "2024-01-28",
    time: "3:00 PM",
    type: "meeting",
    status: "current",
    importance: "high"
  },
  {
    id: "5",
    title: "File Formal Complaint",
    description: "Submit complaint to HR department",
    date: "2024-02-05",
    time: "9:00 AM",
    type: "deadline",
    status: "upcoming",
    importance: "high"
  },
  {
    id: "6",
    title: "Case Review Milestone",
    description: "Complete case evidence review",
    date: "2024-02-15",
    time: "5:00 PM",
    type: "milestone",
    status: "upcoming",
    importance: "medium"
  }
];

export function CaseTimeline() {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "upload": return Upload;
      case "document": return FileText;
      case "meeting": return MessageSquare;
      case "deadline": return AlertCircle;
      case "milestone": return CheckCircle;
      default: return Circle;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return CheckCircle;
      case "current": return Clock;
      case "overdue": return AlertCircle;
      default: return Circle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-500";
      case "current": return "text-legal-secondary animate-pulse";
      case "overdue": return "text-red-500";
      case "upcoming": return "text-muted-foreground";
      default: return "text-gray-400";
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "high": return "bg-red-500/10 text-red-500";
      case "medium": return "bg-yellow-500/10 text-yellow-500";
      case "low": return "bg-green-500/10 text-green-500";
      default: return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <Card className="bg-legal-card-bg border-legal-secondary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Timeline className="w-5 h-5 text-legal-secondary" />
            <CardTitle className="text-legal-text-light">Case Timeline</CardTitle>
          </div>
          <Button variant="outline" size="sm" className="border-legal-secondary text-legal-secondary hover:bg-legal-secondary hover:text-legal-secondary-foreground">
            <Plus className="w-3 h-3 mr-1" />
            Add Event
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {timelineEvents.map((event, index) => {
            const EventIcon = getEventIcon(event.type);
            const StatusIcon = getStatusIcon(event.status);

            return (
              <div key={event.id} className="relative">
                {/* Timeline line */}
                {index < timelineEvents.length - 1 && (
                  <div className="absolute left-4 top-10 w-px h-16 bg-legal-secondary/20" />
                )}

                <div className="flex gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className={cn(
                      "w-8 h-8 rounded-full border-2 flex items-center justify-center",
                      event.status === "completed"
                        ? "bg-green-500/10 border-green-500"
                        : event.status === "current"
                        ? "bg-legal-secondary/10 border-legal-secondary"
                        : event.status === "overdue"
                        ? "bg-red-500/10 border-red-500"
                        : "bg-gray-500/10 border-gray-300"
                    )}>
                      <StatusIcon className={cn("w-4 h-4", getStatusColor(event.status))} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={cn(
                    "flex-1 pb-8 p-3 rounded-lg transition-colors",
                    event.status === "current" ? "bg-legal-secondary/5" : "bg-legal-secondary/[0.02]"
                  )}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <EventIcon className="w-4 h-4 text-legal-secondary" />
                          <h4 className="text-sm font-medium text-legal-text-light">
                            {event.title}
                          </h4>
                          <Badge className={cn("text-xs px-1.5 py-0.5", getImportanceColor(event.importance))}>
                            {event.importance}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {event.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{event.time}</span>
                      </div>
                      <Badge variant="outline" className="text-xs px-1.5 py-0.5 bg-legal-secondary/5 text-legal-secondary border-legal-secondary/20 capitalize">
                        {event.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}