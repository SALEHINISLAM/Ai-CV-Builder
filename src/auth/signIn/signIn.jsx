import React from 'react';
import PropTypes from 'prop-types';
import { SignIn } from '@clerk/clerk-react';

const SignInUser = props => {
    return (
        <div className='min-h-screen my-10 container mx-auto flex flex-col items-center justify-center'>
            <h1 className='text-5xl font-bold py-5'>
                Sign In Now
            </h1>
            <SignIn/>
        </div>
    );
};

SignInUser.propTypes = {
    
};

export default SignInUser;