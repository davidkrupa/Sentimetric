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
        <AccordionTrigger className="justify-start gap-3 text-muted text-sm outline-none pt-0">
          See example
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground bg-muted-foreground/10 p-3 rounded-md">
          {content}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SeeExample;
