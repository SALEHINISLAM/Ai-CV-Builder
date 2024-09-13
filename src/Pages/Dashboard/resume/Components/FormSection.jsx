import React, { useState } from "react";
import PersonalDetailsForm from "./Forms/PersonalDetailsForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, LayoutGridIcon } from "lucide-react";
import Summery from "./Forms/Summery";
import ExperienceForm from "./Forms/ExperienceForm";
import RichTextEditor from "@/components/RichTextEditor";
import EducationalForm from "./Forms/EducationalForm";
import SkillsForm from "./Forms/SkillsForm";
import { useNavigate, useParams } from "react-router-dom";

const FormSection = () => {
    const [activeFormIndex, setActiveFormIndex]=useState(1);
    // const [enableNext, setEnableNext]=useState(false)
    const [enableNext, setEnableNext]=useState(true)
    const navigate=useNavigate();
    const params=useParams()
  return (
    <div>
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <LayoutGridIcon /> Theme
        </Button>
        <div className="flex gap-4 items-center">
            <Button disabled={activeFormIndex===1} variant="ghost" size="sm"
            onClick={()=>setActiveFormIndex(activeFormIndex-1)}
            ><ArrowLeft/></Button>
          <Button
          disabled={!enableNext}
          className="flex gap-2 items-center" size="sm" onClick={()=>setActiveFormIndex(activeFormIndex+1)}>
            Next <ArrowRight />
          </Button>
        </div>
      </div>
      {/* personal details */}
      {activeFormIndex===1 &&
        <PersonalDetailsForm enableNext={(v)=>setEnableNext(v)}/>}
      {/* Summery */}
      {
        activeFormIndex===2 && <Summery enableNext={(v)=>setEnableNext(v)}/>
      }
      {/* Professional experience */}
      {
        activeFormIndex===3 && <ExperienceForm enableNext={(v)=>setEnableNext(v)}/>
      }
      {/* Education */}
      {
        activeFormIndex===4 && <EducationalForm enableNext={(v)=>setEnableNext(v)}/>
      }
      {/* skills */}
      {activeFormIndex===5 && <SkillsForm enableNext={(v)=>setEnableNext(v)}/>}
        {
          activeFormIndex===6 && navigate(`/dashboard/myResume/${params.resume}`)
        }
    </div>
  );
};

export default FormSection;
