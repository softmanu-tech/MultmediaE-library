"use client";

import { BookOpen, Video, Headphones, ScrollText, Heart, Calendar, Library, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/", icon: Library },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Books", href: "/materials/books", icon: BookOpen },
  { name: "Videos", href: "/materials/videos", icon: Video },
  { name: "Audio", href: "/materials/audio", icon: Headphones },
  { name: "Journals", href: "/materials/journals", icon: ScrollText },
  { name: "Favorites", href: "/favorites", icon: Heart },
  { name: "My Calendar", href: "/calendar", icon: Calendar },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Library className="h-6 w-6" />
              <span className="text-xl font-bold">E-Library</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium",
                      pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}