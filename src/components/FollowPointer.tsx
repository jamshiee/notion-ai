import stringToColor from "@/lib/stringToColor";
import { motion } from "framer-motion";

const FollowPointer = ({
  x,
  y,
  info,
}: {
  x: number;
  y: number;
  info: { name: string; email: string; avatar: string };
}) => {
  const color = stringToColor(info.email || "1");
  return (
    <motion.div
      className="h-4 w-4 rounded-full absolute z-50"
      style={{
        top: y,
        left: x,
        pointerEvents: "none",
      }}
      initial={{
        scale: 1,
        opacity: 1,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
    >
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="48"
        viewBox="0 0 24 24"
        stroke={color}
        fill={color}
        stroke-width="1.75"
      >
        <path
          //   fill="#FFF"
          //   stroke="#000"
          d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.35Z"
        ></path>
      </svg> */}
      <svg
        stroke={color}
        fill={color}
        strokeWidth="1"
  
        width="26"
        height="36"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m13.67 6.03-11-4a.5.5 0 0 0-.64.64l4 11a.5.5 0 0 0 .935.015l1.92-4.8 4.8-1.92a.5.5 0 0 0 0-.935h-.015Z"
          fill="var(--preview-background-inverse)"
        />
      </svg>
      <motion.div
      style={{
        backgroundColor: color
      }}
      initial={{
        scale:0.5,
        opacity:0
      }}
      animate={{
        scale:1,
        opacity:1
      }}
      exit={{
        scale:0.5,
        opacity:0
      }}
      className=" px-2 py-2 bg-neutral-200 text-white font-bold whitespace-nowrap min-w-max text-xs rounded-full"
      >{info?.name || info.email}</motion.div>
    </motion.div>
  );
};
export default FollowPointer;
