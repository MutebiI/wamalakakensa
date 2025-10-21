// // "use client"
// // import { useState } from "react";

// // export default function News() {
// //   // Example generic school news posts with images
// //   const [newsPosts, setNewsPosts] = useState([
// //     {
// //       id: 1,
// //       title: "Welcome Back to School",
// //       content: "We welcome all students, staff, and parents to the new term. Stay informed with our latest updates. This term we have new programs, updated syllabus, and special events that will keep everyone engaged throughout the year.",
// //       date: "October 10, 2025",
// //       imageUrl: "/images/school-welcome.jpg",
// //     },
// //     {
// //       id: 2,
// //       title: "Upcoming School Events",
// //       content: "Please check our events calendar for upcoming school activities, competitions, and exhibitions. There will also be workshops and parent-teacher meetings to ensure smooth communication.",
// //       date: "October 1, 2025",
// //       imageUrl: "/images/school-events.jpg",
// //     },
// //   ]);

// //   // State to track which post is expanded
// //   const [expandedPosts, setExpandedPosts] = useState({});

// //   const toggleExpand = (id) => {
// //     setExpandedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
// //   };

// //   return (
// //     <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem", fontFamily: "Arial, sans-serif" }}>
// //       <h1 style={{ textAlign: "center", color: "#002244", marginBottom: "2rem" }}>School News</h1>

// //       {newsPosts.map((post) => (
// //         <div
// //           key={post.id}
// //           style={{
// //             marginBottom: "2rem",
// //             padding: "1.2rem",
// //             border: "1px solid #ccc",
// //             borderRadius: "8px",
// //             backgroundColor: "#f9f9f9",
// //           }}
// //         >
// //           <h2 style={{ color: "#002244" }}>{post.title}</h2>
// //           <p style={{ fontSize: "0.85rem", color: "#555" }}>{post.date}</p>
// //           {post.imageUrl && (
// //             <img
// //               src={post.imageUrl}
// //               alt={post.title}
// //               style={{ maxWidth: "100%", borderRadius: "8px", marginTop: "1rem" }}
// //             />
// //           )}
// //           <p>
// //             {expandedPosts[post.id] ? post.content : `${post.content.slice(0, 100)}... `}
// //             <span
// //               onClick={() => toggleExpand(post.id)}
// //               style={{ color: "#002244", cursor: "pointer", fontWeight: "bold" }}
// //             >
// //               {expandedPosts[post.id] ? "Show Less" : "Read More"}
// //             </span>
// //           </p>
// //         </div>
// //       ))}

// //       <div
// //         style={{
// //           marginTop: "3rem",
// //           padding: "1.5rem",
// //           borderTop: "2px solid #002244",
// //           textAlign: "center",
// //         }}
// //       >
// //         <h2 style={{ color: "#002244" }}>Subscribe for Updates</h2>
// //         <p>Enter your email to receive the latest school news directly in your inbox.</p>
// //         {/* Subscribe form will go here */}
// //       </div>
// //     </div>
// //   );
// // }

// // "use client";
// // import { useState, useEffect } from "react";
// // import { supabase } from "@/lib/supabaseClient";

// // interface NewsPost {
// //   id: number;
// //   title: string;
// //   content: string;
// //   image_url: string | null;
// //   created_at: string;
// // }

// // export default function News() {
// //   const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);
// //   const [loading, setLoading] = useState(true);
  
// //   // State to track which post is expanded
// //   const [expandedPosts, setExpandedPosts] = useState<{[key: number]: boolean}>({});

// //   // Fetch news from your database
// //   const fetchNews = async () => {
// //     const { data, error } = await supabase
// //       .from("news")
// //       .select("*")
// //       .order("created_at", { ascending: false });
    
// //     if (error) {
// //       console.error("Error fetching news:", error);
// //     } else {
// //       setNewsPosts(data || []);
// //     }
// //     setLoading(false);
// //   };

// //   useEffect(() => {
// //     fetchNews();
// //   }, []);

// //   const toggleExpand = (id: number) => {
// //     setExpandedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
// //   };

// //   // Format date from created_at
// //   const formatDate = (dateString: string) => {
// //     return new Date(dateString).toLocaleDateString('en-US', {
// //       year: 'numeric',
// //       month: 'long',
// //       day: 'numeric'
// //     });
// //   };

// //   if (loading) {
// //     return (
// //       <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
// //         <h1 style={{ textAlign: "center", color: "#002244", marginBottom: "2rem" }}>School News</h1>
// //         <p>Loading news...</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem", fontFamily: "Arial, sans-serif" }}>
// //       <h1 style={{ textAlign: "center", color: "#002244", marginBottom: "2rem" }}>School News</h1>

// //       {newsPosts.length === 0 ? (
// //         <p style={{ textAlign: "center", color: "#666" }}>No news posts yet. Check back later!</p>
// //       ) : (
// //         newsPosts.map((post) => (
// //           <div
// //             key={post.id}
// //             style={{
// //               marginBottom: "2rem",
// //               padding: "1.2rem",
// //               border: "1px solid #ccc",
// //               borderRadius: "8px",
// //               backgroundColor: "#f9f9f9",
// //             }}
// //           >
// //             <h2 style={{ color: "#002244" }}>{post.title}</h2>
// //             <p style={{ fontSize: "0.85rem", color: "#555" }}>
// //               {formatDate(post.created_at)}
// //             </p>
// //             {post.image_url && (
// //               <img
// //                 src={post.image_url}
// //                 alt={post.title}
// //                 style={{ 
// //                   maxWidth: "100%", 
// //                   maxHeight: "400px",
// //                   borderRadius: "8px", 
// //                   marginTop: "1rem",
// //                   objectFit: "cover" 
// //                 }}
// //               />
// //             )}
// //             <p style={{ marginTop: "1rem", lineHeight: "1.6" }}>
// //               {expandedPosts[post.id] ? post.content : `${post.content.slice(0, 100)}... `}
// //               {post.content.length > 100 && (
// //                 <span
// //                   onClick={() => toggleExpand(post.id)}
// //                   style={{ color: "#002244", cursor: "pointer", fontWeight: "bold", marginLeft: "0.5rem" }}
// //                 >
// //                   {expandedPosts[post.id] ? "Show Less" : "Read More"}
// //                 </span>
// //               )}
// //             </p>
// //           </div>
// //         ))
// //       )}

// //       <div
// //         style={{
// //           marginTop: "3rem",
// //           padding: "1.5rem",
// //           borderTop: "2px solid #002244",
// //           textAlign: "center",
// //         }}
// //       >
// //         <h2 style={{ color: "#002244" }}>Subscribe for Updates</h2>
// //         <p>Enter your email to receive the latest school news directly in your inbox.</p>
// //         {/* Subscribe form will go here */}
// //       </div>
// //     </div>
// //   );
// // }

// // "use client";
// // import { useState, useEffect } from "react";
// // import { supabase } from "@/lib/supabaseClient";

// // interface NewsPost {
// //   id: number;
// //   title: string;
// //   content: string;
// //   image_url: string | null;
// //   created_at: string;
// // }

// // export default function News() {
// //   const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);
// //   const [loading, setLoading] = useState(true);
  
// //   // State to track which post is expanded
// //   const [expandedPosts, setExpandedPosts] = useState<{[key: number]: boolean}>({});

// //   // Fetch news from your database
// //   const fetchNews = async () => {
// //     const { data, error } = await supabase
// //       .from("news")
// //       .select("*")
// //       .order("created_at", { ascending: false });
    
// //     if (error) {
// //       console.error("Error fetching news:", error);
// //     } else {
// //       setNewsPosts(data || []);
// //     }
// //     setLoading(false);
// //   };

// //   useEffect(() => {
// //     fetchNews();
// //   }, []);

// //   const toggleExpand = (id: number) => {
// //     setExpandedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
// //   };

// //   // Format date from created_at
// //   const formatDate = (dateString: string) => {
// //     return new Date(dateString).toLocaleDateString('en-US', {
// //       year: 'numeric',
// //       month: 'long',
// //       day: 'numeric'
// //     });
// //   };

// //   if (loading) {
// //     return (
// //       <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
// //         <h1 style={{ textAlign: "center", color: "#002244", marginBottom: "2rem" }}>School News</h1>
// //         <p>Loading news...</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem", fontFamily: "Arial, sans-serif" }}>
// //       <h1 style={{ textAlign: "center", color: "#002244", marginBottom: "2rem" }}>School News</h1>

// //       {newsPosts.length === 0 ? (
// //         <p style={{ textAlign: "center", color: "#666" }}>No news posts yet. Check back later!</p>
// //       ) : (
// //         newsPosts.map((post) => (
// //           <div
// //             key={post.id}
// //             style={{
// //               marginBottom: "2.5rem",
// //               padding: "1.5rem",
// //               border: "1px solid #e1e5e9",
// //               borderRadius: "12px",
// //               backgroundColor: "#ffffff",
// //               boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// //             }}
// //           >
// //             <h2 style={{ color: "#002244", marginBottom: "0.5rem", textAlign: "center" }}>
// //               {post.title}
// //             </h2>
// //             <p style={{ 
// //               fontSize: "0.85rem", 
// //               color: "#666", 
// //               textAlign: "center",
// //               marginBottom: "1.5rem"
// //             }}>
// //               {formatDate(post.created_at)}
// //             </p>
            
// //             {post.image_url && (
// //               <div style={{ 
// //                 display: "flex", 
// //                 justifyContent: "center", 
// //                 marginBottom: "1.5rem" 
// //               }}>
// //                 <img
// //                   src={post.image_url}
// //                   alt={post.title}
// //                   style={{ 
// //                     maxWidth: "100%", 
// //                     maxHeight: "400px",
// //                     borderRadius: "8px", 
// //                     objectFit: "contain",
// //                     boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
// //                   }}
// //                 />
// //               </div>
// //             )}
            
// //             <div style={{ 
// //               lineHeight: "1.6", 
// //               color: "#333",
// //               textAlign: "left"
// //             }}>
// //               {expandedPosts[post.id] ? post.content : `${post.content.slice(0, 150)}... `}
// //               {post.content.length > 150 && (
// //                 <span
// //                   onClick={() => toggleExpand(post.id)}
// //                   style={{ 
// //                     color: "#002244", 
// //                     cursor: "pointer", 
// //                     fontWeight: "bold", 
// //                     marginLeft: "0.5rem",
// //                     display: "inline-block",
// //                     marginTop: "0.5rem"
// //                   }}
// //                 >
// //                   {expandedPosts[post.id] ? "Show Less" : "Read More"}
// //                 </span>
// //               )}
// //             </div>
// //           </div>
// //         ))
// //       )}

// //       <div
// //         style={{
// //           marginTop: "3rem",
// //           padding: "2rem",
// //           borderTop: "2px solid #002244",
// //           textAlign: "center",
// //           backgroundColor: "#f8f9fa",
// //           borderRadius: "8px"
// //         }}
// //       >
// //         <h2 style={{ color: "#002244", marginBottom: "1rem" }}>Stay Updated</h2>
// //         <p style={{ color: "#666", marginBottom: "1.5rem" }}>
// //           Never miss important school announcements and events.
// //         </p>
// //         {/* Subscribe form will go here */}
// //         <div style={{ display: "inline-flex", gap: "0.5rem" }}>
// //           <input 
// //             type="email" 
// //             placeholder="Enter your email"
// //             style={{
// //               padding: "0.75rem",
// //               border: "1px solid #ccc",
// //               borderRadius: "4px",
// //               minWidth: "250px"
// //             }}
// //           />
// //           <button
// //             style={{
// //               padding: "0.75rem 1.5rem",
// //               backgroundColor: "#002244",
// //               color: "white",
// //               border: "none",
// //               borderRadius: "4px",
// //               cursor: "pointer"
// //             }}
// //           >
// //             Subscribe
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// // "use client";
// // import { useState, useEffect } from "react";
// // import { supabase } from "@/lib/supabaseClient";

// // interface NewsPost {
// //   id: number;
// //   title: string;
// //   content: string;
// //   image_url: string | null;
// //   created_at: string;
// // }

// // export default function News() {
// //   const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);
// //   const [loading, setLoading] = useState(true);
  
// //   const [expandedPosts, setExpandedPosts] = useState<{[key: number]: boolean}>({});

// //   const fetchNews = async () => {
// //     const { data, error } = await supabase
// //       .from("news")
// //       .select("*")
// //       .order("created_at", { ascending: false });
    
// //     if (error) console.error("Error fetching news:", error);
// //     else setNewsPosts(data || []);
// //     setLoading(false);
// //   };

// //   useEffect(() => { fetchNews(); }, []);

// //   const toggleExpand = (id: number) => {
// //     setExpandedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
// //   };

// //   // ✅ FIX: Convert line breaks to HTML with proper paragraphs
// //   const formatContent = (content: string, isExpanded: boolean) => {
// //     if (!isExpanded && content.length > 150) {
// //       return content.slice(0, 150) + '...';
// //     }
    
// //     // Convert line breaks to proper HTML paragraphs
// //     const paragraphs = content.split('\n').filter(p => p.trim() !== '');
    
// //     return (
// //       <div>
// //         {paragraphs.map((paragraph, index) => (
// //           <p key={index} style={{ marginBottom: '1rem' }}>
// //             {paragraph}
// //           </p>
// //         ))}
// //       </div>
// //     );
// //   };

// //   const formatDate = (dateString: string) => {
// //     return new Date(dateString).toLocaleDateString('en-US', {
// //       year: 'numeric',
// //       month: 'long',
// //       day: 'numeric'
// //     });
// //   };

// //   if (loading) {
// //     return (
// //       <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
// //         <h1 style={{ textAlign: "center", color: "#002244", marginBottom: "2rem" }}>School News</h1>
// //         <p>Loading news...</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem", fontFamily: "Arial, sans-serif" }}>
// //       <h1 style={{ textAlign: "center", color: "#002244", marginBottom: "2rem" }}>School News</h1>

// //       {newsPosts.length === 0 ? (
// //         <p style={{ textAlign: "center", color: "#666" }}>No news posts yet. Check back later!</p>
// //       ) : (
// //         newsPosts.map((post) => (
// //           <div
// //             key={post.id}
// //             style={{
// //               marginBottom: "2.5rem",
// //               padding: "1.5rem",
// //               border: "1px solid #e1e5e9",
// //               borderRadius: "12px",
// //               backgroundColor: "#ffffff",
// //               boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// //             }}
// //           >
// //             <h2 style={{ color: "#002244", marginBottom: "0.5rem", textAlign: "center" }}>
// //               {post.title}
// //             </h2>
// //             <p style={{ 
// //               fontSize: "0.85rem", 
// //               color: "#666", 
// //               textAlign: "center",
// //               marginBottom: "1.5rem"
// //             }}>
// //               {formatDate(post.created_at)}
// //             </p>
            
// //             {post.image_url && (
// //               <div style={{ 
// //                 display: "flex", 
// //                 justifyContent: "center", 
// //                 marginBottom: "1.5rem" 
// //               }}>
// //                 <img
// //                   src={post.image_url}
// //                   alt={post.title}
// //                   style={{ 
// //                     maxWidth: "100%", 
// //                     maxHeight: "400px",
// //                     borderRadius: "8px", 
// //                     objectFit: "contain",
// //                     boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
// //                   }}
// //                 />
// //               </div>
// //             )}
            
// //             <div style={{ 
// //               lineHeight: "1.6", 
// //               color: "#333",
// //               textAlign: "left"
// //             }}>
// //               {formatContent(post.content, expandedPosts[post.id])}
              
// //               {post.content.length > 150 && (
// //                 <span
// //                   onClick={() => toggleExpand(post.id)}
// //                   style={{ 
// //                     color: "#002244", 
// //                     cursor: "pointer", 
// //                     fontWeight: "bold", 
// //                     marginLeft: "0.5rem",
// //                     display: "inline-block",
// //                     marginTop: "0.5rem"
// //                   }}
// //                 >
// //                   {expandedPosts[post.id] ? "Show Less" : "Read More"}
// //                 </span>
// //               )}
// //             </div>
// //           </div>
// //         ))
// //       )}

// //       <div
// //         style={{
// //           marginTop: "3rem",
// //           padding: "2rem",
// //           borderTop: "2px solid #002244",
// //           textAlign: "center",
// //           backgroundColor: "#f8f9fa",
// //           borderRadius: "8px"
// //         }}
// //       >
// //         <h2 style={{ color: "#002244", marginBottom: "1rem" }}>Stay Updated</h2>
// //         <p style={{ color: "#666", marginBottom: "1.5rem" }}>
// //           Never miss important school announcements and events.
// //         </p>
// //         <div style={{ display: "inline-flex", gap: "0.5rem" }}>
// //           <input 
// //             type="email" 
// //             placeholder="Enter your email"
// //             style={{
// //               padding: "0.75rem",
// //               border: "1px solid #ccc",
// //               borderRadius: "4px",
// //               minWidth: "250px"
// //             }}
// //           />
// //           <button
// //             style={{
// //               padding: "0.75rem 1.5rem",
// //               backgroundColor: "#002244",
// //               color: "white",
// //               border: "none",
// //               borderRadius: "4px",
// //               cursor: "pointer"
// //             }}
// //           >
// //             Subscribe
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // "use client";
// // import { useState, useEffect } from "react";
// // import { supabase } from "@/lib/supabaseClient";

// // interface NewsPost {
// //   id: number;
// //   title: string;
// //   content: string;
// //   image_url: string | null;
// //   created_at: string;
// // }

// // export default function News() {
// //   const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);
// //   const [loading, setLoading] = useState(true);
  
// //   const [expandedPosts, setExpandedPosts] = useState<{[key: number]: boolean}>({});

// //   const fetchNews = async () => {
// //     const { data, error } = await supabase
// //       .from("news")
// //       .select("*")
// //       .order("created_at", { ascending: false });
    
// //     if (error) console.error("Error fetching news:", error);
// //     else setNewsPosts(data || []);
// //     setLoading(false);
// //   };

// //   useEffect(() => { fetchNews(); }, []);

// //   const toggleExpand = (id: number) => {
// //     setExpandedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
// //   };

// //   // ✅ FIXED: Now properly handles HTML content with truncation
// //   const formatContent = (content: string, isExpanded: boolean, postId: number) => {
// //     // If not expanded and content is long, show truncated version
// //     if (!isExpanded && content.length > 150) {
// //       // Create a temporary div to parse HTML and get text content for truncation
// //       const tempDiv = document.createElement('div');
// //       tempDiv.innerHTML = content;
// //       const textContent = tempDiv.textContent || tempDiv.innerText || '';
      
// //       if (textContent.length > 150) {
// //         return (
// //           <div>
// //             <div 
// //               dangerouslySetInnerHTML={{ __html: content.slice(0, 150) + '...' }} 
// //             />
// //           </div>
// //         );
// //       }
// //     }
    
// //     // Show full content with HTML rendering
// //     return (
// //       <div 
// //         dangerouslySetInnerHTML={{ __html: content }} 
// //       />
// //     );
// //   };

// //   const formatDate = (dateString: string) => {
// //     return new Date(dateString).toLocaleDateString('en-US', {
// //       year: 'numeric',
// //       month: 'long',
// //       day: 'numeric'
// //     });
// //   };

// //   if (loading) {
// //     return (
// //       <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
// //         <h1 style={{ textAlign: "center", color: "#002244", marginBottom: "2rem" }}>School News</h1>
// //         <p>Loading news...</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem", fontFamily: "Arial, sans-serif" }}>
// //       <h1 style={{ textAlign: "center", color: "#002244", marginBottom: "2rem" }}>School News</h1>

// //       {newsPosts.length === 0 ? (
// //         <p style={{ textAlign: "center", color: "#666" }}>No news posts yet. Check back later!</p>
// //       ) : (
// //         newsPosts.map((post) => (
// //           <div
// //             key={post.id}
// //             style={{
// //               marginBottom: "2.5rem",
// //               padding: "1.5rem",
// //               border: "1px solid #e1e5e9",
// //               borderRadius: "12px",
// //               backgroundColor: "#ffffff",
// //               boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// //             }}
// //           >
// //             <h2 style={{ color: "#002244", marginBottom: "0.5rem", textAlign: "center" }}>
// //               {post.title}
// //             </h2>
// //             <p style={{ 
// //               fontSize: "0.85rem", 
// //               color: "#666", 
// //               textAlign: "center",
// //               marginBottom: "1.5rem"
// //             }}>
// //               {formatDate(post.created_at)}
// //             </p>
            
// //             {post.image_url && (
// //               <div style={{ 
// //                 display: "flex", 
// //                 justifyContent: "center", 
// //                 marginBottom: "1.5rem" 
// //               }}>
// //                 <img
// //                   src={post.image_url}
// //                   alt={post.title}
// //                   style={{ 
// //                     maxWidth: "100%", 
// //                     maxHeight: "400px",
// //                     borderRadius: "8px", 
// //                     objectFit: "contain",
// //                     boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
// //                   }}
// //                 />
// //               </div>
// //             )}
            
// //             <div 
// //               className="news-content"
// //               style={{ 
// //                 lineHeight: "1.6", 
// //                 color: "#333",
// //                 textAlign: "left"
// //               }}
// //             >
// //               {formatContent(post.content, expandedPosts[post.id], post.id)}
              
// //               {post.content.length > 150 && (
// //                 <span
// //                   onClick={() => toggleExpand(post.id)}
// //                   style={{ 
// //                     color: "#002244", 
// //                     cursor: "pointer", 
// //                     fontWeight: "bold", 
// //                     marginLeft: "0.5rem",
// //                     display: "inline-block",
// //                     marginTop: "0.5rem"
// //                   }}
// //                 >
// //                   {expandedPosts[post.id] ? "Show Less" : "Read More"}
// //                 </span>
// //               )}
// //             </div>

// //             {/* Add CSS for HTML elements */}
// //             <style jsx>{`
// //               .news-content h1, .news-content h2, .news-content h3 {
// //                 margin: 1rem 0 0.5rem 0;
// //                 color: #002244;
// //               }
// //               .news-content h3 {
// //                 font-size: 1.3rem;
// //                 border-bottom: 1px solid #002244;
// //                 padding-bottom: 0.3rem;
// //               }
// //               .news-content p {
// //                 margin-bottom: 1rem;
// //               }
// //               .news-content ul, .news-content ol {
// //                 margin: 0.5rem 0;
// //                 padding-left: 1.5rem;
// //               }
// //               .news-content li {
// //                 margin-bottom: 0.3rem;
// //               }
// //               .news-content strong {
// //                 font-weight: bold;
// //                 color: #002244;
// //               }
// //               .news-content em {
// //                 font-style: italic;
// //               }
// //               .news-content u {
// //                 text-decoration: underline;
// //               }
// //               .news-content a {
// //                 color: #0066cc;
// //                 text-decoration: none;
// //               }
// //               .news-content a:hover {
// //                 text-decoration: underline;
// //               }
// //               .news-content div[style*="text-align: center"] {
// //                 text-align: center;
// //                 margin: 0.5rem 0;
// //               }
// //               .news-content span[style*="color: red"] {
// //                 color: red !important;
// //               }
// //               .news-content span[style*="color: blue"] {
// //                 color: blue !important;
// //               }
// //               .news-content span[style*="color: green"] {
// //                 color: green !important;
// //               }
// //             `}</style>
// //           </div>
// //         ))
// //       )}

// //       <div
// //         style={{
// //           marginTop: "3rem",
// //           padding: "2rem",
// //           borderTop: "2px solid #002244",
// //           textAlign: "center",
// //           backgroundColor: "#f8f9fa",
// //           borderRadius: "8px"
// //         }}
// //       >
// //         <h2 style={{ color: "#002244", marginBottom: "1rem" }}>Stay Updated</h2>
// //         <p style={{ color: "#666", marginBottom: "1.5rem" }}>
// //           Never miss important school announcements and events.
// //         </p>
// //         <div style={{ display: "inline-flex", gap: "0.5rem" }}>
// //           <input 
// //             type="email" 
// //             placeholder="Enter your email"
// //             style={{
// //               padding: "0.75rem",
// //               border: "1px solid #ccc",
// //               borderRadius: "4px",
// //               minWidth: "250px"
// //             }}
// //           />
// //           <button
// //             style={{
// //               padding: "0.75rem 1.5rem",
// //               backgroundColor: "#002244",
// //               color: "white",
// //               border: "none",
// //               borderRadius: "4px",
// //               cursor: "pointer"
// //             }}
// //           >
// //             Subscribe
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";
// import { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabaseClient";

// interface NewsPost {
//   id: number;
//   title: string;
//   content: string;
//   image_url: string | null;
//   created_at: string;
// }

// export default function News() {
//   const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);
//   const [loading, setLoading] = useState(true);
  
//   const [expandedPosts, setExpandedPosts] = useState<{[key: number]: boolean}>({});

//   const fetchNews = async () => {
//     const { data, error } = await supabase
//       .from("news")
//       .select("*")
//       .order("created_at", { ascending: false });
    
//     if (error) console.error("Error fetching news:", error);
//     else setNewsPosts(data || []);
//     setLoading(false);
//   };

//   useEffect(() => { fetchNews(); }, []);

//   const toggleExpand = (id: number) => {
//     setExpandedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   // ✅ FIXED: Properly handles HTML content with preserved spacing
//   const formatContent = (content: string, isExpanded: boolean, postId: number) => {
//     // If not expanded and content is long, show truncated version
//     if (!isExpanded && content.length > 150) {
//       // Create a temporary div to parse HTML and get text content for truncation
//       const tempDiv = document.createElement('div');
//       tempDiv.innerHTML = content;
//       const textContent = tempDiv.textContent || tempDiv.innerText || '';
      
//       if (textContent.length > 150) {
//         return (
//           <div 
//             className="news-content"
//             dangerouslySetInnerHTML={{ __html: content.slice(0, 150) + '...' }} 
//           />
//         );
//       }
//     }
     
//     // Show full content with HTML rendering
//     return (
//       <div 
//         className="news-content"
//         dangerouslySetInnerHTML={{ __html: content }} 
//       />
//     );
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   if (loading) {
//     return (
//       <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
//         <h1 style={{ textAlign: "center", color: "#002244", marginBottom: "2rem" }}>School News</h1>
//         <p>Loading news...</p>
//       </div>
//     );
//   }
// //News page automated or activated here and there 
//   return (
//     <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem", fontFamily: "Arial, sans-serif" }}>
//       <h1 style={{ textAlign: "center", color: "#002244", marginBottom: "2rem" }}>School News</h1>

//       {newsPosts.length === 0 ? (
//         <p style={{ textAlign: "center", color: "#666" }}>No news posts yet. Check back later!</p>
//       ) : (
//         newsPosts.map((post) => (
//           <div
//             key={post.id}
//             style={{
//               marginBottom: "2.5rem",
//               padding: "1.5rem",
//               border: "1px solid #e1e5e9",
//               borderRadius: "12px",
//               backgroundColor: "#ffffff",
//               boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//             }}
//           >
//             <h2 style={{ color: "#002244", marginBottom: "0.5rem", textAlign: "center" }}><b>
//               {post.title}
//               </b>
//             </h2>
//             <p style={{ 
//               fontSize: "0.85rem", 
//               color: "#666", 
//               textAlign: "center",
//               marginBottom: "1.5rem"
//             }}><b>
//               {formatDate(post.created_at)}
              
//               </b>
//             </p>
            
//             {post.image_url && (
//               <div style={{ 
//                 display: "flex", 
//                 justifyContent: "center", 
//                 marginBottom: "1.5rem" 
//               }}>
//                 <img
//                   src={post.image_url}
//                   alt={post.title}
//                   style={{ 
//                     maxWidth: "100%", 
//                     maxHeight: "400px",
//                     borderRadius: "8px", 
//                     objectFit: "contain",
//                     boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
//                   }}
//                 />
//               </div>
//             )}
            
//             <div style={{ 
//               lineHeight: "1.6", 
//               color: "#333",
//               textAlign: "left"
//             }}>
//               {formatContent(post.content, expandedPosts[post.id], post.id)}
              
//               {post.content.length > 150 && (
//                 <span
//                   onClick={() => toggleExpand(post.id)}
//                   style={{ 
//                     color: "#002244", 
//                     cursor: "pointer", 
//                     fontWeight: "bold", 
//                     marginLeft: "0.5rem",
//                     display: "inline-block",
//                     marginTop: "0.5rem"
//                   }}
//                 >
//                   {expandedPosts[post.id] ? "Show Less" : "Read More"}
//                 </span>
//               )}
//             </div>

//             {/* Add CSS for HTML elements with proper spacing */}
//             <style jsx>{`
//               .news-content {
//                 white-space: normal;
//                 line-height: 1.7;
//               }
//               .news-content h1, .news-content h2, .news-content h3, .news-content h4 {
//                 margin: 1.5rem 0 1rem 0;
//                 color: #002244;
//                 line-height: 1.3;
//               }
//               .news-content h3 {
//                 font-size: 1.4rem;
//                 border-bottom: 2px solid #002244;
//                 padding-bottom: 0.5rem;
//               }
//               .news-content p {
//                 margin-bottom: 1.2rem;
//                 line-height: 1.7;
//               }
//               .news-content ul, .news-content ol {
//                 margin: 1rem 0 1rem 1.5rem;
//                 padding-left: 1.5rem;
//               }
//               .news-content li {
//                 margin-bottom: 0.5rem;
//                 line-height: 1.6;
//               }
//               .news-content strong {
//                 font-weight: bold;
//                 color: #002244;
//               }
//               .news-content em {
//                 font-style: italic;
//               }
//               .news-content u {
//                 text-decoration: underline;
//               }
//               .news-content a {
//                 color: #0066cc;
//                 text-decoration: none;
//               }
//               .news-content a:hover {
//                 text-decoration: underline;
//               }
//               .news-content div[style*="text-align: center"] {
//                 text-align: center;
//                 margin: 1rem 0;
//               }
//               .news-content span[style*="color: red"] {
//                 color: red !important;
//               }
//               .news-content span[style*="color: blue"] {
//                 color: blue !important;
//               }
//               .news-content span[style*="color: green"] {
//                 color: green !important;
//               }
//               /* Ensure proper spacing between all elements */
//               .news-content * {
//                 margin-top: 0.8rem;
//                 margin-bottom: 0.8rem;
//               }
//               .news-content *:first-child {
//                 margin-top: 0;
//               }
//               .news-content *:last-child {
//                 margin-bottom: 0;
//               }
//             `}</style>
//           </div>
//         ))
//       )}

//       <div
//         style={{
//           marginTop: "3rem",
//           padding: "2rem",
//           borderTop: "2px solid #002244",
//           textAlign: "center",
//           backgroundColor: "#f8f9fa",
//           borderRadius: "8px"
//         }}
//       >
//         <h2 style={{ color: "#002244", marginBottom: "1rem" }}>Stay Updated</h2>
//         <p style={{ color: "#666", marginBottom: "1.5rem" }}>
//           Never miss important school announcements and events.
//         </p>
//         <div style={{ display: "inline-flex", gap: "0.5rem" }}>
//           <input 
//             type="email" 
//             placeholder="Enter your email"
//             style={{
//               padding: "0.75rem",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//               minWidth: "250px"
//             }}
//           />
//           <button
//             style={{
//               padding: "0.75rem 1.5rem",
//               backgroundColor: "#002244",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer"
//             }}
//           >
//             Subscribe
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface NewsPost {
  id: number;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
}

// ✅ ADDED: Same Cache System from Dashboard
interface CacheData {
  data: any;
  timestamp: number;
  version: string;
}

class AppCache {
  private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  private static readonly CACHE_VERSION = 'v1';

  static set(key: string, data: any): void {
    if (typeof window === 'undefined') return;
    
    const cacheData: CacheData = {
      data,
      timestamp: Date.now(),
      version: this.CACHE_VERSION
    };
    
    try {
      localStorage.setItem(`cache_${key}`, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Cache storage failed, clearing older entries:', error);
      this.clearOldEntries();
    }
  }

  static get(key: string): any | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const cached = localStorage.getItem(`cache_${key}`);
      if (!cached) return null;

      const cacheData: CacheData = JSON.parse(cached);
      
      // Check if cache is valid and not expired
      if (cacheData.version !== this.CACHE_VERSION) {
        this.remove(key);
        return null;
      }
      
      if (Date.now() - cacheData.timestamp > this.CACHE_DURATION) {
        this.remove(key);
        return null;
      }
      
      return cacheData.data;
    } catch (error) {
      console.warn('Cache retrieval failed:', error);
      this.remove(key);
      return null;
    }
  }

  static remove(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(`cache_${key}`);
  }

  static clearAll(): void {
    if (typeof window === 'undefined') return;
    
    Object.keys(localStorage)
      .filter(key => key.startsWith('cache_'))
      .forEach(key => localStorage.removeItem(key));
  }

  private static clearOldEntries(): void {
    if (typeof window === 'undefined') return;
    
    Object.keys(localStorage)
      .filter(key => key.startsWith('cache_'))
      .forEach(key => {
        try {
          const cached = localStorage.getItem(key);
          if (cached) {
            const cacheData: CacheData = JSON.parse(cached);
            if (Date.now() - cacheData.timestamp > this.CACHE_DURATION) {
              localStorage.removeItem(key);
            }
          }
        } catch (error) {
          localStorage.removeItem(key);
        }
      });
  }
}

export default function News() {
  const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [expandedPosts, setExpandedPosts] = useState<{[key: number]: boolean}>({});

  // ✅ ENHANCED: Fetch News with Caching
  const fetchNews = async (forceRefresh: boolean = false) => {
    // Try cache first unless forced refresh
    if (!forceRefresh) {
      const cachedNews = AppCache.get('news');
      if (cachedNews) {
        setNewsPosts(cachedNews);
        setLoading(false);
        return; // Use cache, no API call needed
      }
    }

    // Fetch from Supabase if no cache or forced
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      console.error("Error fetching news:", error);
      // If API fails, try to use cached data as fallback
      const cachedNews = AppCache.get('news');
      if (cachedNews) {
        setNewsPosts(cachedNews);
      }
    } else {
      setNewsPosts(data || []);
      AppCache.set('news', data); // Update cache
    }
    setLoading(false);
  };

  useEffect(() => { fetchNews(); }, []);

  const toggleExpand = (id: number) => {
    setExpandedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // ✅ FIXED: Properly handles HTML content with preserved spacing
  const formatContent = (content: string, isExpanded: boolean, postId: number) => {
    // If not expanded and content is long, show truncated version
    if (!isExpanded && content.length > 150) {
      // Create a temporary div to parse HTML and get text content for truncation
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const textContent = tempDiv.textContent || tempDiv.innerText || '';
      
      if (textContent.length > 150) {
        return (
          <div 
            className="news-content"
            dangerouslySetInnerHTML={{ __html: content.slice(0, 150) + '...' }} 
          />
        );
      }
    }
     
    // Show full content with HTML rendering
    return (
      <div 
        className="news-content"
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // ✅ ADDED: Manual refresh for users
  const handleForceRefresh = () => {
    setLoading(true);
    fetchNews(true);
  };

  if (loading) {
    return (
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
        <h1 style={{ textAlign: "center", color: "#002244", marginBottom: "2rem" }}>School News</h1>
        <p>Loading news...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      {/* ✅ ADDED: Refresh Button for Users */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: "#002244", margin: 0 }}>School News</h1>
        <button
          onClick={handleForceRefresh}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#002244",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "0.9rem"
          }}
        >
          🔄 Refresh
        </button>
      </div>

      {newsPosts.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>No news posts yet. Check back later!</p>
      ) : (
        newsPosts.map((post) => (
          <div
            key={post.id}
            style={{
              marginBottom: "2.5rem",
              padding: "1.5rem",
              border: "1px solid #e1e5e9",
              borderRadius: "12px",
              backgroundColor: "#ffffff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ color: "#002244", marginBottom: "0.5rem", textAlign: "center" }}><b>
              {post.title}
              </b>
            </h2>
            <p style={{ 
              fontSize: "0.85rem", 
              color: "#666", 
              textAlign: "center",
              marginBottom: "1.5rem"
            }}><b>
              {formatDate(post.created_at)}
              </b>
            </p>
            
            {post.image_url && (
              <div style={{ 
                display: "flex", 
                justifyContent: "center", 
                marginBottom: "1.5rem" 
              }}>
                <img
                  src={post.image_url}
                  alt={post.title}
                  style={{ 
                    maxWidth: "100%", 
                    maxHeight: "400px",
                    borderRadius: "8px", 
                    objectFit: "contain",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                  }}
                />
              </div>
            )}
            
            <div style={{ 
              lineHeight: "1.6", 
              color: "#333",
              textAlign: "left"
            }}>
              {formatContent(post.content, expandedPosts[post.id], post.id)}
              
              {post.content.length > 150 && (
                <span
                  onClick={() => toggleExpand(post.id)}
                  style={{ 
                    color: "#002244", 
                    cursor: "pointer", 
                    fontWeight: "bold", 
                    marginLeft: "0.5rem",
                    display: "inline-block",
                    marginTop: "0.5rem"
                  }}
                >
                  {expandedPosts[post.id] ? "Show Less" : "Read More"}
                </span>
              )}
            </div>

            {/* Add CSS for HTML elements with proper spacing */}
            <style jsx>{`
              .news-content {
                white-space: normal;
                line-height: 1.7;
              }
              .news-content h1, .news-content h2, .news-content h3, .news-content h4 {
                margin: 1.5rem 0 1rem 0;
                color: #002244;
                line-height: 1.3;
              }
              .news-content h3 {
                font-size: 1.4rem;
                border-bottom: 2px solid #002244;
                padding-bottom: 0.5rem;
              }
              .news-content p {
                margin-bottom: 1.2rem;
                line-height: 1.7;
              }
              .news-content ul, .news-content ol {
                margin: 1rem 0 1rem 1.5rem;
                padding-left: 1.5rem;
              }
              .news-content li {
                margin-bottom: 0.5rem;
                line-height: 1.6;
              }
              .news-content strong {
                font-weight: bold;
                color: #002244;
              }
              .news-content em {
                font-style: italic;
              }
              .news-content u {
                text-decoration: underline;
              }
              .news-content a {
                color: #0066cc;
                text-decoration: none;
              }
              .news-content a:hover {
                text-decoration: underline;
              }
              .news-content div[style*="text-align: center"] {
                text-align: center;
                margin: 1rem 0;
              }
              .news-content span[style*="color: red"] {
                color: red !important;
              }
              .news-content span[style*="color: blue"] {
                color: blue !important;
              }
              .news-content span[style*="color: green"] {
                color: green !important;
              }
              /* Ensure proper spacing between all elements */
              .news-content * {
                margin-top: 0.8rem;
                margin-bottom: 0.8rem;
              }
              .news-content *:first-child {
                margin-top: 0;
              }
              .news-content *:last-child {
                margin-bottom: 0;
              }
            `}</style>
          </div>
        ))
      )}

      <div
        style={{
          marginTop: "3rem",
          padding: "2rem",
          borderTop: "2px solid #002244",
          textAlign: "center",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px"
        }}
      >
        <h2 style={{ color: "#002244", marginBottom: "1rem" }}>Stay Updated</h2>
        <p style={{ color: "#666", marginBottom: "1.5rem" }}>
          Never miss important school announcements and events.
        </p>
        <div style={{ display: "inline-flex", gap: "0.5rem" }}>
          <input 
            type="email" 
            placeholder="Enter your email"
            style={{
              padding: "0.75rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              minWidth: "250px"
            }}
          />
          <button
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#002244",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}