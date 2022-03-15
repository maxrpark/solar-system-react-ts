import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// nav
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
// pages
import Home from './pages/Home';
import Planet from './pages/Planet';

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route exact path='/' element={<Home />} /> */}
        <Route path='/planet/:id' element={<Planet />} />
        {/* <Route path='*' >
        <Error />
      </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
