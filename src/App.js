import React, { useMemo } from 'react';
import familyData from './familyData.json';
import FamilyTree from './FamilyTree';
import BirthdayBanner from './BirthdayBanner';
import AnniversaryBanner from './AnniversaryBanner';
import FamilyCrest from './familyCrest';

function App() {
  // Get today's date details
  const today = new Date();
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get user's time zone
  const todayMonthDay = today.toLocaleString('en-CA', { timeZone: userTimeZone, month: '2-digit', day: '2-digit' }).replace(/\//g, '-'); // Format date as MM-DD

  // Function to check for anniversaries
  const hasAnniversaries = (member) => {
    const isValidDate = (dateString) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
        return regex.test(dateString);
    };
    
    // Check spouse's anniversary
    if (member.spouse && member.spouse.weddingDate && isValidDate(member.spouse.weddingDate)) {
      try {
        const anniversaryDate = new Date(member.spouse.weddingDate);
        const anniversaryMonthDay = `${String(anniversaryDate.getMonth() + 1).padStart(2, '0')}-${anniversaryDate.getDate()+1}`;
        if ( anniversaryMonthDay === todayMonthDay) {
            return true; // Return true if the anniversary matches today
        }
      } catch (error) {
        console.error(`Error parsing anniversary date for ${member.spouse.name}: ${error}`);
      }
    }

    // Check children's anniversaries
    if (member.children && Array.isArray(member.children)) {
        for (const child of member.children) {
            if (hasAnniversaries(child)) {
                return true; // Return true if any child has an anniversary today
            }
        }
    }

    return false; // Return false if no anniversaries match
  };

  const hasBirthdays = (member) => {
    const isValidDate = (dateString) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
        return regex.test(dateString);
    };

    if (member.birthday && isValidDate(member.birthday)) {
      try {
        const birthdayDate = new Date(member.birthday);
        const birthdayMonthDay = `${String(birthdayDate.getMonth() + 1).padStart(2, '0')}-${birthdayDate.getDate()+1}`;
        if (birthdayMonthDay === todayMonthDay) {
            return true; // Return true if a member's birthday matches today
        }
      } catch (error) {
          console.error(`Error parsing birthday date for ${member.name}: ${error}`);
      }
    }

    // Check spouse's birthday
    if (member.spouse && hasBirthdays(member.spouse)) {
        return true; // Return true if the spouse has a birthday today
    }

    // Check children's birthday
    if (member.children && Array.isArray(member.children)) {
      for (const child of member.children) {
          if (hasBirthdays(child)) {
              return true; // Return true if any child has a birthday today
          }
      }
    }

    return false; // Return false if no birthdays match
  };

  const birthdaysFound = useMemo(() => hasBirthdays(familyData), [familyData, todayMonthDay]);
  const anniversariesFound = useMemo(() => hasAnniversaries(familyData), [familyData, todayMonthDay]);
  const birthdayBanner = <BirthdayBanner familyData={birthdaysFound} />;
  const anniversaryBanner  = <AnniversaryBanner familyData={anniversariesFound} />;

  const anniversaryMargin = (birthdaysFound === true ? 55 : 0); // Calculate the anniversaries margin based on the presence of the birthday banner
  const topMargin = (birthdaysFound === true ? 55 : 0) + (anniversariesFound === true ? 55 : 0); // Calculate the top margin based on the presence of banners


  return (
    <div className="App" style={{ marginTop: `${topMargin}px` }}>
      {birthdaysFound && birthdayBanner}
      {anniversariesFound && <div className="anniversary-banner" style={{ position: `fixed`, top: `${anniversaryMargin}px` }}>{anniversaryBanner}</div>}
      <FamilyCrest />
      <h1>Neissani Family Tree</h1>
      <FamilyTree data={familyData} />
    </div>
  );
}

export default App;