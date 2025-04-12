"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AchievementProps } from "@/components/Achievement";
import BragDocument from "@/components/BragDocument";
import AchievementForm from "@/components/AchievementForm";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { usePathname, useRouter } from "next/navigation";
import { useDocument, useDocuments } from "@/hooks/useDocuments";
import { useAchievements } from "@/hooks/useAchievements";
import { useLanguage } from "@/context/LanguageProvider";

type NewDocument = {
  id: string;
  title: string;
  achievements: AchievementProps[];
};

const Create = () => {
  const { t, language } = useLanguage();
  const isRtl = language === "ar";

  const router = useRouter();
  const { updateDocument, deleteDocument } = useDocuments();
  const [step, setStep] = useState<"title" | "achievements">("achievements");
  const pathname = usePathname();
  const docID = pathname.split("/")[2];
  const { data: doc } = useDocument(docID);
  const [document, setDocument] = useState<NewDocument>({
    id: docID,
    title: "",
    achievements: [],
  });
  const { createAchievement, deleteAchievement, updateAchievement } =
    useAchievements(doc?._id);
  const [showForm, setShowForm] = useState(false);
  const [currentAchievement, setCurrentAchievement] =
    useState<Partial<AchievementProps> | null>(null);

  useEffect(() => {
    if (doc) {
      console.log("the doc docdocv now is ", doc);
      setDocument({
        id: doc?._id,
        title: doc.title || "",
        achievements: doc.achievements || [],
      });
    }
  }, [doc, docID]);

  const handleAddAchievement = () => {
    setCurrentAchievement(null);
    setShowForm(true);
  };

  const handleEditAchievement = (id: string) => {
    console.log("Editing achievement with ID:", id);
    const achievement =
      document.achievements.find((ach) => ach.id === id) ||
      doc?.achievements?.find((a: any) => a._id === id);

    if (achievement) {
      setCurrentAchievement(achievement);
      setShowForm(true);
    } else {
      console.error("Achievement not found with ID:", id);
    }
  };

  const handleDeleteAchievement = async (id: string) => {
    try {
      await deleteAchievement(id);
      setDocument((prevDoc) => ({
        ...prevDoc,
        achievements: prevDoc.achievements.filter((a) => a._id !== id),
      }));
      window.location.reload();
    } catch (error) {
      console.error("Error deleting achievement:", error);
    }
  };

  const handleStarAchievement = (id: string) => {
    setDocument({
      ...document,
      achievements: document.achievements.map((a) =>
        a.id === id ? { ...a, starred: !a.starred } : a
      ),
    });
  };

  const handleFormSubmit = async (values: any) => {
    console.log("currentAchievement>>>", currentAchievement);
    try {
      if (currentAchievement?._id) {
        await updateAchievement({
          achievementId: currentAchievement._id,
          updatedFields: values,
        });
        setDocument((prevDoc) => ({
          ...prevDoc,
          achievements: prevDoc.achievements.map((achievement) =>
            achievement._id === currentAchievement._id
              ? { ...achievement, ...values }
              : achievement
          ),
        }));
      } else {
        const newAchievement = { ...values };
        console.log("New Achievement to create:", newAchievement);
        await createAchievement(newAchievement);
        setDocument((prevDoc) => ({
          ...prevDoc,
          achievements: [...prevDoc.achievements, newAchievement],
        }));
      }
    } catch (error) {
      console.error("Error while saving achievement:", error);
    } finally {
      setShowForm(false);
      setCurrentAchievement(null);
      window.location.reload();
    }
  };

  const handleUpdateTitle = (title: string) => {
    setDocument({
      ...document,
      title,
    });
    updateDocument({ id: document.id, data: { title } });
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
          {step === "achievements" && (
            <>
              {showForm ? (
                <Card className="max-w-3xl mx-auto animate-fade-in">
                  <CardHeader>
                    <CardTitle>
                      {currentAchievement
                        ? t("Edit Achievement")
                        : t("Add New Achievement")}
                    </CardTitle>
                    <CardDescription>
                      {currentAchievement
                        ? t("Update the details of your achievement")
                        : t("Document a new professional accomplishment")}
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
                      onClick={handleDeleteDocument}
                      variant="destructive"
                      className="ml-4"
                    >
                      {t("Delete Document")}
                    </Button>
                  </div>

                  <BragDocument
                    id={document?.id}
                    title={document?.title}
                    achievements={document?.achievements}
                    onAddAchievement={handleAddAchievement}
                    onEditAchievement={handleEditAchievement}
                    onDeleteAchievement={handleDeleteAchievement}
                    onStarAchievement={handleStarAchievement}
                    onUpdateTitle={handleUpdateTitle}
                    onClick={(achievementId) => {
                      setCurrentAchievement(
                        doc?.achievements.find(
                          (a: any) => a._id === achievementId
                        ) ?? null
                      );
                      setShowForm(true);
                    }}
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
