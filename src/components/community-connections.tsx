"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  MessageCircle,
  Heart,
  MapPin,
  Calendar,
  Trophy,
  Star,
  ArrowRight
} from "lucide-react";

interface CommunityMember {
  id: string;
  name: string;
  avatar?: string;
  location: string;
  caseType: string;
  status: "active" | "resolved" | "supporting";
  matchPercentage: number;
  joinDate: string;
  successStories?: number;
  isOnline?: boolean;
}

interface SimilarCase {
  id: string;
  title: string;
  type: string;
  status: "won" | "settled" | "ongoing";
  timeline: string;
  similarity: number;
}

const mockCommunityMembers: CommunityMember[] = [
  {
    id: "1",
    name: "Sarah T.",
    location: "New York",
    caseType: "Workplace Discrimination",
    status: "resolved",
    matchPercentage: 94,
    joinDate: "2023-08-15",
    successStories: 2,
    isOnline: true
  },
  {
    id: "2",
    name: "Mike R.",
    location: "California",
    caseType: "Employment Rights",
    status: "active",
    matchPercentage: 87,
    joinDate: "2023-11-20",
    isOnline: false
  },
  {
    id: "3",
    name: "Jessica M.",
    location: "Texas",
    caseType: "Workplace Harassment",
    status: "supporting",
    matchPercentage: 82,
    joinDate: "2023-06-10",
    successStories: 1,
    isOnline: true
  }
];

const mockSimilarCases: SimilarCase[] = [
  {
    id: "1",
    title: "Workplace Discrimination Case",
    type: "Employment Law",
    status: "won",
    timeline: "8 months",
    similarity: 91
  },
  {
    id: "2",
    title: "Harassment Settlement",
    type: "Civil Rights",
    status: "settled",
    timeline: "6 months",
    similarity: 85
  }
];

export function CommunityConnections() {
  const [activeTab, setActiveTab] = useState<"members" | "cases">("members");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved": return "text-green-500 bg-green-500/10";
      case "active": return "text-blue-500 bg-blue-500/10";
      case "supporting": return "text-purple-500 bg-purple-500/10";
      default: return "text-gray-500 bg-gray-500/10";
    }
  };

  const getCaseStatusColor = (status: string) => {
    switch (status) {
      case "won": return "text-green-500 bg-green-500/10";
      case "settled": return "text-blue-500 bg-blue-500/10";
      case "ongoing": return "text-yellow-500 bg-yellow-500/10";
      default: return "text-gray-500 bg-gray-500/10";
    }
  };

  return (
    <Card className="h-full bg-legal-card-bg border-legal-secondary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-legal-secondary" />
          <CardTitle className="text-legal-text-light">Community Connection</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">
          Connect with others who share similar experiences
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Tab Navigation */}
        <div className="flex bg-legal-secondary/5 rounded-lg p-1">
          <Button
            variant={activeTab === "members" ? "secondary" : "ghost"}
            size="sm"
            className="flex-1 h-8"
            onClick={() => setActiveTab("members")}
          >
            <Users className="w-3 h-3 mr-1" />
            Members
          </Button>
          <Button
            variant={activeTab === "cases" ? "secondary" : "ghost"}
            size="sm"
            className="flex-1 h-8"
            onClick={() => setActiveTab("cases")}
          >
            <Trophy className="w-3 h-3 mr-1" />
            Cases
          </Button>
        </div>

        {/* Members Tab */}
        {activeTab === "members" && (
          <div className="space-y-3">
            {mockCommunityMembers.map((member) => (
              <div key={member.id} className="p-3 bg-legal-secondary/5 rounded-lg space-y-2">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs bg-legal-secondary text-legal-secondary-foreground">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {member.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-legal-card-bg rounded-full" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-legal-text-light">{member.name}</span>
                      <Badge className={getStatusColor(member.status) + " text-xs px-1.5 py-0.5"}>
                        {member.status}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{member.location}</span>
                    </div>

                    <p className="text-xs text-legal-secondary mt-1">{member.caseType}</p>

                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-legal-secondary" />
                        <span className="text-xs text-legal-text-light">{member.matchPercentage}% match</span>
                      </div>
                      {member.successStories && (
                        <div className="flex items-center gap-1">
                          <Trophy className="w-3 h-3 text-green-500" />
                          <span className="text-xs text-green-500">{member.successStories} wins</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <MessageCircle className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              className="w-full border-legal-secondary text-legal-secondary hover:bg-legal-secondary hover:text-legal-secondary-foreground"
            >
              Find More Connections
              <ArrowRight className="ml-2 w-3 h-3" />
            </Button>
          </div>
        )}

        {/* Cases Tab */}
        {activeTab === "cases" && (
          <div className="space-y-3">
            {mockSimilarCases.map((case_) => (
              <div key={case_.id} className="p-3 bg-legal-secondary/5 rounded-lg space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-medium text-legal-text-light truncate">
                        {case_.title}
                      </h4>
                      <Badge className={getCaseStatusColor(case_.status) + " text-xs px-1.5 py-0.5"}>
                        {case_.status}
                      </Badge>
                    </div>

                    <p className="text-xs text-muted-foreground">{case_.type}</p>

                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-legal-secondary" />
                        <span className="text-xs text-legal-text-light">{case_.timeline}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-pink-500" />
                        <span className="text-xs text-pink-500">{case_.similarity}% similar</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              className="w-full border-legal-secondary text-legal-secondary hover:bg-legal-secondary hover:text-legal-secondary-foreground"
            >
              Explore Similar Cases
              <ArrowRight className="ml-2 w-3 h-3" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}