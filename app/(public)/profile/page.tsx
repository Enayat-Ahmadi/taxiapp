import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { signOutAction } from "@/actions/auth.actions";
import Link from "next/link";
import { buttonVariants } from "@/lib/buttonVariants";
import { Card } from "@/components/ui";
import { ROUTES } from "@/lib/routes";
import { LayoutDashboard, LogOut, User } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect(ROUTES.login);
  }

  const { user } = session;
  const isAdmin = user.role === "admin";

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-sm space-y-6 p-6">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-teal flex items-center justify-center">
            <User className="w-8 h-8 text-cloud-light" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-lg text-ink">{user.name}</p>
            <p className="text-sm text-ink-light">{user.email}</p>
            <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-teal/20 text-teal-dark capitalize">
              {user.role}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {isAdmin && (
            <Link
              href={ROUTES.admin}
              className={buttonVariants("teal", "md", "w-full")}
            >
              <LayoutDashboard className="w-4 h-4" />
              Admin Dashboard
            </Link>
          )}

          <form action={signOutAction}>
            <button
              type="submit"
              className={buttonVariants("outline", "md", "w-full")}
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-ink-light">
          <Link href={ROUTES.home} className="underline">
            Back to home
          </Link>
        </p>
      </Card>
    </div>
  );
}
