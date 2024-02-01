import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from '../../app/pages/home.page';


const AppRouter = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    );
  }

export default AppRouter;