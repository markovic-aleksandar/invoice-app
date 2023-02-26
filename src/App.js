import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, SingleInvoice } from './pages';
import { Sidebar, AddEditBar, DeleteModal } from './components';

import { useAppContext } from './context';

const App = () => {
  const {addEditBar, deleteModal} = useAppContext();

  return (
    <Router>
      <Sidebar />
      {addEditBar && <AddEditBar />}
      {deleteModal && <DeleteModal />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invoice/:id" element={<SingleInvoice />} />
      </Routes>
    </Router>
  );
}

export default App;