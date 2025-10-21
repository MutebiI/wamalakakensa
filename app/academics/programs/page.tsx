"use client";

import Image from "next/image";

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-64 w-full">
        <Image
          src="/images/school-programs.jpg"
          alt="School Programs"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-4xl font-bold drop-shadow-lg">
            Our School Programs
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 space-y-8">
        <p className="text-gray-700 leading-relaxed">
          Our school offers a well-balanced blend of academic, vocational, and
          co-curricular programs aimed at nurturing every learner’s potential.
          Each program is designed to develop intellectual ability, character,
          and practical life skills.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Academic Programs
            </h2>
            <p className="text-gray-600">
              Our academic structure covers a full primary and secondary
              curriculum, emphasizing literacy, numeracy, sciences, and
              humanities. Students are encouraged to think critically and apply
              their knowledge in real-life situations.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Co-curricular Activities
            </h2>
            <p className="text-gray-600">
              Learners engage in debate, music, drama, arts, and environmental
              projects. These activities build confidence, teamwork, and
              leadership skills essential for holistic growth.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Vocational Skills
            </h2>
            <p className="text-gray-600">
              In line with modern education demands, we integrate vocational
              training such as computer literacy, tailoring, carpentry, and
              agriculture, preparing learners for both employment and
              self-reliance.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Guidance and Mentorship
            </h2>
            <p className="text-gray-600">
              Every learner is guided by experienced staff to nurture discipline
              and moral integrity. Regular mentorship sessions help students set
              academic and personal goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
