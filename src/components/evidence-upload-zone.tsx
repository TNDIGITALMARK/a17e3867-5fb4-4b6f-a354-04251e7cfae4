"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  FileText,
  Image,
  Video,
  Mic,
  X,
  Eye,
  Download,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EvidenceFile {
  id: string;
  name: string;
  type: "document" | "image" | "video" | "audio";
  size: string;
  uploadProgress?: number;
  status: "uploading" | "processing" | "completed" | "error";
  aiAnalysis?: string;
}

const mockEvidenceFiles: EvidenceFile[] = [
  {
    id: "1",
    name: "incident_report_01.pdf",
    type: "document",
    size: "2.4 MB",
    status: "completed",
    aiAnalysis: "Document contains incident details with timestamps"
  },
  {
    id: "2",
    name: "photo_evidence.jpg",
    type: "image",
    size: "1.8 MB",
    status: "completed",
    aiAnalysis: "Image shows workplace conditions clearly"
  },
  {
    id: "3",
    name: "witness_statement.mp3",
    type: "audio",
    size: "5.2 MB",
    status: "processing",
    aiAnalysis: "Audio processing in progress..."
  }
];

export function EvidenceUploadZone() {
  const [files, setFiles] = useState<EvidenceFile[]>(mockEvidenceFiles);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const getFileIcon = (type: string) => {
    switch (type) {
      case "document": return FileText;
      case "image": return Image;
      case "video": return Video;
      case "audio": return Mic;
      default: return FileText;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return CheckCircle;
      case "error": return AlertCircle;
      default: return Upload;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-500";
      case "error": return "text-red-500";
      case "processing": return "text-yellow-500";
      default: return "text-blue-500";
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    // Handle file drop logic here
    console.log("Files dropped:", e.dataTransfer.files);
  }, []);

  const handleFileSelect = () => {
    // Handle file selection logic here
    console.log("File selector opened");
  };

  const removeFile = (fileId: string) => {
    setFiles(files.filter(f => f.id !== fileId));
  };

  const evidenceCounts = {
    documents: files.filter(f => f.type === "document").length,
    images: files.filter(f => f.type === "image").length,
    videos: files.filter(f => f.type === "video").length,
    audio: files.filter(f => f.type === "audio").length,
  };

  return (
    <Card className="h-full bg-legal-card-bg border-legal-secondary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Upload className="w-5 h-5 text-legal-secondary" />
          <CardTitle className="text-legal-text-light">Evidence Upload</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">
          Upload and organize your case evidence with AI analysis
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Evidence Type Counts */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 p-2 bg-legal-secondary/5 rounded-lg">
            <FileText className="w-4 h-4 text-legal-secondary" />
            <span className="text-xs text-legal-text-light">{evidenceCounts.documents} Docs</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-legal-secondary/5 rounded-lg">
            <Image className="w-4 h-4 text-legal-secondary" />
            <span className="text-xs text-legal-text-light">{evidenceCounts.images} Photos</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-legal-secondary/5 rounded-lg">
            <Video className="w-4 h-4 text-legal-secondary" />
            <span className="text-xs text-legal-text-light">{evidenceCounts.videos} Videos</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-legal-secondary/5 rounded-lg">
            <Mic className="w-4 h-4 text-legal-secondary" />
            <span className="text-xs text-legal-text-light">{evidenceCounts.audio} Audio</span>
          </div>
        </div>

        {/* Upload Zone */}
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer",
            isDragOver
              ? "border-legal-secondary bg-legal-secondary/10"
              : "border-legal-secondary/30 hover:border-legal-secondary/50"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleFileSelect}
        >
          <Upload className="w-8 h-8 text-legal-secondary mx-auto mb-2" />
          <p className="text-sm font-medium text-legal-text-light">
            Drop files here or click to upload
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Supports PDF, images, videos, and audio files
          </p>
        </div>

        {/* File List */}
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {files.map((file) => {
            const FileIcon = getFileIcon(file.type);
            const StatusIcon = getStatusIcon(file.status);

            return (
              <div key={file.id} className="flex items-center gap-3 p-3 bg-legal-secondary/5 rounded-lg">
                <FileIcon className="w-4 h-4 text-legal-secondary flex-shrink-0" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-legal-text-light truncate">
                      {file.name}
                    </p>
                    <StatusIcon className={cn("w-3 h-3", getStatusColor(file.status))} />
                  </div>
                  <p className="text-xs text-muted-foreground">{file.size}</p>
                  {file.aiAnalysis && (
                    <p className="text-xs text-legal-secondary mt-1">{file.aiAnalysis}</p>
                  )}
                  {file.status === "processing" && file.uploadProgress !== undefined && (
                    <Progress value={file.uploadProgress} className="h-1 mt-2" />
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Eye className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Download className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                    onClick={() => removeFile(file.id)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <Button
          variant="outline"
          className="w-full border-legal-secondary text-legal-secondary hover:bg-legal-secondary hover:text-legal-secondary-foreground"
        >
          Organize Evidence
        </Button>
      </CardContent>
    </Card>
  );
}