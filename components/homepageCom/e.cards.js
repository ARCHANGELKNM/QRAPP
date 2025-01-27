import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";

export default function ECards() {
  return (
    <div className={" flex flex-col right-1/2 space-y-5 sm:space-y-0"}>
      <Card
        className={
          " absolute h-32 w-48 sm:h-44 sm:w-44 sm:right-2 sm:top-0 sm:mt-2 xl:h-48 xl:w-48 xl:mb-2"
        }
      >
        <p>card 1 top</p>
      </Card>

      <Card
        className={
          "absolute h-32 w-48 sm:h-44 sm:w-44 sm:right-52 sm:bottom-10 xl:h-48 xl:w-48 xl:mb-7"
        }
      >
        <p>card 2 middle</p>
      </Card>

      <Card
        className={
          "absolute h-32 w-48  sm:h-44 sm:w-44  sm:right-2 sm:bottom-0 sm:mb-1 xl:h-48 xl:w-48 xl:mb-2 xl:my-10  "
        }
      >
        <p>card 3 bottom</p>
      </Card>
    </div>
  );
}
