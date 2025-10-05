import { NavLink } from 'react-router-dom'

const linkClass =
  'px-3 py-1 rounded aria-[current=page]:text-blue-600 hover:bg-blue-600 hover:!text-white transition'

export function Navbar() {
  return (
    <nav className="w-full py-4 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <NavLink to="/" className="text-xl font-bold text-blue-600">
          Flashcards101
        </NavLink>

        <div className="flex gap-3 text-gray-700">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/decks" className={linkClass}>
            My Decks
          </NavLink>
          <NavLink to="/practice" className={linkClass}>
            Practice
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
