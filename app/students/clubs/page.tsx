"use client";

import Image from "next/image";

export default function ClubsSports() {
  const clubs = [
    {
      name: "Drama Club",
      image: "/images/drama.jpg",
      description: "Students explore acting, stage design, and performances.",
    },
    {
      name: "Science Club",
      image: "/images/science.jpg",
      description: "Encourages experiments, research, and innovation.",
    },
    {
      name: "Debate Club",
      image: "/images/debate.jpg",
      description: "Hones public speaking and critical thinking skills.",
    },
    {
      name: "Music Club",
      image: "/images/music.jpg",
      description: "Develops musical talents and organizes school concerts.",
    },
  ];

  const sports = [
    {
      name: "Football",
      image: "/images/football.jpg",
      description: "Inter-school competitions and training sessions.",
    },
    {
      name: "Netball",
      image: "/images/netball.jpg",
      description: "Promotes teamwork and physical fitness.",
    },
    {
      name: "Athletics",
      image: "/images/athletics.jpg",
      description: "Track and field events, marathons, and relays.",
    },
    {
      name: "Basketball",
      image: "/images/basketball.jpg",
      description: "Indoor sport with regular practice and tournaments.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-64 w-full">
        <Image
          src="/images/clubs-sports-hero.jpg" // put a hero image in public/images/
          alt="Clubs & Sports"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-4xl font-bold drop-shadow-lg">
            Clubs & Sports
          </h1>
        </div>
      </div>

      {/* Clubs Section */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">School Clubs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {clubs.map((club, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={club.image}
                  alt={club.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                  {club.name}
                </h3>
                <p className="text-gray-600 text-sm">{club.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Sports Section */}
        <h2 className="text-2xl font-bold text-gray-800 my-6">School Sports</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {sports.map((sport, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={sport.image}
                  alt={sport.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                  {sport.name}
                </h3>
                <p className="text-gray-600 text-sm">{sport.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
