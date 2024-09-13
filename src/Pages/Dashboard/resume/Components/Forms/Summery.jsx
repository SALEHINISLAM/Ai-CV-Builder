import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../../../Service/GlobalApi";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { chatSession } from "../../../../../../Service/AIModel";


const Summery = ({ enableNext }) => {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const prompt = `Job Title : ${resumeInfo?.jobTitle}. Depends on job title give me summery for my resume within 4-5 lines in JSON format with field experience level and summery with experience level for Fresher , Mid-Level, Experienced`;
  const [summery, setSummery] = useState(resumeInfo?.summery || "");
  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummery, setAiGeneratedSummery] = useState(null);
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      summery: summery,
    });
  }, [summery]);
  const generateSummeryFromAI = async () => {
    setLoading(true);
    console.log(prompt);
    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
    setAiGeneratedSummery(JSON.parse(result.response.text()));
    setLoading(false);
  };
  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        summery: summery,
      },
    };
    GlobalApi.UpdateResumeDetails(params?.resume, data)
      .then((res) => {
        console.log(res.data);
        enableNext(true);
        setLoading(false);
        toast({
          title: "success",
          description: "Your information updated successfully",
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast({
          description:
            "Something went wrong . Please try again after some time...",
        });
      });
  };
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 m-10">
      <h2 className="font-bold text-lg">Summery</h2>
      <p>Add summery for your job title</p>
      <form onSubmit={handleSave}>
        <div className="flex justify-between mt-7">
          <label>Add Summery</label>
          <Button
            className="text-primary border-primary"
            size="sm"
            variant="outline"
            onClick={() => generateSummeryFromAI()}
          >
            Generate from AI
          </Button>
        </div>
        <Textarea
        defaultValue={summery}
          className="mt-5"
          onChange={(e) => setSummery(e.target.value)}
        />
        <div className="mt-2 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
      {aiGeneratedSummery && (
        <div>
          <h2 className="font-bold text-lg">Suggestions</h2>
          
          {aiGeneratedSummery?.summaries.map((item, index) => (
            <div className="border rounded-lg p-4 hover:shadow-md hover:scale-105 transition-all" key={index} onClick={()=>setSummery(item.summery)}>
              <h2>Level: {item.experience}</h2>
              <p>{item.summery}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Summery.propTypes = {};

export default Summery;
