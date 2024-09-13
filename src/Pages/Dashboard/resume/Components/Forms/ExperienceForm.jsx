import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RichTextEditor from "@/components/RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../../../Service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";

export const formatDateMMYYYY = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const ExperienceForm = ({ enableNext }) => {
  const formField = {
    id: null,
    title: "",
    companyName: "",
    district: "",
    division: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    workSummary: "",
  };
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const [experienceList, setExperienceList] = useState(resumeInfo?.experience||[formField]);
  const [hasWorkExperience, setHasWorkExperience] = useState(null);

  const handleChange = (index, event) => {
    const { name, value, type, checked } = event.target;
    const updatedExperienceList = [...experienceList];

    updatedExperienceList[index] = {
      ...updatedExperienceList[index],
      [name]: type === "checkbox" ? checked : value,
    };

    setExperienceList(updatedExperienceList);
  };

  const handleRichTextChange = (index, content) => {
    const updatedExperienceList = [...experienceList];
    updatedExperienceList[index].workSummary = content;
    setExperienceList(updatedExperienceList);
  };

  const addNewExperience = () => {
    setExperienceList([...experienceList, { ...formField }]);
  };

  const removeExperience = (index) => {
    const updatedExperienceList = experienceList.filter((_, i) => i !== index);
    setExperienceList(updatedExperienceList);
  };

  const handleWorkExperienceSelection = (e) => {
    setHasWorkExperience(e.target.value === "yes");
  };

  useEffect(() => {
    console.log(experienceList);
    setResumeInfo({
      ...resumeInfo,
      experience: experienceList,
    });
  }, [experienceList, setResumeInfo]);

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        experience: experienceList,
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
      <h2 className="font-bold text-lg">Professional Experience</h2>
      <p>Do you have previous job experience?</p>
      <div className="my-4">
        <label>
          <input
            type="radio"
            name="hasExperience"
            value="yes"
            onChange={handleWorkExperienceSelection}
          />{" "}
          Yes
        </label>
        <label className="ml-4">
          <input
            type="radio"
            name="hasExperience"
            value="no"
            onChange={handleWorkExperienceSelection}
          />{" "}
          No
        </label>
      </div>

      {(hasWorkExperience === true || experienceList.length>0) && (
        <div>
          <p>Add your previous job experience</p>
          <div className="">
            {Array.isArray(experienceList) &&
              experienceList.length > 0 &&
              experienceList.map((item, index) => (
                <div key={index}>
                  <Button
                    className="mt-6"
                    onClick={() => removeExperience(index)}
                  >
                    - Remove
                  </Button>
                  <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                    <div>
                      <label className="text-xs">Position Title</label>
                      <Input
                        name="title"
                        value={item.title}
                        onChange={(e) => handleChange(index, e)}
                      />
                    </div>
                    <div>
                      <label className="text-xs">Company Name</label>
                      <Input
                        name="companyName"
                        value={item.companyName}
                        onChange={(e) => handleChange(index, e)}
                      />
                    </div>
                    <div>
                      <label className="text-xs">District</label>
                      <Input
                        name="district"
                        value={item.district}
                        onChange={(e) => handleChange(index, e)}
                      />
                    </div>
                    <div>
                      <label className="text-xs">Division</label>
                      <Input
                        name="division"
                        value={item.division}
                        onChange={(e) => handleChange(index, e)}
                      />
                    </div>
                    <div>
                      <label className="text-xs">Start Date</label>
                      <Input
                        name="startDate"
                        type="date"
                        value={item.startDate}
                        onChange={(e) => handleChange(index, e)}
                      />
                    </div>
                    <div>
                      <label className="text-xs">
                        <input
                          name="currentlyWorking"
                          type="checkbox"
                          checked={item.currentlyWorking}
                          onChange={(e) => handleChange(index, e)}
                        />{" "}
                        Currently Working Here
                      </label>
                    </div>
                    {!item.currentlyWorking && (
                      <div>
                        <label className="text-xs">End Date</label>
                        <Input
                          name="endDate"
                          type="date"
                          value={item.endDate}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </div>
                    )}
                    <div className="col-span-2">
                      <label className="text-xs">Work Summary</label>
                      <RichTextEditor
                        index={index}
                        onRichTextEditorChange={(content) =>
                          handleRichTextChange(index, content)
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={addNewExperience}
              className="text-primary"
            >
              + Add
            </Button>
            <Button onClick={handleSave} disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}</Button>
          </div>
        </div>
      )}

      {hasWorkExperience === false && (
        <p>You indicated that you don't have any work experience.</p>
      )}
    </div>
  );
};

ExperienceForm.propTypes = {
  //enableNext: PropTypes.func, // add props validation if needed
};

export default ExperienceForm;
