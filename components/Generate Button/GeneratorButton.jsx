import { Button } from "@Components/ui/button";
import { useRouter } from "next/navigation";

export default function GeneratorButton() {
  const route = useRouter();
  return (
    <div className={"flex justify-center items-center bg-transparent"}>
      <Button
        className={" mr-5 mb-5  border-primary  "}
        variant="outline"
        onClick={() => route.push("/Generator/Scanner")}
      >
        Scan a Qr-Code
      </Button>
      <Button className={" mb-5"} onClick={() => route.push("/Generator")}>
        Generate a Qr-Code
      </Button>
    </div>
  );
}
