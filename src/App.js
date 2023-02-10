import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, SingleInvoice } from './pages';
import { Sidebar } from './components';

const App = () => {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invoice/:id" element={<SingleInvoice />} />
      </Routes>
    </Router>
  );
}

export default App;