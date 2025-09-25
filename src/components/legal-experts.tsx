"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Scale,
  Star,
  MessageCircle,
  MapPin,
  Calendar,
  Award,
  Phone,
  Mail
} from "lucide-react";

const legalExperts = [
  {
    id: "1",
    name: "Dr. Emily Rodriguez",
    title: "Employment Law Attorney",
    location: "New York, NY",
    specialties: ["Workplace Discrimination", "Wage & Hour", "Harassment"],
    rating: 4.9,
    reviews: 127,
    experience: "15+ years",
    status: "Available",
    consultationFee: "Free Initial",
    successRate: "94%"
  },
  {
    id: "2",
    name: "James Chen, Esq.",
    title: "Civil Rights Lawyer",
    location: "California, CA",
    specialties: ["Civil Rights", "Constitutional Law", "Police Misconduct"],
    rating: 4.8,
    reviews: 89,
    experience: "12+ years",
    status: "Busy",
    consultationFee: "$150/hour",
    successRate: "91%"
  },
  {
    id: "3",
    name: "Maria Santos",
    title: "Housing Rights Advocate",
    location: "Texas, TX",
    specialties: ["Tenant Rights", "Housing Discrimination", "Eviction Defense"],
    rating: 4.7,
    reviews: 156,
    experience: "10+ years",
    status: "Available",
    consultationFee: "Free Initial",
    successRate: "88%"
  }
];

export function LegalExperts() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-green-500/10 text-green-500";
      case "Busy": return "bg-yellow-500/10 text-yellow-500";
      case "Offline": return "bg-gray-500/10 text-gray-500";
      default: return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <Card className="h-full bg-legal-card-bg border-legal-secondary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-legal-secondary" />
          <CardTitle className="text-legal-text-light">Legal Experts</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {legalExperts.map((expert) => (
          <div key={expert.id} className="p-4 bg-legal-secondary/5 rounded-lg border border-legal-secondary/10">
            <div className="flex items-start gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="text-sm bg-legal-secondary text-legal-secondary-foreground">
                  {expert.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-medium text-legal-text-light">
                    {expert.name}
                  </h4>
                  <Badge className={getStatusColor(expert.status) + " text-xs px-1.5 py-0.5"}>
                    {expert.status}
                  </Badge>
                </div>

                <p className="text-xs text-legal-secondary mb-1">{expert.title}</p>

                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                  <MapPin className="w-3 h-3" />
                  <span>{expert.location}</span>
                </div>

                <div className="flex items-center gap-3 mb-2 text-xs">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span className="text-legal-text-light">{expert.rating}</span>
                    <span className="text-muted-foreground">({expert.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="w-3 h-3 text-legal-secondary" />
                    <span className="text-legal-text-light">{expert.successRate}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {expert.specialties.slice(0, 2).map((specialty) => (
                    <Badge key={specialty} variant="outline" className="text-xs px-1.5 py-0.5 bg-legal-secondary/5 text-legal-secondary border-legal-secondary/20">
                      {specialty}
                    </Badge>
                  ))}
                  {expert.specialties.length > 2 && (
                    <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                      +{expert.specialties.length - 2} more
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div>
                    <span className="text-muted-foreground">Experience:</span>
                    <p className="text-legal-text-light">{expert.experience}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Consultation:</span>
                    <p className="text-legal-text-light">{expert.consultationFee}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 h-7 text-xs border-legal-secondary text-legal-secondary hover:bg-legal-secondary hover:text-legal-secondary-foreground">
                    <MessageCircle className="w-3 h-3 mr-1" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 h-7 text-xs border-legal-secondary text-legal-secondary hover:bg-legal-secondary hover:text-legal-secondary-foreground">
                    <Phone className="w-3 h-3 mr-1" />
                    Consult
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <Button
          variant="outline"
          className="w-full border-legal-secondary text-legal-secondary hover:bg-legal-secondary hover:text-legal-secondary-foreground"
        >
          Find More Experts
        </Button>
      </CardContent>
    </Card>
  );
}