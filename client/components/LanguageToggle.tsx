"use client";
import { useLanguage } from "@/context/LanguageProvider";
import { Button } from "./ui/button";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="font-medium"
      aria-label="Toggle language"
    >
      {language === "en" ? "العربية" : "English"}
      <Globe className="h-4 w-4 ml-1" />
    </Button>
  );
}
