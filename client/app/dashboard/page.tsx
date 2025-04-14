"use client";
import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PlusCircle,
  File,
  Star,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useRouter } from "next/navigation";
import { useDocuments } from "@/hooks/useDocuments";
import { useLanguage } from "@/context/LanguageProvider";

// Sample data
const initialDocuments = [
  {
    id: "1",
    title: "2023 Accomplishments",
    achievementCount: 12,
    lastUpdated: "2023-12-15T12:00:00Z",
    categories: ["Project", "Recognition", "Leadership"],
  },
  {
    id: "2",
    title: "Q1 2024 Goals & Achievements",
    achievementCount: 5,
    lastUpdated: "2024-01-30T15:30:00Z",
    categories: ["Project", "Skill", "Collaboration"],
  },
];

const Dashboard = () => {
  // const [documents, setDocuments] = useState(initialDocuments);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);
  const router = useRouter();
  const { documents } = useDocuments();
  const { t, language } = useLanguage();
  const isRtl = language === "ar";

  const handleCreateDocument = () => {
    router.push("/create");
  };

  const handleDeleteClick = (id: string) => {
    setDocumentToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (documentToDelete) {
      // setDocuments(documents.filter((doc) => doc.id !== documentToDelete));
      // toast({
      //   title: "Document deleted",
      //   description: "Your brag document has been deleted.",
      // });
      setDeleteDialogOpen(false);
      setDocumentToDelete(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">{t("title")}</h1>
              <p className="text-[(var(--muted-foreground))] mt-1">
                {t("subtitle")}
              </p>
            </div>

            <Button onClick={handleCreateDocument} className="gap-2">
              <PlusCircle className="h-4 w-4" />
              {t("newDocument")}
            </Button>
          </div>

          {documents?.length === 0 ? (
            <EmptyState
              title={t("emptyTitle")}
              description={t("emptyDescription")}
              buttonText={t("emptyButton")}
              onClick={handleCreateDocument}
              icon={
                <File className="h-8 w-8 text-[(var(--muted-foreground))]" />
              }
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents?.map((doc: any) => (
                <Card
                  key={doc._id}
                  className="overflow-hidden group card-hover"
                >
                  <CardHeader className="relative pb-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity border-none"
                        >
                          <MoreHorizontal className="h-4 w-4 border-none" />
                          <span className="sr-only">{t("menuOpen")}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem
                          onClick={() => router.push(`/document/${doc.id}`)}
                          className="cursor-pointer"
                        >
                          <Pencil className="h-4 w-4 mr-2" />
                          {t("edit")}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(doc.id)}
                          className="cursor-pointer text-[hsl(var(--destructive))] focus:text-[hsl(var(--destructive))]"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          {t("delete")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="flex items-center gap-2.5">
                      <div className="h-10 w-10 rounded-lg bg-[hsl(var(--primary))]/10 flex items-center justify-center">
                        <File className="h-5 w-5 text-[hsl(var(--primary))]" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{doc.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pb-4">
                    <div className="flex items-center text-sm text-[(var(--muted-foreground))]">
                      <span>
                        {t("achievements")}({doc?.achievements?.length})
                      </span>
                      <span className="mx-2">•</span>
                      <span>
                        {t("updated")} {formatDate(doc?.updatedAt)}
                      </span>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-0">
                    <Button
                      variant="ghost"
                      className="w-full justify-center hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] transition-colors"
                      onClick={() => router.push(`/dashboard/${doc._id}`)}
                    >
                      {t("viewDocument")}
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              <Card
                className="border-dashed border-2 bg-[hsl(var(--background))]/50 hover:bg-[hsl(var(--background))]/80 transition-colors h-full flex flex-col items-center justify-center p-6 cursor-pointer"
                onClick={handleCreateDocument}
              >
                <div className="h-16 w-16 rounded-full bg-[hsl(var(--muted))] flex items-center justify-center mb-4">
                  <PlusCircle className="h-8 w-8 text-[(var(--muted-foreground))]" />
                </div>
                <h3 className="text-xl font-medium mb-1">{t("createNew")}</h3>
                <p className="text-sm text-center text-[(var(--muted-foreground))]">
                  {t("createDescription")}
                </p>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("deleteTitle")}</DialogTitle>
            <DialogDescription>{t("deleteDescription")}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              {t("cancel")}
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              {t("delete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
