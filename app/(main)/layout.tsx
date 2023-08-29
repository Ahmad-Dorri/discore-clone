import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const session = await getServerSession();
  console.log(session);
  const userId = session?.user?.name;
  if (!userId) {
    redirect("/");
  }

  return (
    <>
      {/* @ts-ignore */}
      {children}
    </>
  );
}
