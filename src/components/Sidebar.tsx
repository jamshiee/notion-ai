"use client";
import { MenuIcon } from "lucide-react";
import NewDocumentButton from "./NewDocumentButton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUser } from "@clerk/nextjs";
import {
  collectionGroup,
  DocumentData,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import SidebarOptions from "./SidebarOptions";

interface RoomDocument extends DocumentData {
  createdAt: string;
  role: "owner" | "editor";
  roomId: string;
  userId: string;
}

const Sidebar = () => {
  const { user } = useUser();
  const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({
    owner: [],
    editor: [],
  });

  const [data, loading, error] = useCollection(
    user &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", user.emailAddresses[0].toString())
      )
  );

  useEffect(() => {
    if (!data) return;

    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;
        if (roomData.role === "owner") {
          acc.owner.push({ id: curr.id, ...roomData });
        } else if (roomData.role === "editor") {
          acc.editor.push({ id: curr.id, ...roomData });
        }
        return acc;
      },
      {
        owner: [],
        editor: [],
      }
    );
    setGroupedData(grouped);
  }, [data]);

  const menuOptions = (
    <div className="flex flex-col gap-4 items-center">
      <NewDocumentButton />

      {groupedData.owner.length === 0 ? (
        <div className="font-medium text-[#ffffff]">No Documents</div>
      ) : (
        <div className=" flex flex-col gap-4 items-center">
          <h3 className="font-medium text-[#ffffff]">My Documents</h3>
       
            {groupedData.owner.map((doc) => (
              <SidebarOptions
                key={doc.id}
                id={doc.id}
                href={`/doc/${doc.id}`}
              />
            ))}
                                                                   
        </div>
      )}

      {groupedData.editor.length > 0 && (
        <div className=" flex flex-col gap-4 items-center">
          <h3 className="font-medium text-[#ffffff]">Shared Documents</h3>
       
            {groupedData.editor.map((doc) => (
              <SidebarOptions
                key={doc.id}
                id={doc.id}
                href={`/doc/${doc.id}`}
              />
            ))}
                                                                   
        </div>
      )}
    </div>
  );

  return (
    <div className="p-2 md:p-5 bg-[#1b1b1b]  relative">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon />
          </SheetTrigger>
          <SheetContent side="left" className="bg-[#1b1b1b] border-0">
            <SheetHeader>
              <SheetTitle className="flex justify-center mb-5 text-white items-center">Menu</SheetTitle>
              <div>{menuOptions}</div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:inline">{menuOptions}</div>
    </div>
  );
};
export default Sidebar;
