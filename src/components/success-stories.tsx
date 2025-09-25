"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Trophy,
  Star,
  Calendar,
  ArrowRight,
  Heart,
  MessageCircle
} from "lucide-react";

const successStories = [
  {
    id: "1",
    name: "Sarah M.",
    title: "Workplace Discrimination Victory",
    summary: "Successfully resolved discrimination case with $45,000 settlement",
    timeline: "6 months",
    outcome: "Settlement",
    rating: 5,
    date: "2024-01-15",
    tags: ["discrimination", "workplace", "settlement"]
  },
  {
    id: "2",
    name: "Mike R.",
    title: "Wage Theft Recovery",
    summary: "Recovered $12,000 in unpaid overtime wages",
    timeline: "4 months",
    outcome: "Court Win",
    rating: 5,
    date: "2024-01-10",
    tags: ["wage-theft", "overtime", "court"]
  },
  {
    id: "3",
    name: "Jessica L.",
    title: "Housing Rights Success",
    summary: "Forced landlord to make repairs and reduced rent",
    timeline: "3 months",
    outcome: "Negotiated",
    rating: 4,
    date: "2024-01-05",
    tags: ["housing", "repairs", "negotiation"]
  }
];

export function SuccessStories() {
  return (
    <Card className="bg-legal-card-bg border-legal-secondary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-legal-secondary" />
          <CardTitle className="text-legal-text-light">Success Stories</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {successStories.map((story) => (
          <div key={story.id} className="p-3 bg-legal-secondary/5 rounded-lg">
            <div className="flex items-start gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-xs bg-legal-secondary text-legal-secondary-foreground">
                  {story.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-medium text-legal-text-light">
                    {story.title}
                  </h4>
                  <div className="flex">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-legal-text-light mb-1">by {story.name}</p>
                <p className="text-xs text-muted-foreground mb-2">{story.summary}</p>

                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs px-1.5 py-0.5 bg-green-500/10 text-green-500">
                    {story.outcome}
                  </Badge>
                  <span className="text-xs text-muted-foreground">• {story.timeline}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {new Date(story.date).toLocaleDateString()}
                  </span>
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
          View All Stories
          <ArrowRight className="ml-2 w-3 h-3" />
        </Button>
      </CardContent>
    </Card>
  );
}