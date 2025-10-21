"use client";

import Image from "next/image";

export default function AchievementsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative h-80 w-full">
        <Image
          src="/images/achievements-hero.jpg"
          alt="School Achievements"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Achievements
          </h1>
        </div>
      </div>

      {/* Achievements Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Academic Excellence */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <Image
            src="/images/academic.jpg"
            alt="Academic Excellence"
            width={600}
            height={400}
            className="rounded-xl shadow-lg object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold mb-4 text-green-700">
              Academic Excellence
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our school consistently ranks among the best in national exams.
              Many of our graduates earn scholarships and places at top
              secondary schools and universities. We cultivate a culture of
              discipline, research, and academic curiosity.
            </p>
          </div>
        </div>

        {/* Co-Curricular */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold mb-4 text-green-700">
              Co-Curricular Achievements
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Debate, music, drama, and cultural activities are at the heart of
              our school life. Our students have won district and national-level
              competitions, showcasing creativity and confidence.
            </p>
          </div>
          <Image
            src="/images/cocurricular.jpg"
            alt="Co-curricular Activities"
            width={600}
            height={400}
            className="rounded-xl shadow-lg object-cover order-1 md:order-2"
          />
        </div>

        {/* Sports */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <Image
            src="/images/sports.jpg"
            alt="Sports Excellence"
            width={600}
            height={400}
            className="rounded-xl shadow-lg object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold mb-4 text-green-700">
              Sports Excellence
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our sports teams have won trophies in football, netball,
              volleyball, and athletics. We encourage both teamwork and
              individual talent, and many of our athletes have represented the
              district at higher levels.
            </p>
          </div>
        </div>

        {/* Community Engagement */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold mb-4 text-green-700">
              Community Engagement
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our students participate in tree planting, charity drives, and
              social outreach programs. These experiences teach compassion,
              leadership, and responsibility, shaping them into future leaders.
            </p>
          </div>
          <Image
            src="/images/community.jpg"
            alt="Community Engagement"
            width={600}
            height={400}
            className="rounded-xl shadow-lg object-cover order-1 md:order-2"
          />
        </div>
      </div>
    </div>
  );
}
