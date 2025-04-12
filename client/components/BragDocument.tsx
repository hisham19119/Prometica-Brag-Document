"use client";
import React, { useState } from "react";
import { AchievementProps } from "./Achievement";
import Achievement from "./Achievement";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, Download, Filter, Star, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { exportToPdf } from "@/utils/pdfExport";
import { usePathname } from "next/navigation";
import { useDocuments } from "@/hooks/useDocuments";
import { useLanguage } from "@/context/LanguageProvider";

export interface BragDocumentProps {
  id: string;
  title: string;
  achievements: AchievementProps[];
  onAddAchievement: () => void;
  onEditAchievement: (id: string) => void;
  onDeleteAchievement: (id: string) => void;
  onStarAchievement: (id: string) => void;
  onUpdateTitle: (title: string) => void;
  onClick?: (id: string) => void;
}

const BragDocument = ({
  id,
  title,
  achievements,
  onAddAchievement,
  onEditAchievement,
  onDeleteAchievement,
  onStarAchievement,
  onUpdateTitle,
  onClick,
}: BragDocumentProps) => {
  const { t, language } = useLanguage();
  const isRtl = language === "ar";
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [documentTitle, setDocumentTitle] = useState(title);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showStarredOnly, setShowStarredOnly] = useState(false);
  const pathname = usePathname();
  const docID = pathname.split("/")[2];
  console.log("docID is", docID);
  const { documents, isLoading, error } = useDocuments();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading achievements</div>;

  const achievementss = documents?.find(
    (doc: any) => doc._id === docID
  )?.achievements;

  console.log("documents documents documents documents = ", documents);
  console.log("Achvs", achievementss);

  const categories = [
    "Project",
    "Skill",
    "Recognition",
    "Leadership",
    "Innovation",
    "Collaboration",
  ];

  const filteredAchievements = achievementss?.filter((achievement: any) => {
    const matchesSearch =
      achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      achievement.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(achievement.category);

    const matchesStarred = !showStarredOnly || achievement.starred;

    return matchesSearch && matchesCategory && matchesStarred;
  });

  const handleTitleSubmit = () => {
    if (documentTitle.trim() === "") {
      setDocumentTitle(title);
    } else if (documentTitle !== title) {
      onUpdateTitle(documentTitle);
    }
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTitleSubmit();
    } else if (e.key === "Escape") {
      setDocumentTitle(title);
      setIsEditingTitle(false);
    }
  };

  const handleExport = async () => {
    await exportToPdf(title, achievements);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
          <div className="flex-1">
            {isEditingTitle ? (
              <div className="flex items-center gap-2">
                <Input
                  value={documentTitle}
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  onBlur={handleTitleSubmit}
                  onKeyDown={handleTitleKeyDown}
                  className="text-2xl font-semibold h-12 animate-scale-in"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setDocumentTitle(title);
                    setIsEditingTitle(false);
                  }}
                  className="animate-fade-in"
                >
                  {t("Cancel")}
                </Button>
              </div>
            ) : (
              <h1
                className="text-3xl font-semibold cursor-pointer hover:text-primary transition-colors"
                onClick={() => setIsEditingTitle(true)}
              >
                {title}
              </h1>
            )}
          </div>

          <div className="flex gap-2 flex-wrap sm:flex-nowrap">
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto group"
              onClick={handleExport}
            >
              <Download className="h-4 w-4 mr-1.5 group-hover:animate-bounce" />
              {t("PDF")}
            </Button>
            <Button
              onClick={onAddAchievement}
              size="sm"
              className="w-full sm:w-auto group"
            >
              <PlusCircle className="h-4 w-4 mr-1.5 group-hover:animate-pulse" />
              {t("Add Achievement")}
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center animate-fade-in">
          <div className="relative w-full sm:w-80 transition-all duration-300 hover:shadow-md focus-within:shadow-md rounded-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            <Input
              placeholder="Search achievements..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5 group">
                  <Filter className="h-3.5 w-3.5 group-hover:rotate-180 transition-transform duration-300" />
                  {t("Filter")}
                  {selectedCategories.length > 0 && (
                    <Badge
                      variant="secondary"
                      className="ml-1 px-1 rounded-full"
                    >
                      {selectedCategories.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 animate-scale-in"
              >
                {categories.map((category) => (
                  <DropdownMenuCheckboxItem
                    key={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedCategories([
                          ...selectedCategories,
                          category,
                        ]);
                      } else {
                        setSelectedCategories(
                          selectedCategories.filter((c) => c !== category)
                        );
                      }
                    }}
                  >
                    {category}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              size="sm"
              className={`gap-1.5 transition-all duration-300 ${
                showStarredOnly ? "bg-secondary" : ""
              }`}
              onClick={() => setShowStarredOnly(!showStarredOnly)}
            >
              <Star
                className={`h-3.5 w-3.5 transition-all duration-300 ${
                  showStarredOnly ? "scale-110" : ""
                }`}
                fill={showStarredOnly ? "currentColor" : "none"}
              />
              Starred
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {achievementss?.length === 0 ? (
        <div className="text-center py-12 animate-fade-in">
          <h3 className="text-xl font-medium text-[hsl(var(--muted-foreground))]">
            {t("Noachievementsfound")}
          </h3>
          <p className="mt-2 text-[hsl(var(--muted-foreground))]">
            {searchTerm || selectedCategories.length > 0 || showStarredOnly
              ? "Try adjusting your filters"
              : "Add your first achievement to get started"}
          </p>
          <Button
            onClick={onAddAchievement}
            variant="outline"
            className="mt-4 group"
          >
            <PlusCircle className="h-4 w-4 mr-1.5 group-hover:animate-pulse" />
            {t("Add Achievement")}
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredAchievements?.map((achievement: any, index: any) => (
            <div
              key={achievement._id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Achievement
                key={achievement._id}
                id={achievement?._id}
                title={achievement.title}
                description={achievement.description}
                date={achievement.date}
                impact={achievement.impact}
                category={achievement.category}
                starred={achievement.starred}
                onEdit={onEditAchievement}
                onDelete={onDeleteAchievement}
                onStar={onStarAchievement}
                onClick={onClick}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BragDocument;
