"use client";
import React from "react";
import "./globals.css";

import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Star,
  Trophy,
  PlusCircle,
  FileText,
  BarChart3,
  Award,
  Clock,
  Users,
} from "lucide-react";
import SiteHeader from "@/components/layout/SiteHeader";
import Footer from "@/components/layout/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageProvider";
import { useAuth } from "@/context/AuthContext";

const Home = () => {
  const { t, language } = useLanguage();
  const isRtl = language === "ar";
  const { user } = useAuth();
  const steps = [
    {
      title: t("createYourDocumentTitle"),
      description: t("createYourDocumentDesc"),
      icon: <PlusCircle className="h-10 w-10 text-[hsl(var(--primary))]" />,
    },
    {
      title: t("addAchievementsTitle"),
      description: t("addAchievementsDesc"),
      icon: <Star className="h-10 w-10 text-[hsl(var(--primary))]" />,
    },
    {
      title: t("trackImpactTitle"),
      description: t("trackImpactDesc"),
      icon: <BarChart3 className="h-10 w-10 text-[hsl(var(--primary))]" />,
    },
    {
      title: t("shareAndReviewTitle"),
      description: t("shareAndReviewDesc"),
      icon: <Users className="h-10 w-10 text-[hsl(var(--primary))]" />,
    },
  ];

  const testimonials = [
    {
      name: "Tamer Johnson",
      role: "Senior Product Manager",
      company: "TechCorp",
      text: t("testimonial1Text"),
      avatar:
        "https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "محمد أحمد",
      role: "مهندس برمجيات",
      company: "تك سوليوشنز",
      text: t("testimonial2Text"),
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Colomb Chen",
      role: "UX Designer",
      company: "DesignHub",
      text: t("testimonial3Text"),
      avatar:
        "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const templates = [
    {
      title: t("productManagerTitle"),
      description: t("productManagerDesc"),
      icon: <BarChart3 className="h-10 w-10 text-[hsl(var(--primary))]" />,
    },
    {
      title: t("softwareEngineerTitle"),
      description: t("softwareEngineerDesc"),
      icon: <FileText className="h-10 w-10 text-[hsl(var(--primary))]" />,
    },
    {
      title: t("uxDesignerTitle"),
      description: t("uxDesignerDesc"),
      icon: <Users className="h-10 w-10 text-[hsl(var(--primary))]" />,
    },
    {
      title: t("marketingSpecialistTitle"),
      description: t("marketingSpecialistDesc"),
      icon: <Award className="h-10 w-10 text-[hsl(var(--primary))]" />,
    },
  ];

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isRtl ? "font-arabic text-right" : ""
      }`}
    >
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight  animate-fade-in ${
                isRtl ? "font-arabic" : ""
              }`}
            >
              <span className="text-gradient">{t("documentAchievements")}</span>
              <br />
              <span className="leading-tight">{t("advanceCareer")}</span>
            </h1>

            <p className="mt-6 text-xl text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto animate-slide-up">
              {t("landingDescription")}
            </p>

            <div
              className="mt-10 flex flex-wrap gap-4 justify-center animate-slide-up"
              style={{ animationDelay: "100ms" }}
            >
              {user ? (
                <>
                  <Link href="/create">
                    <Button size="lg" className="gap-2">
                      <PlusCircle className="h-5 w-5" />
                      {t("createFirstDocument")}
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button size="lg" variant="outline" className="gap-2">
                      {t("exploreDashboard")}
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button size="lg" className="gap-2">
                      <PlusCircle className="h-5 w-5" />
                      {t("createFirstDocument")}
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button size="lg" variant="outline" className="gap-2">
                      {t("exploreDashboard")}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 bg-[hsl(var(--accent)/0.5)]">
          <div className="max-w-5xl mx-auto">
            <h2
              className={`text-3xl font-bold text-center mb-12  ${
                isRtl ? "font-arabic" : ""
              }`}
            >
              {t("whyUsePrometica")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[hsl(var(--background))] rounded-xl p-6 shadow-sm flex flex-col items-center text-center animate-fade-in hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="h-12 w-12 rounded-full bg-[hsl(var(--primary))]/10  flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-[hsl(var(--primary))]" />
                </div>
                <h3 className="text-xl font-medium mb-2 ">
                  {t("trackEverything")}
                </h3>
                <p className="text-[hsl(var(--muted-foreground))]">
                  {t("trackEverythingDesc")}
                </p>
              </div>

              <div
                className="bg-[hsl(var(--background))] rounded-xl p-6 shadow-sm flex flex-col items-center text-center animate-fade-in hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: "100ms" }}
              >
                <div className="h-12 w-12 rounded-full bg-[hsl(var(--primary))]/10 flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-[hsl(var(--primary))]" />
                </div>
                <h3 className="text-xl font-medium mb-2 ">
                  {t("showcaseImpact")}
                </h3>
                <p className="text-[hsl(var(--muted-foreground))]">
                  {t("showcaseImpactDesc")}
                </p>
              </div>

              <div
                className="bg-[hsl(var(--background))] rounded-xl p-6 shadow-sm flex flex-col items-center text-center animate-fade-in hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: "200ms" }}
              >
                <div className="h-12 w-12 rounded-full bg-[hsl(var(--primary))]/10 flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-[hsl(var(--primary))]" />
                </div>
                <h3 className="text-xl font-medium mb-2 ">
                  {t("advanceYourCareer")}
                </h3>
                <p className="text-[hsl(var(--muted-foreground))]">
                  {t("advanceYourCareerDesc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h2
              className={`text-3xl font-bold text-center mb-12  ${
                isRtl ? "font-arabic" : ""
              }`}
            >
              {t("howItWorks")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="bg-[hsl(var(--background))] rounded-xl p-6 shadow-sm flex flex-col items-center text-center animate-fade-in hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="h-16 w-16 rounded-full bg-[hsl(var(--primary))]/10 flex items-center justify-center mb-4 animate-float">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2 ">{step.title}</h3>
                  <p className="text-[hsl(var(--muted-foreground))]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-6 bg-[hsl(var(--accent))]/30">
          <div className="max-w-5xl mx-auto">
            <h2
              className={`text-3xl font-bold text-center mb-12  ${
                isRtl ? "font-arabic" : ""
              }`}
            >
              {t("testimonials")}
            </h2>

            <Carousel className="w-full max-w-4xl mx-auto">
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index}>
                    <Card className="border-none shadow-lg bg-[hsl(var(--background))]/80 backdrop-blur-sm">
                      <CardContent className="p-8 flex flex-col items-center text-center">
                        <div className="w-20 h-20 mb-6">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="rounded-full w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-xl mb-4 ">{testimonial.text}</p>
                        <h3 className="text-lg font-semibold ">
                          {testimonial.name}
                        </h3>
                        <p className="">{testimonial.role}</p>
                        <p className="text-[hsl(var(--muted-foreground))]">
                          {testimonial.company}
                        </p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>

        {/* Templates Section */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h2
              className={`text-3xl font-bold text-center mb-12  ${
                isRtl ? "font-arabic" : ""
              }`}
            >
              {t("featuredTemplates")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {templates.map((template, index) => (
                <div
                  key={index}
                  className="bg-[hsl(var(--background))] rounded-xl p-6 shadow-sm flex flex-col items-center text-center animate-fade-in hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="h-16 w-16 rounded-full bg-[hsl(var(--primary))]/10 flex items-center justify-center mb-4">
                    {template.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2 ">
                    {template.title}
                  </h3>
                  <p className="text-[hsl(var(--muted-foreground))]">
                    {template.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-[hsl(var(--primary))]/10 to-[hsl(var(--accent))] rounded-2xl p-8 md:p-12 shadow-sm">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h2
                    className={`text-3xl font-bold mb-4 ${
                      isRtl ? "font-arabic" : ""
                    }`}
                  >
                    {t("readyToStart")}
                  </h2>
                  <p className="text-lg text-[hsl(var(--muted-foreground))] mb-6">
                    {t("readyToStartDesc")}
                  </p>
                  {user ? (
                    <>
                      {" "}
                      <Link href="/create">
                        <Button size="lg" className="gap-2">
                          <PlusCircle className="h-5 w-5" />
                          {t("getStartedNow")}
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      {" "}
                      <Link href="/login">
                        <Button size="lg" className="gap-2">
                          <PlusCircle className="h-5 w-5" />
                          {t("getStartedNow")}
                        </Button>
                      </Link>
                    </>
                  )}
                </div>

                <div className="flex-1 flex justify-center md:justify-end">
                  <div className="glass w-64 h-64 rounded-2xl shadow-lg flex items-center justify-center overflow-hidden animate-float">
                    <div className="text-8xl font-bold text-gradient">A+</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
