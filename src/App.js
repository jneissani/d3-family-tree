import React from 'react';
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
    // Check spouse's anniversary
    if (member.spouse && member.spouse.weddingDate) {
      const anniversaryDate = new Date(member.spouse.weddingDate);
      const anniversaryDateString = anniversaryDate.toISOString().split('T')[0];
      if (anniversaryDateString === todayString) {
        return true;
      }
    }

    // Check children's anniversary
    if (member.children && Array.isArray(member.children)) {
      for (const child of member.children) {
        if (hasAnniversaries(child)) {
          return true; // Return true if any child has a birthday today
        }
      }
    }

    return false; // Return false if no birthdays match
  };

  const hasBirthdays = (member) => {
    if (member.birthday) {
      const birthdayDate = new Date(member.birthday);
      const birthdayDateString = birthdayDate.toISOString().split('T')[0];
      if (birthdayDateString === todayString) {
        return true;  // Return true if a member's birthday matches today
      }
    }
        
    // Check spouse's birthday
    if (member.spouse) {
      if (hasBirthdays(member.spouse)) {
        return true; // Return true if the spouse has a birthday today
      }
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

//  const birthdaysFound = true;
  const birthdaysFound = hasBirthdays(familyData);
//  const anniversariesFound = true;
  const anniversariesFound = hasAnniversaries(familyData);

  const anniversaryBanner  = <AnniversaryBanner familyData={familyData} />;
  const birthdayBanner = <BirthdayBanner familyData={familyData} />;

  const anniversaryMargin = (birthdaysFound === true ? 60 : 0); // Calculate the anniversaries margin based on the presence of banners
  const topMargin = (birthdaysFound === true ? 60 : 0) + (anniversariesFound === true ? 60 : 0); // Calculate the top margin based on the presence of banners

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