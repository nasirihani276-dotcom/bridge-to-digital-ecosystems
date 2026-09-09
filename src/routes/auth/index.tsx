import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-session";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/auth/")({
  head: () => ({
    meta: [
      { title: "ورود و ثبت‌نام | اطلس پل" },
      {
        name: "description",
        content:
          "با ثبت‌نام در پل به مشخصات ثبتی و حقوقی بنگاه‌های اکوسیستم‌های اقتصاد دیجیتال دسترسی پیدا کنید.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { session, loading } = useSession();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      setError(error.message);
      return;
    }
    navigate({ to: "/players" });
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    setBusy(false);
    if (error) {
      setError(error.message);
      return;
    }
    setNotice("ثبت‌نام انجام شد. اگر تأیید ایمیل فعال باشد، ایمیل خود را بررسی کنید.");
  }

  async function handleSignOut() {
    setBusy(true);
    await supabase.auth.signOut();
    setBusy(false);
  }

  if (!loading && session) {
    return (
      <section className="mx-auto max-w-md px-5 py-20 text-center">
        <p className="text-xs font-bold tracking-[0.2em] text-brand">اطلس / حساب کاربری</p>
        <h1 className="mt-4 text-3xl font-black">وارد حساب خود شده‌اید</h1>
        <p className="mt-4 text-sm text-muted-foreground">{session.user.email}</p>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          اکنون می‌توانید در صفحهٔ هر بنگاه، بخش مشخصات ثبتی و حقوقی را مشاهده کنید.
        </p>
        <Button className="mt-8" variant="outline" disabled={busy} onClick={handleSignOut}>
          خروج از حساب
        </Button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-md px-5 py-16">
      <p className="text-xs font-bold tracking-[0.2em] text-brand">اطلس / حساب کاربری</p>
      <h1 className="mt-4 text-3xl font-black">ورود یا ثبت‌نام</h1>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">
        مشخصات ثبتی و حقوقی بنگاه‌ها فقط برای کاربران ثبت‌نام‌کرده نمایش داده می‌شود.
        پروفایل عمومی هر بنگاه بدون نیاز به ورود در دسترس همه است.
      </p>

      <Tabs defaultValue="signin" className="mt-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">ورود</TabsTrigger>
          <TabsTrigger value="signup">ثبت‌نام</TabsTrigger>
        </TabsList>

        <TabsContent value="signin">
          <form className="mt-6 space-y-4" onSubmit={handleSignIn}>
            <div className="space-y-2">
              <Label htmlFor="signin-email">ایمیل</Label>
              <Input
                id="signin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signin-password">رمز عبور</Label>
              <Input
                id="signin-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={busy}>
              ورود
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="signup">
          <form className="mt-6 space-y-4" onSubmit={handleSignUp}>
            <div className="space-y-2">
              <Label htmlFor="signup-name">نام و نام خانوادگی</Label>
              <Input
                id="signup-name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-email">ایمیل</Label>
              <Input
                id="signup-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">رمز عبور</Label>
              <Input
                id="signup-password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            {notice && <p className="text-sm text-[color:var(--teal)]">{notice}</p>}
            <Button type="submit" className="w-full" disabled={busy}>
              ثبت‌نام
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </section>
  );
}
