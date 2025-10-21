"use client";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: 'url("/kalerwe.jpg")' }}
      >
        <div className="absolute inset-0 bg-blue-900/50" />
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4">
            About <span className="text-yellow-400">Starlight School</span>
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto">
            Where academic excellence meets character development. Join us to
            nurture confident and capable future leaders.
          </p>
        </div>
      </section>

      {/* Director + History Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Director */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            className="w-full h-96 object-cover"
            src="/sarah-kazibwe.jpg"
            alt="Sarah Nabachwa Kazibwe"
          />
          <div className="p-6 text-center md:text-left">
            <h3 className="font-semibold text-2xl text-gray-900 mb-2">
              Sarah Nabachwa Kazibwe
            </h3>
            <p className="text-gray-700 mb-4">Director & Proprietor</p>
            <p className="text-gray-600 text-sm">
              With a deep commitment to investing in education, Mrs. Sarah
              Nabachwa Kazibwe leads the school with the vision of nurturing
              confident, capable, and God-fearing students who excel
              academically and personally.
            </p>
          </div>
        </div>

        {/* Right Column: History */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our History</h2>
          <p className="text-gray-700 mb-4">
            Starlight School was officially opened on January 5th, 2003 by the
            Mayor of Kampala, John Ssebaana Kizito, with just 230 students.
            Today, we proudly serve over 1,000 students with a dedicated team of
            120 staff members.
          </p>
          <p className="text-gray-700">
            The school was founded by Mr. Denis Kazibwe and Mrs. Sarah Nabachwa
            Kazibwe, driven by a passion to invest in education and create a
            nurturing learning environment for young minds.
          </p>
        </div>
      </section>

      {/* Vision, Mission, Motto */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Our Vision
            </h3>
            <p className="text-gray-600">
              We envision a society that upholds all values of civilization and
              empowers children to achieve their highest potential.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Our Mission
            </h3>
            <p className="text-gray-600">
              To provide exceptional education services, fostering well-rounded,
              God-fearing children who excel academically and morally.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Our Motto
            </h3>
            <p className="text-gray-600">
              "Quest For The Highest" – inspiring excellence and character
              development in every student.
            </p>
          </div>
        </div>
      </section>

      {/* Join Our Community */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-700 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Join Our School Community</h2>
        <p className="mb-8 max-w-2xl mx-auto">
          Take the first step towards providing your child with quality
          education in a nurturing environment.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/register"
            className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-medium hover:bg-yellow-300 transition"
          >
            Register Now
          </a>
          <a
            href="/contact"
            className="border border-white px-8 py-3 rounded-lg hover:bg-blue-800 transition font-medium"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-200 py-8 px-4 sm:px-6 lg:px-8 text-center">
        <p>Starlight School – Providing quality education since 2003</p>
        <p>
          P.O. Box 29928, Kampala – Uganda | +256 414 531 019 |
          info@starlightschool.ug
        </p>
        <p className="mt-4 text-sm">
          &copy; 2025 Starlight School. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
