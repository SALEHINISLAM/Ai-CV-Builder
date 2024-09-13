import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import GlobalApi from "../../../../../../Service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

const SkillsForm = ({ enableNext }) => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [skillsList, setSkillsList] = useState(resumeInfo?.skills||[
    {
      name: "",
      rating: "",
    },
  ]);
  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const updatedSkillsList = [...skillsList];
    updatedSkillsList[index] = {
      ...updatedSkillsList[index],
      [name]: value,
    };
    setSkillsList(updatedSkillsList);
  };
  const handleRemoveSkill = (index) => {
    const updatedList = skillsList.filter((_, i) => i !== index);
    setSkillsList(updatedList);
  };
  const handleAddSkill = () => {
    const updatedList = [
      ...skillsList,
      {
        name: "",
        rating: "",
      },
    ];
    setSkillsList(updatedList);
  };
  const [loading, setLoading] = useState(false);
  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        skills: skillsList,
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
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Find skills those you may know </p>
      <div className="">
        {skillsList.map((skill, index) => (
          <div className="">
            <Button className="mt-6" onClick={() => handleRemoveSkill(index)}>
              - Remove
            </Button>
            <div className="">
              <div className="">
                <label>Skill</label>
                <Input
                  name="name"
                  type="text"
                  defaultValue={skill?.name ||""}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="React"
                />
              </div>
              <div className="">
                <label>
                  Rating of this skill according to you (Out of 100)
                </label>
                <Input
                  name="rating"
                  type="number"
                  defaultValue={skill?.rating ||""}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="85"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleAddSkill}
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

SkillsForm.propTypes = {};

export default SkillsForm;
