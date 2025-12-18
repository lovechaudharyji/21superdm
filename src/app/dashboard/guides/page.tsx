"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Play, 
  Clock, 
  Search,
  Zap,
  MessageCircle,
  Instagram,
  TrendingUp,
  Users,
  Settings,
  ExternalLink,
  Youtube,
  FileText,
  Lightbulb
} from "lucide-react";

const guides = [
  {
    id: 1,
    slug: "getting-started",
    title: "Getting Started with Supr DM",
    description: "Learn the basics of setting up your first Instagram automation in under 5 minutes.",
    duration: "5 min",
    category: "Basics",
    icon: Zap,
    type: "video",
    featured: true,
    thumbnail: "/assets/generated_images/getting_started_thumbnail.png",
  },
  {
    id: 2,
    slug: "comment-automation",
    title: "Creating Comment Automations",
    description: "Set up automations that respond to specific keywords in your post comments.",
    duration: "8 min",
    category: "Automations",
    icon: MessageCircle,
    type: "video",
    thumbnail: "/assets/generated_images/comment_automation_thumbnail.png",
  },
  {
    id: 3,
    slug: "dm-triggers",
    title: "DM Trigger Best Practices",
    description: "Learn how to create effective DM triggers that convert followers into customers.",
    duration: "10 min",
    category: "Best Practices",
    icon: Instagram,
    type: "article",
    thumbnail: "/assets/generated_images/dm_triggers_thumbnail.png",
  },
  {
    id: 4,
    slug: "analytics",
    title: "Understanding Analytics",
    description: "How to read and interpret your automation analytics for better results.",
    duration: "7 min",
    category: "Analytics",
    icon: TrendingUp,
    type: "video",
    thumbnail: "/assets/generated_images/analytics_guide_thumbnail.png",
  },
  {
    id: 5,
    slug: "contacts",
    title: "Managing Your Contacts",
    description: "Organize and segment contacts based on their interactions with your automations.",
    duration: "6 min",
    category: "Contacts",
    icon: Users,
    type: "article",
    thumbnail: "/assets/generated_images/contacts_management_thumbnail.png",
  },
  {
    id: 6,
    slug: "advanced",
    title: "Advanced Automation Settings",
    description: "Explore advanced features like message delays, follow-up sequences, and more.",
    duration: "12 min",
    category: "Advanced",
    icon: Settings,
    type: "video",
    thumbnail: "/assets/generated_images/advanced_settings_thumbnail.png",
  },
];

export default function Guides() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGuides = guides.filter(guide =>
    guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredGuide = guides.find(g => g.featured);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-display">Guides & Tutorials</h1>
          <p className="text-muted-foreground mt-1">
            Learn how to get the most out of Supr DM
          </p>
        </div>

        {/* Featured Guide */}
        {featuredGuide && (
          <Card className="border-2 border-primary">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-primary">Featured</Badge>
                <Badge variant="outline">{featuredGuide.category}</Badge>
              </div>
              <CardTitle className="text-2xl">{featuredGuide.title}</CardTitle>
              <CardDescription className="text-base">{featuredGuide.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="relative w-48 h-32 rounded-lg overflow-hidden">
                  <Image
                    src={featuredGuide.thumbnail}
                    alt={featuredGuide.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Clock className="h-4 w-4" />
                    <span>{featuredGuide.duration}</span>
                    <span>•</span>
                    <span>{featuredGuide.type === "video" ? "Video" : "Article"}</span>
                  </div>
                  <Link href={`/dashboard/guides/${featuredGuide.slug}`}>
                    <Button>
                      <Play className="h-4 w-4 mr-2" />
                      Watch Now
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search guides..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Guides Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredGuides.map((guide) => {
            const Icon = guide.icon;
            return (
              <Card key={guide.id} className="hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full">
                  <Image
                    src={guide.thumbnail}
                    alt={guide.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  {guide.type === "video" && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Play className="h-10 w-10 text-white" />
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{guide.category}</Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                      <Clock className="h-3 w-3" />
                      {guide.duration}
                    </div>
                  </div>
                  <CardTitle>{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/dashboard/guides/${guide.slug}`}>
                    <Button variant="outline" className="w-full">
                      {guide.type === "video" ? (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Watch Guide
                        </>
                      ) : (
                        <>
                          <FileText className="h-4 w-4 mr-2" />
                          Read Article
                        </>
                      )}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}

