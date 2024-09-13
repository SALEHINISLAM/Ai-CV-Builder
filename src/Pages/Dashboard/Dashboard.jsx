import React, { useEffect, useState } from "react";
import AddResume from "./Components/AddResume";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "../../../Service/GlobalApi";
import ResumeItem from "./Components/ResumeItem";

const Dashboard = () => {
  const [resumeList, setResumeList] = useState(null);
  const { user } = useUser();
  const GetUserResumeList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then((res) => {
        console.log(res.data);
        setResumeList(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    user && GetUserResumeList();
    console.log(user?.primaryEmailAddress?.emailAddress);
  }, [user]);
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold">My Resume</h1>
      <p>
        Create your best resume with AI(Artificial Intelligence not Apple
        Intelligence) and kickstart your career...
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10">
        <AddResume />
        {resumeList &&
          resumeList.map((resume, index) => (
            <ResumeItem key={index} resumeInformation={resume} />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
