import React, { useMemo } from 'react';

const AnniversaryBanner = ({ familyData }) => {
    const today = new Date();
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get user's time zone
    const todayString = today.toLocaleString('en-CA', { timeZone: userTimeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).split(',')[0]; // Format date as YYYY-MM-DD

    const isAnniversaryToday = (weddingDate) => {
        try {
            const anniversaryDate = new Date(weddingDate);
            return anniversaryDate.toISOString().split('T')[0] === todayString;
        } catch (error) {
            console.error(`Error parsing anniversary date: ${error}`);
            return false; // Return false if there's an error
        }
    };
  
    const checkAnniversaries = (member) => {
        const anniversaries = [];
    
        // Check if the member has a spouse
        if (member.spouse && member.spouse.weddingDate && isAnniversaryToday(member.spouse.weddingDate)) {
            anniversaries.push(`${member.name} and ${member.spouse.name}`);
        }
    
        // Check children's anniversaries
        if (member.children && Array.isArray(member.children)) {
            member.children.forEach(child => {
                anniversaries.push(...checkAnniversaries(child));
            });
        }
    
        return anniversaries;
    };
  
    const anniversaryMembers = useMemo(() => checkAnniversaries(familyData), [familyData, todayString]);
  
    if (anniversaryMembers.length === 0) return null; // No anniversaries today
  
    return (
        <h3 className="anniversary-banner">🎉 Happy Anniversary to {anniversaryMembers.join(', ')}! 🎉</h3>
    );
};

export default AnniversaryBanner;