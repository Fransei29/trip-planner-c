import React from 'react';
import Trip from './components/Trip';
import Expense from './components/Expenses';
import Title from './components/Title';

export default function Home() {
  return (
    <>
      <div>
        <Title/>
      </div>   
      <div className="content-container">  
          <Trip />
          <Expense />
      </div>
    </>
  );
}