"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Download,
  Eye,
  FileText,
  Mail,
  Scale,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Document {
  id: string;
  title: string;
  type: string;
  description: string;
  status: "draft" | "completed" | "pending_review" | "approved";
  createdDate: string;
  lastModified: string;
  size: string;
  version: string;
  importance: "low" | "medium" | "high" | "critical";
  icon: typeof FileText;
  color: string;
}

const documents: Document[] = [
  {
    id: "1",
    title: "Formal Complaint Letter",
    type: "Legal Document",
    description: "Official complaint to HR department",
    status: "completed",
    createdDate: "2024-01-20",
    lastModified: "2024-01-22",
    size: "142 KB",
    version: "v2.1",
    importance: "critical",
    icon: Mail,
    color: "text-red-500"
  },
  {
    id: "2",
    title: "Rights Notice Documentation",
    type: "Information",
    description: "Your legal rights summary",
    status: "approved",
    createdDate: "2024-01-18",
    lastModified: "2024-01-18",
    size: "89 KB",
    version: "v1.0",
    importance: "high",
    icon: Shield,
    color: "text-green-500"
  },
  {
    id: "3",
    title: "Evidence Summary Report",
    type: "Case Documentation",
    description: "Comprehensive evidence analysis",
    status: "pending_review",
    createdDate: "2024-01-25",
    lastModified: "2024-01-26",
    size: "256 KB",
    version: "v1.3",
    importance: "high",
    icon: FileText,
    color: "text-blue-500"
  },
  {
    id: "4",
    title: "Demand for Action Letter",
    type: "Legal Notice",
    description: "Formal demand for resolution",
    status: "draft",
    createdDate: "2024-01-28",
    lastModified: "2024-01-28",
    size: "67 KB",
    version: "v0.8",
    importance: "high",
    icon: AlertTriangle,
    color: "text-yellow-500"
  },
  {
    id: "5",
    title: "Legal Consultation Notes",
    type: "Meeting Notes",
    description: "Attorney consultation summary",
    status: "completed",
    createdDate: "2024-01-28",
    lastModified: "2024-01-28",
    size: "45 KB",
    version: "v1.0",
    importance: "medium",
    icon: Scale,
    color: "text-purple-500"
  }
];

export function DocumentLibrary() {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500/10 text-green-500";
      case "approved": return "bg-blue-500/10 text-blue-500";
      case "pending_review": return "bg-yellow-500/10 text-yellow-500";
      case "draft": return "bg-gray-500/10 text-gray-500";
      default: return "bg-gray-500/10 text-gray-500";
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "critical": return "bg-red-500/10 text-red-500";
      case "high": return "bg-orange-500/10 text-orange-500";
      case "medium": return "bg-yellow-500/10 text-yellow-500";
      case "low": return "bg-green-500/10 text-green-500";
      default: return "bg-gray-500/10 text-gray-500";
    }
  };

  const formatStatus = (status: string) => {
    return status.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <Card className="bg-legal-card-bg border-legal-secondary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-legal-secondary" />
            <CardTitle className="text-legal-text-light">Document Library</CardTitle>
          </div>
          <Badge variant="secondary" className="bg-legal-secondary/10 text-legal-secondary">
            {documents.length} docs
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {documents.map((doc) => {
            const IconComponent = doc.icon;

            return (
              <div
                key={doc.id}
                className="p-3 bg-legal-secondary/5 rounded-lg hover:bg-legal-secondary/10 transition-colors border border-legal-secondary/10"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-legal-secondary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className={cn("w-5 h-5", doc.color)} />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-medium text-legal-text-light truncate">
                        {doc.title}
                      </h4>
                      <Badge className={cn("text-xs px-1.5 py-0.5", getImportanceColor(doc.importance))}>
                        {doc.importance}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={cn("text-xs px-1.5 py-0.5", getStatusColor(doc.status))}>
                        {formatStatus(doc.status)}
                      </Badge>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{doc.type}</span>
                    </div>

                    <p className="text-xs text-muted-foreground mb-2">
                      {doc.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>{doc.version}</span>
                      <span>•</span>
                      <span>Modified {new Date(doc.lastModified).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-legal-secondary/20 mt-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-legal-secondary text-legal-secondary hover:bg-legal-secondary hover:text-legal-secondary-foreground"
            >
              <FileText className="w-3 h-3 mr-1" />
              New Document
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-legal-secondary text-legal-secondary hover:bg-legal-secondary hover:text-legal-secondary-foreground"
            >
              <Download className="w-3 h-3 mr-1" />
              Export All
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}