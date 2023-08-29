import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const session = await getServerSession();
  const user = session?.user;
  // if (!user) {
  //   redirect("/api/auth/signin");
  // }

  return (
    <>
      {/* @ts-ignore */}
      {children}
    </>
  );
}
