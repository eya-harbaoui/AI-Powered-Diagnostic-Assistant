import { ClipboardPlus } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useReportSelection } from "../app/Utils/useReportSelection";
import useExtractDetails from "@/app/Utils/useExtractDetails";
import { useReportStore } from "@/app/Utils/reportStore";
import UseAnimations from "react-useanimations";
import activity from "react-useanimations/lib/activity";
import { useToast } from "@/hooks/use-toast";

type Props = {};

const ReportComponent = (props: Props) => {
  const { handleReportSelection } = useReportSelection();
  const { extractDetails } = useExtractDetails();
  const { reportData, setReportData, isLoading } = useReportStore();
  const { toast } = useToast();
  const onConfirmation = () => {
    toast({
      description: "Updated",
    });
  };

  return (
    <div className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
      <fieldset className="relative grid gap-6 rounded-lg border border-header-title p-4 ">
        <legend className="text-lg font-meduim text-header-title">
          <div className="flex flex-row space-x-1 px-1">
            <ClipboardPlus size={28} />
            <h3>Report </h3>
          </div>
        </legend>
        {isLoading && (
          <div className="absolute z-10 h-full w-full bg-card/90 rounded-lg flex flex-row items-center justify-center">
            <span className="text-base font-medium text-header-title">
              Extracting
            </span>
            <UseAnimations
              size={50}
              wrapperStyle={{ marginTop: "5px", marginRight: "3px" }}
              animation={activity}
              strokeColor="var(--error-bg)"
              pathCss="stroke-width: 5%;"
            />
          </div>
        )}

        <Input
          type="file"
          onChange={(event) => {
            handleReportSelection(event);
          }}
          className="border-gray-300"
        />
        <Button
          className="bg-button-bg text-sm text-button-tx font-meduim border border-button-bd hover:bg-button-bg hover:opacity-80 hover:text-button-tx hover:border hover:border-button-bd"
          onClick={extractDetails}
          disabled={isLoading}
        >
          1. Upload File
        </Button>
        <Label className="text-sm font-medium text-header-title">
          Report Summary
        </Label>
        <Textarea
          placeholder="Extracted data from the report will appear here. Get better recommendations by providing additional patient history and symptoms..."
          className="min-h-72 resize-none  border-gray-300 p-3 shadow-none focus-visible:ring-0"
          value={reportData}
          onChange={(e) => {
            setReportData(e.target.value);
          }}
        />
        <Button
          className="bg-button-bg text-sm text-button-tx font-meduim border border-button-bd hover:bg-button-bg hover:opacity-80 hover:text-button-tx hover:border hover:border-button-bd"
          onClick={onConfirmation}
        >
          2. Looks good
        </Button>
      </fieldset>
    </div>
  );
};

export default ReportComponent;
