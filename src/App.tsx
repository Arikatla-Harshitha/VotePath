import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Loader } from './components/Loader';

// Lazy loading pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const Quiz = React.lazy(() => import('./pages/Quiz'));
const Glossary = React.lazy(() => import('./pages/Glossary'));
const Chat = React.lazy(() => import('./pages/Chat'));
const PollingStations = React.lazy(() => import('./pages/PollingStations'));

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <main className="container mt-4 mb-8">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/glossary" element={<Glossary />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/polling" element={<PollingStations />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
