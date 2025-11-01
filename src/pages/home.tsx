import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Smart Learn</h1>
        <p className="text-lg text-gray-600 mb-8">Your intelligent learning platform</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/about" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">About</h2>
            <p className="text-gray-600">Learn more about Smart Learn</p>
          </Link>

          <Link to="/dashboard" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Dashboard</h2>
            <p className="text-gray-600">Access your learning dashboard</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
