"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProject(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
  const status = formData.get("status") as string;
  const tagsRaw = formData.get("tags") as string;
  const summary = formData.get("summary") as string;
  const content = formData.get("content") as string;

  const tags = tagsRaw
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  await prisma.project.create({
    data: {
      title,
      slug,
      status,
      tags,
      startDate: new Date(),
      summary,
      content,
    },
  });

  revalidatePath("/journal");
  redirect("/dashboard");
}
