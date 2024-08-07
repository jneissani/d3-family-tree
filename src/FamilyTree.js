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
        if (selectedMember) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectedMember, handleClickOutside]);
  
    const renderRectSvgNode = ({ nodeDatum }) => (
        <g onClick={() => handleNodeClick(nodeDatum)}>
            <rect width="240" height="160" x="-120" y="-80" fill="#ffffff" stroke="#000000" />
            {nodeDatum.image && (
                <image
                    href={nodeDatum.image}
                    x="-40"
                    y="-70"
                    width="80"
                    height="80"
                    onError={(e) => {
                        console.error(`Error loading image: ${nodeDatum.image}`);
                        e.target.style.display = 'none';
                    }}
                />
            )}
            <text fill="black" strokeWidth="1" x="0" y="25" textAnchor="middle" class="pName">
                {nodeDatum.name}
            </text>
            {nodeDatum?.hebrewName && (
                <text fill="black" strokeWidth="1" x="0" y="42" textAnchor="middle" class="hName">
                    {nodeDatum.hebrewName}
                </text>
            )}
            {nodeDatum?.birthday && (
                <text fill="black" strokeWidth="1" x="0" y="55" textAnchor="middle" class="supData">
                    Born: {nodeDatum.birthday}
                </text>
            )}
            {nodeDatum?.hebrewBirthday && (
                <text fill="black" strokeWidth="1" x="0" y="70" textAnchor="middle" class="supData">
                    {nodeDatum.hebrewBirthday}
                </text>
            )}
            {nodeDatum.spouse && (
                <>
                    <rect width="240" height="160" x="140" y="-80" fill="#ffffff" stroke="#000000" />
                    {nodeDatum.spouse.image && (
                        <image
                        href={nodeDatum.spouse.image}
                        x="180"
                        y="-70"
                        width="80"
                        height="80"
                        onError={(e) => {
                            console.error(`Error loading image: ${nodeDatum.spouse.image}`);
                            e.target.style.display = 'none';
                        }}
                        />
                    )}
                    <text fill="black" strokeWidth="1" x="260" y="25" textAnchor="middle" class="pName">
                        {nodeDatum.spouse.name}
                    </text>
                    {nodeDatum.spouse?.hebrewName && (
                        <text fill="black" strokeWidth="1" x="260" y="42" textAnchor="middle" class="hName">
                            {nodeDatum.spouse.hebrewName}
                        </text>
                    )}
                    {nodeDatum.spouse?.birthday && (
                      <text fill="grey" strokeWidth="1" x="260" y="55" textAnchor="middle" class="supData">
                        Born: {nodeDatum.spouse.birthday}
                      </text>
                    )}
                    {nodeDatum.spouse?.hebrewBirthday && (
                      <text fill="black" strokeWidth="1" x="260" y="70" textAnchor="middle" class="supData">
                        Born: {nodeDatum.spouse.hebrewBirthday}
                      </text>
                    )}
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
                <h2>{selectedMember.name}</h2>
                {selectedMember.image && (
                <img src={selectedMember.image} alt={selectedMember.name} width="100" />
                )}
                {selectedMember?.hebrewName && (
                <p>{selectedMember.hebrewName}</p>
                )}
                <p>{selectedMember?.birthday || 'Unknown'}</p>
                {selectedMember?.birthplace && (
                <p>Born in {selectedMember.birthplace}</p>
                )}
                {selectedMember.spouse && (
                <>
                    <h3 class="spouse">Spouse: {selectedMember.spouse.name}</h3>
                    {selectedMember.spouse.image && (
                    <img src={selectedMember.spouse.image} alt={selectedMember.spouse.name} width="100" />
                    )}
                    {selectedMember.spouse?.hebrewName && (
                    <p>{selectedMember.spouse.hebrewName}</p>
                    )}
                    <p>{selectedMember.spouse?.birthday || 'Unknown'}</p>
                    {selectedMember.spouse?.birthplace && (
                    <p>Born in {selectedMember.spouse.birthplace}</p>
                    )}
                </>
            )}
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyTree;
