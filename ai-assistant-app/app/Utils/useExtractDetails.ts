import React, { useState } from "react";
import { useReportSelection } from "./useReportSelection";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useReportStore } from "./reportStore";

const useExtractDetails = () => {
  const { base64Data, setReportData, setIsLoading } = useReportStore();
  const { toast } = useToast();
  async function extractDetails(): Promise<void> {
    console.log("here is the base64data", base64Data);

    if (!base64Data) {
      toast({
        variant: "destructive",
        description: "Upload a valid report !",
      });
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch("api/extractreportgemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64: base64Data }),
      });
      if (response.ok) {
        const reportText = await response.text();
        console.log("reportText", reportText);
        setReportData(reportText);
        setIsLoading(false);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error while extracting report", error);
      toast({
        variant: "destructive",
        description: "Error extracting report details. Please try again.",
      });
    }
  }
  return { extractDetails };
};

export default useExtractDetails;
