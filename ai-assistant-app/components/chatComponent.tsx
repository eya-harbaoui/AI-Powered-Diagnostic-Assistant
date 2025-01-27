"use client";

import React from "react";
import { Badge } from "./ui/badge";
import { useChat } from "ai/react";
import MessageBox from "./messagesBox";
import { Textarea } from "./ui/textarea";
import { CornerDownLeft, Loader2 } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  reportData: string;
};

const chatComponent = ({ reportData }: Props) => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
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
      <div className="flex-1"></div>
      <div className="flex flex-col gap-4">
        {messages.map((m, idx) => {
          return <MessageBox key={idx} role={m.role} content={m.content} />;
        })}
      </div>
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
