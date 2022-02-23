import React, { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './containers/Home/Home';

const App: FC = (): JSX.Element => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
    </div>
  );
}

export default App;
