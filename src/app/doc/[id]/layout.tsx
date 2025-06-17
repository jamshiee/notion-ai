import RoomProvider from "@/components/RoomProvider";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ id: string }>; // <-- 👈 required by Next.js during build
};

const DocLayout = async ({ children, params }: LayoutProps) => {
  const resolvedParams = await params; // <-- 👈 await here
  return <RoomProvider roomId={resolvedParams.id}>{children}</RoomProvider>;
};

export default DocLayout;
