"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Star } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageProvider";

export type AchievementCategory =
  | "Project"
  | "Skill"
  | "Recognition"
  | "Leadership"
  | "Innovation"
  | "Collaboration";

export interface AchievementProps {
  id: string; // Can be either _id from DB or local id
  _id?: string;
  title: string;
  description: string;
  date: string;
  impact: string;
  category: AchievementCategory;
  starred?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onStar?: (id: string) => void;
  onClick?: (id: string) => void;
}

const categoryColors: Record<AchievementCategory, string> = {
  Project: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Skill: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Recognition:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  Leadership:
    "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  Innovation:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  Collaboration:
    "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300",
};

const Achievement = ({
  id,
  title,
  description,
  date,
  impact,
  category,
  starred = false,
  onEdit,
  onDelete,
  onStar,
  onClick,
}: AchievementProps) => {
  const { t, language } = useLanguage();
  const isRtl = language === "ar";
  const pathname = usePathname();
  const docID = pathname.split("/")[2];

  const handleCardClick = () => {
    console.log("Card clicked with ID:", id);
    onClick?.(id);
  };

  return (
    <Card
      onClick={handleCardClick}
      className="overflow-hidden transition-all duration-300 card-hover animate-scale-in cursor-pointer"
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge
            variant="outline"
            className={`font-medium ${categoryColors[category]} border-0`}
          >
            {category}
          </Badge>

          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 rounded-full ${
              starred
                ? "text-yellow-500"
                : "text-[hsl(var(--muted-foreground))]"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onStar?.(id);
            }}
          >
            <Star
              className="h-4 w-4"
              fill={starred ? "currentColor" : "none"}
            />
            <span className="sr-only">{starred ? "Unstar" : "Star"}</span>
          </Button>
        </div>
        <CardTitle className="text-xl mt-2 text-balance">{title}</CardTitle>
        <CardDescription className="text-base flex items-center mt-1">
          <time dateTime={date}>
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </time>
        </CardDescription>
      </CardHeader>

      <CardContent className="text-md">
        <div className="space-y-4">
          <div>
            <p className="whitespace-pre-line">{description}</p>
          </div>

          {impact && (
            <div>
              <h4 className="font-medium text-sm text-[hsl(var(--muted-foreground))] mb-1">
                {t("impact")}:
              </h4>
              <p className="text-md">{impact}</p>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="border-t pt-4 flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          className="text-muted-foreground"
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.(id);
          }}
        >
          <Pencil className="h-3.5 w-3.5 mr-1.5" />
          {t("Edit")}
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="text-[hsl(var(--destructive))]"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(id);
          }}
        >
          <Trash2 className="h-3.5 w-3.5 mr-1.5" />
          {t("Delete")}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Achievement;
