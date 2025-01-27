import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";

export default function GeneratorButton() {
  const route = useRouter();
  return (
    <div className={" flex justify-center items-center"}>
      <Button className={" mb-5"} onClick={() => route.push("/Generator")}>
        Generate
      </Button>
    </div>
  );
}
