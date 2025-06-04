import React from 'react';
import Trip from './components/Trip';
import Expense from './components/Expenses';
import Title from './components/Title';

export default function Home() {
  return (
    <>
    <div className="container">  
     <div className="title-container">
        <Title/>
      </div>   
      <div className="content-container">  
          <Trip />
          <Expense />
      </div>
    </div>
    </>
  );
}