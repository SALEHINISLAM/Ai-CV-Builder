import React, { useRef, useState } from "react";
import PreviewSection from "../resume/Components/PreviewSection";
import { useParams } from "react-router-dom";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";

const MyResume = () => {
  const params = useParams();
  const [resumeInfo, setResumeInfo] = useState();
  const pdfRef = useRef();
  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input,{scale:2}).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height*pdfWidth)/(canvas.width);
      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdfWidth,
        pdfHeight
      );
      pdf.save("myResumeProfessionalNetwork.pdf");
    });
  };
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="flex justify-center my-8">
      <Button onClick={downloadPDF} variant="outline">Download PDF</Button>
      </div>
      <div className="container mx-auto" ref={pdfRef}>
        <PreviewSection id={params.id} />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default MyResume;
