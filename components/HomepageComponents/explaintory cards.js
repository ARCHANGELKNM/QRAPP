import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { CircleX } from "lucide-react";
import { ClockArrowDownIcon } from "lucide-react";
import { LucideEarthLock } from "lucide-react";

export default function ECards() {
  return (
    <div
      className={
        " flex  justify-center place-content-center sm:flex sm:justify-center sm:gap-96 "
      }
    >
      <Card
        className={
          " absolute h-48 w-60 place-content-center  top-72 mb-10 sm:h-44 sm:w-44 sm:right-2 sm:top-0 sm:mt-1 xl:h-48 xl:w-48 xl:mb-10 2xl:mb-10 lg:mb-10"
        }
      >
        <p className={"text-lg font-bold flex justify-center"}>Error Free</p>
        <div className={"flex justify-center h-48 w-48 place-content-center"}>
          <CircleX className={"flex justify-center h-36 w-40"} />
        </div>
      </Card>

      <Card
        className={
          "absolute  h-48 w-60 bottom-56 sm:h-44 sm:w-44 sm:right-52 sm:bottom-10 xl:h60 xl:w60 xl:mb-7"
        }
      >
        <p className={"text-lg font-bold flex justify-center"}>Effient </p>
        <div className={"flex justify-center h60 w-48 place-content-center"}>
          <ClockArrowDownIcon className={"h-36 w-40"} />
        </div>
      </Card>

      <Card
        className={
          "absolute h-48 w-60  bottom-2 sm:h-44 sm:w-44  sm:right-2 sm:bottom-0 sm:mb-1 xl:w-48 xl:mt-10 "
        }
      >
        <p className={"text-lg font-bold flex justify-center"}>Secure</p>

        <div className={"flex justify-center h-48 w-48 place-content-center"}>
          <LucideEarthLock className={"h-36 w-40"} />
        </div>
      </Card>
    </div>
  );
}
