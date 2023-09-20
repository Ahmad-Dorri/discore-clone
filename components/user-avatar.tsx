import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string | null;
  className?: string;
  name?: string;
}

const UserAvatar = ({ src, className, name }: UserAvatarProps) => {
  return (
    <>
      <Avatar className={cn(className, "h-7 w-7 md:h-10 md:w-10")}>
        {!!src && <AvatarImage src={src} />}
        <AvatarFallback className="text-xs font-bold lowercase">
          {name}
        </AvatarFallback>
      </Avatar>
    </>
  );
};

export default UserAvatar;
