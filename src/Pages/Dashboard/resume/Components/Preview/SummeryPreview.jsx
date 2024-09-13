import React from 'react';
import PropTypes from 'prop-types';

const SummeryPreview = ({resumeInfo}) => {
    return (
        <div>
            <p>
                {
                    resumeInfo?.summery
                }
            </p>
        </div>
    );
};

SummeryPreview.propTypes = {
    resumeInfo:PropTypes.object
};

export default SummeryPreview;