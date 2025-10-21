"use client";

import Image from "next/image";

export default function FacultyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-64 w-full">
        <Image
          src="/images/faculty-hero.jpg" // add this image to /public/images/
          alt="Faculty Hero"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-4xl font-bold drop-shadow-lg">
            Our Faculty
          </h1>
        </div>
      </div>

      {/* Introduction */}
      <div className="max-w-5xl mx-auto py-8 px-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Dedicated to Academic Excellence
        </h2>
        <p className="text-gray-600">
          Our faculty consists of experienced and passionate educators who
          inspire and guide our learners to reach their full potential. Each
          member is committed to upholding our school's values of discipline,
          diligence, and innovation.
        </p>
      </div>

      {/* Faculty Grid */}
      <div className="max-w-6xl mx-auto grid gap-6 px-4 pb-10 sm:grid-cols-2 md:grid-cols-3">
        {[
          {
            name: "Mr. John Ssenkumba",
            subject: "Head of Science Department",
            img: "/images/teacher1.jpg",
          },
          {
            name: "Ms. Grace Nabirye",
            subject: "English & Literature",
            img: "/images/teacher2.jpg",
          },
          {
            name: "Mr. Paul Lwanga",
            subject: "Mathematics",
            img: "/images/teacher3.jpg",
          },
          {
            name: "Mrs. Sarah Namusoke",
            subject: "Social Studies",
            img: "/images/teacher4.jpg",
          },
          {
            name: "Mr. Isaac Mutebi",
            subject: "ICT & Computer Studies",
            img: "/images/teacher5.jpg",
          },
          {
            name: "Ms. Betty Nakato",
            subject: "Arts & Crafts",
            img: "/images/teacher6.jpg",
          },
        ].map((teacher) => (
          <div
            key={teacher.name}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200"
          >
            <Image
              src={teacher.img}
              alt={teacher.name}
              width={400}
              height={300}
              className="object-cover w-full h-56"
            />
            <div className="p-4 text-center">
              <h3 className="font-semibold text-gray-800 text-lg">
                {teacher.name}
              </h3>
              <p className="text-gray-600 text-sm">{teacher.subject}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
