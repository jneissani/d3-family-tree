import React from 'react';

const AnniversaryBanner = ({ familyData }) => {
    const today = new Date();
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get user's time zone
    const todayString = today.toLocaleString('en-CA', { timeZone: userTimeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).split(',')[0]; // Format date as YYYY-MM-DD
  
    const checkAnniversary = (member) => {
        const anniversaries = [];
    
        // Check if the member has a spouse
        if (member.spouse && member.spouse.weddingDate) {
            try {
                const spouseAnniversaryDate = new Date(member.spouse.weddingDate);
                const spouseAnniversaryDateString = spouseAnniversaryDate.toISOString().split('T')[0];
                if (spouseAnniversaryDateString === todayString) {
                    anniversaries.push(`${member.name} and ${member.spouse.name}`);
                }
            } catch (error) {
                console.error(`Error parsing anniversary date for ${member.spouse.name}: ${error}`);
            }
        }
    
        // Check children's anniversaries
        if (member.children && Array.isArray(member.children)) {
            member.children.forEach(child => {
                anniversaries.push(...checkAnniversary(child));
            });
        }
    
        return anniversaries;
    };
  
    const anniversaryMembers = checkAnniversary(familyData); // Pass the root member
  
    if (anniversaryMembers.length === 0) return null; // No anniversaries today
  
    return (
        <h3 className="anniversary-banner">🎉 Happy Anniversary to {anniversaryMembers.join(', ')}! 🎉</h3>
    );
};

export default AnniversaryBanner;