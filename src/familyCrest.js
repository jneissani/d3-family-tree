import React from 'react';

const FamilyCrest = () => {
    const crestImage = "family_crest.png";
    const baseUrl = process.env.NODE_ENV === 'production' ? "/d3-family-tree/images" : "/images";

    return (
        <div style={{ height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={`${baseUrl}/${crestImage}`} alt="Logo" style={{ maxHeight: '100%' }} />
        </div>
    );
};

export default FamilyCrest;