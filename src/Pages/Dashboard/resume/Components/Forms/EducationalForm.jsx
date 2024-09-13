import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useContext, useState } from "react";
import GlobalApi from "../../../../../../Service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

const EducationalForm = ({ enableNext }) => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [educationalList, setEducationalList] = useState(resumeInfo?.education||[
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const updatedEducationList = [...educationalList];
    updatedEducationList[index] = {
      ...updatedEducationList[index],
      [name]: value,
    };
    setEducationalList(updatedEducationList);
  };
  const handleRemoveEducation = (index) => {
    const updatedList = educationalList.filter((_, i) => i !== index);
    setEducationalList(updatedList);
  };
  const handleAddEducation = () => {
    const updatedList = [
      ...educationalList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ];
    setEducationalList(updatedList);
  };
  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        education: educationalList,
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
      <h2 className="font-bold text-lg">Education</h2>
      <p>Do your educational details</p>
      <div className="">
        {educationalList.map((item, index) => (
          <div className="">
            <Button
              className="mt-6"
              onClick={() => handleRemoveEducation(index)}
            >
              - Remove
            </Button>
            <div className="">
              <div className="">
                <label>Institute/University</label>
                <Input
                  name="universityName"
                  defaultValue={item?.universityName || ""}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="BUET"
                />
              </div>
              <div className="">
                <label>Degree</label>
                <Input
                  name="degree"
                  defaultValue={item?.degree || ""}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="B.Sc in Engineering"
                />
              </div>
              <div className="">
                <label>Major</label>
                <Input
                  name="major"
                  defaultValue={item?.major || ""}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Civil Engineering"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="">
                  <label>Start Date</label>
                  <Input
                    name="startDate"
                    type="date"
                    defaultValue={item?.startDate || ""}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="mm-dd-yyyy"
                  />
                </div>
                <div className="">
                  <label>
                    End Date(if currently studying then give the approximate
                    date)
                  </label>
                  <Input
                    name="endDate"
                    type="date"
                    defaultValue={item?.endDate || ""}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="mm-dd-yyyy"
                  />
                </div>
              </div>
              <div className="">
                <label>
                  Short description (Highlight your learning, achievements etc)
                </label>
                <Textarea
                  name="description"
                  type="text"
                  defaultValue={item?.description || ""}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="projects, activities etc"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleAddEducation}
          className="text-primary"
        >
          + Add
        </Button>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default EducationalForm;
