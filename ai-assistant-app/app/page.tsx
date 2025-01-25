"use client";
import React from "react";
import { ModeToggle } from "../components/modetoggle";
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import ReportComponent from "@/components/reportComponent";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="grid h-screen w-full">
      <div className="flex flex-col">
        {/*Header*/}
        <header className="sticky top-0 z-10 h-[57px] bg-background flex items-center gap-1 border-b">
          <h1 className="text-xl text-header-title font-semibold">MediBot</h1>
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
        {/*Header*/}
        <div></div>
      </div>
    </div>
  );
};

export default Home;
