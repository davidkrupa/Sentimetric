import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "./ui/button";

const SeeExample = ({ content }: { content: string | null }) => {
  if (!content) return null;

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="border-b-0">
        <AccordionTrigger className="justify-start gap-3 text-slate-100 text-sm outline-none pt-0">
          See example
        </AccordionTrigger>
        <AccordionContent className="text-slate-500 bg-slate-500/10 p-3 rounded-md">
          {content}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SeeExample;
