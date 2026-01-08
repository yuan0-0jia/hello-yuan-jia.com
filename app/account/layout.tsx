import SideNavigation from "../_components/SideNav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex-1 py-12 bg-cream dark:bg-warmGray-900">
      <div className="max-w-7xl mx-auto w-full h-[calc(100vh-12rem)] px-4">
        <div className="grid grid-cols-[16rem_1fr] gap-8 h-full">
          <SideNavigation />
          <div className="flex flex-col overflow-y-auto">{children}</div>
        </div>
      </div>
    </main>
  );
}
