import React from 'react';
import familyData from './familyData.json';
import FamilyTree from './FamilyTree';

import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Neissani Family Tree</h1>
      <FamilyTree data={familyData} />
    </div>
  );
}

export default App;