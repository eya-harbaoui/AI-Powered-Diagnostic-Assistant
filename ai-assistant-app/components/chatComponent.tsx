"use client";

import React from "react";
import { Badge } from "./ui/badge";
import { useChat } from "ai/react";
import MessageBox from "./messagesBox";
import { Textarea } from "./ui/textarea";
import { CornerDownLeft, Loader2, TextSearch } from "lucide-react";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import Markdown from "./markdown";
import Messages from "./messages";

type Props = {
  reportData: string;
};

const chatComponent = ({ reportData }: Props) => {
  const { messages, input, handleInputChange, handleSubmit, isLoading, data } =
    useChat({
      api: "api/medichatgemini",
    });

  return (
    <div className="h-full bg-muted/50 relative flex flex-col min-h-[50vh] rounded-xl">
      <Badge
        className={`absolute right-3 top-1.5 ${
          reportData ? "bg-cyan-100 text-cyan-800" : "bg-error-bg text-white"
        }`}
        variant={"outline"}
      >
        {reportData ? "Report added" : "No report added !"}
      </Badge>
      <div className="flex-1" />
      <Messages messages={messages} isLoading={isLoading} />
      {data?.length !== undefined && data.length > 0 && (
        <Accordion type="single" className="text-sm" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger dir="">
              <span className="flex flex-row items-center gap-2">
                <TextSearch /> Relevant Info
              </span>
            </AccordionTrigger>
            <AccordionContent className="whitespace-pre-wrap">
              <Markdown
                content={(data[data.length - 1] as any).retrievals as string}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      <form
        className="relative overflow-hidden rounded-lg border bg-background"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(event, {
            data: {
              reportData: reportData as string,
            },
          });
        }}
      >
        <Textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Type your query here..."
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
        />
        <Button
          disabled={isLoading}
          type="submit"
          size="sm"
          className="ml-auto"
        >
          {isLoading ? "Analysing..." : "3. Ask"}
          {isLoading ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <CornerDownLeft className="size-3.5" />
          )}
        </Button>
      </form>
    </div>
  );
};

export default chatComponent;
