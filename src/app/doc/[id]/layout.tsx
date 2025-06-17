import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";

type LayoutProps = {
  children: React.ReactNode;
  params: { id: string };
};

const DocLayout = async ({ children, params }: LayoutProps) => {
  await auth.protect(); 
  return <RoomProvider roomId={params.id}>{children}</RoomProvider>;
};

export default DocLayout;
