import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Smart Learn</h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-gray-600 mb-4">
            Smart Learn is an intelligent learning platform designed to help students and professionals enhance their
            knowledge and skills.
          </p>
          <p className="text-gray-600">Built with React, TypeScript, TanStack Query, and React Router.</p>
        </div>
      </div>
    </div>
  );
}
