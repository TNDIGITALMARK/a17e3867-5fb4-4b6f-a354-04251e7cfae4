"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Trophy,
  MessageCircle,
  BookOpen,
  TrendingUp,
  Heart,
  Scale,
  Star
} from "lucide-react";

const stats = [
  {
    title: "Community Members",
    value: "12,347",
    change: "+234 this week",
    icon: Users,
    color: "text-blue-500"
  },
  {
    title: "Cases Won",
    value: "3,892",
    change: "+15 this month",
    icon: Trophy,
    color: "text-green-500"
  },
  {
    title: "Active Discussions",
    value: "1,245",
    change: "+67 today",
    icon: MessageCircle,
    color: "text-purple-500"
  },
  {
    title: "Legal Resources",
    value: "4,567",
    change: "+23 this week",
    icon: BookOpen,
    color: "text-yellow-500"
  }
];

export function CommunityStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;

        return (
          <Card key={index} className="bg-legal-card-bg border-legal-secondary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-legal-secondary/10">
                  <IconComponent className={`w-5 h-5 ${stat.color}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-xl font-bold text-legal-text-light">
                    {stat.value}
                  </p>
                  <p className="text-xs text-green-500">
                    {stat.change}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}