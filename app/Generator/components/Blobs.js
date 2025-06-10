export default function Blobs() {
  return (
    <div className={""}>
      <div
        className={
          "absolute top-0 -left-4  w-32 h-32  rounded-full bg-red-300 mix-blend-multiply   blur-xl  animate-blob opacity-70 delay-1000"
        }
      ></div>

      <div
        className={
          "absolute top-0 left-2 w-32 h-32 rounded-full bg-yellow-300 mix-blend-multiply   blur-xl  animate-blob  opacity-70"
        }
      ></div>

      <div
        className={
          "absolute top-0 left-20  w-32 h-32 rounded-full bg-blue-300 mix-blend-multiply   blur-xl  animate-blob  opacity-70"
        }
      ></div>
    </div>
  );
}
