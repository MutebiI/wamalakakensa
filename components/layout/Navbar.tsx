"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(""); // Track which dropdown is open
  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? "" : name);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* School Logo & Name - Left Side */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12  rounded-full flex items-center justify-center shadow-md">
              {/* <span className="text-white font-bold text-lg">SL</span> */}
              <img src ="/schoollogo.png"/>
            </div>
            <Link href="/" className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition">
                Kalerwe Parent School
              </span>
              <span className="text-sm text-gray-600">
                We Invest in Education
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition font-medium py-2 border-b-2 border-transparent hover:border-blue-600"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-600 transition font-medium py-2 border-b-2 border-transparent hover:border-blue-600"
            >
              About
            </Link>

            {/* Academics Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 transition font-medium py-2 border-b-2 border-transparent hover:border-blue-600 flex items-center">
                Academics
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link
                  href="/academics/programs"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  Programs
                </Link>
                <Link
                  href="/academics/faculty"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  Faculty
                </Link>
                <Link
                  href="/academics/curriculum"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  Curriculum
                </Link>
              </div>
            </div>

            {/* Students Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 transition font-medium py-2 border-b-2 border-transparent hover:border-blue-600 flex items-center">
                Students
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link
                  href="/students/achievements"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  Achievements
                </Link>
                <Link
                  href="/students/ple-results"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  PLE Results
                </Link>
                <Link
                  href="/students/gallery"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  Photo Gallery
                </Link>
                <Link
                  href="/students/clubs"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  Clubs & Sports
                </Link>
              </div>
            </div>

            <Link
              href="/admissions"
              className="text-gray-700 hover:text-blue-600 transition font-medium py-2 border-b-2 border-transparent hover:border-blue-600"
            >
              Admissions
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-blue-600 transition font-medium py-2 border-b-2 border-transparent hover:border-blue-600"
            >
              Contact
            </Link>
            <Link
              href="/news"
              className="text-gray-700 hover:text-blue-600 transition font-medium py-2 border-b-2 border-transparent hover:border-blue-600"
            >
              News
            </Link>
          </div>

          {/* Staff Login - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/staff"
              className="text-gray-500 hover:text-blue-600 transition font-medium text-sm"
            >
              Staff
            </Link>
          </div>

          {/* Mobile Menu Button - ONLY THIS PART CHANGED */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 p-2 rounded-lg border border-gray-400 hover:bg-gray-100 transition"
            >
              {isOpen ? (
                // X icon when menu is open, now red
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger icon when menu is closed
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Conditionally Rendered */}
      {isOpen && (
        <div className="lg:hidden bg-gray-900 text-white border-t border-[#8B4513] max-h-[70vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-3 flex flex-col items-center">
            <Link
              href="/"
              className="w-full text-center border border-white rounded py-2 hover:bg-yellow-700 transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="w-full text-center border border-white rounded py-2 hover:bg-yellow-700 transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            {/* Academics Dropdown */}
            <div className="w-full border border-white rounded">
              <button
                onClick={() => toggleDropdown("academics")}
                className={`w-full text-center py-2 transition font-medium inline-flex items-center justify-center ${
                  openDropdown === "academics" ? "bg-white text-black" : ""
                }`}
              >
                Academics <span className="ml-1">▼</span>
              </button>
              <div
                className={`flex-col space-y-1 px-2 pb-2 ${
                  openDropdown === "academics" ? "flex" : "hidden"
                }`}
              >
                <Link
                  href="/programs"
                  className="block text-center py-1 underline"
                  onClick={() => setIsOpen(false)}
                >
                  Programs
                </Link>
                <Link
                  href="/faculty"
                  className="block text-center py-1 underline"
                  onClick={() => setIsOpen(false)}
                >
                  Faculty
                </Link>
                <Link
                  href="/curriculum"
                  className="block text-center py-1 underline"
                  onClick={() => setIsOpen(false)}
                >
                  Curriculum
                </Link>
              </div>
            </div>
            {/* Students Dropdown */}
            {/* Academics Dropdown */}
            <div className="w-full border border-white rounded">
              <button
                onClick={() => toggleDropdown("students")}
                className={`w-full text-center py-2 transition font-medium inline-flex items-center justify-center ${
                  openDropdown === "students" ? "bg-white text-black" : ""
                }`}
              >
                Students <span className="ml-1">▼</span>
              </button>
              <div
                className={`flex-col space-y-1 px-2 pb-2 ${
                  openDropdown === "students" ? "flex" : "hidden"
                }`}
              >
                <Link
                  href="/students/achievements"
                  className="block text-center py-1 underline"
                  onClick={() => setIsOpen(false)}
                >
                  Achievements
                </Link>
                <Link
                  href="/students/uneb-results"
                  className="block text-center py-1 underline"
                  onClick={() => setIsOpen(false)}
                >
                  UNEB Results
                </Link>
                <Link
                  href="/students/gallery"
                  className="block text-center py-1 underline"
                  onClick={() => setIsOpen(false)}
                >
                  Photo Gallery
                </Link>
                <Link
                  href="/students/clubs"
                  className="block text-center py-1 underline"
                  onClick={() => setIsOpen(false)}
                >
                  Clubs & Sports
                </Link>
              </div>
            </div>
            {/* Students Dropdown */}

            <Link
              href="/admissions"
              className="w-full text-center border border-white rounded py-2 hover:bg-yellow-700 transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              Admissions
            </Link>
            <Link
              href="/contact"
              className="w-full text-center border border-white rounded py-2 hover:bg-yellow-700 transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/staff"
              className="w-full text-center border border-white rounded py-2 hover:bg-yellow-700 transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              Staff
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
