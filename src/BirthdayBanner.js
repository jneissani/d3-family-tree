import React from 'react';

const BirthdayBanner = ({ familyData }) => {
    // Get the user's local date
    const today = new Date();
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get user's time zone
    const todayString = today.toLocaleString('en-CA', { timeZone: userTimeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).split(',')[0]; // Format date as YYYY-MM-DD
  
    const checkBirthdays = (member) => {
        const birthdays = [];

        // Check the member's birthday
        if (member.birthday) {
            try {
                const birthDate = new Date(member.birthday);
                const birthDateString = birthDate.toISOString().split('T')[0];
                if (birthDateString === todayString) {
                    birthdays.push(member.name);
                }
            } catch (error) {
                console.error(`Error parsing birth date for ${member.name}: ${error}`);
            }
        }
        
        // Check spouse's birthday
        if (member.spouse) {
            birthdays.push(...checkBirthdays(member.spouse));
        }
        // Check children's birthdays
        if (member.children && Array.isArray(member.children)) {
            member.children.forEach(child => {
                birthdays.push(...checkBirthdays(child));
            });
        }
    
        return birthdays;
    };
  
    const birthdayMembers = checkBirthdays(familyData);
  
    if (birthdayMembers.length === 0) {
        console.log(`No birthdays found.`);
        return null;
    }; // No birthdays today
  
    return (
        <div className="birthday-banner">
            <h3 className="birthday-banner">🎉 Happy Birthday to {birthdayMembers.join(', ')}! 🎉</h3>
        </div>
    );
};

// export { BirthdayBanner };
export default BirthdayBanner;