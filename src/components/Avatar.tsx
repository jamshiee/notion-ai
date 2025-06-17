import { useOthers, useSelf } from "@liveblocks/react/suspense";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar as UiAvatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const Avatar = () => {
  const others = useOthers();
  const self = useSelf();

  const all = [self, ...others];

  return (
    <div className="flex gap-2 items-center">
      <p className="font-light text-sm">Users currently edititng this page</p>
      <div className="flex -space-x-5">
        {all.map((other, i) => (
          <Tooltip key={other?.id + i}>
            <TooltipTrigger>
              <UiAvatar className="border border-white hover:z-50">
                <AvatarImage src={other.info.avatar} />
                <AvatarFallback>{other.info.name}</AvatarFallback>
              </UiAvatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{self?.id === other?.id ? "You" : other?.info.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};
export default Avatar;
