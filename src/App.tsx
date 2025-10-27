import { HashRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { Home } from './pages/home';
import { Decks } from './pages/decks';
import { Practice } from './pages/practice';
import { Footer } from './components/footer';

export function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/decks" element={<Decks />} />
            <Route path="/practice" element={<Practice />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </HashRouter>
  );
}
