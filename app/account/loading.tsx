import Spinner from "@/app/_components/Spinner";

export default function Loading() {
  return (
    <div className="flex flex-col flex-auto content-center justify-center items-center">
      <Spinner />
    </div>
  );
}
