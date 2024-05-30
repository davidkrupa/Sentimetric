"use client";

import { saveAs } from "file-saver";

import { Button } from "./ui/button";
import { GetProjectsSections } from "@/types";

export default function SaveButton({ sections }: { sections: any }) {
  const formatSectionsToHtmlString = (): string => {
    let htmlContent = "";

    sections?.forEach((section: GetProjectsSections, index: number) => {
      if (section.data) {
        if (section.data.topic) {
          htmlContent += `<h2>${section.data.topic}</h2>`;
        }
        if (section.data.content) {
          // Replace newlines with <br> to preserve line breaks
          const formattedContent = section.data.content.replace(/\n/g, "<br>");
          htmlContent += `<p>${formattedContent}</p>`;
        }
      }

      // Add an additional line break after each section except for the last one
      if (index < sections.length - 1) {
        htmlContent += "<br>";
      }
    });

    return htmlContent;
  };

  const exportHtmlToDoc = (filename: string = "Sentimetric.doc"): void => {
    const preHtml = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" 
          xmlns:w="urn:schemas-microsoft-com:office:word" 
          xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <title>Export HTML to DOC</title>
      <style>
        body {
          font-family: Calibri, sans-serif;
          font-size: 12pt;
          mso-line-height-rule: at-least;
          line-height: 1.15;
        }
        h2 {
          font-family: Calibri, sans-serif;
          font-size: 18pt;
          mso-line-height-rule: at-least;
          line-height: 1.15;
        }
      </style>
    </head>
    <body>`;
    const postHtml = "</body></html>";
    const content = formatSectionsToHtmlString();
    const html = preHtml + content + postHtml;

    const blob = new Blob(["\ufeff", html], {
      type: "application/msword",
    });

    saveAs(blob, filename);
  };

  const handleSave = () => {
    exportHtmlToDoc();
  };

  return (
    <>
      <Button variant="default" onClick={() => handleSave()}>
        Save File
      </Button>
    </>
  );
}
