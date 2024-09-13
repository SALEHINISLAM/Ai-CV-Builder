import React from "react";
import PropTypes from "prop-types";

const EducationalPreview = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      <h2 className="text-center font-bold text-sm mb-2">Education</h2>
      <hr className={`border-4 border-[${resumeInfo?.themeColor}]`} />
      {resumeInfo?.education?.map((edu, index) => (
        <div className="my-5" key={index}>
          <h2 className="text-sm font-bold">{edu?.universityName}</h2>
          <h2 className="text-xs flex justify-between">{edu?.degree} in {edu?.major}
          <span>
            {edu?.startDate}-{edu?.currentlyStudying?"Currently Studying here": edu.endDate}
          </span>
          </h2 >
          <p className="text-xs my-2">
            {edu?.description}
          </p>
        </div>
      ))}
    </div>
  );
};

EducationalPreview.propTypes = {
  resumeInfo: PropTypes.object,
};

export default EducationalPreview;
