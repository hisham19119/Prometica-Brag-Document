"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Home,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  PlusCircle,
  UserPlus,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageProvider";
import { ThemeToggle } from "../ThemeToggle";
import { LanguageToggle } from "../LanguageToggle";
import MobileNav from "./MobileNav";
import { useAuth } from "@/api/AuthContext";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { t, language } = useLanguage();
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0  z-50 px-6 py-4 transition-all duration-300  ${
        scrolled
          ? "glass shadow-sm backdrop-blur-lg bg-[hsl(var(--background))]/80"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <span className="text-xl font-medium text-[hsl(var(--primary))]">
            Prometica
          </span>
        </Link>
        <nav
          className={`hidden md:flex items-center space-x-1 ${
            isRtl ? "flex-row-reverse space-x-reverse" : ""
          }`}
        >
          <Link href="/">
            <Button
              variant={isActive("/") ? "secondary" : "ghost"}
              size="sm"
              className="flex items-center gap-1.5"
            >
              <Home className="h-4 w-4" />
              <span>{t("home")}</span>
            </Button>
          </Link>

          {user && (
            <>
              <Link href="/dashboard">
                <Button
                  variant={isActive("/dashboard") ? "secondary" : "ghost"}
                  size="sm"
                  className="flex items-center gap-1.5"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>{t("dashboard")}</span>
                </Button>
              </Link>
              <Link href="/create">
                <Button
                  variant="default"
                  size="sm"
                  className="flex items-center gap-1.5 ml-2"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>{t("newDocument")}</span>
                </Button>
              </Link>
            </>
          )}
          <div className="border-l border-[hsl(var(--border))] h-6 mx-2"></div>

          {user ? (
            <>
              <Link href="/">
                <Button
                  variant={isActive("/logout") ? "secondary" : "outline"}
                  size="sm"
                  className="flex items-center gap-1.5"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  <span>{t("Logout")}</span>
                </Button>
              </Link>
            </>
          ) : (
            <>
              {" "}
              <Link href="/login">
                <Button
                  variant={isActive("/login") ? "secondary" : "ghost"}
                  size="sm"
                  className="flex items-center gap-1.5"
                >
                  <LogIn className="h-4 w-4" />
                  <span>{t("login")}</span>
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  variant={isActive("/register") ? "secondary" : "outline"}
                  size="sm"
                  className="flex items-center gap-1.5"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>{t("register")}</span>
                </Button>
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
        </div>

        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <MobileNav open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
    </header>
  );
};

export default Header;
