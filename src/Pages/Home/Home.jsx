import React from 'react';
import PropTypes from 'prop-types';
import NavbarComponent from '@/components/Navbar';
import FooterComponent from '@/components/FooterComponent';

const Home = props => {
    return (
        <div>
            <NavbarComponent/>
            <h1 className='py-12'>
                Home
            </h1>
            <FooterComponent/>
        </div>
    );
};

Home.propTypes = {
    
};

export default Home;