import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { options } from "../auth/[...nextauth]/options";

const f = createUploadthing();

const handleAuth = async () => {
  const session = await getServerSession(options);
  const userId = session?.user.id;
  if (!userId) {
    throw new Error("Unauthorized");
  }
  return {
    userId: userId,
  };
};

export const ourFileRouter = {
  serverImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  messageFile: f(["image", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
