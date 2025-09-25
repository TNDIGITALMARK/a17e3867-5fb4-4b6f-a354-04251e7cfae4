"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  FileText,
  Download,
  Settings,
  Zap,
  CheckCircle,
  Clock,
  Mail,
  Shield,
  AlertTriangle,
  PlusCircle
} from "lucide-react";

interface Document {
  id: string;
  title: string;
  type: string;
  description: string;
  status: "ready" | "generating" | "completed";
  icon: typeof FileText;
  estimatedTime: string;
  color: string;
}

const documentTemplates: Document[] = [
  {
    id: "1",
    title: "Demand Letter",
    type: "Legal Notice",
    description: "Formal demand for action or compensation",
    status: "ready",
    icon: Mail,
    estimatedTime: "2 minutes",
    color: "text-blue-500"
  },
  {
    id: "2",
    title: "Incident Report",
    type: "Documentation",
    description: "Detailed incident documentation",
    status: "ready",
    icon: AlertTriangle,
    estimatedTime: "3 minutes",
    color: "text-yellow-500"
  },
  {
    id: "3",
    title: "Rights Notice",
    type: "Legal Information",
    description: "Know your rights documentation",
    status: "ready",
    icon: Shield,
    estimatedTime: "1 minute",
    color: "text-green-500"
  },
  {
    id: "4",
    title: "Evidence List",
    type: "Case Organization",
    description: "Organized evidence documentation",
    status: "ready",
    icon: FileText,
    estimatedTime: "2 minutes",
    color: "text-purple-500"
  }
];

export function DocumentGenerator() {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customizations, setCustomizations] = useState({
    recipientName: "",
    companyName: "",
    incidentDate: "",
    additionalDetails: ""
  });

  const handleGenerate = async () => {
    if (!selectedDoc) return;

    setIsGenerating(true);

    // Simulate document generation
    setTimeout(() => {
      setIsGenerating(false);
      setSelectedDoc({ ...selectedDoc, status: "completed" });
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-500 bg-green-500/10";
      case "generating": return "text-yellow-500 bg-yellow-500/10";
      default: return "text-blue-500 bg-blue-500/10";
    }
  };

  return (
    <Card className="bg-legal-card-bg border-legal-secondary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-legal-secondary" />
          <CardTitle className="text-legal-text-light">Automated Document Generation</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">
          Generate legal documents instantly with AI assistance
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Document Templates Grid */}
        <div className="grid grid-cols-2 gap-3">
          {documentTemplates.map((doc) => {
            const IconComponent = doc.icon;
            return (
              <Dialog key={doc.id}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-auto p-3 flex flex-col items-start gap-2 border-legal-secondary/20 hover:border-legal-secondary hover:bg-legal-secondary/5"
                    onClick={() => setSelectedDoc(doc)}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <IconComponent className={`w-4 h-4 ${doc.color}`} />
                      <span className="text-sm font-medium text-legal-text-light truncate">
                        {doc.title}
                      </span>
                    </div>
                    <div className="text-left w-full">
                      <Badge variant="secondary" className="text-xs mb-1 bg-legal-secondary/10 text-legal-secondary">
                        {doc.type}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {doc.description}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3 text-legal-secondary" />
                        <span className="text-xs text-legal-secondary">
                          {doc.estimatedTime}
                        </span>
                      </div>
                    </div>
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px] bg-legal-card-bg border-legal-secondary/20">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-legal-text-light">
                      <IconComponent className={`w-5 h-5 ${doc.color}`} />
                      Generate {doc.title}
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                      Customize your {doc.title.toLowerCase()} with specific details for your case.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="recipient" className="text-legal-text-light">Recipient Name</Label>
                      <Input
                        id="recipient"
                        value={customizations.recipientName}
                        onChange={(e) => setCustomizations({
                          ...customizations,
                          recipientName: e.target.value
                        })}
                        placeholder="Enter recipient name"
                        className="bg-legal-secondary/5 border-legal-secondary/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-legal-text-light">Company/Organization</Label>
                      <Input
                        id="company"
                        value={customizations.companyName}
                        onChange={(e) => setCustomizations({
                          ...customizations,
                          companyName: e.target.value
                        })}
                        placeholder="Enter company name"
                        className="bg-legal-secondary/5 border-legal-secondary/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-legal-text-light">Incident Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={customizations.incidentDate}
                        onChange={(e) => setCustomizations({
                          ...customizations,
                          incidentDate: e.target.value
                        })}
                        className="bg-legal-secondary/5 border-legal-secondary/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="details" className="text-legal-text-light">Additional Details</Label>
                      <Textarea
                        id="details"
                        value={customizations.additionalDetails}
                        onChange={(e) => setCustomizations({
                          ...customizations,
                          additionalDetails: e.target.value
                        })}
                        placeholder="Add any specific details..."
                        className="bg-legal-secondary/5 border-legal-secondary/20"
                        rows={3}
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="bg-legal-secondary hover:bg-legal-secondary/80 text-legal-secondary-foreground"
                    >
                      {isGenerating ? (
                        <>
                          <Clock className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Zap className="mr-2 h-4 w-4" />
                          Generate Document
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-legal-secondary text-legal-secondary hover:bg-legal-secondary hover:text-legal-secondary-foreground"
          >
            <PlusCircle className="w-3 h-3 mr-1" />
            Custom Template
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-legal-secondary text-legal-secondary hover:bg-legal-secondary hover:text-legal-secondary-foreground"
          >
            <Download className="w-3 h-3 mr-1" />
            Download All
          </Button>
        </div>

        {/* Generated Documents Preview */}
        <div className="pt-2 border-t border-legal-secondary/20">
          <h4 className="text-sm font-medium text-legal-text-light mb-2">Recent Documents</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 bg-legal-secondary/5 rounded">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-legal-text-light flex-1">Rights Notice - Generated</span>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Download className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}