import React, { useMemo } from 'react';
import familyData from './familyData.json';
import FamilyTree from './FamilyTree';
import BirthdayBanner from './BirthdayBanner';
import AnniversaryBanner from './AnniversaryBanner';

function App() {
  // Function to check for anniversaries
  const today = new Date();
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get user's time zone
  const todayString = today.toLocaleString('en-CA', { timeZone: userTimeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).split(',')[0]; // Format date as YYYY-MM-DD

  const hasAnniversaries = (member) => {
    const isValidDate = (dateString) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
        return regex.test(dateString);
    };
    
    // Check spouse's anniversary
    if (member.spouse && member.spouse.weddingDate && isValidDate(member.spouse.weddingDate)) {
      try {
        const anniversaryDate = new Date(member.spouse.weddingDate);
        const anniversaryDateString = anniversaryDate.toISOString().split('T')[0];
        if (anniversaryDateString === todayString) {
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
        const birthdayDateString = birthdayDate.toISOString().split('T')[0];
        if (birthdayDateString === todayString) {
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

  const birthdaysFound = useMemo(() => hasBirthdays(familyData), [familyData, todayString]);
  const anniversariesFound = useMemo(() => hasAnniversaries(familyData), [familyData, todayString]);

  const anniversaryBanner  = <AnniversaryBanner familyData={familyData} />;
  const birthdayBanner = <BirthdayBanner familyData={familyData} />;

  const anniversaryMargin = (birthdaysFound === true ? 55 : 0); // Calculate the anniversaries margin based on the presence of banners
  const topMargin = (birthdaysFound === true ? 55 : 0) + (anniversariesFound === true ? 55 : 0); // Calculate the top margin based on the presence of banners

  return (
    <div className="App" style={{ marginTop: `${topMargin}px` }}>
      {birthdaysFound && birthdayBanner}
      {anniversariesFound && <div className="anniversary-banner" style={{ position: `fixed`, top: `${anniversaryMargin}px` }}>{anniversaryBanner}</div>}
      <h1>Neissani Family Tree</h1>
      <FamilyTree data={familyData} />
    </div>
  );
}

export default App;