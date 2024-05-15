import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AllUserDataList from './MainComponents/AllUserDataList';
import CreateNewUser from './MainComponents/CreateNewUser';
import UpdateUserInfo from './MainComponents/UpdateUserInfo';

function App() {
  return (
    <div className="flex min-h-screen bg-slate-600">
      <Routes>
        <Route path="/" element={<AllUserDataList />} />
        <Route path="/create-user" element={<CreateNewUser />} />
        <Route path="/edit-user/:id" element={<UpdateUserInfo />} />
      </Routes>
    </div>
  );
}

export default App;
