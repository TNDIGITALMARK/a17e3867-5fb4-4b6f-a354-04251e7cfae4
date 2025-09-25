import { MainLayout } from "@/components/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Video, FileText, Users, Clock, Star } from "lucide-react";

export const dynamic = 'force-dynamic'

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  students: number;
  type: "video" | "article" | "interactive";
}

const courses: Course[] = [
  {
    id: "1",
    title: "Understanding Your Rights in the Workplace",
    description: "Learn about workplace discrimination, harassment, and your legal protections",
    duration: "45 min",
    level: "Beginner",
    rating: 4.8,
    students: 1234,
    type: "video"
  },
  {
    id: "2",
    title: "Documentation and Evidence Collection",
    description: "Master the art of collecting and organizing evidence for your case",
    duration: "30 min",
    level: "Intermediate",
    rating: 4.9,
    students: 987,
    type: "interactive"
  },
  {
    id: "3",
    title: "Legal Process and Timeline",
    description: "Navigate the legal system and understand what to expect in your case",
    duration: "60 min",
    level: "Advanced",
    rating: 4.7,
    students: 654,
    type: "article"
  }
];

export default function AcademyPage() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video": return Video;
      case "article": return FileText;
      case "interactive": return Users;
      default: return BookOpen;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-500/10 text-green-500";
      case "Intermediate": return "bg-yellow-500/10 text-yellow-500";
      case "Advanced": return "bg-red-500/10 text-red-500";
      default: return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-4xl font-bold text-legal-text-light">
            Legal Education Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empower yourself with knowledge. Learn about your rights, legal processes, and how to build a strong case.
          </p>
        </div>

        {/* Featured Course */}
        <Card className="bg-gradient-to-r from-legal-primary/10 to-legal-secondary/10 border-legal-secondary/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-legal-secondary" />
              <CardTitle className="text-legal-text-light">Featured Course</CardTitle>
            </div>
            <CardDescription className="text-muted-foreground">
              Most popular course this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-legal-secondary/10 rounded-lg flex items-center justify-center">
                <Video className="w-8 h-8 text-legal-secondary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-legal-text-light mb-2">
                  Understanding Your Rights in the Workplace
                </h3>
                <p className="text-muted-foreground mb-4">
                  Learn about workplace discrimination, harassment, and your legal protections with expert guidance.
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-legal-secondary" />
                    <span className="text-sm text-legal-text-light">45 min</span>
                  </div>
                  <Badge className="bg-green-500/10 text-green-500">Beginner</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-legal-text-light">4.8 (1,234 students)</span>
                  </div>
                </div>
                <Button className="bg-legal-secondary hover:bg-legal-secondary/80 text-legal-secondary-foreground">
                  Start Learning
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Catalog */}
        <div>
          <h2 className="text-2xl font-bold text-legal-text-light mb-6">Course Catalog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => {
              const IconComponent = getTypeIcon(course.type);

              return (
                <Card key={course.id} className="bg-legal-card-bg border-legal-secondary/20 hover:border-legal-secondary/40 transition-colors">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-legal-secondary/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-legal-secondary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-legal-text-light text-lg leading-tight">
                          {course.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm">
                      {course.description}
                    </p>

                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={getLevelColor(course.level)}>
                        {course.level}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {course.duration}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-legal-text-light">{course.rating}</span>
                        <span className="text-xs text-muted-foreground">({course.students.toLocaleString()})</span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full border-legal-secondary text-legal-secondary hover:bg-legal-secondary hover:text-legal-secondary-foreground">
                      Start Course
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Learning Resources */}
        <Card className="bg-legal-card-bg border-legal-secondary/20">
          <CardHeader>
            <CardTitle className="text-legal-text-light">Additional Resources</CardTitle>
            <CardDescription className="text-muted-foreground">
              Quick access to essential legal information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 border-legal-secondary/20 hover:border-legal-secondary hover:bg-legal-secondary/5">
                <BookOpen className="w-6 h-6 text-legal-secondary" />
                <span className="text-sm font-medium">Legal Glossary</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 border-legal-secondary/20 hover:border-legal-secondary hover:bg-legal-secondary/5">
                <FileText className="w-6 h-6 text-legal-secondary" />
                <span className="text-sm font-medium">Legal Forms</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 border-legal-secondary/20 hover:border-legal-secondary hover:bg-legal-secondary/5">
                <Users className="w-6 h-6 text-legal-secondary" />
                <span className="text-sm font-medium">Expert Directory</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 border-legal-secondary/20 hover:border-legal-secondary hover:bg-legal-secondary/5">
                <Video className="w-6 h-6 text-legal-secondary" />
                <span className="text-sm font-medium">Webinars</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}