import LightRays from "@/components/ui/LightRays";
import Navbar from "@/components/layout/Navbar";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="absolute inset-0 z-[-1] top-0 min-h-screen">
        <LightRays />
      </div>
      <main>{children}</main>
    </>
  );
}
