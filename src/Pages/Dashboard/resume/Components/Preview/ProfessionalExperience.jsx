import React from 'react';
import PropTypes from 'prop-types';

const ProfessionalExperience = ({resumeInfo}) => {
    return (
        <div className='my-6' hidden={resumeInfo?.experience?.length===0}>
            <h2 className='text-center font-bold text-sm mb-2'>
                Professional Experience
            </h2>
            <hr className={`border-4 border-[${resumeInfo?.themeColor}]`}/>
        {
            resumeInfo && resumeInfo.experience?.map((exp,index)=>(
                <div key={index} className='my-5'>
                    <h2 className='text-sm font-bold'>
                        {exp?.title}
                    </h2>
                    <h2 className='text-xs flex justify-between'>
                        {exp?.companyName}, {exp?.district}, {exp?.division}
                        <span>
                            {exp?.startDate} to {exp?.currentlyWorking?"Present":exp?.endDate}
                        </span>
                    </h2>
                    
                    <div className="text-xs my-2" dangerouslySetInnerHTML={{__html:exp?.workSummary}}></div>
                </div>
            ))
        }
        </div>
    );
};

ProfessionalExperience.propTypes = {
    
};

export default ProfessionalExperience;