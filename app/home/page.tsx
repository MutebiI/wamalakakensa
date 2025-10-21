"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = 16; // ~60fps
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  // --- Parallax Background ---
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    let ticking = false;
    const onScroll = () => {
      if (!heroRef.current || !bgRef.current) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = heroRef.current.getBoundingClientRect();
          const offset = rect.top * 0.25;
          bgRef.current!.style.transform = `translateY(${offset}px)`;
          ticking = false;
        });
        ticking = true;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // --- Count-up Logic ---
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [startCount, setStartCount] = useState(false);
  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCount(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // Only start counting when section is visible
  const students = useCountUp(startCount ? 500 : 0);
  const teachers = useCountUp(startCount ? 25 : 0);
  const passRate = useCountUp(startCount ? 95 : 0);
  const years = useCountUp(startCount ? 30 : 0);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/kalerwe.jpg")',
            willChange: "transform",
          }}
        />
        <div className="absolute inset-0 bg-blue-900/50" />

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
            Welcome to <span className="text-yellow-400">Starlight School</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-100 mb-8 max-w-2xl">
            Nurturing Excellence Since 1990. Join us to empower students for a
            brighter future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/academics/programs"
              className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg hover:bg-yellow-300 transition font-medium"
            >
              Explore Academics
            </a>
            <a
              href="/admissions"
              className="border border-white text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition font-medium"
            >
              Schedule a Visit
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 bg-gray-200 rounded-lg overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1000&q=80")',
              }}
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              About Our School
            </h2>
            <p className="text-gray-600 mb-6">
              At Starlight School, we have over 30 years of excellence in
              education. Our dedicated faculty, state-of-the-art facilities, and
              nurturing environment ensure every student thrives academically
              and personally.
            </p>
            <a
              href="/about"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Learn More About Us
            </a>
          </div>
        </div>
      </section>

      {/* Academic Programs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Our Academic Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Nursery */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=1000&q=80")',
                }}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Nursery Program
                </h3>
                <p className="text-gray-600 mb-4">
                  Nurturing environment for ages 3-5 with play-based learning,
                  social development, and school-readiness skills.
                </p>
                <ul className="text-gray-700 text-sm mb-4 list-disc list-inside space-y-1">
                  <li>Play-Based Learning</li>
                  <li>Creative Expression</li>
                  <li>Early Social Skills</li>
                </ul>
                <a
                  href="/academics/programs"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Discover More →
                </a>
              </div>
            </div>

            {/* Primary */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80")',
                }}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Primary School Program
                </h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive education from P1–P7 with enhanced Ugandan
                  curriculum, character development, and modern teaching
                  methods.
                </p>
                <ul className="text-gray-700 text-sm mb-4 list-disc list-inside space-y-1">
                  <li>Enhanced Ugandan Curriculum</li>
                  <li>Computer Science &amp; Technology</li>
                  <li>Religious &amp; Moral Instruction</li>
                </ul>
                <a
                  href="/academics/programs"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Explore Program →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Life */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-900">
            Student Life & Activities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Sports",
                img: "https://images.unsplash.com/photo-1541336032412-2048a678540d?auto=format&fit=crop&w=400&q=80",
              },
              {
                title: "Music & Arts",
                img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=400&q=80",
              },
              {
                title: "Science Club",
                img: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=400&q=80",
              },
              {
                title: "Debate Society",
                img: "https://images.unsplash.com/photo-1541336032412-2048a678540d?auto=format&fit=crop&w=400&q=80",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div
                  className="w-full h-40 bg-cover bg-center rounded-lg mb-4 mx-auto"
                  style={{ backgroundImage: `url("${item.img}")` }}
                />
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats with Count Up */}
      <section
        ref={statsRef}
        className="bg-blue-700 text-white py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold">{students}+</div>
              <div>Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{teachers}+</div>
              <div>Qualified Teachers</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{passRate}%</div>
              <div>Pass Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{years}+</div>
              <div>Years of Experience</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
