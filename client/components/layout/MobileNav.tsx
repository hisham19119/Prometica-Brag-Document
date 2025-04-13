"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Home,
  LayoutDashboard,
  PlusCircle,
  LogIn,
  UserPlus,
  X,
  LogOut,
} from "lucide-react";
import toast from "react-hot-toast";
import { ThemeToggle } from "../ThemeToggle";
import { LanguageToggle } from "../LanguageToggle";
import { useLanguage } from "@/context/LanguageProvider";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/api/AuthContext";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileNav = ({ open, onOpenChange }: MobileNavProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (path: string) => pathname === path;
  const { t, language } = useLanguage();
  const { user, logout } = useAuth();

  const isRtl = language === "ar";
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
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[85vh] rounded-t-xl">
        <DrawerHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl font-medium">
              {t("home")}
            </DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <X className="h-5 w-5" />
                <span className="sr-only">{t("Close")}</span>
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>
        <nav
          className={`flex flex-col gap-2 p-4 ${
            isRtl ? "items-end" : "items-start"
          }`}
        >
          <Link href="/" onClick={() => onOpenChange(false)}>
            <Button
              variant={isActive("/") ? "secondary" : "ghost"}
              size="default"
              className={`w-full justify-start ${
                isRtl ? "flex-row-reverse" : ""
              }`}
            >
              <Home className={`h-5 w-5 ${isRtl ? "mr-0 ml-2" : "mr-2"}`} />
              <span>{t("home")}</span>
            </Button>
          </Link>
          {user && (
            <>
              <Link href="/dashboard" onClick={() => onOpenChange(false)}>
                <Button
                  variant={isActive("/dashboard") ? "secondary" : "ghost"}
                  size="default"
                  className={`w-full justify-start ${
                    isRtl ? "flex-row-reverse" : ""
                  }`}
                >
                  <LayoutDashboard
                    className={`h-5 w-5 ${isRtl ? "mr-0 ml-2" : "mr-2"}`}
                  />
                  <span>{t("dashboard")}</span>
                </Button>
              </Link>

              <Link href="/create" onClick={() => onOpenChange(false)}>
                <Button
                  variant="default"
                  size="default"
                  className={`w-full justify-start ${
                    isRtl ? "flex-row-reverse" : ""
                  }`}
                >
                  <PlusCircle
                    className={`h-5 w-5 ${isRtl ? "mr-0 ml-2" : "mr-2"}`}
                  />
                  <span>{t("newDocument")}</span>
                </Button>
              </Link>
            </>
          )}

          <div className="my-2 border-t border-[hsl(var(--border))]"></div>

          {user ? (
            <>
              <Link href="/" onClick={() => onOpenChange(false)}>
                <Button
                  variant="outline"
                  size="default"
                  className={`w-full justify-start ${
                    isRtl ? "flex-row-reverse" : ""
                  }`}
                  onClick={handleLogout}
                >
                  <LogOut
                    className={`h-5 w-5 ${isRtl ? "mr-0 ml-2" : "mr-2"}`}
                  />
                  <span>{t("Logout")}</span>
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => onOpenChange(false)}>
                <Button
                  variant="ghost"
                  size="default"
                  className={`w-full justify-start ${
                    isRtl ? "flex-row-reverse" : ""
                  }`}
                >
                  <LogIn
                    className={`h-5 w-5 ${isRtl ? "mr-0 ml-2" : "mr-2"}`}
                  />
                  <span>{t("login")}</span>
                </Button>
              </Link>
              <Link href="/register" onClick={() => onOpenChange(false)}>
                <Button
                  variant="outline"
                  size="default"
                  className={`w-full justify-start ${
                    isRtl ? "flex-row-reverse" : ""
                  }`}
                >
                  <UserPlus
                    className={`h-5 w-5 ${isRtl ? "mr-0 ml-2" : "mr-2"}`}
                  />
                  <span>{t("register")}</span>
                </Button>
              </Link>
            </>
          )}

          <div className="mt-auto space-y-4">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </nav>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNav;
