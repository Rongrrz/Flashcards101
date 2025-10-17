import { HashRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { Home } from './pages/home';
import { Decks } from './pages/decks';
import { Practice } from './pages/practice';

export function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Header */}
        <Navbar />

        {/* Page area */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/decks" element={<Decks />} />
            <Route path="/practice" element={<Practice />} />
          </Routes>
        </main>

        {/* Optional Footer */}
        <footer className="mt-auto p-4 text-center text-sm text-gray-500">
          Random Footer
        </footer>
      </div>
    </HashRouter>
  );
}
