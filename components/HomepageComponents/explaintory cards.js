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
          " absolute h-0 w-0 place-content-center  top-72 mb-10 sm:h-44 sm:w-44 sm:right-2 sm:top-0 sm:mt-1 xl:h-48 xl:w-48 xl:mb-10 2xl:mb-10 lg:mb-10 shadow-lg"
        }
      >
        <p
          className={
            "text-transparent sm:text-black text-lg font-bold flex justify-center"
          }
        >
          Error Free
        </p>
        <div
          className={
            "sm:flex sm:justify-center  sm:h-48 sm:w-48 sm:place-content-center "
          }
        >
          <CircleX className={"flex justify-center h-0 w-0 sm:h-36 sm:w-40"} />
        </div>
      </Card>

      <Card
        className={
          "sm:absolute h-0 w-0 bottom-56 sm:h-44 sm:w-44 sm:right-52 sm:bottom-10 xl:h60 xl:w60 xl:mb-7 shadow-lg"
        }
      >
        <p
          className={
            "text-transparent sm:text-black text-lg font-bold flex justify-center"
          }
        >
          Efficient
        </p>
        <div
          className={
            "sm:flex sm:justify-center sm:h-60 sm:w-48 sm:place-content-center "
          }
        >
          <ClockArrowDownIcon className={"  flex justify-center h-0 w-0 sm:h-36 sm:w-40"} />
        </div>
      </Card>

      <Card
        className={
          " h-0 w-0 sm:absolute sm:h-44 sm:w-44  sm:right-2 sm:bottom-0 sm:mb-1 xl:w-48 xl:mt-10 shadow-lg"
        }
      >
        <p
          className={
            "text-transparent sm:text-black text-lg font-bold flex justify-center"
          }
        >
          Secure
        </p>

        <div className={"flex justify-center h-48 w-48 place-content-center "}>
          <LucideEarthLock className={" h-0 w-0 sm:h-36 sm:w-40"} />
        </div>
      </Card>
    </div>
  );
}
