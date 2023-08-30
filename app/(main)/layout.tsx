import { getServerSession } from "next-auth";

const PagesLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();

  return <>{children}</>;
};

export default PagesLayout;
