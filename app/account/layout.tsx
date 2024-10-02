import SideNavigation from "../_components/SideNav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex-1 py-12 grid max-w-7xl mx-auto w-full">
      <div
        className="grid grid-cols-[16rem_1fr] h-full
      gap-12"
      >
        <SideNavigation />
        <div className="flex flex-col">{children}</div>
      </div>
    </main>
  );
}
