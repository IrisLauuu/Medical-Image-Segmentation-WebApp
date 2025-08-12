import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PageList from './PageList'
import Header from './components/Header';

function App() {
  return (
    <>
      <Router>
        <Header />
        <PageList />
      </Router> 
    </>

  );
}

export default App;
