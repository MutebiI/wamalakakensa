"use client";

import Image from "next/image";

export default function CurriculumPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-64 w-full">
        <Image
          src="/images/curriculum.jpg"
          alt="Curriculum"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-4xl font-bold drop-shadow-lg">
            Our Curriculum
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <p className="text-gray-700 leading-relaxed">
          Our curriculum is structured in accordance with the National Education
          Standards, blending academic excellence with character formation and
          practical skill development. We emphasize a learner-centered approach
          that promotes inquiry, innovation, and responsibility.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Core Subjects
            </h2>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Mathematics</li>
              <li>English Language</li>
              <li>Science</li>
              <li>Social Studies</li>
              <li>Religious Education</li>
            </ul>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Enrichment Areas
            </h2>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Computer Studies</li>
              <li>Physical Education</li>
              <li>Music, Dance & Drama</li>
              <li>Art & Crafts</li>
              <li>Agriculture and Life Skills</li>
            </ul>
          </div>
        </div>

        <p className="text-gray-600 text-sm">
          Note: Our curriculum is regularly reviewed to align with national
          educational goals and to meet the dynamic needs of the 21st-century
          learner.
        </p>
      </div>
    </div>
  );
}
