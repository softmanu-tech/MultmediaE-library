import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Video, Headphones, ScrollText } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Books",
    description: "Access our extensive collection of digital books",
    icon: BookOpen,
    href: "/materials/books",
  },
  {
    title: "Videos",
    description: "Watch educational videos and tutorials",
    icon: Video,
    href: "/materials/videos",
  },
  {
    title: "Audio",
    description: "Listen to audiobooks and podcasts",
    icon: Headphones,
    href: "/materials/audio",
  },
  {
    title: "Journals",
    description: "Read academic journals and research papers",
    icon: ScrollText,
    href: "/materials/journals",
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to E-Library</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your digital gateway to knowledge and learning
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Icon className="h-8 w-8 mb-2" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={feature.href}>
                  <Button className="w-full">Browse {feature.title}</Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </div>
  );
}