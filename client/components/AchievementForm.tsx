import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/context/LanguageProvider";

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(100, {
      message: "Title must not exceed 100 characters.",
    }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(1000, {
      message: "Description must not exceed 1000 characters.",
    }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Please enter a valid date in YYYY-MM-DD format.",
  }),
  impact: z
    .string()
    .max(500, {
      message: "Impact statement must not exceed 500 characters.",
    })
    .optional(),
  category: z.enum(
    [
      "Project",
      "Skill",
      "Recognition",
      "Leadership",
      "Innovation",
      "Collaboration",
    ],
    {
      required_error: "Please select a category.",
    }
  ),
});

type FormValues = z.infer<typeof formSchema>;

interface AchievementFormProps {
  initialValues?: Partial<FormValues>;
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
}

const AchievementForm = ({
  initialValues,
  onSubmit,
  onCancel,
}: AchievementFormProps) => {
  const { t, language } = useLanguage();
  const isRtl = language === "ar";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialValues?.title || "",
      description: initialValues?.description || "",
      date: initialValues?.date
        ? new Date(initialValues.date).toISOString().split("T")[0] // Format to YYYY-MM-DD
        : new Date().toISOString().split("T")[0],
      impact: initialValues?.impact || "",
      category: initialValues?.category || "Project",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      onSubmit(values);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 animate-fade-in"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("title")}</FormLabel>
              <FormControl>
                <Input placeholder="What did you accomplish?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("category")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Project">Project</SelectItem>
                    <SelectItem value="Skill">Skill</SelectItem>
                    <SelectItem value="Recognition">Recognition</SelectItem>
                    <SelectItem value="Leadership">Leadership</SelectItem>
                    <SelectItem value="Innovation">Innovation</SelectItem>
                    <SelectItem value="Collaboration">Collaboration</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("date")}</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("description")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your achievement in detail..."
                  className="min-h-32 resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="impact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("impact")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What was the business impact of your work?"
                  className="min-h-20 resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onCancel}>
            {t("Cancel")}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : initialValues
              ? "Update"
              : "Add Achievement"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AchievementForm;
