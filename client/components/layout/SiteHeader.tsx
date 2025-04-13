"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { LanguageToggle } from "../LanguageToggle";
import MobileNav from "./MobileNav";
import { useLanguage } from "@/context/LanguageProvider";
import Link from "next/link";
import { useAuth } from "@/api/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const SiteHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language } = useLanguage();
  const { user, logout } = useAuth();
  const isRtl = language === "ar";
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("You are logged out successfully!");
      console.log("You are logged out successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
      toast.error("failed to logout");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-[hsl(var(--background))] backdrop-blur-sm border-b border-[hsl(var(--border))] z-50 flex justify-center ">
      <div className="container flex items-center justify-between h-16 px-4 ">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-[hsl(var(--primary))] ">
            Prometica
          </span>
        </Link>

        <nav
          className={`hidden md:flex items-center gap-6 ${
            isRtl ? "flex-row-reverse" : ""
          }`}
        >
          <Link
            href="/"
            className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors"
          >
            {t("home")}
          </Link>
          {user && (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors"
              >
                {t("dashboard")}
              </Link>
            </>
          )}
        </nav>

        <div
          className={`hidden md:flex items-center gap-4 ${
            isRtl ? "flex-row-reverse" : ""
          }`}
        >
          <ThemeToggle />
          <LanguageToggle />
          {user ? (
            <>
              <Link href="/">
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Logout
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  {t("login")}
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" size="sm">
                  {t("register")}
                </Button>
              </Link>
            </>
          )}
          {user && (
            <>
              <Link href="/create">
                <Button size="sm">{t("createDocument")}</Button>
              </Link>
            </>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>

        <MobileNav open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
      </div>
    </header>
  );
};

export default SiteHeader;
