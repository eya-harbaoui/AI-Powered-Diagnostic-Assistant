import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useReportStore } from "./reportStore";

function useReportSelection() {
  const { setBase64Data } = useReportStore();

  const { toast } = useToast();

  // Function to handle report selection (image or doc file)
  const handleReportSelection = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Step 1: Check if there are files in the event target

    if (!event.target.files) return;
    // Step 2: Get the first file from the file list

    const file = event.target.files[0];
    // Step 3: Check if a file was indeed selected

    if (file) {
      // Verifying if image and document file types are valid
      let isValidImage = false;
      let isValidDoc = false;
      const validImages = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      const validDocs = ["application/pdf"];

      if (validImages.includes(file.type)) {
        isValidImage = true;
      }
      if (validDocs.includes(file.type)) {
        isValidDoc = true;
      }

      if (!(isValidDoc || isValidImage)) {
        toast({
          variant: "destructive",
          description: "Filetype not supproted!",
        });

        return;
      }
      try {
        if (isValidImage) {
          // Convert to Promise-based operation
          const content = await new Promise<string>((resolve) => {
            compressImage(file, (compressedFile) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                resolve(reader.result as string);
              };
              reader.readAsDataURL(compressedFile);
            });
          });
          console.log("compressed file", content);

          setBase64Data(content);
        }
        if (isValidDoc) {
          const content = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve(reader.result as string);
            };
            reader.readAsDataURL(file);
          });

          setBase64Data(content);
        }
      } catch (error) {
        console.error("Error processing file:", error);
        toast({
          variant: "destructive",
          description: "Error processing file. Please try again.",
        });
      }
      // Handle file reading
    }
  };

  return {
    handleReportSelection,
  };
}

// Function to compress image files
function compressImage(file: File, callback: (compressedFile: File) => void) {
  const reader = new FileReader();

  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      // Create a canvas element
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas dimensions to match the image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image onto the canvas
      ctx!.drawImage(img, 0, 0);

      // Apply basic compression (adjust quality as needed)
      const quality = 0.1; // Adjust quality as needed

      // Convert canvas to data URL
      const dataURL = canvas.toDataURL("image/jpeg", quality);

      // Convert data URL back to Blob
      const byteString = atob(dataURL.split(",")[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const compressedFile = new File([ab], file.name, { type: "image/jpeg" });

      callback(compressedFile);
    };
    img.src = e.target!.result as string;
  };

  reader.readAsDataURL(file);
}

export { useReportSelection };
