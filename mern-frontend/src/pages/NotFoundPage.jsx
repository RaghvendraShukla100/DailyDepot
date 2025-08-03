import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <img
        src="https://th.bing.com/th/id/R.4a146469253f26b37f27a8aae7f58606?rik=KyZWD2ehN5m8MA&riu=http%3a%2f%2fcbuft.edu.bd%2fpages%2fdocs%2f404-error.gif&ehk=wMbJ5NIWa3TqYefHIZnbi4m%2b%2fO4wUbSnVK7Fte6Yljs%3d&risl=&pid=ImgRaw&r=0"
        alt="404 Not Found"
        className="w-full max-w-lg "
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-6">
        We can't find the page you're looking for.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
