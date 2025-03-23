import { Badge } from "@components/ui/badge";
import { badgeVariants } from "@/components/ui/badge";
import Link from "next/link";

export default function Badges() {
  return (
    <div>
      <div className={"flex justify-center relative top-10"}>
        <div className={"  "}>
          <Link
            href={"/Generator/Settings/Account"}
            className={badgeVariants({ variant: "outline" })}
          >
            Account
          </Link>

          <Link
            href={"/Generator/Settings/Account"}
            className={badgeVariants({ variant: "outline" })}
          >
            Account
          </Link>

          <Link
            href={"/Generator/Settings/Account"}
            className={badgeVariants({ variant: "outline" })}
          >
            Account
          </Link>
        </div>
      </div>
    </div>
  );
}
