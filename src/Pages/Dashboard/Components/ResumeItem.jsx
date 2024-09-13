import React from "react";
import PropTypes from "prop-types";
import { Notebook } from "lucide-react";
import { Link } from "react-router-dom";

const ResumeItem = ({ resumeInformation }) => {
  return (
    <Link to={`/dashboard/resume/${resumeInformation.id}/edit`}>
      <div className="mx-4">
        <div className="border border-primary rounded-lg p-14 h-[280px] hover:scale-95 transition-all hover:shadow-md hover:shadow-primary bg-secondary flex justify-center items-center">
          <Notebook />
        </div>
        <h2 className="text-center">{resumeInformation.attributes.title}</h2>
      </div>
    </Link>
  );
};

ResumeItem.propTypes = {
  resumeInformation: PropTypes.object,
};

export default ResumeItem;
