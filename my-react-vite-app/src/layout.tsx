import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-gray-800 text-white p-4">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-yellow-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/playerstats" className="hover:text-yellow-300">
              Player Stats
            </Link>
          </li>
          <li>
            <Link to="/information" className="hover:text-yellow-300">
              Information
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <main className="flex-grow p-8">
        <Outlet /> {/* Renders the nested route's component */}
      </main>
    </div>
  );
}

export default Layout;
