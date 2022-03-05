import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// pages
import Home from './pages/Home';
import Planet from './pages/Planet';

function App() {
  return (
    <Router>
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
