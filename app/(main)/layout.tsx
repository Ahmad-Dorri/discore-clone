import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="relative h-full">
        <div className="fixed inset-y-0 z-30 hidden h-full w-[72px] flex-col  md:flex">
          {/* @ts-expect-error Server Component */}
          <NavigationSidebar />
        </div>
        <main className="h-full  md:pl-[72px]">{children}</main>
      </div>
    </>
  );
};

export default MainLayout;
