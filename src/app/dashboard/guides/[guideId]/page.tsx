"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft,
  Play, 
  Clock, 
  BookOpen,
  ArrowLeft,
  ArrowRight
} from "lucide-react";

const guides = [
  {
    id: 1,
    slug: "getting-started",
    title: "Getting Started with Supr DM",
    description: "Learn the basics of setting up your first Instagram automation in under 5 minutes.",
    content: "This comprehensive guide will walk you through setting up your first automation...",
    duration: "5 min",
    category: "Basics",
    type: "video",
    thumbnail: "/assets/generated_images/getting_started_thumbnail.png",
  },
  {
    id: 2,
    slug: "comment-automation",
    title: "Creating Comment Automations",
    description: "Set up automations that respond to specific keywords in your post comments.",
    content: "Comment automations are one of the most powerful features of Supr DM...",
    duration: "8 min",
    category: "Automations",
    type: "video",
    thumbnail: "/assets/generated_images/comment_automation_thumbnail.png",
  },
];

export default function GuideDetail() {
  const params = useParams();
  const router = useRouter();
  const guideId = params.guideId as string;
  
  const guide = guides.find(g => g.slug === guideId) || guides[0];
  const currentIndex = guides.findIndex(g => g.slug === guideId);
  const nextGuide = guides[currentIndex + 1];
  const prevGuide = guides[currentIndex - 1];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold font-display">{guide.title}</h1>
            <p className="text-muted-foreground mt-1">{guide.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline">{guide.category}</Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {guide.duration}
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            {guide.type === "video" ? "Video Guide" : "Article"}
          </div>
        </div>

        <div className="relative w-full h-96 rounded-lg overflow-hidden bg-muted">
          <Image
            src={guide.thumbnail}
            alt={guide.title}
            fill
            className="object-cover"
          />
          {guide.type === "video" && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Button size="lg" className="rounded-full h-20 w-20">
                <Play className="h-8 w-8" />
              </Button>
            </div>
          )}
        </div>

        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed">{guide.content}</p>
          <p className="mt-4">
            This is a placeholder for the full guide content. In a production app, this would contain
            the complete tutorial content, video player, or article text.
          </p>
        </div>

        <div className="flex items-center justify-between pt-6 border-t">
          {prevGuide ? (
            <Link href={`/dashboard/guides/${prevGuide.slug}`}>
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous Guide
              </Button>
            </Link>
          ) : (
            <div />
          )}
          {nextGuide && (
            <Link href={`/dashboard/guides/${nextGuide.slug}`}>
              <Button>
                Next Guide
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

