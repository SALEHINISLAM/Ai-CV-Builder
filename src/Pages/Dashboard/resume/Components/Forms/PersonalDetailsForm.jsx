import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../Service/GlobalApi";
import { LoaderCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const PersonalDetailsForm = ({ enableNext }) => {
  const params = useParams();
  const [formData, setFormData] = useState();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading]=useState(false)
  
  const handleInputChange = (e) => {
    enableNext(false);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    const data = {
      data: formData,
    };
    GlobalApi.UpdateResumeDetails(params?.resume, data)
      .then((res) => {
        console.log(res.data);
        enableNext(true);
        setLoading(false);
        toast({title:"success",description:"Your information updated successfully"})
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast({description:"Something went wrong . Please try again after some time..."})
      });
  };
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 m-10">
      <h2 className="font-bold text-lg">Personal Details</h2>
      <p>Getting started with the basic information</p>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div className="">
            <label className="text-sm">First Name</label>
            <Input
              name="firstName"
              placeholder="first name"
              defaultValue={resumeInfo?.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="">
            <label className="text-sm">Last Name</label>
            <Input
              name="lastName"
              placeholder="last name"
              defaultValue={resumeInfo?.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input
              name="jobTitle"
              placeholder="programmer"
              defaultValue={resumeInfo?.jobTitle}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input
              name="address"
              placeholder="address"
              defaultValue={resumeInfo?.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-span-1">
            <label className="text-sm">Phone</label>
            <Input
              name="phone"
              placeholder="+8801XXXXXXXXX"
              defaultValue={resumeInfo?.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-span-1">
            <label className="text-sm">Email</label>
            <Input
              name="email"
              placeholder="xyz@domain.com"
              defaultValue={resumeInfo?.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading}>{
            loading?<LoaderCircle className="animate-spin"/> :"Save"
            }</Button>
        </div>
      </form>
    </div>
  );
};

PersonalDetailsForm.propTypes = {};

export default PersonalDetailsForm;
