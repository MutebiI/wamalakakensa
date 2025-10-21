// "use client";

// import Image from "next/image";

// export default function StaffPage() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <div className="relative h-64 w-full">
//         <Image
//           src="/images/staff-hero.jpg" // add your staff image to /public/images/
//           alt="Staff Hero"
//           fill
//           className="object-cover brightness-75"
//           priority
//         />
//         <div className="absolute inset-0 flex items-center justify-center">
//           <h1 className="text-white text-3xl md:text-4xl font-bold drop-shadow-lg">
//             School Staff
//           </h1>
//         </div>
//       </div>
   

//       {/* Introduction */}
//       <div className="max-w-5xl mx-auto py-8 px-4 text-center">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-3">
//           The Team Behind Our Success
//         </h2>
//         <p className="text-gray-600">
//           Our non-teaching staff play a vital role in ensuring that the school
//           runs smoothly. From administration to maintenance, each member of our
//           team contributes to the comfort, safety, and success of our students.
//         </p>
//       </div>

//       {/* Administrative Staff */}
//       <div className="max-w-6xl mx-auto px-4 pb-10">
//         <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
//           Administrative Team
//         </h3>
//         <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
//           {[
//             {
//               name: "Mr. Robert Kato",
//               role: "Head Teacher",
//               img: "/images/admin1.jpg",
//             },
//             {
//               name: "Ms. Jane Namirembe",
//               role: "Deputy Head Teacher",
//               img: "/images/admin2.jpg",
//             },
//             {
//               name: "Mr. Brian Ssemakula",
//               role: "School Bursar",
//               img: "/images/admin3.jpg",
//             },
//           ].map((staff) => (
//             <div
//               key={staff.name}
//               className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200"
//             >
//               <Image
//                 src={staff.img}
//                 alt={staff.name}
//                 width={400}
//                 height={300}
//                 className="object-cover w-full h-56"
//               />
//               <div className="p-4 text-center">
//                 <h3 className="font-semibold text-gray-800 text-lg">
//                   {staff.name}
//                 </h3>
//                 <p className="text-gray-600 text-sm">{staff.role}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Support Staff */}
//       <div className="max-w-6xl mx-auto px-4 pb-10">
//         <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
//           Support Staff
//         </h3>
//         <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
//           {[
//             {
//               name: "Mr. Joseph Nsubuga",
//               role: "Security Guard",
//               img: "/images/support1.jpg",
//             },
//             {
//               name: "Ms. Ruth Nakazibwe",
//               role: "School Nurse",
//               img: "/images/support2.jpg",
//             },
//             {
//               name: "Mr. Peter Lule",
//               role: "Grounds Keeper",
//               img: "/images/support3.jpg",
//             },
//           ].map((staff) => (
//             <div
//               key={staff.name}
//               className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200"
//             >
//               <Image
//                 src={staff.img}
//                 alt={staff.name}
//                 width={400}
//                 height={300}
//                 className="object-cover w-full h-56"
//               />
//               <div className="p-4 text-center">
//                 <h3 className="font-semibold text-gray-800 text-lg">
//                   {staff.name}
//                 </h3>
//                 <p className="text-gray-600 text-sm">{staff.role}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
// "use client";

// import Image from "next/image";

// export default function StaffPage() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <div className="relative h-64 w-full">
//         <Image
//           src="/images/staff-hero.jpg" // add your staff image to /public/images/
//           alt="Staff Hero"
//           fill
//           className="object-cover brightness-75"
//           priority
//         />
//         <div className="absolute inset-0 flex items-center justify-center">
//           <h1 className="text-white text-3xl md:text-4xl font-bold drop-shadow-lg">
//             School Staff
//           </h1>
//         </div>
//       </div>
   

//       {/* Introduction */}
//       <div className="max-w-5xl mx-auto py-8 px-4 text-center">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-3">
//           The Team Behind Our Success
//         </h2>
//         <p className="text-gray-600">
//           Our non-teaching staff play a vital role in ensuring that the school
//           runs smoothly. From administration to maintenance, each member of our
//           team contributes to the comfort, safety, and success of our students.
//         </p>
//       </div>

//       {/* Administrative Staff */}
//       <div className="max-w-6xl mx-auto px-4 pb-10">
//         <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
//           Administrative Team
//         </h3>
//         <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
//           {[
//             {
//               name: "Mr. Robert Kato",
//               role: "Head Teacher",
//               img: "/images/admin1.jpg",
//             },
//             {
//               name: "Ms. Jane Namirembe",
//               role: "Deputy Head Teacher",
//               img: "/images/admin2.jpg",
//             },
//             {
//               name: "Mr. Brian Ssemakula",
//               role: "School Bursar",
//               img: "/images/admin3.jpg",
//             },
//           ].map((staff) => (
//             <div
//               key={staff.name}
//               className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200"
//             >
//               <Image
//                 src={staff.img}
//                 alt={staff.name}
//                 width={400}
//                 height={300}
//                 className="object-cover w-full h-56"
//               />
//               <div className="p-4 text-center">
//                 <h3 className="font-semibold text-gray-800 text-lg">
//                   {staff.name}
//                 </h3>
//                 <p className="text-gray-600 text-sm">{staff.role}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Support Staff */}
//       <div className="max-w-6xl mx-auto px-4 pb-10">
//         <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
//           Support Staff
//         </h3>
//         <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
//           {[
//             {
//               name: "Mr. Joseph Nsubuga",
//               role: "Security Guard",
//               img: "/images/support1.jpg",
//             },
//             {
//               name: "Ms. Ruth Nakazibwe",
//               role: "School Nurse",
//               img: "/images/support2.jpg",
//             },
//             {
//               name: "Mr. Peter Lule",
//               role: "Grounds Keeper",
//               img: "/images/support3.jpg",
//             },
//           ].map((staff) => (
//             <div
//               key={staff.name}
//               className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200"
//             >
//               <Image
//                 src={staff.img}
//                 alt={staff.name}
//                 width={400}
//                 height={300}
//                 className="object-cover w-full h-56"
//               />
//               <div className="p-4 text-center">
//                 <h3 className="font-semibold text-gray-800 text-lg">
//                   {staff.name}
//                 </h3>
//                 <p className="text-gray-600 text-sm">{staff.role}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Teacher {
  id: number;
  name: string;
  class_name: string; // We'll use this as the "role"
  image_url: string | null;
}

export default function StaffPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch teachers from existing table
  const fetchTeachers = async () => {
    const { data, error } = await supabase
      .from("teachers")
      .select("*")
      .order("name", { ascending: true });
    
    if (error) {
      console.error("Error fetching staff:", error);
    } else {
      setTeachers(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // Filter teachers into two categories based on class_name
  const administrativeStaff = teachers.filter(teacher => 
    teacher.class_name.toLowerCase().includes('head') || 
    teacher.class_name.toLowerCase().includes('bursar') ||
    teacher.class_name.toLowerCase().includes('administrative') ||
    teacher.class_name.toLowerCase().includes('director') ||
    teacher.class_name.toLowerCase().includes('principal') ||
    teacher.class_name.toLowerCase().includes('ceo') ||
    teacher.class_name.toLowerCase().includes('executive') ||
    teacher.class_name.toLowerCase().includes('coordinator') ||
    teacher.class_name.toLowerCase().includes('proprietor') ||
    teacher.class_name.toLowerCase().includes('owner') ||
    teacher.class_name.toLowerCase().includes('founder')
  );

  const supportStaff = teachers.filter(teacher => 
    !administrativeStaff.includes(teacher)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading staff information...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-64 w-full">
        <Image
          src="/images/staff-hero.jpg"
          alt="Staff Hero"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-4xl font-bold drop-shadow-lg">
            School Staff
          </h1>
        </div>
      </div>

      {/* Introduction */}
      <div className="max-w-5xl mx-auto py-8 px-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          The Team Behind Our Success
        </h2>
        <p className="text-gray-600">
          Our non-teaching staff play a vital role in ensuring that the school
          runs smoothly. From administration to maintenance, each member of our
          team contributes to the comfort, safety, and success of our students.
        </p>
      </div>

      {/* Administrative Staff */}
      <div className="max-w-6xl mx-auto px-4 pb-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Administrative Team
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {administrativeStaff.map((staff) => (
            <div
              key={staff.id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200"
            >
              {staff.image_url ? (
                <Image
                  src={staff.image_url}
                  alt={staff.name}
                  width={400}
                  height={300}
                  className="object-contain w-full h-56 bg-white"
                />
              ) : (
                <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <div className="p-4 text-center">
                <h3 className="font-semibold text-gray-800 text-lg">
                  {staff.name}
                </h3>
                <p className="text-gray-600 text-sm">{staff.class_name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Support Staff */}
      <div className="max-w-6xl mx-auto px-4 pb-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Support Staff
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {supportStaff.map((staff) => (
            
            <div
              key={staff.id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200"
            >
              {staff.image_url ? (
                <Image
                  src={staff.image_url}
                  alt={staff.name}
                  width={400}
                  height={300}
                  className="object-cover w-full h-56"
                />
              ) : (
                <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <div className="p-4 text-center">
                <h3 className="font-semibold text-gray-800 text-lg">
                  {staff.name}
                </h3>
                <p className="text-gray-600 text-sm">{staff.class_name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}