import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="bg-white p-4 shadow-md">
      <ul className="flex justify-center space-x-4">
        <li>
          <Link to="/" className="text-blue-500 hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/history" className="text-blue-500 hover:underline">
            History
          </Link>
        </li>
      </ul>
    </nav>
  );
}
