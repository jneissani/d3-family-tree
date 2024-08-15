// Gregorian to Hebrew date converter: https://www.hebcal.com/converter?gd=19&gm=10&gy=1997&g2h=1
// Gregorian to Persian date converter: https://calcuworld.com/calendar-calculators/persian-calendar-converter/
import React, { useState, useCallback, useRef, useEffect } from 'react';
import Tree from 'react-d3-tree';

const FamilyTree = ({ data }) => {
    const [selectedMember, setSelectedMember] = useState(null);
    const modalRef = useRef(null);
    
    const handleNodeClick = (nodeData) => {
        setSelectedMember(nodeData);
    };
  
    const closeModal = useCallback(() => {
        setSelectedMember(null);
    }, []);
    
    const handleClickOutside = useCallback((event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal();
        }
    }, [closeModal]);
    
    useEffect(() => {
        const handleMouseDown = (event) => handleClickOutside(event);
        if (selectedMember) {
            document.addEventListener('mousedown', handleMouseDown);
        }
    
        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
        };
    }, [selectedMember, handleClickOutside]);

    const getImagePath = (imageName) => {
        if (!imageName) {
            return `/d3-family-tree/images/headshot-white.png`
        }
        else {
            const baseUrl = process.env.NODE_ENV === 'production' ? "/d3-family-tree/images" : "/images";
            return `${baseUrl}/${imageName}`;
        }
    };
/*
    const getImagePath = (imageName) => {
        if (!imageName) {
            return `/d3-family-tree/images/headshot-white.png`
        }
        else {
            const baseUrl = process.env.NODE_ENV === 'production' ? "/d3-family-tree/images" : "/images";
//            const baseUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_IMAGE_BASE_URL_PROD : process.env.REACT_APP_IMAGE_BASE_URL_DEV;
            return `${baseUrl}/${imageName}`;
        }
    };
*/
    const renderRectSvgNode = ({ nodeDatum }) => (
        <g onClick={() => handleNodeClick(nodeDatum)}>
            <rect width="240" height="160" x="-120" y="-80" fill="#ffffff" stroke="#000000" />
            <image
                href={nodeDatum.image ? nodeDatum.image : `/d3-family-tree/images/headshot-white.png`}
                x="-40"
                y="-70"
                width="80"
                height="80"
                onError={(e) => {
                    console.error(`Error loading image: ${nodeDatum.image}`);
                    e.target.style.display = 'none';
                }}
            />
            <text fill="black" strokeWidth="1" x="0" y="25" textAnchor="middle" className="pName">{nodeDatum.name}</text>
            {nodeDatum?.hebrewName && (
                <text fill="black" strokeWidth="1" x="0" y="42" textAnchor="middle" className="hName">{nodeDatum.hebrewName}</text>
            )}
            {nodeDatum.birthday && 
                <text fill="black" strokeWidth="1" x="0" y="55" textAnchor="middle" className="details">{nodeDatum.birthday}{nodeDatum.deathday && ` - ${nodeDatum.deathday}`}</text>
            }
            {nodeDatum.hebrewBirthday && 
                <text fill="black" strokeWidth="1" x="0" y="70" textAnchor="middle" className="details">{nodeDatum.hebrewBirthday}{nodeDatum.hebrewDeathday && ` - ${nodeDatum.hebrewDeathday}`}</text>
            }
            {nodeDatum.spouse && (
                <>
                    <rect width="240" height="160" x="140" y="-80" fill="#ffffff" stroke="#000000" />
                    <image
                        href={nodeDatum.spouse.image ? nodeDatum.spouse.image : `/d3-family-tree/images/headshot-white.png`}
                        x="225"
                        y="-70"
                        width="80"
                        height="80"
                        onError={(e) => {
                            console.error(`Error loading image: ${nodeDatum.spouse.image}`);
                            e.target.style.display = 'none';
                        }}
                    />
                    <text fill="black" strokeWidth="1" x="260" y="25" textAnchor="middle" className="pName">{nodeDatum.spouse.name}</text>
                    {nodeDatum.spouse.hebrewName && 
                        <text fill="black" strokeWidth="1" x="260" y="42" textAnchor="middle" className="hName">{nodeDatum.spouse.hebrewName}</text>
                    }
                    {nodeDatum.spouse.birthday && 
                        <text fill="grey" strokeWidth="1" x="260" y="55" textAnchor="middle" className="supData">{nodeDatum.spouse.birthday}{nodeDatum.spouse.deathday && ` - ${nodeDatum.spouse.deathday}`}</text>
                    }
                    {nodeDatum.spouse.hebrewBirthday &&
                      <text fill="black" strokeWidth="1" x="260" y="70" textAnchor="middle" className="supData">{nodeDatum.spouse.hebrewBirthday}{nodeDatum.spouse.hebrewDeathday && ` - ${nodeDatum.spouse.hebrewDeathday}`}</text>
                    }
                </>
            )}
        </g>
    );

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <Tree
                data={data}
                orientation="vertical"
                pathFunc="step"
                translate={{ x: 300, y: 50 }}
                nodeSize={{ x: 300, y: 200 }}
                separation={{ siblings: 2, nonSiblings: 2 }}
                renderCustomNodeElement={renderRectSvgNode}
            />
            {selectedMember && (
                <div className="modal">
                    <div className="modal-content" ref={modalRef}>
                        <div className="modal-member">
                            <img src={selectedMember.image ? selectedMember.image : `/d3-family-tree/images/headshot-white.png`} alt={selectedMember.name}/>
                            <div className='modal-member-content'>
                                <h2 className='member'>{selectedMember.name}</h2>
                                {selectedMember?.hebrewName && (<p>{selectedMember.hebrewName}</p>)}
                                {selectedMember?.birthday && (<p>{selectedMember.birthday}{selectedMember?.deathday && (<> - {selectedMember.deathday}</>)}</p>)}
                                {selectedMember?.hebrewBirthday && (<p>{selectedMember.hebrewBirthday}{selectedMember?.hebrewDeathday && (<> - {selectedMember.hebrewDeathday}</>)}</p>)}
                                {selectedMember?.persianBirthday && (<p>{selectedMember.persianBirthday}{selectedMember?.persianDeathday && (<> - {selectedMember.persianDeathday}</>)}</p>)}
                                {selectedMember?.birthplace && (<p>Born in {selectedMember.birthplace}</p>)}
                            </div>
                        </div>
                        {selectedMember.spouse && (
                            <div className="modal-spouse">
                                <div className="modal-member">
                                    <img src={selectedMember.spouse.image ? selectedMember.spouse.image : `/d3-family-tree/images/headshot-white.png`} alt={selectedMember.spouse.name}/>
                                    <div className='modal-member-content'>
                                        <h3 className="spouse">{selectedMember.spouse.name}</h3>
                                        {selectedMember.spouse?.hebrewName && (<p>{selectedMember.spouse.hebrewName}</p>)}
                                        {selectedMember.spouse?.weddingDate && (<p>Married: {selectedMember.spouse.weddingDate} ({selectedMember.spouse.weddingHebrewDate})</p>)}
                                        {selectedMember.spouse?.birthday && (<p>{selectedMember.spouse.birthday}{selectedMember.spouse?.deathday && (<> - {selectedMember.spouse.deathday}</>)}</p>)}
                                        {selectedMember.spouse?.hebrewBirthday && (<p>{selectedMember.spouse.hebrewBirthday}{selectedMember.spouse?.hebrewDeathday && (<> - {selectedMember.spouse.hebrewDeathday}</>)}</p>)}
                                        {selectedMember.spouse?.persianBirthday && (<p>{selectedMember.spouse.persianBirthday}{selectedMember.spouse?.persianDeathday && (<> - {selectedMember.spouse.persianDeathday}</>)}</p>)}
                                        {selectedMember.spouse?.birthplace && (<p>Born in {selectedMember.spouse.birthplace}</p>)}
                                    </div>
                                </div>
                            </div>
                        )}
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FamilyTree;
