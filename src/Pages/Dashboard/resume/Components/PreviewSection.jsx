import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect } from "react";
import PersonalDetailPreview from "./Preview/PersonalDetailPreview";
import SummeryPreview from "./Preview/SummeryPreview";
import ProfessionalExperience from "./Preview/ProfessionalExperience";
import EducationalPreview from "./Preview/EducationalPreview";
import SkillsPreview from "./Preview/SkillsPreview";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../Service/GlobalApi";

const PreviewSection = ({id}) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  useEffect(() => {
    GlobalApi.SeeResume(id).then((res) => {
      console.log(res.data.data);
      const {attributes}=res.data
      console.log(res.data[0])
      setResumeInfo(res.data.data.attributes);
    });
  }, [params, params.resume,id]);
  return (
    <div
      className="shadow-lg p-12 h-full border-t-[20px]"
      style={{
        borderColor: resumeInfo?.themeColor,
      }}
    >
      {/* personal details */}
      <PersonalDetailPreview resumeInfo={resumeInfo} />
      {/* summery */}
      <SummeryPreview resumeInfo={resumeInfo} />
      {/* professional experience */}
      <ProfessionalExperience resumeInfo={resumeInfo} />
      {/* education */}
      <EducationalPreview resumeInfo={resumeInfo} />
      {/* skills */}
      <SkillsPreview resumeInfo={resumeInfo} />
    </div>
  );
};

export default PreviewSection;
