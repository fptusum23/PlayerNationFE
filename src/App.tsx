import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListPlayers from './components/ListPlayers';
import ListNations from './components/ListNations';
import Modal from './components/NationModal';
function App() {

  return (
    <Router>
      <Navbar />
     
      <div className='container mx-auto px-5 py-10'>
        <Routes >
          <Route path="/" element={<ListPlayers />} />
          <Route path="/player" element={<ListPlayers />} />
          <Route path="/nation" element={<ListNations />} />
        </Routes>
      </div>

    </Router>



  )
}

export default App
