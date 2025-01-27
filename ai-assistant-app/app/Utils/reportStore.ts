import { create } from "zustand";

type ReportStore = {
  base64Data: string;
  setBase64Data: (data: string) => void;
  reportData: string;
  setReportData: (data: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

export const useReportStore = create<ReportStore>((set) => ({
  base64Data: "",
  setBase64Data: (data) => set({ base64Data: data }),
  reportData: "",
  setReportData: (data) => set({ reportData: data }),
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
