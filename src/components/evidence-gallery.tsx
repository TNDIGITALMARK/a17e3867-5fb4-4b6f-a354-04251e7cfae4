"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Grid3X3,
  Search,
  Filter,
  FileText,
  Image,
  Video,
  Mic,
  Download,
  Eye,
  Calendar,
  Tag,
  Star,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EvidenceItem {
  id: string;
  name: string;
  type: "document" | "image" | "video" | "audio";
  category: string;
  uploadDate: string;
  size: string;
  tags: string[];
  importance: "low" | "medium" | "high" | "critical";
  thumbnail?: string;
  description?: string;
}

const mockEvidenceItems: EvidenceItem[] = [
  {
    id: "1",
    name: "incident_report_01.pdf",
    type: "document",
    category: "Reports",
    uploadDate: "2024-01-15",
    size: "2.4 MB",
    tags: ["incident", "workplace", "harassment"],
    importance: "critical",
    description: "Initial incident report documenting harassment events"
  },
  {
    id: "2",
    name: "workplace_photo_01.jpg",
    type: "image",
    category: "Photos",
    uploadDate: "2024-01-16",
    size: "1.8 MB",
    tags: ["workplace", "evidence", "conditions"],
    importance: "high"
  },
  {
    id: "3",
    name: "witness_statement.mp3",
    type: "audio",
    category: "Statements",
    uploadDate: "2024-01-18",
    size: "5.2 MB",
    tags: ["witness", "statement", "audio"],
    importance: "high"
  },
  {
    id: "4",
    name: "email_thread.pdf",
    type: "document",
    category: "Communications",
    uploadDate: "2024-01-20",
    size: "856 KB",
    tags: ["email", "communication", "hr"],
    importance: "medium"
  },
  {
    id: "5",
    name: "security_footage.mp4",
    type: "video",
    category: "Video Evidence",
    uploadDate: "2024-01-22",
    size: "15.3 MB",
    tags: ["video", "security", "incident"],
    importance: "critical"
  },
  {
    id: "6",
    name: "phone_recording.m4a",
    type: "audio",
    category: "Recordings",
    uploadDate: "2024-01-25",
    size: "3.1 MB",
    tags: ["phone", "recording", "conversation"],
    importance: "high"
  }
];

export function EvidenceGallery() {
  const [items, setItems] = useState<EvidenceItem[]>(mockEvidenceItems);
  const [filteredItems, setFilteredItems] = useState<EvidenceItem[]>(mockEvidenceItems);
  const [selectedItem, setSelectedItem] = useState<EvidenceItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "document": return FileText;
      case "image": return Image;
      case "video": return Video;
      case "audio": return Mic;
      default: return FileText;
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

  const categories = [...new Set(items.map(item => item.category))];

  // Filter logic
  React.useEffect(() => {
    let filtered = items;

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (selectedType !== "all") {
      filtered = filtered.filter(item => item.type === selectedType);
    }

    setFilteredItems(filtered);
  }, [searchQuery, selectedCategory, selectedType, items]);

  return (
    <>
      <Card className="bg-legal-card-bg border-legal-secondary/20">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Grid3X3 className="w-5 h-5 text-legal-secondary" />
              <CardTitle className="text-legal-text-light">Evidence Gallery</CardTitle>
            </div>
            <Badge variant="secondary" className="bg-legal-secondary/10 text-legal-secondary">
              {filteredItems.length} items
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search evidence..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-legal-secondary/5 border-legal-secondary/20"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[140px] bg-legal-secondary/5 border-legal-secondary/20">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-legal-card-bg border-legal-secondary/20">
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full sm:w-[120px] bg-legal-secondary/5 border-legal-secondary/20">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent className="bg-legal-card-bg border-legal-secondary/20">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="document">Documents</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Evidence Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto">
            {filteredItems.map((item) => {
              const IconComponent = getTypeIcon(item.type);

              return (
                <div
                  key={item.id}
                  className="p-3 bg-legal-secondary/5 rounded-lg hover:bg-legal-secondary/10 transition-colors cursor-pointer border border-legal-secondary/10"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-legal-secondary/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-legal-secondary" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-medium text-legal-text-light truncate">
                          {item.name}
                        </h4>
                        <Badge className={cn("text-xs px-1.5 py-0.5", getImportanceColor(item.importance))}>
                          {item.importance}
                        </Badge>
                      </div>

                      <p className="text-xs text-muted-foreground mb-1">
                        {item.category} • {item.size}
                      </p>

                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(item.uploadDate).toLocaleDateString()}</span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs px-1.5 py-0.5 bg-legal-secondary/5 text-legal-secondary border-legal-secondary/20">
                            {tag}
                          </Badge>
                        ))}
                        {item.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                            +{item.tags.length - 2}
                          </Badge>
                        )}
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

          {filteredItems.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Grid3X3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No evidence items found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Modal */}
      {selectedItem && (
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="sm:max-w-[500px] bg-legal-card-bg border-legal-secondary/20">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-legal-text-light">
                {React.createElement(getTypeIcon(selectedItem.type), {
                  className: "w-5 h-5 text-legal-secondary"
                })}
                {selectedItem.name}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Category:</span>
                  <p className="text-legal-text-light">{selectedItem.category}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Size:</span>
                  <p className="text-legal-text-light">{selectedItem.size}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Upload Date:</span>
                  <p className="text-legal-text-light">
                    {new Date(selectedItem.uploadDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Importance:</span>
                  <Badge className={cn("text-xs", getImportanceColor(selectedItem.importance))}>
                    {selectedItem.importance}
                  </Badge>
                </div>
              </div>

              {selectedItem.description && (
                <div>
                  <span className="text-muted-foreground text-sm">Description:</span>
                  <p className="text-legal-text-light mt-1">{selectedItem.description}</p>
                </div>
              )}

              <div>
                <span className="text-muted-foreground text-sm">Tags:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedItem.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs bg-legal-secondary/5 text-legal-secondary border-legal-secondary/20">
                      <Tag className="w-2 h-2 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1 bg-legal-secondary hover:bg-legal-secondary/80">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                <Button variant="outline" className="flex-1 border-legal-secondary text-legal-secondary">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}