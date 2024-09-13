import React from 'react';
import PropTypes from 'prop-types';

const PersonalDetailPreview = ({resumeInfo}) => {
    return (
        <div>
            <h2 className='font-bold text-xl text-center'
            > 
            {resumeInfo?.firstName} {resumeInfo?.lastName}
            </h2>
            <h4 className='text-center font-medium text-sm'>
                {resumeInfo?.jobTitle}
            </h4>
            <h3 className='text-center font-normal text-xs'>
                {
                    resumeInfo?.address
                }
            </h3>
            <div className=" flex justify-around">
                <h3 className='font-normal text-xs'>
                    {resumeInfo?.phone}
                </h3>
                <h3 className='font-normal text-xs'>
                    {resumeInfo?.email}
                </h3>
            </div>
            <hr className='border-4 my-2'
            style={{
                borderColor: resumeInfo?.themeColor
            }}
            />

        </div>
    );
};

PersonalDetailPreview.propTypes = {
    resumeInfo:PropTypes.object
};

export default PersonalDetailPreview;