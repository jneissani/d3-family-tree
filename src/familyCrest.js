import React from 'react';

const FamilyCrest = () => {
    const crestImage = "family_crest.png";
    const REACT_APP_IMAGE_BASE_URL_PROD = "/d3-family-tree/images";
    const REACT_APP_IMAGE_BASE_URL_DEV = "/d3-family-tree/images";

    const baseUrl = process.env.NODE_ENV === 'production' ? REACT_APP_IMAGE_BASE_URL_PROD : REACT_APP_IMAGE_BASE_URL_DEV;

    return (
        <div style={{ height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={`${baseUrl}/${crestImage}`} alt="Logo" style={{ maxHeight: '100%' }} />
        </div>
    );
};

export default FamilyCrest;