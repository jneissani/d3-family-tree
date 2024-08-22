// Gregorian to Hebrew date converter: https://www.hebcal.com/converter?gd=19&gm=10&gy=1997&g2h=1
// Gregorian to Persian date converter: https://calcuworld.com/calendar-calculators/persian-calendar-converter/
import React, { useState, useCallback, useRef, useEffect } from 'react';
import Tree from 'react-d3-tree';

const FamilyTree = ({ data }) => {
    const [selectedMember, setSelectedMember] = useState(null);
    const modalRef = useRef(null);
    const REACT_APP_IMAGE_BASE_URL_PROD = "/d3-family-tree/images";
    const REACT_APP_IMAGE_BASE_URL_DEV = "/images";
    
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
        const handleMouseDown = (event) => {
            if (selectedMember) {
                handleClickOutside(event);
            }
        };
        
        if (selectedMember) {
            document.addEventListener('mousedown', handleMouseDown);
        } else {
            document.removeEventListener('mousedown', handleMouseDown);
        }
    
        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
        };
    }, [selectedMember, handleClickOutside]);

    const getImagePath = (imageName) => {
        const baseUrl = process.env.NODE_ENV === 'production' ? REACT_APP_IMAGE_BASE_URL_PROD : REACT_APP_IMAGE_BASE_URL_DEV;
        if (!imageName) {
            return `${baseUrl}/headshot-white.png`
        }
        return `${baseUrl}/${imageName}`;
    };
    const renderRectSvgNode = ({ nodeDatum }) => {
        const { birthday, deathday, gender, hebrewBirthday, hebrewDeathday, hebrewName, image, name, spouse } = nodeDatum;
        const backgroundColor = gender === 'male' ? 'lightblue' : gender === 'female' ? 'lightpink' : 'white';
        const spouseBackgroundColor = (spouse && spouse.gender === 'male') ? 'lightblue' : (spouse && spouse.gender === 'female') ? 'lightpink' : 'white';

        return (
            <g style={{ backgroundColor }} onClick={() => handleNodeClick(nodeDatum)}>
                <rect width="240" height="160" x="-120" y="-80" fill={backgroundColor} stroke="#000000"/>
                <image
                    href={getImagePath(image)}
                    alt={name}
                    x="-40"
                    y="-70"
                    width="80"
                    height="80"
                    onError={(e) => {
                        console.error(`Error loading image: ${image} (${name})`);
                        e.target.style.display = 'none';
                    }}
                />
                <text fill="black" strokeWidth="1" x="0" y="25" textAnchor="middle" className="pName">{name}</text>
                {hebrewName && (<text fill="black" strokeWidth="1" x="0" y="42" textAnchor="middle" className="hName">{hebrewName}</text>)}
                <text fill="black" strokeWidth="1" x="0" y="55" textAnchor="middle" className="details">{birthday}{deathday && ` - ${deathday}`}</text>
                <text fill="black" strokeWidth="1" x="0" y="70" textAnchor="middle" className="details">{hebrewBirthday}{hebrewDeathday && ` - ${hebrewDeathday}`}</text>
                {spouse && (
                    <>
                        <rect width="240" height="160" x="140" y="-80" fill={spouseBackgroundColor} stroke="#000000" />
                        <image
                            href={getImagePath(spouse.image)}
                            alt={spouse.name}
                            x="225"
                            y="-70"
                            width="80"
                            height="80"
                            onError={(e) => {
                                console.error(`Error loading image: (${spouse.name}) ${spouse.image}`);
                                e.target.style.display = 'none';
                            }}
                        />
                        <text fill="black" strokeWidth="1" x="260" y="25" textAnchor="middle" className="pName">{spouse.name}</text>
                        {spouse.hebrewName && <text fill="black" strokeWidth="1" x="260" y="42" textAnchor="middle" className="hName">{spouse.hebrewName}</text>}
                        <text fill="grey" strokeWidth="1" x="260" y="55" textAnchor="middle" className="supData">{spouse.birthday}{spouse.deathday && ` - ${spouse.deathday}`}</text>
                        <text fill="black" strokeWidth="1" x="260" y="70" textAnchor="middle" className="supData">{spouse.hebrewBirthday}{spouse.hebrewDeathday && ` - ${spouse.hebrewDeathday}`}</text>
                    </>
                )}
            </g>
        )
    };

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
                            <img src={getImagePath(selectedMember.image)} alt={selectedMember.name}/>
                            <div className='modal-member-content'>
                                <h2 className='member'>{selectedMember.name}</h2>
                                {selectedMember.hebrewName && (<p>{selectedMember.hebrewName}</p>)}
                                <p>{selectedMember.birthday}{selectedMember.deathday && (<> - {selectedMember.deathday}</>)}</p>
                                <p>{selectedMember.hebrewBirthday}{selectedMember.hebrewDeathday && (<> - {selectedMember.hebrewDeathday}</>)}</p>
                                <p>{selectedMember.persianBirthday}{selectedMember.persianDeathday && (<> - {selectedMember.persianDeathday}</>)}</p>
                                {selectedMember.birthplace && (<p>Born in {selectedMember.birthplace}</p>)}
                                {selectedMember.deathplace && (<p>Died in {selectedMember.deathplace}</p>)}
                            </div>
                        </div>
                        {selectedMember.spouse && (
                            <div className="modal-spouse">
                                <div className="modal-member">
                                    <img src={getImagePath(selectedMember.spouse.image)} alt={selectedMember.spouse.name}/>
                                    <div className='modal-member-content'>
                                        <h3 className="spouse">{selectedMember.spouse.name}</h3>
                                        {selectedMember.spouse.hebrewName && (<p>{selectedMember.spouse.hebrewName}</p>)}
                                        {selectedMember.spouse.weddingDate && (<p>Married: {selectedMember.spouse.weddingDate} ({selectedMember.spouse.weddingHebrewDate})</p>)}
                                        <p>{selectedMember.spouse.birthday}{selectedMember.spouse.deathday && (<> - {selectedMember.spouse.deathday}</>)}</p>
                                        <p>{selectedMember.spouse.hebrewBirthday}{selectedMember.spouse.hebrewDeathday && (<> - {selectedMember.spouse.hebrewDeathday}</>)}</p>
                                        <p>{selectedMember.spouse.persianBirthday}{selectedMember.spouse.persianDeathday && (<> - {selectedMember.spouse.persianDeathday}</>)}</p>
                                        {selectedMember.spouse.birthplace && (<p>Born in {selectedMember.spouse.birthplace}</p>)}
                                        {selectedMember.spouse.deathplace && (<p>Died in {selectedMember.spouse.deathplace}</p>)}
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
