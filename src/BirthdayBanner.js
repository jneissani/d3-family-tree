import React, { useMemo } from 'react';

const BirthdayBanner = ({ familyData }) => {
    // Get the user's local date
    const today = new Date();
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get user's time zone
    const todayMonthDay = today.toLocaleString('en-CA', { timeZone: userTimeZone, month: '2-digit', day: '2-digit' }).replace(/\//g, '-'); // Format date as MM-DD

    const isBirthdayToday = (birthday) => {
        try {
            const birthdayDate = new Date(birthday);
            const birthdayMonthDay = `${String(birthdayDate.getMonth() + 1).padStart(2, '0')}-${String(birthdayDate.getDate()+1).padStart(2, '0')}`; // Format date as MM-DD

            return birthdayMonthDay === todayMonthDay;
        } catch (error) {
            console.error(`Error parsing birthday date: ${error}`);
            return false; // Return false if there's an error
        }
    };
  
    const checkBirthdays = (member) => {
        const birthdays = [];

        // Check the member's birthday
        if (member.birthday && isBirthdayToday(member.birthday)) {
            birthdays.push(member.name);
        }
        
        // Check spouse's birthday
        if (member.spouse && isBirthdayToday(member.spouse.birthday)) {
            birthdays.push(member.spouse.name);
        }

        // Check children's birthdays
        if (member.children && Array.isArray(member.children)) {
            member.children.forEach(child => {
                birthdays.push(...checkBirthdays(child));
            });
        }
    
        return birthdays;
    };
  
    const birthdayMembers = useMemo(() => checkBirthdays(familyData), [familyData, todayMonthDay]);
  
    if (birthdayMembers.length === 0) return null; // No birthdays today 
  
    return (
        <div className="birthday-banner">
            <h3 className="birthday-banner">🎉 Happy Birthday to {birthdayMembers.join(', ')}! 🎉</h3>
        </div>
    );
};

export default BirthdayBanner;
