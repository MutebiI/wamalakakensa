"use client";

import Image from "next/image";

export default function PLEResultsDynamic() {
  // Get current year and build an array of the last 8 years
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 8 }, (_, i) => currentYear - i);

  // Fixed, generalised counts per your instruction
  const divisionCounts = {
    I: 10,
    II: 1,
    III: 0,
    IV: 0,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-64 w-full">
        <Image
          src="/images/pleresults.jpg" // Hero image inside public/images/
          alt="PLE Results Hero"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-4xl font-bold drop-shadow-lg">
            PLE Results
          </h1>
        </div>
      </div>

      {/* Extra Decorative Image */}
      <div className="max-w-5xl mx-auto mt-6 px-4">
        <Image
          src="/images/students-celebrating.jpg" // <-- add this file to /public/images/
          alt="Students celebrating results"
          width={1000}
          height={400}
          className="rounded-lg shadow-lg object-cover w-full"
        />
        <p className="text-center text-gray-600 text-sm mt-2">
          Our students celebrating after receiving excellent PLE results.
        </p>
      </div>

      {/* Results Table */}
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Summary (last 8 years)
        </h2>

        <div className="overflow-x-auto shadow-md rounded-lg bg-white">
          <table className="min-w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 border-b text-gray-700">Year</th>
                <th className="px-6 py-3 border-b text-gray-700">Division I</th>
                <th className="px-6 py-3 border-b text-gray-700">
                  Division II
                </th>
                <th className="px-6 py-3 border-b text-gray-700">
                  Division III
                </th>
                <th className="px-6 py-3 border-b text-gray-700">
                  Division IV
                </th>
                <th className="px-6 py-3 border-b text-gray-700">Total</th>
              </tr>
            </thead>

            <tbody>
              {years.map((y) => {
                const total =
                  divisionCounts.I +
                  divisionCounts.II +
                  divisionCounts.III +
                  divisionCounts.IV;
                return (
                  <tr
                    key={y}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-3 border-b font-medium">{y}</td>
                    <td className="px-6 py-3 border-b">{divisionCounts.I}</td>
                    <td className="px-6 py-3 border-b">{divisionCounts.II}</td>
                    <td className="px-6 py-3 border-b">{divisionCounts.III}</td>
                    <td className="px-6 py-3 border-b">{divisionCounts.IV}</td>
                    <td className="px-6 py-3 border-b font-semibold">
                      {total}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 mt-4">
          Note: This table is deliberately general and uses placeholder counts.
          The year column is dynamic — when the calendar year changes, the top
          row will update automatically to the new year and the rows below will
          shift accordingly.
        </p>
      </div>
    </div>
  );
}
