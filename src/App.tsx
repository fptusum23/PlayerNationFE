import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListPlayers from './components/ListPlayers';
import ListNations from './components/ListNations';
import ListUsers from './components/ListUsers';
import { useState } from 'react';
import { IUser } from './models/user';
function App() {
  const [user, setUser] = useState<IUser | undefined>()
  const handleSetUser = (data: any) => {
    setUser(data)
  }
  return (
    <Router>
      <Navbar handleSetUser={handleSetUser} />

      <div className='container mx-auto px-5 py-10'>
        <Routes >
          <Route path="/" element={<ListPlayers />} />
          <Route path="/player" element={<ListPlayers user={user} />} />
          <Route path="/nation" element={<ListNations user={user} />} />
          <Route path="/user" element={<ListUsers user={user} />} />
        </Routes>
      </div>

    </Router>



  )
}

export default App
