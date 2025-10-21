// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";

// export default function LightboxGallery() {
//   const photos = [
//     "/file.svg",
//     "/kalerwe.jpg",
//     "/kalerwe.jpg",
//     "/file.svg",
//     "/kalerwe.jpg",
//     "/kalerwe.jpg",
//   ];

//   const [isOpen, setIsOpen] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const openModal = (index: number) => {
//     setCurrentIndex(index);
//     setIsOpen(true);
//   };

//   const closeModal = () => setIsOpen(false);

//   // Handle arrow keys
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (!isOpen) return;
//       if (e.key === "ArrowRight") nextImage();
//       if (e.key === "ArrowLeft") prevImage();
//       if (e.key === "Escape") closeModal();
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [isOpen, currentIndex]);

//   const nextImage = () => {
//     if (currentIndex < photos.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const prevImage = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
//       <h1 className="text-3xl font-bold text-center mb-8">Photo Gallery</h1>

//       {/* Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//         {photos.map((src, index) => (
//           <div
//             key={index}
//             className="overflow-hidden rounded-xl shadow cursor-pointer relative h-48"
//             onClick={() => openModal(index)}
//           >
//             <Image
//               src={src}
//               alt={`Gallery ${index + 1}`}
//               fill
//               className="object-cover hover:scale-105 transition-transform duration-300 rounded-xl"
//             />
//           </div>
//         ))}
//       </div>

//       {/* Lightbox Modal */}
//       {isOpen && (
//         <div className="fixed inset-0 z-[9999] bg-black bg-opacity-90 flex items-center justify-center p-4">
//           <button
//             className="absolute top-5 right-5 text-white text-3xl font-bold"
//             onClick={closeModal}
//           >
//             &times;
//           </button>

//           <button
//             className={`absolute left-5 text-white text-3xl font-bold ${
//               currentIndex === 0 ? "opacity-30 cursor-not-allowed" : ""
//             }`}
//             onClick={prevImage}
//             disabled={currentIndex === 0}
//           >
//             &#10094;
//           </button>

//           <div className="relative max-w-full max-h-full w-auto h-auto">
//             <Image
//               src={photos[currentIndex]}
//               alt={`Gallery ${currentIndex + 1}`}
//               width={1000}
//               height={800}
//               className="rounded-lg shadow-lg object-contain"
//             />
//           </div>

//           <button
//             className={`absolute right-5 text-white text-3xl font-bold ${
//               currentIndex === photos.length - 1
//                 ? "opacity-30 cursor-not-allowed"
//                 : ""
//             }`}
//             onClick={nextImage}
//             disabled={currentIndex === photos.length - 1}
//           >
//             &#10095;
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { supabase } from "@/lib/supabaseClient"; // Make sure this path is correct

// interface GalleryPhoto {
//   id: number;
//   image_url: string;
//   description: string | null;
//   created_at: string;
// }

// // ✅ CACHE SYSTEM - Same as in admin dashboard
// interface CacheData {
//   data: any;
//   timestamp: number;
//   version: string;
// }

// class AppCache {
//   private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
//   private static readonly CACHE_VERSION = 'v1';

//   static set(key: string, data: any): void {
//     if (typeof window === 'undefined') return;
    
//     const cacheData: CacheData = {
//       data,
//       timestamp: Date.now(),
//       version: this.CACHE_VERSION
//     };
    
//     try {
//       localStorage.setItem(`cache_${key}`, JSON.stringify(cacheData));
//     } catch (error) {
//       console.warn('Cache storage failed, clearing older entries:', error);
//       this.clearOldEntries();
//     }
//   }

//   static get(key: string): any | null {
//     if (typeof window === 'undefined') return null;
    
//     try {
//       const cached = localStorage.getItem(`cache_${key}`);
//       if (!cached) return null;

//       const cacheData: CacheData = JSON.parse(cached);
      
//       // Check if cache is valid and not expired
//       if (cacheData.version !== this.CACHE_VERSION) {
//         this.remove(key);
//         return null;
//       }
      
//       if (Date.now() - cacheData.timestamp > this.CACHE_DURATION) {
//         this.remove(key);
//         return null;
//       }
      
//       return cacheData.data;
//     } catch (error) {
//       console.warn('Cache retrieval failed:', error);
//       this.remove(key);
//       return null;
//     }
//   }

//   static remove(key: string): void {
//     if (typeof window === 'undefined') return;
//     localStorage.removeItem(`cache_${key}`);
//   }

//   private static clearOldEntries(): void {
//     if (typeof window === 'undefined') return;
    
//     Object.keys(localStorage)
//       .filter(key => key.startsWith('cache_'))
//       .forEach(key => {
//         try {
//           const cached = localStorage.getItem(key);
//           if (cached) {
//             const cacheData: CacheData = JSON.parse(cached);
//             if (Date.now() - cacheData.timestamp > this.CACHE_DURATION) {
//               localStorage.removeItem(key);
//             }
//           }
//         } catch (error) {
//           localStorage.removeItem(key);
//         }
//       });
//   }
// }

// export default function LightboxGallery() {
//   const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isOpen, setIsOpen] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // ✅ FETCH GALLERY PHOTOS WITH CACHING
//   const fetchGalleryPhotos = async (forceRefresh: boolean = false) => {
//     // Try cache first unless forced refresh
//     if (!forceRefresh) {
//       const cachedGallery = AppCache.get('gallery');
//       if (cachedGallery) {
//         setPhotos(cachedGallery);
//         setLoading(false);
//         return; // Use cache, no API call needed
//       }
//     }

//     // Fetch from Supabase if no cache or forced
//     try {
//       const { data, error } = await supabase
//         .from("gallery")
//         .select("*")
//         .order("created_at", { ascending: false });
      
//       if (error) {
//         console.error("Error fetching gallery:", error);
//         // If API fails, try to use cached data as fallback
//         const cachedGallery = AppCache.get('gallery');
//         if (cachedGallery) {
//           setPhotos(cachedGallery);
//         }
//       } else {
//         setPhotos(data || []);
//         AppCache.set('gallery', data); // Update cache
//       }
//     } catch (error) {
//       console.error("Network error:", error);
//       // Fallback to cache if available
//       const cachedGallery = AppCache.get('gallery');
//       if (cachedGallery) {
//         setPhotos(cachedGallery);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchGalleryPhotos();
//   }, []);

//   // ✅ ADDED: Manual refresh for users
//   const handleRefresh = () => {
//     setLoading(true);
//     fetchGalleryPhotos(true);
//   };

//   const openModal = (index: number) => {
//     setCurrentIndex(index);
//     setIsOpen(true);
//   };

//   const closeModal = () => setIsOpen(false);

//   // Handle arrow keys
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (!isOpen) return;
//       if (e.key === "ArrowRight") nextImage();
//       if (e.key === "ArrowLeft") prevImage();
//       if (e.key === "Escape") closeModal();
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [isOpen, currentIndex]);

//   const nextImage = () => {
//     if (currentIndex < photos.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const prevImage = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="max-w-6xl mx-auto px-4 py-10">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold">Photo Gallery</h1>
//           <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
//         </div>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {[...Array(8)].map((_, index) => (
//             <div
//               key={index}
//               className="overflow-hidden rounded-xl shadow bg-gray-200 animate-pulse h-48"
//             ></div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
//       {/* ✅ ADDED: Header with refresh button */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold">Photo Gallery</h1>
//         <button
//           onClick={handleRefresh}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
//         >
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//           </svg>
//           Refresh
//         </button>
//       </div>

//       {photos.length === 0 ? (
//         <div className="text-center py-16">
//           <div className="text-gray-500 text-lg mb-4">No photos in the gallery yet</div>
//           <p className="text-gray-400">Check back later for updates!</p>
//         </div>
//       ) : (
//         <>
//           {/* Grid */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//             {photos.map((photo, index) => (
//               <div
//                 key={photo.id}
//                 className="overflow-hidden rounded-xl shadow cursor-pointer relative h-48 group"
//                 onClick={() => openModal(index)}
//               >
//                 <Image
//                   src={photo.image_url}
//                   alt={photo.description || `Gallery photo ${index + 1}`}
//                   fill
//                   className="object-cover hover:scale-105 transition-transform duration-300 rounded-xl"
//                   sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
//                 />
//                 {/* ✅ ADDED: Description overlay on hover */}
//                 {photo.description && (
//                   <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end p-3">
//                     <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
//                       {photo.description}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Photo count indicator */}
//           <div className="text-center mt-6 text-gray-600">
//             Showing {photos.length} photo{photos.length !== 1 ? 's' : ''}
//           </div>
//         </>
//       )}

//       {/* Lightbox Modal */}
//       {isOpen && photos.length > 0 && (
//         <div className="fixed inset-0 z-[9999] bg-black bg-opacity-90 flex items-center justify-center p-4">
//           <button
//             className="absolute top-5 right-5 text-white text-3xl font-bold z-10 hover:bg-white hover:bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
//             onClick={closeModal}
//           >
//             &times;
//           </button>

//           <button
//             className={`absolute left-5 text-white text-3xl font-bold z-10 hover:bg-white hover:bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center transition-colors ${
//               currentIndex === 0 ? "opacity-30 cursor-not-allowed" : ""
//             }`}
//             onClick={prevImage}
//             disabled={currentIndex === 0}
//           >
//             &#10094;
//           </button>

//           <div className="relative max-w-full max-h-full w-auto h-auto flex flex-col items-center">
//             <Image
//               src={photos[currentIndex].image_url}
//               alt={photos[currentIndex].description || `Gallery photo ${currentIndex + 1}`}
//               width={1000}
//               height={800}
//               className="rounded-lg shadow-lg object-contain max-w-full max-h-[80vh]"
//               priority
//             />
//             {/* ✅ ADDED: Photo description in lightbox */}
//             {photos[currentIndex].description && (
//               <div className="mt-4 text-white text-center max-w-2xl">
//                 <p className="text-lg">{photos[currentIndex].description}</p>
//               </div>
//             )}
//             {/* ✅ ADDED: Photo counter */}
//             <div className="mt-2 text-white text-sm opacity-75">
//               {currentIndex + 1} of {photos.length}
//             </div>
//           </div>

//           <button
//             className={`absolute right-5 text-white text-3xl font-bold z-10 hover:bg-white hover:bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center transition-colors ${
//               currentIndex === photos.length - 1
//                 ? "opacity-30 cursor-not-allowed"
//                 : ""
//             }`}
//             onClick={nextImage}
//             disabled={currentIndex === photos.length - 1}
//           >
//             &#10095;
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { supabase } from "@/lib/supabaseClient";

// interface GalleryPhoto {
//   id: number;
//   image_url: string;
//   description: string | null;
//   created_at: string;
// }

// // ... (keep your existing Cache system code exactly as before) ...

// export default function LightboxGallery() {
//   const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isOpen, setIsOpen] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({});

//   // ✅ FIXED: Enhanced fetch with better error handling
//   const fetchGalleryPhotos = async (forceRefresh: boolean = false) => {
//     if (!forceRefresh) {
//       const cachedGallery = AppCache.get('gallery');
//       if (cachedGallery) {
//         setPhotos(cachedGallery);
//         setLoading(false);
//         return;
//       }
//     }

//     try {
//       const { data, error } = await supabase
//         .from("gallery")
//         .select("*")
//         .order("created_at", { ascending: false });
      
//       if (error) {
//         console.error("Error fetching gallery:", error);
//         const cachedGallery = AppCache.get('gallery');
//         if (cachedGallery) {
//           setPhotos(cachedGallery);
//         }
//       } else {
//         const photosData = data || [];
//         setPhotos(photosData);
//         AppCache.set('gallery', photosData);
        
//         // ✅ PRELOAD images to check if they're accessible
//         preloadImages(photosData);
//       }
//     } catch (error) {
//       console.error("Network error:", error);
//       const cachedGallery = AppCache.get('gallery');
//       if (cachedGallery) {
//         setPhotos(cachedGallery);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ ADDED: Preload images to check accessibility
//   const preloadImages = (photos: GalleryPhoto[]) => {
//     photos.forEach((photo, index) => {
//       const img = new Image();
//       img.onload = () => {
//         console.log(`✅ Image ${index} loaded successfully:`, photo.image_url);
//       };
//       img.onerror = () => {
//         console.error(`❌ Image ${index} failed to load:`, photo.image_url);
//         setImageErrors(prev => ({ ...prev, [index]: true }));
//       };
//       img.src = photo.image_url;
//     });
//   };

//   // ✅ ADDED: Handle image loading errors
//   const handleImageError = (index: number) => {
//     console.error(`Image failed to load: ${photos[index]?.image_url}`);
//     setImageErrors(prev => ({ ...prev, [index]: true }));
//   };

//   useEffect(() => {
//     fetchGalleryPhotos();
//   }, []);

//   const handleRefresh = () => {
//     setLoading(true);
//     setImageErrors({});
//     fetchGalleryPhotos(true);
//   };

//   const openModal = (index: number) => {
//     setCurrentIndex(index);
//     setIsOpen(true);
//   };

//   const closeModal = () => setIsOpen(false);

//   // Handle arrow keys
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (!isOpen) return;
//       if (e.key === "ArrowRight") nextImage();
//       if (e.key === "ArrowLeft") prevImage();
//       if (e.key === "Escape") closeModal();
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [isOpen, currentIndex]);

//   const nextImage = () => {
//     if (currentIndex < photos.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const prevImage = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   // ✅ ADDED: Debug function to check image URLs
//   const debugImageUrls = () => {
//     console.log("=== GALLERY IMAGE DEBUG ===");
//     photos.forEach((photo, index) => {
//       console.log(`Photo ${index}:`, {
//         id: photo.id,
//         url: photo.image_url,
//         description: photo.description,
//         hasError: imageErrors[index] || false
//       });
//     });
//   };

//   if (loading) {
//     return (
//       <div className="max-w-6xl mx-auto px-4 py-10">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold">Photo Gallery</h1>
//           <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
//         </div>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {[...Array(8)].map((_, index) => (
//             <div
//               key={index}
//               className="overflow-hidden rounded-xl shadow bg-gray-200 animate-pulse h-48"
//             ></div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
//       {/* ✅ ADDED: Debug button */}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-3xl font-bold">Photo Gallery</h1>
//         <div className="flex gap-2">
//           <button
//             onClick={debugImageUrls}
//             className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
//             title="Check console for image debug info"
//           >
//             Debug Images
//           </button>
//           <button
//             onClick={handleRefresh}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//             </svg>
//             Refresh
//           </button>
//         </div>
//       </div>

//       {photos.length === 0 ? (
//         <div className="text-center py-16">
//           <div className="text-gray-500 text-lg mb-4">No photos in the gallery yet</div>
//           <p className="text-gray-400">Check back later for updates!</p>
//         </div>
//       ) : (
//         <>
//           {/* Grid */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//             {photos.map((photo, index) => (
//               <div
//                 key={photo.id}
//                 className="overflow-hidden rounded-xl shadow cursor-pointer relative h-48 group"
//                 onClick={() => openModal(index)}
//               >
//                 {/* ✅ ENHANCED: Better image loading with error handling */}
//                 {!imageErrors[index] ? (
//                   <Image
//                     src={photo.image_url}
//                     alt={photo.description || `Gallery photo ${index + 1}`}
//                     fill
//                     className="object-cover hover:scale-105 transition-transform duration-300 rounded-xl"
//                     sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
//                     onError={() => handleImageError(index)}
//                     priority={index < 4} // Prioritize loading first 4 images
//                   />
//                 ) : (
//                   // ✅ FALLBACK: Show error state
//                   <div className="w-full h-full bg-red-100 flex items-center justify-center rounded-xl">
//                     <div className="text-center text-red-600">
//                       <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                       </svg>
//                       <p className="text-sm">Failed to load</p>
//                     </div>
//                   </div>
//                 )}
                
//                 {/* Description overlay */}
//                 {photo.description && !imageErrors[index] && (
//                   <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end p-3">
//                     <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
//                       {photo.description}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Photo count indicator */}
//           <div className="text-center mt-6 text-gray-600">
//             Showing {photos.length} photo{photos.length !== 1 ? 's' : ''}
//             {Object.keys(imageErrors).length > 0 && (
//               <span className="text-red-500 ml-2">
//                 ({Object.keys(imageErrors).length} failed to load)
//               </span>
//             )}
//           </div>
//         </>
//       )}

//       {/* Lightbox Modal */}
//       {isOpen && photos.length > 0 && (
//         <div className="fixed inset-0 z-[9999] bg-black bg-opacity-90 flex items-center justify-center p-4">
//           <button
//             className="absolute top-5 right-5 text-white text-3xl font-bold z-10 hover:bg-white hover:bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
//             onClick={closeModal}
//           >
//             &times;
//           </button>

//           <button
//             className={`absolute left-5 text-white text-3xl font-bold z-10 hover:bg-white hover:bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center transition-colors ${
//               currentIndex === 0 ? "opacity-30 cursor-not-allowed" : ""
//             }`}
//             onClick={prevImage}
//             disabled={currentIndex === 0}
//           >
//             &#10094;
//           </button>

//           <div className="relative max-w-full max-h-full w-auto h-auto flex flex-col items-center">
//             {!imageErrors[currentIndex] ? (
//               <>
//                 <Image
//                   src={photos[currentIndex].image_url}
//                   alt={photos[currentIndex].description || `Gallery photo ${currentIndex + 1}`}
//                   width={1000}
//                   height={800}
//                   className="rounded-lg shadow-lg object-contain max-w-full max-h-[80vh]"
//                   priority
//                   onError={() => handleImageError(currentIndex)}
//                 />
//                 {/* Photo description */}
//                 {photos[currentIndex].description && (
//                   <div className="mt-4 text-white text-center max-w-2xl">
//                     <p className="text-lg">{photos[currentIndex].description}</p>
//                   </div>
//                 )}
//               </>
//             ) : (
//               // Fallback for lightbox
//               <div className="bg-red-100 p-8 rounded-lg text-center">
//                 <svg className="w-16 h-16 mx-auto mb-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                 </svg>
//                 <p className="text-red-600 text-lg">Failed to load image</p>
//                 <p className="text-red-500 text-sm mt-2">{photos[currentIndex].image_url}</p>
//               </div>
//             )}
            
//             {/* Photo counter */}
//             <div className="mt-2 text-white text-sm opacity-75">
//               {currentIndex + 1} of {photos.length}
//             </div>
//           </div>

//           <button
//             className={`absolute right-5 text-white text-3xl font-bold z-10 hover:bg-white hover:bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center transition-colors ${
//               currentIndex === photos.length - 1
//                 ? "opacity-30 cursor-not-allowed"
//                 : ""
//             }`}
//             onClick={nextImage}
//             disabled={currentIndex === photos.length - 1}
//           >
//             &#10095;
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
// "use client";

// import { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabaseClient";

// interface GalleryPhoto {
//   id: number;
//   image_url: string;
//   description: string | null;
//   created_at: string;
// }

// // Cache System (same as before)
// interface CacheData {
//   data: any;
//   timestamp: number;
//   version: string;
// }

// class AppCache {
//   private static readonly CACHE_DURATION = 5 * 60 * 1000;
//   private static readonly CACHE_VERSION = 'v1';

//   static set(key: string, data: any): void {
//     if (typeof window === 'undefined') return;
//     const cacheData: CacheData = { data, timestamp: Date.now(), version: this.CACHE_VERSION };
//     try {
//       localStorage.setItem(`cache_${key}`, JSON.stringify(cacheData));
//     } catch (error) {
//       console.warn('Cache storage failed:', error);
//     }
//   }

//   static get(key: string): any | null {
//     if (typeof window === 'undefined') return null;
//     try {
//       const cached = localStorage.getItem(`cache_${key}`);
//       if (!cached) return null;
//       const cacheData: CacheData = JSON.parse(cached);
//       if (cacheData.version !== this.CACHE_VERSION || Date.now() - cacheData.timestamp > this.CACHE_DURATION) {
//         this.remove(key);
//         return null;
//       }
//       return cacheData.data;
//     } catch (error) {
//       this.remove(key);
//       return null;
//     }
//   }

//   static remove(key: string): void {
//     if (typeof window === 'undefined') return;
//     localStorage.removeItem(`cache_${key}`);
//   }
// }

// export default function LightboxGallery() {
//   const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isOpen, setIsOpen] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const fetchGalleryPhotos = async (forceRefresh: boolean = false) => {
//     if (!forceRefresh) {
//       const cachedGallery = AppCache.get('gallery');
//       if (cachedGallery) {
//         setPhotos(cachedGallery);
//         setLoading(false);
//         return;
//       }
//     }

//     try {
//       const { data, error } = await supabase
//         .from("gallery")
//         .select("*")
//         .order("created_at", { ascending: false });
      
//       if (error) {
//         console.error("Error fetching gallery:", error);
//         const cachedGallery = AppCache.get('gallery');
//         if (cachedGallery) setPhotos(cachedGallery);
//       } else {
//         setPhotos(data || []);
//         AppCache.set('gallery', data);
//       }
//     } catch (error) {
//       console.error("Network error:", error);
//       const cachedGallery = AppCache.get('gallery');
//       if (cachedGallery) setPhotos(cachedGallery);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchGalleryPhotos();
//   }, []);

//   const handleRefresh = () => {
//     setLoading(true);
//     fetchGalleryPhotos(true);
//   };

//   const openModal = (index: number) => {
//     setCurrentIndex(index);
//     setIsOpen(true);
//   };

//   const closeModal = () => setIsOpen(false);

//   const nextImage = () => {
//     if (currentIndex < photos.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const prevImage = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   // Handle arrow keys
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (!isOpen) return;
//       if (e.key === "ArrowRight") nextImage();
//       if (e.key === "ArrowLeft") prevImage();
//       if (e.key === "Escape") closeModal();
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [isOpen, currentIndex]);

//   if (loading) {
//     return (
//       <div className="max-w-6xl mx-auto px-4 py-10">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold">Photo Gallery</h1>
//           <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
//         </div>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {[...Array(8)].map((_, index) => (
//             <div
//               key={index}
//               className="overflow-hidden rounded-xl shadow bg-gray-200 animate-pulse h-48"
//             ></div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold">Photo Gallery</h1>
//         <button
//           onClick={handleRefresh}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
//         >
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//           </svg>
//           Refresh
//         </button>
//       </div>

//       {photos.length === 0 ? (
//         <div className="text-center py-16">
//           <div className="text-gray-500 text-lg mb-4">No photos in the gallery yet</div>
//           <p className="text-gray-400">Check back later for updates!</p>
//         </div>
//       ) : (
//         <>
//           {/* ✅ FIXED: Using regular img tag instead of Next.js Image */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//             {photos.map((photo, index) => (
//               <div
//                 key={photo.id}
//                 className="overflow-hidden rounded-xl shadow cursor-pointer relative h-48 group"
//                 onClick={() => openModal(index)}
//               >
//                 {/* ✅ CHANGED: Using regular img tag */}
//                 <img
//                   src={photo.image_url}
//                   alt={photo.description || `Gallery photo ${index + 1}`}
//                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-xl"
//                   loading="lazy"
//                 />
                
//                 {photo.description && (
//                   <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end p-3">
//                     <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
//                       {photo.description}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="text-center mt-6 text-gray-600">
//             Showing {photos.length} photo{photos.length !== 1 ? 's' : ''}
//           </div>
//         </>
//       )}

//       {/* Lightbox Modal */}
//       {isOpen && photos.length > 0 && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
//           <button
//             className="absolute top-5 right-5 text-white text-3xl font-bold z-10 hover:bg-white hover:bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
//             onClick={closeModal}
//           >
//             &times;
//           </button>

//           <button
//             className={`absolute left-5 text-white text-3xl font-bold z-10 hover:bg-white hover:bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center transition-colors ${
//               currentIndex === 0 ? "opacity-30 cursor-not-allowed" : ""
//             }`}
//             onClick={prevImage}
//             disabled={currentIndex === 0}
//           >
//             &#10094;
//           </button>

//           <div className="relative max-w-full max-h-full w-auto h-auto flex flex-col items-center">
//             {/* ✅ CHANGED: Using regular img tag in lightbox too */}
//             <img
//               src={photos[currentIndex].image_url}
//               alt={photos[currentIndex].description || `Gallery photo ${currentIndex + 1}`}
//               className="rounded-lg shadow-lg object-contain max-w-full max-h-[80vh]"
//             />
            
//             {photos[currentIndex].description && (
//               <div className="mt-4 text-white text-center max-w-2xl">
//                 <p className="text-lg">{photos[currentIndex].description}</p>
//               </div>
//             )}
            
//             <div className="mt-2 text-white text-sm opacity-75">
//               {currentIndex + 1} of {photos.length}
//             </div>
//           </div>

//           <button
//             className={`absolute right-5 text-white text-3xl font-bold z-10 hover:bg-white hover:bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center transition-colors ${
//               currentIndex === photos.length - 1
//                 ? "opacity-30 cursor-not-allowed"
//                 : ""
//             }`}
//             onClick={nextImage}
//             disabled={currentIndex === photos.length - 1}
//           >
//             &#10095;
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface GalleryPhoto {
  id: number;
  image_url: string;
  description: string | null;
  created_at: string;
}

// Cache System (same as before)
interface CacheData {
  data: any;
  timestamp: number;
  version: string;
}

class AppCache {
  private static readonly CACHE_DURATION = 5 * 60 * 1000;
  private static readonly CACHE_VERSION = 'v1';

  static set(key: string, data: any): void {
    if (typeof window === 'undefined') return;
    const cacheData: CacheData = { data, timestamp: Date.now(), version: this.CACHE_VERSION };
    try {
      localStorage.setItem(`cache_${key}`, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Cache storage failed:', error);
    }
  }

  static get(key: string): any | null {
    if (typeof window === 'undefined') return null;
    try {
      const cached = localStorage.getItem(`cache_${key}`);
      if (!cached) return null;
      const cacheData: CacheData = JSON.parse(cached);
      if (cacheData.version !== this.CACHE_VERSION || Date.now() - cacheData.timestamp > this.CACHE_DURATION) {
        this.remove(key);
        return null;
      }
      return cacheData.data;
    } catch (error) {
      this.remove(key);
      return null;
    }
  }

  static remove(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(`cache_${key}`);
  }
}

export default function LightboxGallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchGalleryPhotos = async (forceRefresh: boolean = false) => {
    if (!forceRefresh) {
      const cachedGallery = AppCache.get('gallery');
      if (cachedGallery) {
        setPhotos(cachedGallery);
        setLoading(false);
        return;
      }
    }

    try {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) {
        console.error("Error fetching gallery:", error);
        const cachedGallery = AppCache.get('gallery');
        if (cachedGallery) setPhotos(cachedGallery);
      } else {
        setPhotos(data || []);
        AppCache.set('gallery', data);
      }
    } catch (error) {
      console.error("Network error:", error);
      const cachedGallery = AppCache.get('gallery');
      if (cachedGallery) setPhotos(cachedGallery);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryPhotos();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    fetchGalleryPhotos(true);
  };

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const nextImage = () => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Handle arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Photo Gallery</h1>
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl shadow bg-gray-200 animate-pulse h-48"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Photo Gallery</h1>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      {photos.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-gray-500 text-lg mb-4">No photos in the gallery yet</div>
          <p className="text-gray-400">Check back later for updates!</p>
        </div>
      ) : (
        <>
          {/* ✅ FIXED: Grid with proper image visibility */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className="overflow-hidden rounded-xl shadow cursor-pointer relative group bg-white"
                onClick={() => openModal(index)}
              >
                {/* ✅ FIXED: Proper image container with visible image */}
                <div className="w-full aspect-square relative">
                  <img
                    src={photo.image_url}
                    alt={photo.description || `Gallery photo ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                
                {/* ✅ FIXED: Description overlay */}
                {photo.description && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-3">
                    <p className="text-white text-sm truncate">
                      {photo.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-6 text-gray-600">
            Showing {photos.length} photo{photos.length !== 1 ? 's' : ''}
          </div>
        </>
      )}

      {/* Lightbox Modal - This part already works */}
      {isOpen && photos.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <button
            className="absolute top-5 right-5 text-white text-3xl font-bold z-10 hover:bg-white hover:bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            onClick={closeModal}
          >
            &times;
          </button>

          <button
            className={`absolute left-5 text-white text-3xl font-bold z-10 hover:bg-white hover:bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center transition-colors ${
              currentIndex === 0 ? "opacity-30 cursor-not-allowed" : ""
            }`}
            onClick={prevImage}
            disabled={currentIndex === 0}
          >
            &#10094;
          </button>

          <div className="relative max-w-full max-h-full w-auto h-auto flex flex-col items-center">
            <img
              src={photos[currentIndex].image_url}
              alt={photos[currentIndex].description || `Gallery photo ${currentIndex + 1}`}
              className="rounded-lg shadow-lg object-contain max-w-full max-h-[80vh]"
            />
            
            {photos[currentIndex].description && (
              <div className="mt-4 text-white text-center max-w-2xl">
                <p className="text-lg">{photos[currentIndex].description}</p>
              </div>
            )}
            
            <div className="mt-2 text-white text-sm opacity-75">
              {currentIndex + 1} of {photos.length}
            </div>
          </div>

          <button
            className={`absolute right-5 text-white text-3xl font-bold z-10 hover:bg-white hover:bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center transition-colors ${
              currentIndex === photos.length - 1
                ? "opacity-30 cursor-not-allowed"
                : ""
            }`}
            onClick={nextImage}
            disabled={currentIndex === photos.length - 1}
          >
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
}