import { doc } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { Button } from "./ui/button";

const SidebarOptions = ({ href, id }: { href: string; id: string }) => {
  const [data] = useDocumentData(doc(db, "documents", id));
const pathname = usePathname();
const isActive = href.includes(pathname) && pathname !== "/"

  if (!data) return null;

  return (
    <div className="">
      <Link href={href}>
        <Button className={` cursor-pointer  min-w-[120px]  truncate text-[#f6f6f6] transform ease-in-out duration-500 hover:scale-110 ${isActive ? " text-[#f6f6f6] bg-[#5acfb2]  transform ease-in-out duration-500 scale-110  " : "  border-black bg-[#60a090] text-white/70 "} `}>{data.title}</Button>
      </Link>
    </div>
  );
};
export default SidebarOptions;
