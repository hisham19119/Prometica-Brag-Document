"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
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
import { LogIn } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageProvider";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { t, language } = useLanguage();
  const isRtl = language === "ar";

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      await login(values.email, values.password);
      router.push("/dashboard");
    } catch (err) {
      toast.error(t("Failed to Login"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 pt-24 pb-16 px-6 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto">
          <Card className="animate-scale-in">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">{t("Login")}</CardTitle>
              <CardDescription>
                {t("Enter your credentials to access your account")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("Email")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="email@example.com"
                            type="email"
                            autoComplete="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("Password")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="••••••••"
                            type="password"
                            autoComplete="current-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full mt-2 group"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></span>
                    ) : (
                      <>
                        <LogIn className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                        {t("Login")}
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 mt-2">
              <div className="text-sm text-[hsl(var(--muted-foreground))] text-center w-full">
                {t("Don't have an account?")}{" "}
                <Link
                  href="/register"
                  className="text-[hsl(var(--primary))] hover:underline transition-all font-medium"
                >
                  {t("Register")}
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
