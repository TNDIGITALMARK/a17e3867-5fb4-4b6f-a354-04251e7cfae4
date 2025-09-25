"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Search,
  ExternalLink,
  Download,
  Star,
  Clock,
  User,
  Tag,
  Filter,
  FileText,
  Video,
  Headphones,
  Scale
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: "article" | "guide" | "video" | "podcast" | "legal_form" | "template";
  author: string;
  publishDate: string;
  readTime: string;
  rating: number;
  downloads?: number;
  url?: string;
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  featured?: boolean;
}

const mockResources: Resource[] = [
  {
    id: "1",
    title: "Know Your Workplace Rights",
    description: "Comprehensive guide to understanding your employment rights and protections",
    category: "Employment Law",
    type: "guide",
    author: "Legal Aid Society",
    publishDate: "2024-01-15",
    readTime: "12 min read",
    rating: 4.8,
    downloads: 1247,
    tags: ["employment", "rights", "workplace", "harassment"],
    difficulty: "beginner",
    featured: true
  },
  {
    id: "2",
    title: "Filing a Discrimination Complaint",
    description: "Step-by-step process for filing formal discrimination complaints",
    category: "Civil Rights",
    type: "article",
    author: "Civil Rights Institute",
    publishDate: "2024-01-10",
    readTime: "8 min read",
    rating: 4.6,
    downloads: 892,
    tags: ["discrimination", "complaint", "process", "civil-rights"],
    difficulty: "intermediate"
  },
  {
    id: "3",
    title: "Understanding Legal Documentation",
    description: "Video series on reading and understanding legal documents",
    category: "Legal Education",
    type: "video",
    author: "Prof. Sarah Martinez",
    publishDate: "2024-01-05",
    readTime: "45 min watch",
    rating: 4.9,
    tags: ["education", "documents", "legal-literacy"],
    difficulty: "beginner",
    featured: true
  },
  {
    id: "4",
    title: "Rights Violation Response Template",
    description: "Customizable template for responding to rights violations",
    category: "Templates",
    type: "template",
    author: "Legal Template Library",
    publishDate: "2024-01-08",
    readTime: "5 min setup",
    rating: 4.7,
    downloads: 2156,
    tags: ["template", "response", "violation", "formal"],
    difficulty: "intermediate"
  },
  {
    id: "5",
    title: "Advocacy Strategies Podcast",
    description: "Expert discussions on effective advocacy and legal strategies",
    category: "Advocacy",
    type: "podcast",
    author: "Rights Advocacy Network",
    publishDate: "2024-01-12",
    readTime: "35 min listen",
    rating: 4.5,
    tags: ["advocacy", "strategies", "expert-advice"],
    difficulty: "advanced"
  },
  {
    id: "6",
    title: "Incident Documentation Form",
    description: "Official form for documenting rights violation incidents",
    category: "Legal Forms",
    type: "legal_form",
    author: "Legal Aid Foundation",
    publishDate: "2024-01-03",
    readTime: "10 min complete",
    rating: 4.8,
    downloads: 1834,
    tags: ["form", "documentation", "incident", "official"],
    difficulty: "beginner"
  }
];

export function ResourceLibrary() {
  const [resources, setResources] = useState(mockResources);
  const [filteredResources, setFilteredResources] = useState(mockResources);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "article": return FileText;
      case "guide": return BookOpen;
      case "video": return Video;
      case "podcast": return Headphones;
      case "legal_form": return Scale;
      case "template": return FileText;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "article": return "text-blue-500";
      case "guide": return "text-green-500";
      case "video": return "text-red-500";
      case "podcast": return "text-purple-500";
      case "legal_form": return "text-yellow-500";
      case "template": return "text-indigo-500";
      default: return "text-gray-500";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-500/10 text-green-500";
      case "intermediate": return "bg-yellow-500/10 text-yellow-500";
      case "advanced": return "bg-red-500/10 text-red-500";
      default: return "bg-gray-500/10 text-gray-500";
    }
  };

  const categories = [...new Set(resources.map(r => r.category))];
  const types = [...new Set(resources.map(r => r.type))];

  // Filter logic
  React.useEffect(() => {
    let filtered = resources;

    if (searchQuery) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(resource => resource.category === selectedCategory);
    }

    if (selectedType !== "all") {
      filtered = filtered.filter(resource => resource.type === selectedType);
    }

    // Sort by featured first, then by rating
    filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.rating - a.rating;
    });

    setFilteredResources(filtered);
  }, [searchQuery, selectedCategory, selectedType, resources]);

  return (
    <Card className="h-full bg-legal-card-bg border-legal-secondary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-legal-secondary" />
            <CardTitle className="text-legal-text-light">Resource Library</CardTitle>
          </div>
          <Badge variant="secondary" className="bg-legal-secondary/10 text-legal-secondary">
            {filteredResources.length} resources
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-legal-secondary/5 border-legal-secondary/20"
          />
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === "all" ? "secondary" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
            className="text-xs"
          >
            All Categories
          </Button>
          {categories.slice(0, 3).map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "secondary" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="text-xs"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Resource List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredResources.map((resource) => {
            const TypeIcon = getTypeIcon(resource.type);

            return (
              <div
                key={resource.id}
                className={cn(
                  "p-3 rounded-lg border transition-colors hover:bg-legal-secondary/5",
                  resource.featured
                    ? "bg-legal-secondary/10 border-legal-secondary/30"
                    : "bg-legal-secondary/5 border-legal-secondary/10"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-legal-secondary/10 rounded-lg flex items-center justify-center">
                      <TypeIcon className={cn("w-5 h-5", getTypeColor(resource.type))} />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium text-legal-text-light">
                          {resource.title}
                        </h4>
                        {resource.featured && (
                          <Star className="w-3 h-3 text-legal-secondary fill-current" />
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {resource.description}
                    </p>

                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={cn("text-xs px-1.5 py-0.5", getDifficultyColor(resource.difficulty))}>
                        {resource.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-xs px-1.5 py-0.5 bg-legal-secondary/5 text-legal-secondary border-legal-secondary/20">
                        {resource.category}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{resource.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{resource.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span>{resource.rating}</span>
                      </div>
                      {resource.downloads && (
                        <div className="flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          <span>{resource.downloads}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {resource.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs px-1.5 py-0.5">
                          <Tag className="w-2 h-2 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                    {resource.downloads && (
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Download className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No resources found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}