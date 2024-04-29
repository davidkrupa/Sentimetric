import { Separator } from "@/components/ui/separator";

const Page = () => {
  return (
    <div className="rounded-lg border shadow-sm p-6 space-y-6">
      <div className="space-y-6">
        <div className="grid sm:grid-cols-3 gap-6"></div>
        <Separator />
      </div>

      <div className="space-y-3 px-5">
        <h3 className="text-center text-2xl font-semibold leading-none tracking-tight p-3">
          Not implemented yet
        </h3>
        {/* <p className="whitespace-pre-line">Content of the project draft</p> */}
      </div>
    </div>
  );
};

export default Page;
