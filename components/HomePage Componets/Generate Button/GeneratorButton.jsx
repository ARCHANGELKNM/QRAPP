// Reuseable Re-route Generate button

import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";

export default function GeneratorButton() {
  const route = useRouter();
  return (
    <div className={"flex justify-center items-center bg-transparent"}>
      <Button
        className={" mr-5 mb-5  border-primary  "}
        variant="outline"
        onClick={() => route.push("/scanner")}
      >
        Scan a Qr-Code
      </Button>
      <Button
        className={" mb-5"}
        onClick={() => route.push("/generator")}
      >
        Generate a Qr-Code
      </Button>
    </div>
  );
}
