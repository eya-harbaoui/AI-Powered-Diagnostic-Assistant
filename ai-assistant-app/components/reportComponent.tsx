import { ClipboardPlus } from "lucide-react";
import React, { ChangeEvent } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

type Props = {};

const ReportComponent = (props: Props) => {
  function handleReportSelection(event: ChangeEvent<HTMLInputElement>): void {
    throw new Error("Function not implemented.");
  }

  function extractDetails(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
      <fieldset className="relative grid gap-6 rounded-lg border border-header-title p-4 ">
        <legend className="text-lg font-meduim text-header-title">
          <div className="flex flex-row space-x-1 px-1">
            <ClipboardPlus size={28} />
            <h3>Report </h3>
          </div>
        </legend>
        <Input
          type="file"
          onChange={handleReportSelection}
          className="border-gray-300"
        />
        <Button
          onClick={extractDetails}
          className="bg-button-bg text-sm text-button-tx font-meduim border border-button-bd hover:bg-button-bg hover:opacity-80 hover:text-button-tx hover:border hover:border-button-bd"
        >
          1. Upload File
        </Button>
        <Label className="text-sm font-medium text-header-title">
          Report Summary
        </Label>
        <Textarea
          placeholder="Extracted data from the report will appear here. Get better recommendations by providing additional patient history and symptoms..."
          className="min-h-72 resize-none  border-gray-300 p-3 shadow-none focus-visible:ring-0"
        />
        <Button
          onClick={extractDetails}
          className="bg-button-bg text-sm text-button-tx font-meduim border border-button-bd hover:bg-button-bg hover:opacity-80 hover:text-button-tx hover:border hover:border-button-bd"
        >
          2. Looks good
        </Button>
      </fieldset>
    </div>
  );
};

export default ReportComponent;
