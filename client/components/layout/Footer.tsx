"use client";
import { useAuth } from "@/api/AuthContext";
import { useLanguage } from "@/context/LanguageProvider";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const { t, language } = useLanguage();
  const isRtl = language === "ar";
  const { user } = useAuth();

  return (
    <footer className="w-full py-8 border-t border-[hsl(var(--border))] mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 rounded-xl bg-[hsl(var(--primary))]/10 flex items-center justify-center">
              <div className="w-4 h-4 bg-[hsl(var(--primary))] rounded-lg" />
            </div>
            <span className="text-lg font-medium">Prometica</span>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-[hsl(var(--muted-foreground))]">
            <Link
              href="/"
              className="hover:text-[hsl(var(--foreground))] transition-colors"
            >
              {t("home")}
            </Link>
            {user && (
              <>
                <Link
                  href="/dashboard"
                  className="hover:text-[hsl(var(--foreground))] transition-colors"
                >
                  {t("dashboard")}
                </Link>
                <Link
                  href="/create"
                  className="hover:text-[hsl(var(--foreground))] transition-colors"
                >
                  {t("newDocument")}
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[hsl(var(--border))]/50 flex flex-col md:flex-row justify-between items-center text-sm text-[hsl(var(--muted-foreground))]">
          <p>{t("copyRight")} © Apr-2025</p>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <Link
              href="#"
              className="hover:text-[hsl(var(--foreground))] transition-colors"
            >
              {t("privacyPolicy")}
            </Link>
            <Link
              href="#"
              className="hover:text-[hsl(var(--foreground))] transition-colors"
            >
              {t("termsOfService")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
