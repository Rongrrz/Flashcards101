import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Home } from "./pages/home";
import Decks from "./pages/decks";


export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Header */}
        <Navbar />

        {/* Page area */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/decks" element={<Decks />} />
          </Routes>
        </main>

        {/* Optional Footer */}
        <footer className="mt-auto p-4 text-center text-sm text-gray-500">
          Random Footer
        </footer>
      </div>
    </BrowserRouter>
  )
}

