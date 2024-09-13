import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../Components/FormSection";
import PreviewSection from "../../Components/PreviewSection";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { dummy } from "@/Data/DummyData";

const EditResume = () => {
  const params = useParams();
  const [resumeInfo, setResumeInfo] = useState();

  useEffect(() => {
    console.log(params.resume);
    setResumeInfo(dummy);
  }, [params]);
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="container mx-auto grid grid-cols-1 gap-10 p-10 md:grid-cols-2">
        <FormSection />
        <PreviewSection id={params.resume} />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default EditResume;
