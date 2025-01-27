"use client";
import React from "react";
import { ModeToggle } from "../components/modetoggle";
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import ReportComponent from "@/components/reportComponent";
import { useReportStore } from "./Utils/reportStore";
import ChatComponent from "@/components/chatComponent";

type Props = {};

const Home = (props: Props) => {
  const { reportData, setReportData } = useReportStore();
  return (
    <div className="grid h-screen w-full">
      <div className="flex flex-col">
        {/*Header*/}
        <header className="sticky top-0 z-10 h-[57px] bg-background flex items-center gap-1 border-b">
          <h1 className="text-xl text-header-title font-semibold px-2">
            MediBot
          </h1>
          <div className="w-full flex flex-row justify-end gap-2">
            <ModeToggle />
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant={"outline"} className="md:hidden">
                  <Settings />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-[80vh]">
                <ReportComponent />
              </DrawerContent>
            </Drawer>
          </div>
        </header>

        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="hidden md:flex flex-col">
            <ReportComponent />
          </div>
          <div className="lg:col-span-2">
            <ChatComponent reportData={reportData} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
