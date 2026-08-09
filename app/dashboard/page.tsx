import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen paper-grid">
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-4xl font-medium">Dashboard</h1>
          <UserButton />
        </div>
        <p className="font-body text-ink-faded mt-2">
          Signed in — this is the protected area.
        </p>
      </div>
    </div>
  );
}
