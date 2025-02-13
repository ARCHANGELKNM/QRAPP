import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { CircleX } from "lucide-react";
import { ClockArrowDownIcon } from "lucide-react";
import { LucideEarthLock } from "lucide-react"; 

export default function ECards() {
  return (
    <div
      className={
        " flex flex-col  justify-center space-y-52 "
      }
    >
      <Card
        className={
          " absolute h-48 w-48 sm:h-44 sm:w-44 sm:right-2 sm:top-0 sm:mt-2 xl:h-48 xl:w-48 xl:mb-10 2xl:mb-10 lg:mb-10"
        }
      >
        <div className={"flex justify-center h-48 w-48 place-content-center"}>
          <CircleX className={"h-40 w-40"} />
        </div>
      </Card>

      <Card
        className={
          "absolute h-32 w-48 sm:h-44 sm:w-44 sm:right-52 sm:bottom-10 xl:h-48 xl:w-48 xl:mb-7"
        }
      >
        <div className={"flex justify-center h-48 w-48 place-content-center"}>
          <ClockArrowDownIcon className={"h-40 w-40"} />
        </div>
      </Card>

      <Card
        className={
          "absolute h-32 w-48  sm:h-44 sm:w-44  sm:right-2 sm:bottom-0 sm:mb-1 xl:h-48 xl:w-48 xl:mb-2 xl:mt-10  "
        }
      >
        <div className={"flex justify-center h-48 w-48 place-content-center"}>
          <LucideEarthLock className={"h-40 w-40"} />
        </div>
      </Card>
    </div>
  );
}
