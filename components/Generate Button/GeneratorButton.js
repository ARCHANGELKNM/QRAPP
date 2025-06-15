import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";

export default function GeneratorButton() {
  const route = useRouter();
  return (
    <div className={"flex justify-center items-center bg-transparent"}>
      <Button
        className={" mr-5 mb-5  border-primary  "}
        variant="outline"
        onClick={() => route.push("/Generator/Scanner ")}
      >
        Scan a Qrcode
      </Button>
      <Button className={" mb-5"} onClick={() => route.push("/Generator")}>
        Generate A QrCode
      </Button>
    </div>
  );
}
