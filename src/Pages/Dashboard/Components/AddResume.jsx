import { Loader, PlusSquare } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "../../../../Service/GlobalApi";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const AddResume = () => {
  const { toast } = useToast();
  const { user } = useUser();
  const [openDialogue, setOpenDialogue] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    user && setUserEmail(user?.primaryEmailAddress?.emailAddress);
    user && setUserName(user?.fullName);
  }, [user]);
  const navigate = useNavigate();
  const onCreate = () => {
    setLoading(true);
    const uId = uuidv4();
    console.log(resumeTitle, uId, user?.primaryEmailAddress?.emailAddress);
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uId,
        userEmail: userEmail,
        userName: userName,
      },
    };
    console.log(data);
    GlobalApi.createNewResume(data).then(
      (response) => {
        console.log(response);
        if (response) {
          setLoading(false);
          {
            toast({
              variant: "success",
              description: "Resume Created Successfully",
            });
          }
          console.log(response.data.data.id)
          navigate(`/dashboard/resume/${response.data.data.id}/edit`);
        }
      },
      (error) => {
        console.log(error);
        {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
      }
    );
  };
  return (
    <div>
      <div
        className="p-14 h-[280px] hover:shadow-md transition-all hover:scale-105 hover:cursor-pointer border-dashed py-24 rounded-lg border-4 border-black items-center flex justify-center bg-secondary"
        onClick={() => setOpenDialogue(true)}
      >
        <PlusSquare />
      </div>
      <Dialog open={openDialogue}>
        {/* <DialogTrigger >Open</DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new resume for you.</DialogTitle>
            <DialogDescription>
              <p>Add title for your resume</p>
              <Input
                className="my-5"
                placeholder="Ex. Digital Marketer Resume"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-around">
              <Button variant="ghost" onClick={() => setOpenDialogue(false)}>
                Cancel
              </Button>
              <Button
                disabled={resumeTitle.length === 0 || loading}
                onClick={() => onCreate()}
              >
                {loading ? <Loader className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
