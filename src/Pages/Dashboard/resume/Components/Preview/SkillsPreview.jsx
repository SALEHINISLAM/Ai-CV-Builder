import React from "react";
import PropTypes from "prop-types";

const SkillsPreview = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      <h2 className="text-center font-bold text-sm mb-2">Skills</h2>
      <hr className={`border-4 border-[${resumeInfo?.themeColor}]`} />
      <div className="grid grid-cols-2 gap-8">
      {resumeInfo?.skills?.map((skill, index) => (
        <div className="my-5 flex justify-between items-center" key={index}>
          <h2 className="text-sm font-bold">{skill?.name}</h2>
          <div className="h-2 w-28 bg-gray-100">
            <div
              style={{
                width: skill?.rating + "%",
                height: "100%",
                backgroundColor: resumeInfo?.themeColor,
              }}
              className="border-2"
            ></div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

SkillsPreview.propTypes = {
  resumeInfo: PropTypes.object,
};

export default SkillsPreview;
