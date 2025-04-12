"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AchievementProps } from "@/components/Achievement";
import BragDocument from "@/components/BragDocument";
import AchievementForm from "@/components/AchievementForm";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useRouter } from "next/navigation";
import { useDocuments } from "@/hooks/useDocuments";
import { useAchievements } from "@/hooks/useAchievements";
import { createDocument } from "@/api/document.api";
import { useLanguage } from "@/context/LanguageProvider";
type NewDocument = {
  id: string;
  title: string;
  achievements: AchievementProps[];
};

const Create = () => {
  const router = useRouter();

  const {
    // createDocument,
    createDocumentResult,
    updateDocument,
    deleteDocument,
    documents,
  } = useDocuments();
  const [step, setStep] = useState<"title" | "achievements">("title");
  const [document, setDocument] = useState<NewDocument>({
    id: "",
    title: "",
    achievements: [],
  });
  const { t, language } = useLanguage();
  const isRtl = language === "ar";
  const {
    createAchievement,
    // deleteAchievement,
    updateAchievement,
  } = useAchievements(document.id);
  const [showForm, setShowForm] = useState(false);
  const [currentAchievement, setCurrentAchievement] =
    useState<Partial<AchievementProps> | null>(null);

  const handleTitleSubmit = async () => {
    if (!document.title.trim()) {
      // Handle title validation
      return;
    }

    try {
      const createdDocument = await createDocument({
        title: document.title,
        achievements: document.achievements,
      });

      console.log("Document created:", createdDocument);

      if (createdDocument && createdDocument?._id) {
        setDocument((prev) => ({
          ...prev,
          id: createdDocument._id,
          title: createdDocument.title,
          achievements: [],
        }));
        console.log("i was created nowww");
        router.push(`/dashboard/${createdDocument?._id}`);
      } else {
        console.error("Created document is missing ID:", createdDocument);
      }
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  const handleAddAchievement = () => {
    setCurrentAchievement(null);
    setShowForm(true);
  };

  const handleEditAchievement = (id: string) => {
    const achievement = document.achievements.find((a) => a.id === id);
    if (achievement) {
      setCurrentAchievement(achievement);
      setShowForm(true);
    }
  };

  const handleDeleteAchievement = (id: string) => {
    setDocument({
      ...document,
      achievements: document.achievements.filter((a) => a.id !== id),
    });
  };

  const handleStarAchievement = (id: string) => {
    setDocument({
      ...document,
      achievements: document.achievements.map((a) =>
        a.id === id ? { ...a, starred: !a.starred } : a
      ),
    });
  };

  const handleFormSubmit = (values: any) => {
    if (currentAchievement?.id) {
      updateAchievement({
        achievementId: currentAchievement.id,
        updatedFields: values,
      });
    } else {
      const newAchievement = { ...values };
      console.log("New Achievement to create:", newAchievement); // Log the new achievement
      createAchievement(newAchievement);
    }
    setShowForm(false);
    setCurrentAchievement(null);
  };

  const handleUpdateTitle = (title: string) => {
    setDocument({
      ...document,
      title,
    });
    updateDocument({ id: document.id, data: { title } });
  };

  const handleSave = () => {
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  const handleDeleteDocument = () => {
    deleteDocument(document.id);
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {step === "title" && (
            <Card className="max-w-md mx-auto animate-scale-in">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {t("createNewBragDoc")}
                </CardTitle>
                <CardDescription>{t("getStarted")}</CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleTitleSubmit();
                  }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <Label htmlFor="title">{t("Document Title")}</Label>
                    <Input
                      id="title"
                      placeholder="e.g., 2024 Accomplishments or Q2 Achievements"
                      value={document.title}
                      onChange={(e) =>
                        setDocument({ ...document, title: e.target.value })
                      }
                      autoFocus
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit">{t("Continue")}</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {step === "achievements" && (
            <>
              {showForm ? (
                <Card className="max-w-3xl mx-auto animate-fade-in">
                  <CardHeader>
                    <CardTitle>
                      {currentAchievement
                        ? "Edit Achievement"
                        : "Add New Achievement"}
                    </CardTitle>
                    <CardDescription>
                      {currentAchievement
                        ? "Update the details of your achievement"
                        : "Document a new professional accomplishment"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AchievementForm
                      initialValues={currentAchievement || undefined}
                      onSubmit={handleFormSubmit}
                      onCancel={() => {
                        setShowForm(false);
                        setCurrentAchievement(null);
                      }}
                    />
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-end">
                    <Button
                      onClick={handleSave}
                      disabled={document.achievements.length === 0}
                    >
                      Save Document
                    </Button>
                    <Button
                      onClick={handleDeleteDocument}
                      variant="destructive"
                      className="ml-4"
                    >
                      Delete Document
                    </Button>
                  </div>

                  <BragDocument
                    id={document.id}
                    title={document.title}
                    achievements={document.achievements}
                    onAddAchievement={handleAddAchievement}
                    onEditAchievement={handleEditAchievement}
                    onDeleteAchievement={handleDeleteAchievement}
                    onStarAchievement={handleStarAchievement}
                    onUpdateTitle={handleUpdateTitle}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Create;
