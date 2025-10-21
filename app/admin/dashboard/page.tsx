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

// interface Teacher {
//   id: number;
//   name: string;
//   class_name: string;
//   image_url: string | null;
// }

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState<"news" | "teachers">("news");
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   // News states
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [newsImage, setNewsImage] = useState<File | null>(null);
//   const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);

//   // Teacher states
//   const [teacherName, setTeacherName] = useState("");
//   const [teacherClass, setTeacherClass] = useState("");
//   const [teacherImage, setTeacherImage] = useState<File | null>(null);
//   const [teachers, setTeachers] = useState<Teacher[]>([]);

//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   // Edit states
//   const [editingNews, setEditingNews] = useState<NewsPost | null>(null);
//   const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

//   // Fetch News
//   const fetchNews = async () => {
//     const { data, error } = await supabase
//       .from("news")
//       .select("*")
//       .order("created_at", { ascending: false });
//     if (error) console.error(error);
//     else setNewsPosts(data);
//   };

//   // Fetch Teachers
//   const fetchTeachers = async () => {
//     const { data, error } = await supabase
//       .from("teachers")
//       .select("*")
//       .order("id", { ascending: true });
//     if (error) console.error(error);
//     else setTeachers(data);
//   };

//   useEffect(() => {
//     fetchNews();
//     fetchTeachers();
//   }, []);

//   // ✅ Validate file size (2MB limit)
//   const validateFileSize = (file: File): boolean => {
//     const maxSize = 2 * 1024 * 1024; // 2MB in bytes
//     if (file.size > maxSize) {
//       setErrorMessage("File size too large! Please select an image under 2MB.");
//       return false;
//     }
//     setErrorMessage("");
//     return true;
//   };

//   // ✅ Upload image to Supabase Storage
//   const uploadImage = async (file: File, folder: string) => {
//     const fileName = `${Date.now()}_${file.name}`;
//     const { data, error } = await supabase.storage.from(folder).upload(fileName, file);

//     if (error) {
//       console.error("Upload error:", error);
//       return null;
//     }

//     const { data: publicData } = supabase.storage.from(folder).getPublicUrl(fileName);
//     return publicData.publicUrl;
//   };

//   // ✅ Extract file name from Supabase storage URL
//   const getFileNameFromUrl = (url: string): string | null => {
//     try {
//       const urlObj = new URL(url);
//       const pathParts = urlObj.pathname.split('/');
//       return pathParts[pathParts.length - 1];
//     } catch (error) {
//       console.error("Error extracting file name from URL:", error);
//       return null;
//     }
//   };

//   // ✅ Delete image from Supabase Storage
//   const deleteImageFromStorage = async (imageUrl: string | null, folder: string) => {
//     if (!imageUrl) return;

//     const fileName = getFileNameFromUrl(imageUrl);
//     if (!fileName) return;

//     const { error } = await supabase.storage
//       .from(folder)
//       .remove([fileName]);

//     if (error) {
//       console.error("Error deleting image from storage:", error);
//     } else {
//       console.log("✅ Image deleted from storage:", fileName);
//     }
//   };

//   // Handle file selection with validation
//   const handleNewsImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files ? e.target.files[0] : null;
//     if (file && !validateFileSize(file)) {
//       e.target.value = ""; // Clear the file input
//       return;
//     }
//     setNewsImage(file);
//     setErrorMessage(""); // Clear any previous errors
//   };

//   const handleTeacherImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files ? e.target.files[0] : null;
//     if (file && !validateFileSize(file)) {
//       e.target.value = ""; // Clear the file input
//       return;
//     }
//     setTeacherImage(file);
//     setErrorMessage(""); // Clear any previous errors
//   };

//   // Add News
//   const handleAddNews = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Validate file size again before upload
//     if (newsImage && !validateFileSize(newsImage)) {
//       return;
//     }

//     setLoading(true);
//     let imageUrl: string | null = null;
//     if (newsImage) imageUrl = await uploadImage(newsImage, "avatars");

//     const { error } = await supabase
//       .from("news")
//       .insert([{ title, content, image_url: imageUrl }]);
//     if (error) console.error(error);
//     else {
//       setTitle("");
//       setContent("");
//       setNewsImage(null);
//       (e.target as HTMLFormElement).reset();
//       fetchNews();
//     }
//     setLoading(false);
//   };

//   // Edit News
//   const handleEditNews = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editingNews) return;

//     // Validate file size again before upload
//     if (newsImage && !validateFileSize(newsImage)) {
//       return;
//     }

//     setLoading(true);
//     let imageUrl = editingNews.image_url;

//     // If new image is selected, upload it and delete old one
//     if (newsImage) {
//       // Delete old image if exists
//       if (editingNews.image_url) {
//         await deleteImageFromStorage(editingNews.image_url, "avatars");
//       }
//       // Upload new image
//       imageUrl = await uploadImage(newsImage, "avatars");
//     }

//     const { error } = await supabase
//       .from("news")
//       .update({ title, content, image_url: imageUrl })
//       .eq("id", editingNews.id);

//     if (error) console.error(error);
//     else {
//       setTitle("");
//       setContent("");
//       setNewsImage(null);
//       setEditingNews(null);
//       (e.target as HTMLFormElement).reset();
//       fetchNews();
//     }
//     setLoading(false);
//   };

//   // Delete News
//   const handleDeleteNews = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this news?")) return;
    
//     try {
//       const { data: newsItem, error: fetchError } = await supabase
//         .from("news")
//         .select("image_url")
//         .eq("id", id)
//         .single();

//       if (fetchError) return;

//       if (newsItem?.image_url) {
//         await deleteImageFromStorage(newsItem.image_url, "avatars");
//       }

//       const { error: deleteError } = await supabase.from("news").delete().eq("id", id);
//       if (!deleteError) fetchNews();
//     } catch (error) {
//       console.error("Error in delete process:", error);
//     }
//   };

//   // Start editing news - UPDATED WITH AUTO-SCROLL
//   const startEditNews = (post: NewsPost) => {
//     setEditingNews(post);
//     setTitle(post.title);
//     setContent(post.content);
//     setNewsImage(null);
//     // ✅ AUTO-SCROLL TO TOP
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Cancel editing news
//   const cancelEditNews = () => {
//     setEditingNews(null);
//     setTitle("");
//     setContent("");
//     setNewsImage(null);
//     setErrorMessage("");
//   };

//   // Add Teacher
//   const handleAddTeacher = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Validate file size again before upload
//     if (teacherImage && !validateFileSize(teacherImage)) {
//       return;
//     }

//     setLoading(true);
//     let imageUrl: string | null = null;
//     if (teacherImage) imageUrl = await uploadImage(teacherImage, "avatars");

//     const { error } = await supabase
//       .from("teachers")
//       .insert([{ name: teacherName, class_name: teacherClass, image_url: imageUrl }]);
//     if (error) console.error(error);
//     else {
//       setTeacherName("");
//       setTeacherClass("");
//       setTeacherImage(null);
//       (e.target as HTMLFormElement).reset();
//       fetchTeachers();
//     }
//     setLoading(false);
//   };

//   // Edit Teacher
//   const handleEditTeacher = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editingTeacher) return;

//     // Validate file size again before upload
//     if (teacherImage && !validateFileSize(teacherImage)) {
//       return;
//     }

//     setLoading(true);
//     let imageUrl = editingTeacher.image_url;

//     // If new image is selected, upload it and delete old one
//     if (teacherImage) {
//       // Delete old image if exists
//       if (editingTeacher.image_url) {
//         await deleteImageFromStorage(editingTeacher.image_url, "avatars");
//       }
//       // Upload new image
//       imageUrl = await uploadImage(teacherImage, "avatars");
//     }

//     const { error } = await supabase
//       .from("teachers")
//       .update({ name: teacherName, class_name: teacherClass, image_url: imageUrl })
//       .eq("id", editingTeacher.id);

//     if (error) console.error(error);
//     else {
//       setTeacherName("");
//       setTeacherClass("");
//       setTeacherImage(null);
//       setEditingTeacher(null);
//       (e.target as HTMLFormElement).reset();
//       fetchTeachers();
//     }
//     setLoading(false);
//   };

//   // Delete Teacher
//   const handleDeleteTeacher = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this teacher?")) return;
    
//     try {
//       const { data: teacher, error: fetchError } = await supabase
//         .from("teachers")
//         .select("image_url")
//         .eq("id", id)
//         .single();

//       if (fetchError) return;

//       if (teacher?.image_url) {
//         await deleteImageFromStorage(teacher.image_url, "avatars");
//       }

//       const { error: deleteError } = await supabase.from("teachers").delete().eq("id", id);
//       if (!deleteError) fetchTeachers();
//     } catch (error) {
//       console.error("Error in delete process:", error);
//     }
//   };

//   // Start editing teacher - UPDATED WITH AUTO-SCROLL
//   const startEditTeacher = (teacher: Teacher) => {
//     setEditingTeacher(teacher);
//     setTeacherName(teacher.name);
//     setTeacherClass(teacher.class_name);
//     setTeacherImage(null);
//     setErrorMessage("");
//     // ✅ AUTO-SCROLL TO TOP
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Cancel editing teacher
//   const cancelEditTeacher = () => {
//     setEditingTeacher(null);
//     setTeacherName("");
//     setTeacherClass("");
//     setTeacherImage(null);
//     setErrorMessage("");
//   };

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
//       {/* Sidebar */}
//       <div
//         style={{
//           width: sidebarOpen ? "220px" : "60px",
//           backgroundColor: "#002244",
//           color: "#fff",
//           display: "flex",
//           flexDirection: "column",
//           position: "fixed",
//           top: "2cm",
//           bottom: 0,
//           left: 0,
//           padding: "1rem",
//           transition: "width 0.3s ease",
//         }}
//       >
//         <button
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//           style={{
//             marginBottom: "1rem",
//             backgroundColor: "red",
//             color: "#fff",
//             border: "none",
//             padding: "0.5rem",
//             borderRadius: "4px",
//             cursor: "pointer",
//             alignSelf: "center",
//           }}
//         >
//           {sidebarOpen ? "Close" : "Open"}
//         </button>

//         <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//           <div
//             style={{
//               padding: "0.5rem",
//               cursor: "pointer",
//               backgroundColor: activeTab === "news" ? "#001733" : "transparent",
//             }}
//             onClick={() => setActiveTab("news")}
//           >
//             {sidebarOpen && "News Posts"}
//           </div>
//           <div
//             style={{
//               padding: "0.5rem",
//               cursor: "pointer",
//               backgroundColor: activeTab === "teachers" ? "#001733" : "transparent",
//             }}
//             onClick={() => setActiveTab("teachers")}
//           >
//             {sidebarOpen && "Teachers"}
//           </div>
//           <div style={{ padding: "0.5rem", cursor: "pointer" }}>
//             {sidebarOpen && "Logout"}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div
//         style={{
//           marginLeft: sidebarOpen ? "220px" : "60px",
//           flex: 1,
//           padding: "2rem",
//           backgroundColor: "#f0f2f5",
//           transition: "margin-left 0.3s ease",
//         }}
//       >
//         {activeTab === "news" && (
//           <>
//             <h2 style={{ marginBottom: "1rem" }}>
//               {editingNews ? "Edit News Post" : "Add News Post"}
//             </h2>
//             <form
//               onSubmit={editingNews ? handleEditNews : handleAddNews}
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "1rem",
//                 backgroundColor: "#fff",
//                 padding: "1.5rem",
//                 borderRadius: "12px",
//                 boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//               }}
//             >
//               <input
//                 type="text"
//                 placeholder="Title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//                 style={{
//                   padding: "0.8rem",
//                   borderRadius: "6px",
//                   border: "1px solid #ccc",
//                   outline: "none",
//                 }}
//               />
//               <textarea
//                 placeholder="Content"
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 required
//                 style={{
//                   padding: "0.8rem",
//                   borderRadius: "6px",
//                   border: "1px solid #ccc",
//                   outline: "none",
//                   minHeight: "100px",
//                 }}
//               />
//               <div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleNewsImageSelect}
//                 />
//                 <small style={{ color: "#666", display: "block", marginTop: "0.5rem" }}>
//                   Maximum file size: 2MB. Recommended: Passport-style photos.
//                 </small>
//                 {/* ✅ ERROR MESSAGE POSITIONED RIGHT BELOW THE FILE INPUT */}
//                 {errorMessage && (
//                   <div style={{
//                     backgroundColor: "#ffebee",
//                     color: "#c62828",
//                     padding: "0.75rem",
//                     borderRadius: "6px",
//                     marginTop: "0.5rem",
//                     border: "1px solid #ffcdd2",
//                     fontSize: "0.9rem"
//                   }}>
//                     ⚠️ {errorMessage}
//                   </div>
//                 )}
//               </div>
//               <div style={{ display: "flex", gap: "1rem" }}>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   style={{
//                     padding: "0.8rem",
//                     backgroundColor: editingNews ? "#ffa500" : "#002244",
//                     color: "#fff",
//                     border: "none",
//                     borderRadius: "6px",
//                     cursor: "pointer",
//                     flex: 1,
//                   }}
//                 >
//                   {loading ? "Saving..." : editingNews ? "Update Post" : "Add Post"}
//                 </button>
//                 {editingNews && (
//                   <button
//                     type="button"
//                     onClick={cancelEditNews}
//                     style={{
//                       padding: "0.8rem",
//                       backgroundColor: "#6c757d",
//                       color: "#fff",
//                       border: "none",
//                       borderRadius: "6px",
//                       cursor: "pointer",
//                     }}
//                   >
//                     Cancel
//                   </button>
//                 )}
//               </div>
//             </form>

//             <h2 style={{ margin: "2rem 0 1rem" }}>EXISTING NEWS POSTS</h2>
//             <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//               {newsPosts.map((post) => (
//                 <div
//                   key={post.id}
//                   style={{
//                     backgroundColor: "#fff",
//                     padding: "1rem",
//                     borderRadius: "8px",
//                     boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//                     display: "flex",
//                     alignItems: "flex-start",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flex: 1 }}>
//                     {post.image_url && (
//                       <img
//                         src={post.image_url}
//                         alt={post.title}
//                         style={{ 
//                           width: "120px", 
//                           height: "120px", 
//                           objectFit: "cover",
//                           borderRadius: "8PX"
//                         }}
//                       />
//                     )}
//                     <div style={{ flex: 1 }}>
//                       <h3 style={{ margin: "0 0 0.5rem 0" }}>{post.title}</h3>
//                       <p style={{ margin: 0, color: "#666" }}>{post.content}</p>
//                     </div>
//                   </div>
//                   <div style={{ display: "flex", gap: "0.5rem" }}>
//                     <button
//                       onClick={() => startEditNews(post)}
//                       style={{
//                         backgroundColor: "#ffa500",
//                         color: "#fff",
//                         border: "none",
//                         padding: "0.3rem 0.6rem",
//                         borderRadius: "4px",
//                         cursor: "pointer",
//                       }}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDeleteNews(post.id)}
//                       style={{
//                         backgroundColor: "#cc0000",
//                         color: "#fff",
//                         border: "none",
//                         padding: "0.3rem 0.6rem",
//                         borderRadius: "4px",
//                         cursor: "pointer",
//                       }}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}

//         {activeTab === "teachers" && (
//           <>
//             <h2 style={{ marginBottom: "1rem" }}>
//               {editingTeacher ? "Edit Teacher" : "Add Teacher"}
//             </h2>
//             <form
//               onSubmit={editingTeacher ? handleEditTeacher : handleAddTeacher}
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "1rem",
//                 backgroundColor: "#fff",
//                 padding: "1.5rem",
//                 borderRadius: "12px",
//                 boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//               }}
//             >
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={teacherName}
//                 onChange={(e) => setTeacherName(e.target.value)}
//                 required
//                 style={{
//                   padding: "0.8rem",
//                   borderRadius: "6px",
//                   border: "1px solid #ccc",
//                   outline: "none",
//                 }}
//               />
//               <input
//                 type="text"
//                 placeholder="Class"
//                 value={teacherClass}
//                 onChange={(e) => setTeacherClass(e.target.value)}
//                 required
//                 style={{
//                   padding: "0.8rem",
//                   borderRadius: "6px",
//                   border: "1px solid #ccc",
//                   outline: "none",
//                 }}
//               />
//               <div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleTeacherImageSelect}
//                 />
//                 <small style={{ color: "#666", display: "block", marginTop: "0.5rem" }}>
//                   Maximum file size: 2MB. Recommended: Passport-style photos.
//                 </small>
//                 {/* ✅ ERROR MESSAGE POSITIONED RIGHT BELOW THE FILE INPUT */}
//                 {errorMessage && (
//                   <div style={{
//                     backgroundColor: "#ffebee",
//                     color: "#c62828",
//                     padding: "0.75rem",
//                     borderRadius: "6px",
//                     marginTop: "0.5rem",
//                     border: "1px solid #ffcdd2",
//                     fontSize: "0.9rem"
//                   }}>
//                     ⚠️ {errorMessage}
//                   </div>
//                 )}
//               </div>
//               <div style={{ display: "flex", gap: "1rem" }}>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   style={{
//                     padding: "0.8rem",
//                     backgroundColor: editingTeacher ? "#ffa500" : "#002244",
//                     color: "#fff",
//                     border: "none",
//                     borderRadius: "6px",
//                     cursor: "pointer",
//                     flex: 1,
//                   }}
//                 >
//                   {loading ? "Saving..." : editingTeacher ? "Update Teacher" : "Add Teacher"}
//                 </button>
//                 {editingTeacher && (
//                   <button
//                     type="button"
//                     onClick={cancelEditTeacher}
//                     style={{
//                       padding: "0.8rem",
//                       backgroundColor: "#6c757d",
//                       color: "#fff",
//                       border: "none",
//                       borderRadius: "6px",
//                       cursor: "pointer",
//                     }}
//                   >
//                     Cancel
//                   </button>
//                 )}
//               </div>
//             </form>

//             <h2 style={{ margin: "2rem 0 1rem" }}>Existing Teachers</h2>
//             <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//               {teachers.map((teacher) => (
//                 <div
//                   key={teacher.id}
//                   style={{
//                     backgroundColor: "#fff",
//                     padding: "1rem",
//                     borderRadius: "8px",
//                     boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
//                     {teacher.image_url && (
//                       <img
//                         src={teacher.image_url}
//                         alt={teacher.name}
//                         style={{ 
//                           width: "60px", 
//                           height: "60px", 
//                           objectFit: "cover",
//                           borderRadius: "50%" 
//                         }}
//                       />
//                     )}
//                     <div>
//                       <h4>{teacher.name}</h4>
//                       <p>{teacher.class_name}</p>
//                     </div>
//                   </div>
//                   <div style={{ display: "flex", gap: "0.5rem" }}>
//                     <button
//                       onClick={() => startEditTeacher(teacher)}
//                       style={{
//                         backgroundColor: "#ffa500",
//                         color: "#fff",
//                         border: "none",
//                         padding: "0.3rem 0.6rem",
//                         borderRadius: "4px",
//                         cursor: "pointer",
//                       }}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDeleteTeacher(teacher.id)}
//                       style={{
//                         backgroundColor: "#cc0000",
//                         color: "#fff",
//                         border: "none",
//                         padding: "0.3rem 0.6rem",
//                         borderRadius: "4px",
//                         cursor: "pointer",
//                       }}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

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

// interface Teacher {
//   id: number;
//   name: string;
//   class_name: string;
//   image_url: string | null;
// }

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState<"news" | "teachers">("news");
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   // News states
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [newsImage, setNewsImage] = useState<File | null>(null);
//   const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);

//   // Teacher states
//   const [teacherName, setTeacherName] = useState("");
//   const [teacherClass, setTeacherClass] = useState("");
//   const [teacherImage, setTeacherImage] = useState<File | null>(null);
//   const [teachers, setTeachers] = useState<Teacher[]>([]);

//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   // Edit states
//   const [editingNews, setEditingNews] = useState<NewsPost | null>(null);
//   const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

//   // Fetch News
//   const fetchNews = async () => {
//     const { data, error } = await supabase
//       .from("news")
//       .select("*")
//       .order("created_at", { ascending: false });
//     if (error) console.error(error);
//     else setNewsPosts(data);
//   };

//   // Fetch Teachers
//   const fetchTeachers = async () => {
//     const { data, error } = await supabase
//       .from("teachers")
//       .select("*")
//       .order("id", { ascending: true });
//     if (error) console.error(error);
//     else setTeachers(data);
//   };

//   useEffect(() => {
//     fetchNews();
//     fetchTeachers();
//   }, []);

//   // ✅ Logout function
//   const handleLogout = async () => {
//     if (confirm("Are you sure you want to logout?")) {
//       const { error } = await supabase.auth.signOut();
//       if (error) {
//         console.error("Logout error:", error);
//       } else {
//         // Redirect to login page or home page after logout
//         window.location.href = "/admin"; // Change this to your login route
//       }
//     }
//   };

//   // ✅ Validate file size (2MB limit)
//   const validateFileSize = (file: File): boolean => {
//     const maxSize = 2 * 1024 * 1024; // 2MB in bytes
//     if (file.size > maxSize) {
//       setErrorMessage("File size too large! Please select an image under 2MB.");
//       return false;
//     }
//     setErrorMessage("");
//     return true;
//   };

//   // ✅ Upload image to Supabase Storage
//   const uploadImage = async (file: File, folder: string) => {
//     const fileName = `${Date.now()}_${file.name}`;
//     const { data, error } = await supabase.storage.from(folder).upload(fileName, file);

//     if (error) {
//       console.error("Upload error:", error);
//       return null;
//     }

//     const { data: publicData } = supabase.storage.from(folder).getPublicUrl(fileName);
//     return publicData.publicUrl;
//   };

//   // ✅ Extract file name from Supabase storage URL
//   const getFileNameFromUrl = (url: string): string | null => {
//     try {
//       const urlObj = new URL(url);
//       const pathParts = urlObj.pathname.split('/');
//       return pathParts[pathParts.length - 1];
//     } catch (error) {
//       console.error("Error extracting file name from URL:", error);
//       return null;
//     }
//   };

//   // ✅ Delete image from Supabase Storage
//   const deleteImageFromStorage = async (imageUrl: string | null, folder: string) => {
//     if (!imageUrl) return;

//     const fileName = getFileNameFromUrl(imageUrl);
//     if (!fileName) return;

//     const { error } = await supabase.storage
//       .from(folder)
//       .remove([fileName]);

//     if (error) {
//       console.error("Error deleting image from storage:", error);
//     } else {
//       console.log("✅ Image deleted from storage:", fileName);
//     }
//   };

//   // Handle file selection with validation
//   const handleNewsImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files ? e.target.files[0] : null;
//     if (file && !validateFileSize(file)) {
//       e.target.value = ""; // Clear the file input
//       return;
//     }
//     setNewsImage(file);
//     setErrorMessage(""); // Clear any previous errors
//   };

//   const handleTeacherImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files ? e.target.files[0] : null;
//     if (file && !validateFileSize(file)) {
//       e.target.value = ""; // Clear the file input
//       return;
//     }
//     setTeacherImage(file);
//     setErrorMessage(""); // Clear any previous errors
//   };

//   // Add News
//   const handleAddNews = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Validate file size again before upload
//     if (newsImage && !validateFileSize(newsImage)) {
//       return;
//     }

//     setLoading(true);
//     let imageUrl: string | null = null;
//     if (newsImage) imageUrl = await uploadImage(newsImage, "avatars");

//     const { error } = await supabase
//       .from("news")
//       .insert([{ title, content, image_url: imageUrl }]);
//     if (error) console.error(error);
//     else {
//       setTitle("");
//       setContent("");
//       setNewsImage(null);
//       (e.target as HTMLFormElement).reset();
//       fetchNews();
//     }
//     setLoading(false);
//   };

//   // Edit News
//   const handleEditNews = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editingNews) return;

//     // Validate file size again before upload
//     if (newsImage && !validateFileSize(newsImage)) {
//       return;
//     }

//     setLoading(true);
//     let imageUrl = editingNews.image_url;

//     // If new image is selected, upload it and delete old one
//     if (newsImage) {
//       // Delete old image if exists
//       if (editingNews.image_url) {
//         await deleteImageFromStorage(editingNews.image_url, "avatars");
//       }
//       // Upload new image
//       imageUrl = await uploadImage(newsImage, "avatars");
//     }

//     const { error } = await supabase
//       .from("news")
//       .update({ title, content, image_url: imageUrl })
//       .eq("id", editingNews.id);

//     if (error) console.error(error);
//     else {
//       setTitle("");
//       setContent("");
//       setNewsImage(null);
//       setEditingNews(null);
//       (e.target as HTMLFormElement).reset();
//       fetchNews();
//     }
//     setLoading(false);
//   };

//   // Delete News
//   const handleDeleteNews = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this news?")) return;
    
//     try {
//       const { data: newsItem, error: fetchError } = await supabase
//         .from("news")
//         .select("image_url")
//         .eq("id", id)
//         .single();

//       if (fetchError) return;

//       if (newsItem?.image_url) {
//         await deleteImageFromStorage(newsItem.image_url, "avatars");
//       }

//       const { error: deleteError } = await supabase.from("news").delete().eq("id", id);
//       if (!deleteError) fetchNews();
//     } catch (error) {
//       console.error("Error in delete process:", error);
//     }
//   };

//   // Start editing news - UPDATED WITH AUTO-SCROLL
//   const startEditNews = (post: NewsPost) => {
//     setEditingNews(post);
//     setTitle(post.title);
//     setContent(post.content);
//     setNewsImage(null);
//     // ✅ AUTO-SCROLL TO TOP
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Cancel editing news
//   const cancelEditNews = () => {
//     setEditingNews(null);
//     setTitle("");
//     setContent("");
//     setNewsImage(null);
//     setErrorMessage("");
//   };

//   // Add Teacher
//   const handleAddTeacher = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Validate file size again before upload
//     if (teacherImage && !validateFileSize(teacherImage)) {
//       return;
//     }

//     setLoading(true);
//     let imageUrl: string | null = null;
//     if (teacherImage) imageUrl = await uploadImage(teacherImage, "avatars");

//     const { error } = await supabase
//       .from("teachers")
//       .insert([{ name: teacherName, class_name: teacherClass, image_url: imageUrl }]);
//     if (error) console.error(error);
//     else {
//       setTeacherName("");
//       setTeacherClass("");
//       setTeacherImage(null);
//       (e.target as HTMLFormElement).reset();
//       fetchTeachers();
//     }
//     setLoading(false);
//   };

//   // Edit Teacher
//   const handleEditTeacher = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editingTeacher) return;

//     // Validate file size again before upload
//     if (teacherImage && !validateFileSize(teacherImage)) {
//       return;
//     }

//     setLoading(true);
//     let imageUrl = editingTeacher.image_url;

//     // If new image is selected, upload it and delete old one
//     if (teacherImage) {
//       // Delete old image if exists
//       if (editingTeacher.image_url) {
//         await deleteImageFromStorage(editingTeacher.image_url, "avatars");
//       }
//       // Upload new image
//       imageUrl = await uploadImage(teacherImage, "avatars");
//     }

//     const { error } = await supabase
//       .from("teachers")
//       .update({ name: teacherName, class_name: teacherClass, image_url: imageUrl })
//       .eq("id", editingTeacher.id);

//     if (error) console.error(error);
//     else {
//       setTeacherName("");
//       setTeacherClass("");
//       setTeacherImage(null);
//       setEditingTeacher(null);
//       (e.target as HTMLFormElement).reset();
//       fetchTeachers();
//     }
//     setLoading(false);
//   };

//   // Delete Teacher
//   const handleDeleteTeacher = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this teacher?")) return;
    
//     try {
//       const { data: teacher, error: fetchError } = await supabase
//         .from("teachers")
//         .select("image_url")
//         .eq("id", id)
//         .single();

//       if (fetchError) return;

//       if (teacher?.image_url) {
//         await deleteImageFromStorage(teacher.image_url, "avatars");
//       }

//       const { error: deleteError } = await supabase.from("teachers").delete().eq("id", id);
//       if (!deleteError) fetchTeachers();
//     } catch (error) {
//       console.error("Error in delete process:", error);
//     }
//   };

//   // Start editing teacher - UPDATED WITH AUTO-SCROLL
//   const startEditTeacher = (teacher: Teacher) => {
//     setEditingTeacher(teacher);
//     setTeacherName(teacher.name);
//     setTeacherClass(teacher.class_name);
//     setTeacherImage(null);
//     setErrorMessage("");
//     // ✅ AUTO-SCROLL TO TOP
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Cancel editing teacher
//   const cancelEditTeacher = () => {
//     setEditingTeacher(null);
//     setTeacherName("");
//     setTeacherClass("");
//     setTeacherImage(null);
//     setErrorMessage("");
//   };

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
//       {/* Sidebar */}
//       <div
//         style={{
//           width: sidebarOpen ? "220px" : "60px",
//           backgroundColor: "#002244",
//           color: "#fff",
//           display: "flex",
//           flexDirection: "column",
//           position: "fixed",
//           top: "2cm",
//           bottom: 0,
//           left: 0,
//           padding: "1rem",
//           transition: "width 0.3s ease",
//         }}
//       >
//         <button
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//           style={{
//             marginBottom: "1rem",
//             backgroundColor: "red",
//             color: "#fff",
//             border: "none",
//             padding: "0.5rem",
//             borderRadius: "4px",
//             cursor: "pointer",
//             alignSelf: "center",
//           }}
//         >
//           {sidebarOpen ? "Close" : "Open"}
//         </button>

//         <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//           <div
//             style={{
//               padding: "0.5rem",
//               cursor: "pointer",
//               backgroundColor: activeTab === "news" ? "#001733" : "transparent",
//             }}
//             onClick={() => setActiveTab("news")}
//           >
//             {sidebarOpen && "News Posts"}
//           </div>
//           <div
//             style={{
//               padding: "0.5rem",
//               cursor: "pointer",
//               backgroundColor: activeTab === "teachers" ? "#001733" : "transparent",
//             }}
//             onClick={() => setActiveTab("teachers")}
//           >
//             {sidebarOpen && "Teachers"}
//           </div>
//           <div 
//             style={{ 
//               padding: "0.5rem", 
//               cursor: "pointer",
//               backgroundColor: "#cc0000",
//               borderRadius: "4px",
//               textAlign: "center"
//             }}
//             onClick={handleLogout}
//           >
//             {sidebarOpen && "Logout"}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div
//         style={{
//           marginLeft: sidebarOpen ? "220px" : "60px",
//           flex: 1,
//           padding: "2rem",
//           backgroundColor: "#f0f2f5",
//           transition: "margin-left 0.3s ease",
//         }}
//       >
//         {activeTab === "news" && (
//           <>
//             <h2 style={{ marginBottom: "1rem" }}>
//               {editingNews ? "Edit News Post" : "Add News Post"}
//             </h2>
//             <form
//               onSubmit={editingNews ? handleEditNews : handleAddNews}
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "1rem",
//                 backgroundColor: "#fff",
//                 padding: "1.5rem",
//                 borderRadius: "12px",
//                 boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//               }}
//             >
//               <input
//                 type="text"
//                 placeholder="Title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//                 style={{
//                   padding: "0.8rem",
//                   borderRadius: "6px",
//                   border: "1px solid #ccc",
//                   outline: "none",
//                 }}
//               />
//               <textarea
//                 placeholder="Content"
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 required
//                 style={{
//                   padding: "0.8rem",
//                   borderRadius: "6px",
//                   border: "1px solid #ccc",
//                   outline: "none",
//                   minHeight: "100px",
//                 }}
//               />
//               <div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleNewsImageSelect}
//                 />
//                 <small style={{ color: "#666", display: "block", marginTop: "0.5rem" }}>
//                   Maximum file size: 2MB. Recommended: Passport-style photos.
//                 </small>
//                 {/* ✅ ERROR MESSAGE POSITIONED RIGHT BELOW THE FILE INPUT */}
//                 {errorMessage && (
//                   <div style={{
//                     backgroundColor: "#ffebee",
//                     color: "#c62828",
//                     padding: "0.75rem",
//                     borderRadius: "6px",
//                     marginTop: "0.5rem",
//                     border: "1px solid #ffcdd2",
//                     fontSize: "0.9rem"
//                   }}>
//                     ⚠️ {errorMessage}
//                   </div>
//                 )}
//               </div>
//               <div style={{ display: "flex", gap: "1rem" }}>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   style={{
//                     padding: "0.8rem",
//                     backgroundColor: editingNews ? "#ffa500" : "#002244",
//                     color: "#fff",
//                     border: "none",
//                     borderRadius: "6px",
//                     cursor: "pointer",
//                     flex: 1,
//                   }}
//                 >
//                   {loading ? "Saving..." : editingNews ? "Update Post" : "Add Post"}
//                 </button>
//                 {editingNews && (
//                   <button
//                     type="button"
//                     onClick={cancelEditNews}
//                     style={{
//                       padding: "0.8rem",
//                       backgroundColor: "#6c757d",
//                       color: "#fff",
//                       border: "none",
//                       borderRadius: "6px",
//                       cursor: "pointer",
//                     }}
//                   >
//                     Cancel
//                   </button>
//                 )}
//               </div>
//             </form>

//             <h2 style={{ margin: "2rem 0 1rem" }}>EXISTING NEWS POSTS</h2>
//             <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//               {newsPosts.map((post) => (
//                 <div
//                   key={post.id}
//                   style={{
//                     backgroundColor: "#fff",
//                     padding: "1rem",
//                     borderRadius: "8px",
//                     boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//                     display: "flex",
//                     alignItems: "flex-start",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flex: 1 }}>
//                     {post.image_url && (
//                       <img
//                         src={post.image_url}
//                         alt={post.title}
//                         style={{ 
//                           width: "120px", 
//                           height: "120px", 
//                           objectFit: "cover",
//                           borderRadius: "8PX"
//                         }}
//                       />
//                     )}
//                     <div style={{ flex: 1 }}>
//                       <h3 style={{ margin: "0 0 0.5rem 0" }}>{post.title}</h3>
//                       <p style={{ margin: 0, color: "#666" }}>{post.content}</p>
//                     </div>
//                   </div>
//                   <div style={{ display: "flex", gap: "0.5rem" }}>
//                     <button
//                       onClick={() => startEditNews(post)}
//                       style={{
//                         backgroundColor: "#ffa500",
//                         color: "#fff",
//                         border: "none",
//                         padding: "0.3rem 0.6rem",
//                         borderRadius: "4px",
//                         cursor: "pointer",
//                       }}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDeleteNews(post.id)}
//                       style={{
//                         backgroundColor: "#cc0000",
//                         color: "#fff",
//                         border: "none",
//                         padding: "0.3rem 0.6rem",
//                         borderRadius: "4px",
//                         cursor: "pointer",
//                       }}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}

//         {activeTab === "teachers" && (
//           <>
//             <h2 style={{ marginBottom: "1rem" }}>
//               {editingTeacher ? "Edit Teacher" : "Add Teacher"}
//             </h2>
//             <form
//               onSubmit={editingTeacher ? handleEditTeacher : handleAddTeacher}
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "1rem",
//                 backgroundColor: "#fff",
//                 padding: "1.5rem",
//                 borderRadius: "12px",
//                 boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//               }}
//             >
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={teacherName}
//                 onChange={(e) => setTeacherName(e.target.value)}
//                 required
//                 style={{
//                   padding: "0.8rem",
//                   borderRadius: "6px",
//                   border: "1px solid #ccc",
//                   outline: "none",
//                 }}
//               />
//               <input
//                 type="text"
//                 placeholder="Class"
//                 value={teacherClass}
//                 onChange={(e) => setTeacherClass(e.target.value)}
//                 required
//                 style={{
//                   padding: "0.8rem",
//                   borderRadius: "6px",
//                   border: "1px solid #ccc",
//                   outline: "none",
//                 }}
//               />
//               <div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleTeacherImageSelect}
//                 />
//                 <small style={{ color: "#666", display: "block", marginTop: "0.5rem" }}>
//                   Maximum file size: 2MB. Recommended: Passport-style photos.
//                 </small>
//                 {/* ✅ ERROR MESSAGE POSITIONED RIGHT BELOW THE FILE INPUT */}
//                 {errorMessage && (
//                   <div style={{
//                     backgroundColor: "#ffebee",
//                     color: "#c62828",
//                     padding: "0.75rem",
//                     borderRadius: "6px",
//                     marginTop: "0.5rem",
//                     border: "1px solid #ffcdd2",
//                     fontSize: "0.9rem"
//                   }}>
//                     ⚠️ {errorMessage}
//                   </div>
//                 )}
//               </div>
//               <div style={{ display: "flex", gap: "1rem" }}>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   style={{
//                     padding: "0.8rem",
//                     backgroundColor: editingTeacher ? "#ffa500" : "#002244",
//                     color: "#fff",
//                     border: "none",
//                     borderRadius: "6px",
//                     cursor: "pointer",
//                     flex: 1,
//                   }}
//                 >
//                   {loading ? "Saving..." : editingTeacher ? "Update Teacher" : "Add Teacher"}
//                 </button>
//                 {editingTeacher && (
//                   <button
//                     type="button"
//                     onClick={cancelEditTeacher}
//                     style={{
//                       padding: "0.8rem",
//                       backgroundColor: "#6c757d",
//                       color: "#fff",
//                       border: "none",
//                       borderRadius: "6px",
//                       cursor: "pointer",
//                     }}
//                   >
//                     Cancel
//                   </button>
//                 )}
//               </div>
//             </form>

//             <h2 style={{ margin: "2rem 0 1rem" }}>Existing Teachers</h2>
//             <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//               {teachers.map((teacher) => (
//                 <div
//                   key={teacher.id}
//                   style={{
//                     backgroundColor: "#fff",
//                     padding: "1rem",
//                     borderRadius: "8px",
//                     boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
//                     {teacher.image_url && (
//                       <img
//                         src={teacher.image_url}
//                         alt={teacher.name}
//                         style={{ 
//                           width: "60px", 
//                           height: "60px", 
//                           objectFit: "cover",
//                           borderRadius: "50%" 
//                         }}
//                       />
//                     )}
//                     <div>
//                       <h4>{teacher.name}</h4>
//                       <p>{teacher.class_name}</p>
//                     </div>
//                   </div>
//                   <div style={{ display: "flex", gap: "0.5rem" }}>
//                     <button
//                       onClick={() => startEditTeacher(teacher)}
//                       style={{
//                         backgroundColor: "#ffa500",
//                         color: "#fff",
//                         border: "none",
//                         padding: "0.3rem 0.6rem",
//                         borderRadius: "4px",
//                         cursor: "pointer",
//                       }}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDeleteTeacher(teacher.id)}
//                       style={{
//                         backgroundColor: "#cc0000",
//                         color: "#fff",
//                         border: "none",
//                         padding: "0.3rem 0.6rem",
//                         borderRadius: "4px",
//                         cursor: "pointer",
//                       }}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


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

// interface Teacher {
//   id: number;
//   name: string;
//   class_name: string;
//   image_url: string | null;
// }

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState<"news" | "teachers">("news");
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   // News states
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [newsImage, setNewsImage] = useState<File | null>(null);
//   const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);

//   // Teacher states
//   const [teacherName, setTeacherName] = useState("");
//   const [teacherClass, setTeacherClass] = useState("");
//   const [teacherImage, setTeacherImage] = useState<File | null>(null);
//   const [teachers, setTeachers] = useState<Teacher[]>([]);

//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   // Edit states
//   const [editingNews, setEditingNews] = useState<NewsPost | null>(null);
//   const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

//   // Fetch News
//   const fetchNews = async () => {
//     const { data, error } = await supabase
//       .from("news")
//       .select("*")
//       .order("created_at", { ascending: false });
//     if (error) console.error(error);
//     else setNewsPosts(data);
//   };

//   // Fetch Teachers
//   const fetchTeachers = async () => {
//     const { data, error } = await supabase
//       .from("teachers")
//       .select("*")
//       .order("id", { ascending: true });
//     if (error) console.error(error);
//     else setTeachers(data);
//   };

//   useEffect(() => {
//     fetchNews();
//     fetchTeachers();
//   }, []);

//   // ✅ Logout function
//   const handleLogout = async () => {
//     if (confirm("Are you sure you want to logout?")) {
//       const { error } = await supabase.auth.signOut();
//       if (error) {
//         console.error("Logout error:", error);
//       } else {
//         window.location.href = "/admin";
//       }
//     }
//   };

//   // ✅ Validate file size (2MB limit)
//   const validateFileSize = (file: File): boolean => {
//     const maxSize = 2 * 1024 * 1024;
//     if (file.size > maxSize) {
//       setErrorMessage("File size too large! Please select an image under 2MB.");
//       return false;
//     }
//     setErrorMessage("");
//     return true;
//   };

//   // ✅ Upload image to Supabase Storage
//   const uploadImage = async (file: File, folder: string) => {
//     const fileName = `${Date.now()}_${file.name}`;
//     const { data, error } = await supabase.storage.from(folder).upload(fileName, file);
//     if (error) {
//       console.error("Upload error:", error);
//       return null;
//     }
//     const { data: publicData } = supabase.storage.from(folder).getPublicUrl(fileName);
//     return publicData.publicUrl;
//   };

//   // ✅ Extract file name from Supabase storage URL
//   const getFileNameFromUrl = (url: string): string | null => {
//     try {
//       const urlObj = new URL(url);
//       const pathParts = urlObj.pathname.split('/');
//       return pathParts[pathParts.length - 1];
//     } catch (error) {
//       console.error("Error extracting file name from URL:", error);
//       return null;
//     }
//   };

//   // ✅ Delete image from Supabase Storage
//   const deleteImageFromStorage = async (imageUrl: string | null, folder: string) => {
//     if (!imageUrl) return;
//     const fileName = getFileNameFromUrl(imageUrl);
//     if (!fileName) return;
//     const { error } = await supabase.storage.from(folder).remove([fileName]);
//     if (error) {
//       console.error("Error deleting image from storage:", error);
//     } else {
//       console.log("✅ Image deleted from storage:", fileName);
//     }
//   };

//   // Handle file selection with validation
//   const handleNewsImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files ? e.target.files[0] : null;
//     if (file && !validateFileSize(file)) {
//       e.target.value = "";
//       return;
//     }
//     setNewsImage(file);
//     setErrorMessage("");
//   };

//   const handleTeacherImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files ? e.target.files[0] : null;
//     if (file && !validateFileSize(file)) {
//       e.target.value = "";
//       return;
//     }
//     setTeacherImage(file);
//     setErrorMessage("");
//   };

//   // ✅ HTML FORMATTING FUNCTIONS - Microsoft Word-like power!
//   const applyFormatting = (tag: string) => {
//     const textarea = document.getElementById('news-content') as HTMLTextAreaElement;
//     if (!textarea) return;

//     const start = textarea.selectionStart;
//     const end = textarea.selectionEnd;
//     const selectedText = content.substring(start, end);
    
//     let newText = '';
    
//     switch(tag) {
//       case 'bold':
//         newText = `<strong>${selectedText || 'Your text here'}</strong>`;
//         break;
//       case 'italic':
//         newText = `<em>${selectedText || 'Your text here'}</em>`;
//         break;
//       case 'underline':
//         newText = `<u>${selectedText || 'Your text here'}</u>`;
//         break;
//       case 'color-red':
//         newText = `<span style="color: red">${selectedText || 'Your text here'}</span>`;
//         break;
//       case 'color-blue':
//         newText = `<span style="color: blue">${selectedText || 'Your text here'}</span>`;
//         break;
//       case 'color-green':
//         newText = `<span style="color: green">${selectedText || 'Your text here'}</span>`;
//         break;
//       case 'heading':
//         newText = `<h3>${selectedText || 'Heading'}</h3>`;
//         break;
//       case 'paragraph':
//         newText = `<p>${selectedText || 'Paragraph text'}</p>`;
//         break;
//       case 'list':
//         newText = `<ul>\n  <li>${selectedText || 'List item'}</li>\n</ul>`;
//         break;
//       case 'link':
//         newText = `<a href="https://example.com" target="_blank">${selectedText || 'Link text'}</a>`;
//         break;
//       case 'center':
//         newText = `<div style="text-align: center">${selectedText || 'Centered text'}</div>`;
//         break;
//       default:
//         newText = selectedText;
//     }

//     const newContent = content.substring(0, start) + newText + content.substring(end);
//     setContent(newContent);
    
//     // Focus back on textarea
//     setTimeout(() => {
//       textarea.focus();
//       if (!selectedText) {
//         // If no text was selected, place cursor in the middle of the new tags
//         const newCursorPos = start + newText.length - (tag === 'list' ? 10 : 8);
//         textarea.setSelectionRange(newCursorPos, newCursorPos);
//       }
//     }, 0);
//   };

//   // Add News
//   const handleAddNews = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (newsImage && !validateFileSize(newsImage)) {
//       return;
//     }

//     setLoading(true);
//     let imageUrl: string | null = null;
//     if (newsImage) imageUrl = await uploadImage(newsImage, "avatars");

//     const { error } = await supabase
//       .from("news")
//       .insert([{ title, content, image_url: imageUrl }]);
//     if (error) console.error(error);
//     else {
//       setTitle("");
//       setContent("");
//       setNewsImage(null);
//       (e.target as HTMLFormElement).reset();
//       fetchNews();
//     }
//     setLoading(false);
//   };

//   // Edit News
//   const handleEditNews = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editingNews) return;

//     if (newsImage && !validateFileSize(newsImage)) {
//       return;
//     }

//     setLoading(true);
//     let imageUrl = editingNews.image_url;

//     if (newsImage) {
//       if (editingNews.image_url) {
//         await deleteImageFromStorage(editingNews.image_url, "avatars");
//       }
//       imageUrl = await uploadImage(newsImage, "avatars");
//     }

//     const { error } = await supabase
//       .from("news")
//       .update({ title, content, image_url: imageUrl })
//       .eq("id", editingNews.id);

//     if (error) console.error(error);
//     else {
//       setTitle("");
//       setContent("");
//       setNewsImage(null);
//       setEditingNews(null);
//       (e.target as HTMLFormElement).reset();
//       fetchNews();
//     }
//     setLoading(false);
//   };

//   // Delete News
//   const handleDeleteNews = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this news?")) return;
    
//     try {
//       const { data: newsItem, error: fetchError } = await supabase
//         .from("news")
//         .select("image_url")
//         .eq("id", id)
//         .single();

//       if (fetchError) return;

//       if (newsItem?.image_url) {
//         await deleteImageFromStorage(newsItem.image_url, "avatars");
//       }

//       const { error: deleteError } = await supabase.from("news").delete().eq("id", id);
//       if (!deleteError) fetchNews();
//     } catch (error) {
//       console.error("Error in delete process:", error);
//     }
//   };

//   // Start editing news - UPDATED WITH AUTO-SCROLL
//   const startEditNews = (post: NewsPost) => {
//     setEditingNews(post);
//     setTitle(post.title);
//     setContent(post.content);
//     setNewsImage(null);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Cancel editing news
//   const cancelEditNews = () => {
//     setEditingNews(null);
//     setTitle("");
//     setContent("");
//     setNewsImage(null);
//     setErrorMessage("");
//   };

//   // Add Teacher
//   const handleAddTeacher = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (teacherImage && !validateFileSize(teacherImage)) {
//       return;
//     }

//     setLoading(true);
//     let imageUrl: string | null = null;
//     if (teacherImage) imageUrl = await uploadImage(teacherImage, "avatars");

//     const { error } = await supabase
//       .from("teachers")
//       .insert([{ name: teacherName, class_name: teacherClass, image_url: imageUrl }]);
//     if (error) console.error(error);
//     else {
//       setTeacherName("");
//       setTeacherClass("");
//       setTeacherImage(null);
//       (e.target as HTMLFormElement).reset();
//       fetchTeachers();
//     }
//     setLoading(false);
//   };

//   // Edit Teacher
//   const handleEditTeacher = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editingTeacher) return;

//     if (teacherImage && !validateFileSize(teacherImage)) {
//       return;
//     }

//     setLoading(true);
//     let imageUrl = editingTeacher.image_url;

//     if (teacherImage) {
//       if (editingTeacher.image_url) {
//         await deleteImageFromStorage(editingTeacher.image_url, "avatars");
//       }
//       imageUrl = await uploadImage(teacherImage, "avatars");
//     }

//     const { error } = await supabase
//       .from("teachers")
//       .update({ name: teacherName, class_name: teacherClass, image_url: imageUrl })
//       .eq("id", editingTeacher.id);

//     if (error) console.error(error);
//     else {
//       setTeacherName("");
//       setTeacherClass("");
//       setTeacherImage(null);
//       setEditingTeacher(null);
//       (e.target as HTMLFormElement).reset();
//       fetchTeachers();
//     }
//     setLoading(false);
//   };

//   // Delete Teacher
//   const handleDeleteTeacher = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this teacher?")) return;
    
//     try {
//       const { data: teacher, error: fetchError } = await supabase
//         .from("teachers")
//         .select("image_url")
//         .eq("id", id)
//         .single();

//       if (fetchError) return;

//       if (teacher?.image_url) {
//         await deleteImageFromStorage(teacher.image_url, "avatars");
//       }

//       const { error: deleteError } = await supabase.from("teachers").delete().eq("id", id);
//       if (!deleteError) fetchTeachers();
//     } catch (error) {
//       console.error("Error in delete process:", error);
//     }
//   };

//   // Start editing teacher - UPDATED WITH AUTO-SCROLL
//   const startEditTeacher = (teacher: Teacher) => {
//     setEditingTeacher(teacher);
//     setTeacherName(teacher.name);
//     setTeacherClass(teacher.class_name);
//     setTeacherImage(null);
//     setErrorMessage("");
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Cancel editing teacher
//   const cancelEditTeacher = () => {
//     setEditingTeacher(null);
//     setTeacherName("");
//     setTeacherClass("");
//     setTeacherImage(null);
//     setErrorMessage("");
//   };

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
//       {/* Sidebar */}
//       <div
//         style={{
//           width: sidebarOpen ? "220px" : "60px",
//           backgroundColor: "#002244",
//           color: "#fff",
//           display: "flex",
//           flexDirection: "column",
//           position: "fixed",
//           top: "2cm",
//           bottom: 0,
//           left: 0,
//           padding: "1rem",
//           transition: "width 0.3s ease",
//         }}
//       >
//         <button
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//           style={{
//             marginBottom: "1rem",
//             backgroundColor: "red",
//             color: "#fff",
//             border: "none",
//             padding: "0.5rem",
//             borderRadius: "4px",
//             cursor: "pointer",
//             alignSelf: "center",
//           }}
//         >
//           {sidebarOpen ? "Close" : "Open"}
//         </button>

//         <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//           <div
//             style={{
//               padding: "0.5rem",
//               cursor: "pointer",
//               backgroundColor: activeTab === "news" ? "#001733" : "transparent",
//             }}
//             onClick={() => setActiveTab("news")}
//           >
//             {sidebarOpen && "News Posts"}
//           </div>
//           <div
//             style={{
//               padding: "0.5rem",
//               cursor: "pointer",
//               backgroundColor: activeTab === "teachers" ? "#001733" : "transparent",
//             }}
//             onClick={() => setActiveTab("teachers")}
//           >
//             {sidebarOpen && "Teachers"}
//           </div>
//           <div 
//             style={{ 
//               padding: "0.5rem", 
//               cursor: "pointer",
//               backgroundColor: "#cc0000",
//               borderRadius: "4px",
//               textAlign: "center"
//             }}
//             onClick={handleLogout}
//           >
//             {sidebarOpen && "Logout"}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div
//         style={{
//           marginLeft: sidebarOpen ? "220px" : "60px",
//           flex: 1,
//           padding: "2rem",
//           backgroundColor: "#f0f2f5",
//           transition: "margin-left 0.3s ease",
//         }}
//       >
//         {activeTab === "news" && (
//           <>
//             <h2 style={{ marginBottom: "1rem" }}>
//               {editingNews ? "Edit News Post" : "Add News Post"}
//             </h2>
//             <form
//               onSubmit={editingNews ? handleEditNews : handleAddNews}
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "1rem",
//                 backgroundColor: "#fff",
//                 padding: "1.5rem",
//                 borderRadius: "12px",
//                 boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//               }}
//             >
//               <input
//                 type="text"
//                 placeholder="Title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//                 style={{
//                   padding: "0.8rem",
//                   borderRadius: "6px",
//                   border: "1px solid #ccc",
//                   outline: "none",
//                 }}
//               />
              
//               {/* ✅ POWERFUL HTML EDITOR TOOLBAR */}
//               <div style={{ 
//                 display: "flex", 
//                 flexWrap: "wrap", 
//                 gap: "0.5rem", 
//                 padding: "0.5rem",
//                 backgroundColor: "#f8f9fa",
//                 borderRadius: "6px",
//                 border: "1px solid #ddd"
//               }}>
//                 <strong style={{ marginRight: "1rem", color: "#002244" }}>Formatting:</strong>
                
//                 {/* Text Formatting */}
//                 <button type="button" onClick={() => applyFormatting('bold')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
//                   <strong>B</strong>
//                 </button>
//                 <button type="button" onClick={() => applyFormatting('italic')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
//                   <em>I</em>
//                 </button>
//                 <button type="button" onClick={() => applyFormatting('underline')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
//                   <u>U</u>
//                 </button>
                
//                 {/* Colors */}
//                 <button type="button" onClick={() => applyFormatting('color-red')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#ffebee", border: "1px solid #ffcdd2", borderRadius: "4px", cursor: "pointer", color: "red" }}>
//                   🔴
//                 </button>
//                 <button type="button" onClick={() => applyFormatting('color-blue')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e3f2fd", border: "1px solid #bbdefb", borderRadius: "4px", cursor: "pointer", color: "blue" }}>
//                   🔵
//                 </button>
//                 <button type="button" onClick={() => applyFormatting('color-green')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e8f5e8", border: "1px solid #c8e6c9", borderRadius: "4px", cursor: "pointer", color: "green" }}>
//                   🟢
//                 </button>
                
//                 {/* Structure */}
//                 <button type="button" onClick={() => applyFormatting('heading')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
//                   H3
//                 </button>
//                 <button type="button" onClick={() => applyFormatting('paragraph')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
//                   ¶
//                 </button>
//                 <button type="button" onClick={() => applyFormatting('list')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
//                   • List
//                 </button>
//                 <button type="button" onClick={() => applyFormatting('center')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
//                   Center
//                 </button>
//                 <button type="button" onClick={() => applyFormatting('link')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
//                   🔗
//                 </button>
//               </div>

//               {/* ✅ HTML CONTENT TEXTAREA */}
//               <div>
//                 <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#333" }}>
//                   Content (HTML Supported):
//                 </label>
//                 <textarea
//                   id="news-content"
//                   placeholder="Write your news content here... Use the formatting buttons above or write HTML directly!"
//                   value={content}
//                   onChange={(e) => setContent(e.target.value)}
//                   required
//                   style={{
//                     padding: "0.8rem",
//                     borderRadius: "6px",
//                     border: "1px solid #ccc",
//                     outline: "none",
//                     minHeight: "200px",
//                     width: "100%",
//                     fontFamily: "monospace",
//                     fontSize: "0.9rem"
//                   }}
//                 />
//                 <small style={{ color: "#666", display: "block", marginTop: "0.5rem" }}>
//                   💡 <strong>Tip:</strong> Select text and click formatting buttons, or write HTML directly!
//                   Examples: &lt;strong&gt;bold&lt;/strong&gt;, &lt;em&gt;italic&lt;/em&gt;, &lt;span style="color: red"&gt;red text&lt;/span&gt;
//                 </small>
//               </div>

//               <div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleNewsImageSelect}
//                 />
//                 <small style={{ color: "#666", display: "block", marginTop: "0.5rem" }}>
//                   Maximum file size: 2MB. Recommended: Passport-style photos.
//                 </small>
//                 {errorMessage && (
//                   <div style={{
//                     backgroundColor: "#ffebee",
//                     color: "#c62828",
//                     padding: "0.75rem",
//                     borderRadius: "6px",
//                     marginTop: "0.5rem",
//                     border: "1px solid #ffcdd2",
//                     fontSize: "0.9rem"
//                   }}>
//                     ⚠️ {errorMessage}
//                   </div>
//                 )}
//               </div>
//               <div style={{ display: "flex", gap: "1rem" }}>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   style={{
//                     padding: "0.8rem",
//                     backgroundColor: editingNews ? "#ffa500" : "#002244",
//                     color: "#fff",
//                     border: "none",
//                     borderRadius: "6px",
//                     cursor: "pointer",
//                     flex: 1,
//                   }}
//                 >
//                   {loading ? "Saving..." : editingNews ? "Update Post" : "Add Post"}
//                 </button>
//                 {editingNews && (
//                   <button
//                     type="button"
//                     onClick={cancelEditNews}
//                     style={{
//                       padding: "0.8rem",
//                       backgroundColor: "#6c757d",
//                       color: "#fff",
//                       border: "none",
//                       borderRadius: "6px",
//                       cursor: "pointer",
//                     }}
//                   >
//                     Cancel
//                   </button>
//                 )}
//               </div>
//             </form>

//             <h2 style={{ margin: "2rem 0 1rem" }}>EXISTING NEWS POSTS</h2>
//             <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//               {newsPosts.map((post) => (
//                 <div
//                   key={post.id}
//                   style={{
//                     backgroundColor: "#fff",
//                     padding: "1rem",
//                     borderRadius: "8px",
//                     boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//                     display: "flex",
//                     alignItems: "flex-start",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flex: 1 }}>
//                     {post.image_url && (
//                       <img
//                         src={post.image_url}
//                         alt={post.title}
//                         style={{ 
//                           width: "120px", 
//                           height: "120px", 
//                           objectFit: "cover",
//                           borderRadius: "8px"
//                         }}
//                       />
//                     )}
//                     <div style={{ flex: 1 }}>
//                       <h3 style={{ margin: "0 0 0.5rem 0" }}>{post.title}</h3>
//                       <div 
//                         style={{ margin: 0, color: "#666" }}
//                         dangerouslySetInnerHTML={{ __html: post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content }}
//                       />
//                     </div>
//                   </div>
//                   <div style={{ display: "flex", gap: "0.5rem" }}>
//                     <button
//                       onClick={() => startEditNews(post)}
//                       style={{
//                         backgroundColor: "#ffa500",
//                         color: "#fff",
//                         border: "none",
//                         padding: "0.3rem 0.6rem",
//                         borderRadius: "4px",
//                         cursor: "pointer",
//                       }}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDeleteNews(post.id)}
//                       style={{
//                         backgroundColor: "#cc0000",
//                         color: "#fff",
//                         border: "none",
//                         padding: "0.3rem 0.6rem",
//                         borderRadius: "4px",
//                         cursor: "pointer",
//                       }}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}

//         {activeTab === "teachers" && (
//           <>
//             {/* Teachers section remains exactly the same */}
//             <h2 style={{ marginBottom: "1rem" }}>
//               {editingTeacher ? "Edit Teacher" : "Add Teacher"}
//             </h2>
//             <form
//               onSubmit={editingTeacher ? handleEditTeacher : handleAddTeacher}
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "1rem",
//                 backgroundColor: "#fff",
//                 padding: "1.5rem",
//                 borderRadius: "12px",
//                 boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//               }}
//             >
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={teacherName}
//                 onChange={(e) => setTeacherName(e.target.value)}
//                 required
//                 style={{
//                   padding: "0.8rem",
//                   borderRadius: "6px",
//                   border: "1px solid #ccc",
//                   outline: "none",
//                 }}
//               />
//               <input
//                 type="text"
//                 placeholder="Class"
//                 value={teacherClass}
//                 onChange={(e) => setTeacherClass(e.target.value)}
//                 required
//                 style={{
//                   padding: "0.8rem",
//                   borderRadius: "6px",
//                   border: "1px solid #ccc",
//                   outline: "none",
//                 }}
//               />
//               <div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleTeacherImageSelect}
//                 />
//                 <small style={{ color: "#666", display: "block", marginTop: "0.5rem" }}>
//                   Maximum file size: 2MB. Recommended: Passport-style photos.
//                 </small>
//                 {errorMessage && (
//                   <div style={{
//                     backgroundColor: "#ffebee",
//                     color: "#c62828",
//                     padding: "0.75rem",
//                     borderRadius: "6px",
//                     marginTop: "0.5rem",
//                     border: "1px solid #ffcdd2",
//                     fontSize: "0.9rem"
//                   }}>
//                     ⚠️ {errorMessage}
//                   </div>
//                 )}
//               </div>
//               <div style={{ display: "flex", gap: "1rem" }}>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   style={{
//                     padding: "0.8rem",
//                     backgroundColor: editingTeacher ? "#ffa500" : "#002244",
//                     color: "#fff",
//                     border: "none",
//                     borderRadius: "6px",
//                     cursor: "pointer",
//                     flex: 1,
//                   }}
//                 >
//                   {loading ? "Saving..." : editingTeacher ? "Update Teacher" : "Add Teacher"}
//                 </button>
//                 {editingTeacher && (
//                   <button
//                     type="button"
//                     onClick={cancelEditTeacher}
//                     style={{
//                       padding: "0.8rem",
//                       backgroundColor: "#6c757d",
//                       color: "#fff",
//                       border: "none",
//                       borderRadius: "6px",
//                       cursor: "pointer",
//                     }}
//                   >
//                     Cancel
//                   </button>
//                 )}
//               </div>
//             </form>

//             <h2 style={{ margin: "2rem 0 1rem" }}>Existing Teachers</h2>
//             <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//               {teachers.map((teacher) => (
//                 <div
//                   key={teacher.id}
//                   style={{
//                     backgroundColor: "#fff",
//                     padding: "1rem",
//                     borderRadius: "8px",
//                     boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
//                     {teacher.image_url && (
//                       <img
//                         src={teacher.image_url}
//                         alt={teacher.name}
//                         style={{ 
//                           width: "60px", 
//                           height: "60px", 
//                           objectFit: "cover",
//                           borderRadius: "50%" 
//                         }}
//                       />
//                     )}
//                     <div>
//                       <h4>{teacher.name}</h4>
//                       <p>{teacher.class_name}</p>
//                     </div>
//                   </div>
//                   <div style={{ display: "flex", gap: "0.5rem" }}>
//                     <button
//                       onClick={() => startEditTeacher(teacher)}
//                       style={{
//                         backgroundColor: "#ffa500",
//                         color: "#fff",
//                         border: "none",
//                         padding: "0.3rem 0.6rem",
//                         borderRadius: "4px",
//                         cursor: "pointer",
//                       }}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDeleteTeacher(teacher.id)}
//                       style={{
//                         backgroundColor: "#cc0000",
//                         color: "#fff",
//                         border: "none",
//                         padding: "0.3rem 0.6rem",
//                         borderRadius: "4px",
//                         cursor: "pointer",
//                       }}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

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

// interface Teacher {
//   id: number;
//   name: string;
//   class_name: string;
//   image_url: string | null;
// }

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState<"news" | "teachers">("news");
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   // News states
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [newsImage, setNewsImage] = useState<File | null>(null);
//   const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);

//   // Teacher states
//   const [teacherName, setTeacherName] = useState("");
//   const [teacherClass, setTeacherClass] = useState("");
//   const [teacherImage, setTeacherImage] = useState<File | null>(null);
//   const [teachers, setTeachers] = useState<Teacher[]>([]);

//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   // Edit states
//   const [editingNews, setEditingNews] = useState<NewsPost | null>(null);
//   const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

//   // Fetch News
//   const fetchNews = async () => {
//     const { data, error } = await supabase
//       .from("news")
//       .select("*")
//       .order("created_at", { ascending: false });
//     if (error) console.error(error);
//     else setNewsPosts(data);
//   };

//   // Fetch Teachers
//   const fetchTeachers = async () => {
//     const { data, error } = await supabase
//       .from("teachers")
//       .select("*")
//       .order("id", { ascending: true });
//     if (error) console.error(error);
//     else setTeachers(data);
//   };

//   useEffect(() => {
//     fetchNews();
//     fetchTeachers();
//   }, []);

//   // ✅ Logout function
//   const handleLogout = async () => {
//     if (confirm("Are you sure you want to logout?")) {
//       const { error } = await supabase.auth.signOut();
//       if (error) {
//         console.error("Logout error:", error);
//       } else {
//         window.location.href = "/admin";
//       }
//     }
//   };

//   // ✅ Validate file size (2MB limit)
//   const validateFileSize = (file: File): boolean => {
//     const maxSize = 2 * 1024 * 1024;
//     if (file.size > maxSize) {
//       setErrorMessage("File size too large! Please select an image under 2MB.");
//       return false;
//     }
//     setErrorMessage("");
//     return true;
//   };

//   // ✅ Upload image to Supabase Storage
//   const uploadImage = async (file: File, folder: string) => {
//     const fileName = `${Date.now()}_${file.name}`;
//     const { data, error } = await supabase.storage.from(folder).upload(fileName, file);
//     if (error) {
//       console.error("Upload error:", error);
//       return null;
//     }
//     const { data: publicData } = supabase.storage.from(folder).getPublicUrl(fileName);
//     return publicData.publicUrl;
//   };

//   // ✅ Extract file name from Supabase storage URL
//   const getFileNameFromUrl = (url: string): string | null => {
//     try {
//       const urlObj = new URL(url);
//       const pathParts = urlObj.pathname.split('/');
//       return pathParts[pathParts.length - 1];
//     } catch (error) {
//       console.error("Error extracting file name from URL:", error);
//       return null;
//     }
//   };

//   // ✅ Delete image from Supabase Storage
//   const deleteImageFromStorage = async (imageUrl: string | null, folder: string) => {
//     if (!imageUrl) return;
//     const fileName = getFileNameFromUrl(imageUrl);
//     if (!fileName) return;
//     const { error } = await supabase.storage.from(folder).remove([fileName]);
//     if (error) {
//       console.error("Error deleting image from storage:", error);
//     } else {
//       console.log("✅ Image deleted from storage:", fileName);
//     }
//   };

//   // Handle file selection with validation
//   const handleNewsImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files ? e.target.files[0] : null;
//     if (file && !validateFileSize(file)) {
//       e.target.value = "";
//       return;
//     }
//     setNewsImage(file);
//     setErrorMessage("");
//   };

//   const handleTeacherImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files ? e.target.files[0] : null;
//     if (file && !validateFileSize(file)) {
//       e.target.value = "";
//       return;
//     }
//     setTeacherImage(file);
//     setErrorMessage("");
//   };

//   // ✅ HTML FORMATTING FUNCTIONS
//   const applyFormatting = (tag: string) => {
//     const textarea = document.getElementById('news-content') as HTMLTextAreaElement;
//     if (!textarea) return;

//     const start = textarea.selectionStart;
//     const end = textarea.selectionEnd;
//     const selectedText = content.substring(start, end);
    
//     let newText = '';
    
//     switch(tag) {
//       case 'bold':
//         newText = `<strong>${selectedText || 'Your text here'}</strong>`;
//         break;
//       case 'italic':
//         newText = `<em>${selectedText || 'Your text here'}</em>`;
//         break;
//       case 'underline':
//         newText = `<u>${selectedText || 'Your text here'}</u>`;
//         break;
//       case 'color-red':
//         newText = `<span style="color: red">${selectedText || 'Your text here'}</span>`;
//         break;
//       case 'color-blue':
//         newText = `<span style="color: blue">${selectedText || 'Your text here'}</span>`;
//         break;
//       case 'color-green':
//         newText = `<span style="color: green">${selectedText || 'Your text here'}</span>`;
//         break;
//       case 'heading':
//         newText = `<h3>${selectedText || 'Heading'}</h3>`;
//         break;
//       case 'paragraph':
//         newText = `<p>${selectedText || 'Paragraph text'}</p>`;
//         break;
//       case 'list':
//         newText = `<ul>\n  <li>${selectedText || 'List item'}</li>\n</ul>`;
//         break;
//       case 'link':
//         newText = `<a href="https://example.com" target="_blank">${selectedText || 'Link text'}</a>`;
//         break;
//       case 'center':
//         newText = `<div style="text-align: center">${selectedText || 'Centered text'}</div>`;
//         break;
//       case 'line-break':
//         newText = `<br/>`;
//         break;
//       default:
//         newText = selectedText;
//     }

//     const newContent = content.substring(0, start) + newText + content.substring(end);
//     setContent(newContent);
    
//     // Focus back on textarea
//     setTimeout(() => {
//       textarea.focus();
//       if (!selectedText) {
//         const newCursorPos = start + newText.length - (tag === 'list' ? 10 : 8);
//         textarea.setSelectionRange(newCursorPos, newCursorPos);
//       }
//     }, 0);
//   };

//   // ✅ IMPROVED: Add News with paragraph preservation
//   const handleAddNews = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (newsImage && !validateFileSize(newsImage)) {
//       return;
//     }

//     setLoading(true);
//     let imageUrl: string | null = null;
//     if (newsImage) imageUrl = await uploadImage(newsImage, "avatars");

//     // Convert line breaks to proper HTML paragraphs
//     const formattedContent = content
//       .split('\n\n') // Split by double line breaks for paragraphs
//       .map(paragraph => {
//         const trimmed = paragraph.trim();
//         if (!trimmed) return '';
//         // If already contains HTML tags, leave as is, otherwise wrap in <p>
//         if (trimmed.startsWith('<') && trimmed.endsWith('>')) {
//           return trimmed;
//         }
//         return `<p>${trimmed}</p>`;
//       })
//       .join('');

//     const { error } = await supabase
//       .from("news")
//       .insert([{ 
//         title, 
//         content: formattedContent || content, 
//         image_url: imageUrl 
//       }]);
      
//     if (error) console.error(error);
//     else {
//       setTitle("");
//       setContent("");
//       setNewsImage(null);
//       (e.target as HTMLFormElement).reset();
//       fetchNews();
//     }
//     setLoading(false);
//   };

//   // Edit News
//   const handleEditNews = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editingNews) return;

//     if (newsImage && !validateFileSize(newsImage)) {
//       return;
//     }

//     setLoading(true);
//     let imageUrl = editingNews.image_url;

//     if (newsImage) {
//       if (editingNews.image_url) {
//         await deleteImageFromStorage(editingNews.image_url, "avatars");
//       }
//       imageUrl = await uploadImage(newsImage, "avatars");
//     }

//     // Convert line breaks to proper HTML paragraphs for editing too
//     const formattedContent = content
//       .split('\n\n')
//       .map(paragraph => {
//         const trimmed = paragraph.trim();
//         if (!trimmed) return '';
//         if (trimmed.startsWith('<') && trimmed.endsWith('>')) {
//           return trimmed;
//         }
//         return `<p>${trimmed}</p>`;
//       })
//       .join('');

//     const { error } = await supabase
//       .from("news")
//       .update({ 
//         title, 
//         content: formattedContent || content, 
//         image_url: imageUrl 
//       })
//       .eq("id", editingNews.id);

//     if (error) console.error(error);
//     else {
//       setTitle("");
//       setContent("");
//       setNewsImage(null);
//       setEditingNews(null);
//       (e.target as HTMLFormElement).reset();
//       fetchNews();
//     }
//     setLoading(false);
//   };

//   // Delete News
//   const handleDeleteNews = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this news?")) return;
    
//     try {
//       const { data: newsItem, error: fetchError } = await supabase
//         .from("news")
//         .select("image_url")
//         .eq("id", id)
//         .single();

//       if (fetchError) return;

//       if (newsItem?.image_url) {
//         await deleteImageFromStorage(newsItem.image_url, "avatars");
//       }

//       const { error: deleteError } = await supabase.from("news").delete().eq("id", id);
//       if (!deleteError) fetchNews();
//     } catch (error) {
//       console.error("Error in delete process:", error);
//     }
//   };

//   // Start editing news
//   const startEditNews = (post: NewsPost) => {
//     setEditingNews(post);
//     setTitle(post.title);
//     setContent(post.content);
//     setNewsImage(null);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Cancel editing news
//   const cancelEditNews = () => {
//     setEditingNews(null);
//     setTitle("");
//     setContent("");
//     setNewsImage(null);
//     setErrorMessage("");
//   };

//   // Add Teacher
//   const handleAddTeacher = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (teacherImage && !validateFileSize(teacherImage)) {
//       return;
//     }

//     setLoading(true);
//     let imageUrl: string | null = null;
//     if (teacherImage) imageUrl = await uploadImage(teacherImage, "avatars");

//     const { error } = await supabase
//       .from("teachers")
//       .insert([{ name: teacherName, class_name: teacherClass, image_url: imageUrl }]);
//     if (error) console.error(error);
//     else {
//       setTeacherName("");
//       setTeacherClass("");
//       setTeacherImage(null);
//       (e.target as HTMLFormElement).reset();
//       fetchTeachers();
//     }
//     setLoading(false);
//   };

//   // Edit Teacher
//   const handleEditTeacher = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editingTeacher) return;

//     if (teacherImage && !validateFileSize(teacherImage)) {
//       return;
//     }

//     setLoading(true);
//     let imageUrl = editingTeacher.image_url;

//     if (teacherImage) {
//       if (editingTeacher.image_url) {
//         await deleteImageFromStorage(editingTeacher.image_url, "avatars");
//       }
//       imageUrl = await uploadImage(teacherImage, "avatars");
//     }

//     const { error } = await supabase
//       .from("teachers")
//       .update({ name: teacherName, class_name: teacherClass, image_url: imageUrl })
//       .eq("id", editingTeacher.id);

//     if (error) console.error(error);
//     else {
//       setTeacherName("");
//       setTeacherClass("");
//       setTeacherImage(null);
//       setEditingTeacher(null);
//       (e.target as HTMLFormElement).reset();
//       fetchTeachers();
//     }
//     setLoading(false);
//   };

//   // Delete Teacher
//   const handleDeleteTeacher = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this teacher?")) return;
    
//     try {
//       const { data: teacher, error: fetchError } = await supabase
//         .from("teachers")
//         .select("image_url")
//         .eq("id", id)
//         .single();

//       if (fetchError) return;

//       if (teacher?.image_url) {
//         await deleteImageFromStorage(teacher.image_url, "avatars");
//       }

//       const { error: deleteError } = await supabase.from("teachers").delete().eq("id", id);
//       if (!deleteError) fetchTeachers();
//     } catch (error) {
//       console.error("Error in delete process:", error);
//     }
//   };

//   // Start editing teacher
//   const startEditTeacher = (teacher: Teacher) => {
//     setEditingTeacher(teacher);
//     setTeacherName(teacher.name);
//     setTeacherClass(teacher.class_name);
//     setTeacherImage(null);
//     setErrorMessage("");
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Cancel editing teacher
//   const cancelEditTeacher = () => {
//     setEditingTeacher(null);
//     setTeacherName("");
//     setTeacherClass("");
//     setTeacherImage(null);
//     setErrorMessage("");
//   };

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
//       {/* Sidebar */}
//       <div
//         style={{
//           width: sidebarOpen ? "220px" : "60px",
//           backgroundColor: "#002244",
//           color: "#fff",
//           display: "flex",
//           flexDirection: "column",
//           position: "fixed",
//           top: "2cm",
//           bottom: 0,
//           left: 0,
//           padding: "1rem",
//           transition: "width 0.3s ease",
//         }}
//       >
//         <button
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//           style={{
//             marginBottom: "1rem",
//             backgroundColor: "red",
//             color: "#fff",
//             border: "none",
//             padding: "0.5rem",
//             borderRadius: "4px",
//             cursor: "pointer",
//             alignSelf: "center",
//           }}
//         >
//           {sidebarOpen ? "Close" : "Open"}
//         </button>

//         <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//           <div
//             style={{
//               padding: "0.5rem",
//               cursor: "pointer",
//               backgroundColor: activeTab === "news" ? "#001733" : "transparent",
//             }}
//             onClick={() => setActiveTab("news")}
//           >
//             {sidebarOpen && "News Posts"}
//           </div>
//           <div
//             style={{
//               padding: "0.5rem",
//               cursor: "pointer",
//               backgroundColor: activeTab === "teachers" ? "#001733" : "transparent",
//             }}
//             onClick={() => setActiveTab("teachers")}
//           >
//             {sidebarOpen && "Teachers"}
//           </div>
//           <div 
//             style={{ 
//               padding: "0.5rem", 
//               cursor: "pointer",
//               backgroundColor: "#cc0000",
//               borderRadius: "4px",
//               textAlign: "center"
//             }}
//             onClick={handleLogout}
//           >
//             {sidebarOpen && "Logout"}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div
//         style={{
//           marginLeft: sidebarOpen ? "220px" : "60px",
//           flex: 1,
//           padding: "2rem",
//           backgroundColor: "#f0f2f5",
//           transition: "margin-left 0.3s ease",
//         }}
//       >
//         {activeTab === "news" && (
//           <>
//             <h2 style={{ marginBottom: "1rem" }}>
//               {editingNews ? "Edit News Post" : "Add News Post"}
//             </h2>
//             <form
//               onSubmit={editingNews ? handleEditNews : handleAddNews}
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "1rem",
//                 backgroundColor: "#fff",
//                 padding: "1.5rem",
//                 borderRadius: "12px",
//                 boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//               }}
//             >
//               <input
//                 type="text"
//                 placeholder="Title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//                 style={{
//                   padding: "0.8rem",
//                   borderRadius: "6px",
//                   border: "1px solid #ccc",
//                   outline: "none",
//                 }}
//               />
              
//               {/* ✅ POWERFUL HTML EDITOR TOOLBAR */}
//               <div style={{ 
//                 display: "flex", 
//                 flexWrap: "wrap", 
//                 gap: "0.5rem", 
//                 padding: "0.5rem",
//                 backgroundColor: "#f8f9fa",
//                 borderRadius: "6px",
//                 border: "1px solid #ddd"
//               }}>
//                 <strong style={{ marginRight: "1rem", color: "#002244" }}>Formatting:</strong>
                
//                 {/* Text Formatting */}
//                 <button type="button" onClick={() => applyFormatting('bold')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
//                   <strong>B</strong>
//                 </button>
//                 <button type="button" onClick={() => applyFormatting('italic')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
//                   <em>I</em>
//                 </button>
//                 <button type="button" onClick={() => applyFormatting('underline')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
//                   <u>U</u>
//                 </button>
                
//                 {/* Colors */}
//                 <button type="button" onClick={() => applyFormatting('color-red')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#ffebee", border: "1px solid #ffcdd2", borderRadius: "4px", cursor: "pointer", color: "red" }}>
//                   🔴
//                 </button>
//                 <button type="button" onClick={() => applyFormatting('color-blue')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e3f2fd", border: "1px solid #bbdefb", borderRadius: "4px", cursor: "pointer", color: "blue" }}>
//                   🔵
//                 </button>
//                 <button type="button" onClick={() => applyFormatting('color-green')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e8f5e8", border: "1px solid #c8e6c9", borderRadius: "4px", cursor: "pointer", color: "green" }}>
//                   🟢
//                 </button>
                
//                 {/* Structure */}
//                 <button type="button" onClick={() => applyFormatting('heading')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
//                   H3
//                 </button>
//                 <button type="button" onClick={() => applyFormatting('paragraph')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
//                   ¶
//                 </button>
//                 <button type="button" onClick={() => applyFormatting('list')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
//                   • List
//                 </button>
//                 <button type="button" onClick={() => applyFormatting('center')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
//                   Center
//                 </button>
//                 <button type="button" onClick={() => applyFormatting('link')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
//                   🔗
//                 </button>
//                 <button type="button" onClick={() => applyFormatting('line-break')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
//                   ↵ Break
//                 </button>
//               </div>

//               {/* ✅ HTML CONTENT TEXTAREA */}
//               <div>
//                 <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#333" }}>
//                   Content (HTML Supported):
//                 </label>
//                 <textarea
//                   id="news-content"
//                   placeholder="Write your news content here... Use the formatting buttons above or write HTML directly!

// Tip: Press Enter twice to create new paragraphs automatically!"
//                   value={content}
//                   onChange={(e) => setContent(e.target.value)}
//                   required
//                   style={{
//                     padding: "0.8rem",
//                     borderRadius: "6px",
//                     border: "1px solid #ccc",
//                     outline: "none",
//                     minHeight: "200px",
//                     width: "100%",
//                     fontFamily: "monospace",
//                     fontSize: "0.9rem",
//                     whiteSpace: "pre-wrap"
//                   }}
//                 />
//                 <small style={{ color: "#666", display: "block", marginTop: "0.5rem" }}>
//                   💡 <strong>Tip:</strong> Press 'Enter' twice to create paragraphs. Use formatting buttons or write HTML directly!
//                 </small>
//               </div>

//               <div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleNewsImageSelect}
//                 />
//                 <small style={{ color: "#666", display: "block", marginTop: "0.5rem" }}>
//                   Maximum file size: 2MB. Recommended: Passport-style photos.
//                 </small>
//                 {errorMessage && (
//                   <div style={{
//                     backgroundColor: "#ffebee",
//                     color: "#c62828",
//                     padding: "0.75rem",
//                     borderRadius: "6px",
//                     marginTop: "0.5rem",
//                     border: "1px solid #ffcdd2",
//                     fontSize: "0.9rem"
//                   }}>
//                     ⚠️ {errorMessage}
//                   </div>
//                 )}
//               </div>
//               <div style={{ display: "flex", gap: "1rem" }}>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   style={{
//                     padding: "0.8rem",
//                     backgroundColor: editingNews ? "#ffa500" : "#002244",
//                     color: "#fff",
//                     border: "none",
//                     borderRadius: "6px",
//                     cursor: "pointer",
//                     flex: 1,
//                   }}
//                 >
//                   {loading ? "Saving..." : editingNews ? "Update Post" : "Add Post"}
//                 </button>
//                 {editingNews && (
//                   <button
//                     type="button"
//                     onClick={cancelEditNews}
//                     style={{
//                       padding: "0.8rem",
//                       backgroundColor: "#6c757d",
//                       color: "#fff",
//                       border: "none",
//                       borderRadius: "6px",
//                       cursor: "pointer",
//                     }}
//                   >
//                     Cancel
//                   </button>
//                 )}
//               </div>
//             </form>
            
//             <h2 style={{ margin: "2rem 0 1rem" }}>EXISTING NEWS POSTS</h2>
//             <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//               {newsPosts.map((post) => (
//                 <div
//                   key={post.id}
//                   style={{
//                     backgroundColor: "#fff",
//                     padding: "1rem",
//                     borderRadius: "8px",
//                     boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//                     display: "flex",
//                     alignItems: "flex-start",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flex: 1 }}>
//                     {post.image_url && (
//                       <img
//                         src={post.image_url}
//                         alt={post.title}
//                         style={{ 
//                           width: "120px", 
//                           height: "120px", 
//                           objectFit: "cover",
//                           borderRadius: "8px"
//                         }}
//                       />
//                     )}
//                     <div style={{ flex: 1 }}>
//                       <h3 style={{ margin: "0 0 0.5rem 0" }}>{post.title}</h3>
//                       <div 
//                         style={{ margin: 0, color: "#666" }}
//                         dangerouslySetInnerHTML={{ __html: post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content }}
//                       />
//                     </div>
//                   </div>
//                   <div style={{ display: "flex", gap: "0.5rem" }}>
//                     <button
//                       onClick={() => startEditNews(post)}
//                       style={{
//                         backgroundColor: "#ffa500",
//                         color: "#fff",
//                         border: "none",
//                         padding: "0.3rem 0.6rem",
//                         borderRadius: "4px",
//                         cursor: "pointer",
//                       }}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDeleteNews(post.id)}
//                       style={{
//                         backgroundColor: "#cc0000",
//                         color: "#fff",
//                         border: "none",
//                         padding: "0.3rem 0.6rem",
//                         borderRadius: "4px",
//                         cursor: "pointer",
//                       }}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}

//         {activeTab === "teachers" && (
//           <>
//             {/* Teachers section remains exactly the same */}
//             <h2 style={{ marginBottom: "1rem" }}>
//               {editingTeacher ? "Edit Teacher" : "Add Teacher"}
//             </h2>
//             <form
//               onSubmit={editingTeacher ? handleEditTeacher : handleAddTeacher}
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "1rem",
//                 backgroundColor: "#fff",
//                 padding: "1.5rem",
//                 borderRadius: "12px",
//                 boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//               }}
//             >
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={teacherName}
//                 onChange={(e) => setTeacherName(e.target.value)}
//                 required
//                 style={{
//                   padding: "0.8rem",
//                   borderRadius: "6px",
//                   border: "1px solid #ccc",
//                   outline: "none",
//                 }}
//               />
//               <input
//                 type="text"
//                 placeholder="Class"
//                 value={teacherClass}
//                 onChange={(e) => setTeacherClass(e.target.value)}
//                 required
//                 style={{
//                   padding: "0.8rem",
//                   borderRadius: "6px",
//                   border: "1px solid #ccc",
//                   outline: "none",
//                 }}
//               />
//               <div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleTeacherImageSelect}
//                 />
//                 <small style={{ color: "#666", display: "block", marginTop: "0.5rem" }}>
//                   Maximum file size: 2MB. Recommended: Passport-style photos.
//                 </small>
//                 {errorMessage && (
//                   <div style={{
//                     backgroundColor: "#ffebee",
//                     color: "#c62828",
//                     padding: "0.75rem",
//                     borderRadius: "6px",
//                     marginTop: "0.5rem",
//                     border: "1px solid #ffcdd2",
//                     fontSize: "0.9rem"
//                   }}>
//                     ⚠️ {errorMessage}
//                   </div>
//                 )}
//               </div>
//               <div style={{ display: "flex", gap: "1rem" }}>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   style={{
//                     padding: "0.8rem",
//                     backgroundColor: editingTeacher ? "#ffa500" : "#002244",
//                     color: "#fff",
//                     border: "none",
//                     borderRadius: "6px",
//                     cursor: "pointer",
//                     flex: 1,
//                   }}
//                 >
//                   {loading ? "Saving..." : editingTeacher ? "Update Teacher" : "Add Teacher"}
//                 </button>
//                 {editingTeacher && (
//                   <button
//                     type="button"
//                     onClick={cancelEditTeacher}
//                     style={{
//                       padding: "0.8rem",
//                       backgroundColor: "#6c757d",
//                       color: "#fff",
//                       border: "none",
//                       borderRadius: "6px",
//                       cursor: "pointer",
//                     }}
//                   >
//                     Cancel
//                   </button>
//                 )}
//               </div>
//             </form>

//             <h2 style={{ margin: "2rem 0 1rem" }}>Existing Teachers</h2>
//             <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//               {teachers.map((teacher) => (
//                 <div
//                   key={teacher.id}
//                   style={{
//                     backgroundColor: "#fff",
//                     padding: "1rem",
//                     borderRadius: "8px",
//                     boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
//                     {teacher.image_url && (
//                       <img
//                         src={teacher.image_url}
//                         alt={teacher.name}
//                         style={{ 
//                           width: "60px", 
//                           height: "60px", 
//                           objectFit: "cover",
//                           borderRadius: "50%" 
//                         }}
//                       />
//                     )}
//                     <div>
//                       <h4>{teacher.name}</h4>
//                       <p>{teacher.class_name}</p>
//                     </div>
//                   </div>
//                   <div style={{ display: "flex", gap: "0.5rem" }}>
//                     <button
//                       onClick={() => startEditTeacher(teacher)}
//                       style={{
//                         backgroundColor: "#ffa500",
//                         color: "#fff",
//                         border: "none",
//                         padding: "0.3rem 0.6rem",
//                         borderRadius: "4px",
//                         cursor: "pointer",
//                       }}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDeleteTeacher(teacher.id)}
//                       style={{
//                         backgroundColor: "#cc0000",
//                         color: "#fff",
//                         border: "none",
//                         padding: "0.3rem 0.6rem",
//                         borderRadius: "4px",
//                         cursor: "pointer",
//                       }}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


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

// interface Teacher {
//   id: number;
//   name: string;
//   class_name: string;
//   image_url: string | null;
// }

// // ✅ CACHE SYSTEM - Added caching functionality
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

//   static clearAll(): void {
//     if (typeof window === 'undefined') return;
    
//     Object.keys(localStorage)
//       .filter(key => key.startsWith('cache_'))
//       .forEach(key => localStorage.removeItem(key));
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

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState<"news" | "teachers">("news");
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   // News states
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [newsImage, setNewsImage] = useState<File | null>(null);
//   const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);

//   // Teacher states
//   const [teacherName, setTeacherName] = useState("");
//   const [teacherClass, setTeacherClass] = useState("");
//   const [teacherImage, setTeacherImage] = useState<File | null>(null);
//   const [teachers, setTeachers] = useState<Teacher[]>([]);

//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   // Edit states
//   const [editingNews, setEditingNews] = useState<NewsPost | null>(null);
//   const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

//   // ✅ ENHANCED: Fetch News with Caching
//   const fetchNews = async (forceRefresh: boolean = false) => {
//     // Try cache first unless forced refresh
//     if (!forceRefresh) {
//       const cachedNews = AppCache.get('news');
//       if (cachedNews) {
//         setNewsPosts(cachedNews);
//         return; // Use cache, no API call needed
//       }
//     }

//     // Fetch from Supabase if no cache or forced
//     const { data, error } = await supabase
//       .from("news")
//       .select("*")
//       .order("created_at", { ascending: false });
    
//     if (error) {
//       console.error(error);
//       // If API fails, try to use cached data as fallback
//       const cachedNews = AppCache.get('news');
//       if (cachedNews) {
//         setNewsPosts(cachedNews);
//       }
//     } else {
//       setNewsPosts(data);
//       AppCache.set('news', data); // Update cache
//     }
//   };

//   // ✅ ENHANCED: Fetch Teachers with Caching
//   const fetchTeachers = async (forceRefresh: boolean = false) => {
//     // Try cache first unless forced refresh
//     if (!forceRefresh) {
//       const cachedTeachers = AppCache.get('teachers');
//       if (cachedTeachers) {
//         setTeachers(cachedTeachers);
//         return; // Use cache, no API call needed
//       }
//     }

//     // Fetch from Supabase if no cache or forced
//     const { data, error } = await supabase
//       .from("teachers")
//       .select("*")
//       .order("id", { ascending: true });
    
//     if (error) {
//       console.error(error);
//       // If API fails, try to use cached data as fallback
//       const cachedTeachers = AppCache.get('teachers');
//       if (cachedTeachers) {
//         setTeachers(cachedTeachers);
//       }
//     } else {
//       setTeachers(data);
//       AppCache.set('teachers', data); // Update cache
//     }
//   };

//   useEffect(() => {
//     fetchNews();
//     fetchTeachers();
//   }, []);

//   // ✅ ENHANCED: Invalidate cache on data changes
//   const invalidateCache = (type: 'news' | 'teachers' | 'all') => {
//     if (type === 'news' || type === 'all') {
//       AppCache.remove('news');
//     }
//     if (type === 'teachers' || type === 'all') {
//       AppCache.remove('teachers');
//     }
//   };

//   // ✅ Logout function
//   const handleLogout = async () => {
//     if (confirm("Are you sure you want to logout?")) {
//       // Clear cache on logout for security
//       AppCache.clearAll();
//       const { error } = await supabase.auth.signOut();
//       if (error) {
//         console.error("Logout error:", error);
//       } else {
//         window.location.href = "/admin";
//       }
//     }
//   };

//   // ✅ Validate file size (2MB limit)
//   const validateFileSize = (file: File): boolean => {
//     const maxSize = 2 * 1024 * 1024;
//     if (file.size > maxSize) {
//       setErrorMessage("File size too large! Please select an image under 2MB.");
//       return false;
//     }
//     setErrorMessage("");
//     return true;
//   };

//   // ✅ Upload image to Supabase Storage
//   const uploadImage = async (file: File, folder: string) => {
//     const fileName = `${Date.now()}_${file.name}`;
//     const { data, error } = await supabase.storage.from(folder).upload(fileName, file);
//     if (error) {
//       console.error("Upload error:", error);
//       return null;
//     }
//     const { data: publicData } = supabase.storage.from(folder).getPublicUrl(fileName);
//     return publicData.publicUrl;
//   };

//   // ✅ Extract file name from Supabase storage URL
//   const getFileNameFromUrl = (url: string): string | null => {
//     try {
//       const urlObj = new URL(url);
//       const pathParts = urlObj.pathname.split('/');
//       return pathParts[pathParts.length - 1];
//     } catch (error) {
//       console.error("Error extracting file name from URL:", error);
//       return null;
//     }
//   };

//   // ✅ Delete image from Supabase Storage
//   const deleteImageFromStorage = async (imageUrl: string | null, folder: string) => {
//     if (!imageUrl) return;
//     const fileName = getFileNameFromUrl(imageUrl);
//     if (!fileName) return;
//     const { error } = await supabase.storage.from(folder).remove([fileName]);
//     if (error) {
//       console.error("Error deleting image from storage:", error);
//     } else {
//       console.log("✅ Image deleted from storage:", fileName);
//     }
//   };

//   // Handle file selection with validation
//   const handleNewsImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files ? e.target.files[0] : null;
//     if (file && !validateFileSize(file)) {
//       e.target.value = "";
//       return;
//     }
//     setNewsImage(file);
//     setErrorMessage("");
//   };

//   const handleTeacherImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files ? e.target.files[0] : null;
//     if (file && !validateFileSize(file)) {
//       e.target.value = "";
//       return;
//     }
//     setTeacherImage(file);
//     setErrorMessage("");
//   };

//   // ✅ HTML FORMATTING FUNCTIONS
//   const applyFormatting = (tag: string) => {
//     const textarea = document.getElementById('news-content') as HTMLTextAreaElement;
//     if (!textarea) return;

//     const start = textarea.selectionStart;
//     const end = textarea.selectionEnd;
//     const selectedText = content.substring(start, end);
    
//     let newText = '';
    
//     switch(tag) {
//       case 'bold':
//         newText = `<strong>${selectedText || 'Your text here'}</strong>`;
//         break;
//       case 'italic':
//         newText = `<em>${selectedText || 'Your text here'}</em>`;
//         break;
//       case 'underline':
//         newText = `<u>${selectedText || 'Your text here'}</u>`;
//         break;
//       case 'color-red':
//         newText = `<span style="color: red">${selectedText || 'Your text here'}</span>`;
//         break;
//       case 'color-blue':
//         newText = `<span style="color: blue">${selectedText || 'Your text here'}</span>`;
//         break;
//       case 'color-green':
//         newText = `<span style="color: green">${selectedText || 'Your text here'}</span>`;
//         break;
//       case 'heading':
//         newText = `<h3>${selectedText || 'Heading'}</h3>`;
//         break;
//       case 'paragraph':
//         newText = `<p>${selectedText || 'Paragraph text'}</p>`;
//         break;
//       case 'list':
//         newText = `<ul>\n  <li>${selectedText || 'List item'}</li>\n</ul>`;
//         break;
//       case 'link':
//         newText = `<a href="https://example.com" target="_blank">${selectedText || 'Link text'}</a>`;
//         break;
//       case 'center':
//         newText = `<div style="text-align: center">${selectedText || 'Centered text'}</div>`;
//         break;
//       case 'line-break':
//         newText = `<br/>`;
//         break;
//       default:
//         newText = selectedText;
//     }

//     const newContent = content.substring(0, start) + newText + content.substring(end);
//     setContent(newContent);
    
//     // Focus back on textarea
//     setTimeout(() => {
//       textarea.focus();
//       if (!selectedText) {
//         const newCursorPos = start + newText.length - (tag === 'list' ? 10 : 8);
//         textarea.setSelectionRange(newCursorPos, newCursorPos);
//       }
//     }, 0);
//   };

//   // ✅ ENHANCED: Add News with cache invalidation
//   const handleAddNews = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (newsImage && !validateFileSize(newsImage)) {
//       return;
//     }

//     setLoading(true);
//     let imageUrl: string | null = null;
//     if (newsImage) imageUrl = await uploadImage(newsImage, "avatars");

//     // Convert line breaks to proper HTML paragraphs
//     const formattedContent = content
//       .split('\n\n') // Split by double line breaks for paragraphs
//       .map(paragraph => {
//         const trimmed = paragraph.trim();
//         if (!trimmed) return '';
//         // If already contains HTML tags, leave as is, otherwise wrap in <p>
//         if (trimmed.startsWith('<') && trimmed.endsWith('>')) {
//           return trimmed;
//         }
//         return `<p>${trimmed}</p>`;
//       })
//       .join('');

//     const { error } = await supabase
//       .from("news")
//       .insert([{ 
//         title, 
//         content: formattedContent || content, 
//         image_url: imageUrl 
//       }]);
      
//     if (error) console.error(error);
//     else {
//       setTitle("");
//       setContent("");
//       setNewsImage(null);
//       (e.target as HTMLFormElement).reset();
      
//       // ✅ INVALIDATE CACHE and fetch fresh data
//       invalidateCache('news');
//       fetchNews(true); // Force refresh
//     }
//     setLoading(false);
//   };

//   // ✅ ENHANCED: Edit News with cache invalidation
//   const handleEditNews = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editingNews) return;

//     if (newsImage && !validateFileSize(newsImage)) {
//       return;
//     }

//     setLoading(true);
//     let imageUrl = editingNews.image_url;

//     if (newsImage) {
//       if (editingNews.image_url) {
//         await deleteImageFromStorage(editingNews.image_url, "avatars");
//       }
//       imageUrl = await uploadImage(newsImage, "avatars");
//     }

//     // Convert line breaks to proper HTML paragraphs for editing too
//     const formattedContent = content
//       .split('\n\n')
//       .map(paragraph => {
//         const trimmed = paragraph.trim();
//         if (!trimmed) return '';
//         if (trimmed.startsWith('<') && trimmed.endsWith('>')) {
//           return trimmed;
//         }
//         return `<p>${trimmed}</p>`;
//       })
//       .join('');

//     const { error } = await supabase
//       .from("news")
//       .update({ 
//         title, 
//         content: formattedContent || content, 
//         image_url: imageUrl 
//       })
//       .eq("id", editingNews.id);

//     if (error) console.error(error);
//     else {
//       setTitle("");
//       setContent("");
//       setNewsImage(null);
//       setEditingNews(null);
//       (e.target as HTMLFormElement).reset();
      
//       // ✅ INVALIDATE CACHE and fetch fresh data
//       invalidateCache('news');
//       fetchNews(true); // Force refresh
//     }
//     setLoading(false);
//   };

//   // ✅ ENHANCED: Delete News with cache invalidation
//   const handleDeleteNews = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this news?")) return;
    
//     try {
//       const { data: newsItem, error: fetchError } = await supabase
//         .from("news")
//         .select("image_url")
//         .eq("id", id)
//         .single();

//       if (fetchError) return;

//       if (newsItem?.image_url) {
//         await deleteImageFromStorage(newsItem.image_url, "avatars");
//       }

//       const { error: deleteError } = await supabase.from("news").delete().eq("id", id);
//       if (!deleteError) {
//         // ✅ INVALIDATE CACHE and fetch fresh data
//         invalidateCache('news');
//         fetchNews(true); // Force refresh
//       }
//     } catch (error) {
//       console.error("Error in delete process:", error);
//     }
//   };

//   // Start editing news
//   const startEditNews = (post: NewsPost) => {
//     setEditingNews(post);
//     setTitle(post.title);
//     setContent(post.content);
//     setNewsImage(null);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Cancel editing news
//   const cancelEditNews = () => {
//     setEditingNews(null);
//     setTitle("");
//     setContent("");
//     setNewsImage(null);
//     setErrorMessage("");
//   };

//   // ✅ ENHANCED: Add Teacher with cache invalidation
//   const handleAddTeacher = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (teacherImage && !validateFileSize(teacherImage)) {
//       return;
//     }

//     setLoading(true);
//     let imageUrl: string | null = null;
//     if (teacherImage) imageUrl = await uploadImage(teacherImage, "avatars");

//     const { error } = await supabase
//       .from("teachers")
//       .insert([{ name: teacherName, class_name: teacherClass, image_url: imageUrl }]);
//     if (error) console.error(error);
//     else {
//       setTeacherName("");
//       setTeacherClass("");
//       setTeacherImage(null);
//       (e.target as HTMLFormElement).reset();
      
//       // ✅ INVALIDATE CACHE and fetch fresh data
//       invalidateCache('teachers');
//       fetchTeachers(true); // Force refresh
//     }
//     setLoading(false);
//   };

//   // ✅ ENHANCED: Edit Teacher with cache invalidation
//   const handleEditTeacher = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editingTeacher) return;

//     if (teacherImage && !validateFileSize(teacherImage)) {
//       return;
//     }

//     setLoading(true);
//     let imageUrl = editingTeacher.image_url;

//     if (teacherImage) {
//       if (editingTeacher.image_url) {
//         await deleteImageFromStorage(editingTeacher.image_url, "avatars");
//       }
//       imageUrl = await uploadImage(teacherImage, "avatars");
//     }

//     const { error } = await supabase
//       .from("teachers")
//       .update({ name: teacherName, class_name: teacherClass, image_url: imageUrl })
//       .eq("id", editingTeacher.id);

//     if (error) console.error(error);
//     else {
//       setTeacherName("");
//       setTeacherClass("");
//       setTeacherImage(null);
//       setEditingTeacher(null);
//       (e.target as HTMLFormElement).reset();
      
//       // ✅ INVALIDATE CACHE and fetch fresh data
//       invalidateCache('teachers');
//       fetchTeachers(true); // Force refresh
//     }
//     setLoading(false);
//   };

//   // ✅ ENHANCED: Delete Teacher with cache invalidation
//   const handleDeleteTeacher = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this teacher?")) return;
    
//     try {
//       const { data: teacher, error: fetchError } = await supabase
//         .from("teachers")
//         .select("image_url")
//         .eq("id", id)
//         .single();

//       if (fetchError) return;

//       if (teacher?.image_url) {
//         await deleteImageFromStorage(teacher.image_url, "avatars");
//       }

//       const { error: deleteError } = await supabase.from("teachers").delete().eq("id", id);
//       if (!deleteError) {
//         // ✅ INVALIDATE CACHE and fetch fresh data
//         invalidateCache('teachers');
//         fetchTeachers(true); // Force refresh
//       }
//     } catch (error) {
//       console.error("Error in delete process:", error);
//     }
//   };

//   // Start editing teacher
//   const startEditTeacher = (teacher: Teacher) => {
//     setEditingTeacher(teacher);
//     setTeacherName(teacher.name);
//     setTeacherClass(teacher.class_name);
//     setTeacherImage(null);
//     setErrorMessage("");
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Cancel editing teacher
//   const cancelEditTeacher = () => {
//     setEditingTeacher(null);
//     setTeacherName("");
//     setTeacherClass("");
//     setTeacherImage(null);
//     setErrorMessage("");
//   };

//   // ✅ ADDED: Manual refresh buttons for testing
//   const handleForceRefresh = () => {
//     if (activeTab === 'news') {
//       fetchNews(true);
//     } else {
//       fetchTeachers(true);
//     }
//   };

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
//       {/* Sidebar */}
//       <div
//         style={{
//           width: sidebarOpen ? "220px" : "60px",
//           backgroundColor: "#002244",
//           color: "#fff",
//           display: "flex",
//           flexDirection: "column",
//           position: "fixed",
//           top: "2cm",
//           bottom: 0,
//           left: 0,
//           padding: "1rem",
//           transition: "width 0.3s ease",
//         }}
//       >
//         <button
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//           style={{
//             marginBottom: "1rem",
//             backgroundColor: "red",
//             color: "#fff",
//             border: "none",
//             padding: "0.5rem",
//             borderRadius: "4px",
//             cursor: "pointer",
//             alignSelf: "center",
//           }}
//         >
//           {sidebarOpen ? "Close" : "Open"}
//         </button>

//         <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//           <div
//             style={{
//               padding: "0.5rem",
//               cursor: "pointer",
//               backgroundColor: activeTab === "news" ? "#001733" : "transparent",
//             }}
//             onClick={() => setActiveTab("news")}
//           >
//             {sidebarOpen && "News Posts"}
//           </div>
//           <div
//             style={{
//               padding: "0.5rem",
//               cursor: "pointer",
//               backgroundColor: activeTab === "teachers" ? "#001733" : "transparent",
//             }}
//             onClick={() => setActiveTab("teachers")}
//           >
//             {sidebarOpen && "Teachers"}
//           </div>
//           <div 
//             style={{ 
//               padding: "0.5rem", 
//               cursor: "pointer",
//               backgroundColor: "#cc0000",
//               borderRadius: "4px",
//               textAlign: "center"
//             }}
//             onClick={handleLogout}
//           >
//             {sidebarOpen && "Logout"}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div
//         style={{
//           marginLeft: sidebarOpen ? "220px" : "60px",
//           flex: 1,
//           padding: "2rem",
//           backgroundColor: "#f0f2f5",
//           transition: "margin-left 0.3s ease",
//         }}
//       >
//         {/* ✅ ADDED: Cache Status Indicator */}
//         <div style={{ 
//           display: 'flex', 
//           justifyContent: 'space-between', 
//           alignItems: 'center',
//           marginBottom: '1rem'
//         }}>
//           <h2 style={{ margin: 0 }}>
//             {activeTab === "news" 
//               ? (editingNews ? "Edit News Post" : "Add News Post") 
//               : (editingTeacher ? "Edit Teacher" : "Add Teacher")
//             }
//           </h2>
//           <button
//             onClick={handleForceRefresh}
//             style={{
//               padding: "0.5rem 1rem",
//               backgroundColor: "#28a745",
//               color: "#fff",
//               border: "none",
//               borderRadius: "6px",
//               cursor: "pointer",
//               fontSize: "0.9rem"
//             }}
//           >
//             🔄 Refresh Data
//           </button>
//         </div>

//         {activeTab === "news" && (
//           <>
//             <form
//               onSubmit={editingNews ? handleEditNews : handleAddNews}
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "1rem",
//                 backgroundColor: "#fff",
//                 padding: "1.5rem",
//                 borderRadius: "12px",
//                 boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//               }}
//             >
//               {/* ... (ALL YOUR EXISTING NEWS FORM CODE REMAINS EXACTLY THE SAME) ... */}
//               <input
//                 type="text"
//                 placeholder="Title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//                 style={{
//                   padding: "0.8rem",
//                   borderRadius: "6px",
//                   border: "1px solid #ccc",
//                   outline: "none",
//                 }}
//               />
              
//               {/* ✅ POWERFUL HTML EDITOR TOOLBAR */}
//               <div style={{ 
//                 display: "flex", 
//                 flexWrap: "wrap", 
//                 gap: "0.5rem", 
//                 padding: "0.5rem",
//                 backgroundColor: "#f8f9fa",
//                 borderRadius: "6px",
//                 border: "1px solid #ddd"
//               }}>
//                 <strong style={{ marginRight: "1rem", color: "#002244" }}>Formatting:</strong>
                
//                 {/* Text Formatting */}
//                 <button type="button" onClick={() => applyFormatting('bold')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
//                   <strong>B</strong>
//                 </button>
//                 <button type="button" onClick={() => applyFormatting('italic')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
//                   <em>I</em>
//                 </button>
//                 <button type="button" onClick={() => applyFormatting('underline')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
//                   <u>U</u>
//                 </button>
                
//                 {/* Colors */}
//                 <button type="button" onClick={() => applyFormatting('color-red')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#ffebee", border: "1px solid #ffcdd2", borderRadius: "4px", cursor: "pointer", color: "red" }}>
//                   🔴
//                 </button>
//                 <button type="button" onClick={() => applyFormatting('color-blue')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e3f2fd", border: "1px solid #bbdefb", borderRadius: "4px", cursor: "pointer", color: "blue" }}>
//                   🔵
//                 </button>
//                 <button type="button" onClick={() => applyFormatting('color-green')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e8f5e8", border: "1px solid #c8e6c9", borderRadius: "4px", cursor: "pointer", color: "green" }}>
//                   🟢
//                 </button>
                
//                 {/* Structure */}
//                 <button type="button" onClick={() => applyFormatting('heading')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
//                   H3
//                 </button>
//                 <button type="button" onClick={() => applyFormatting('paragraph')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
//                   ¶
//                 </button>
//                 <button type="button" onClick={() => applyFormatting('list')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
//                   • List
//                 </button>
//                 <button type="button" onClick={() => applyFormatting('center')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
//                   Center
//                 </button>
//                 <button type="button" onClick={() => applyFormatting('link')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
//                   🔗
//                 </button>
//                 <button type="button" onClick={() => applyFormatting('line-break')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
//                   ↵ Break
//                 </button>
//               </div>

//               {/* ✅ HTML CONTENT TEXTAREA */}
//               <div>
//                 <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#333" }}>
//                   Content (HTML Supported):
//                 </label>
//                 <textarea
//                   id="news-content"
//                   placeholder="Write your news content here... Use the formatting buttons above or write HTML directly!

// Tip: Press Enter twice to create new paragraphs automatically!"
//                   value={content}
//                   onChange={(e) => setContent(e.target.value)}
//                   required
//                   style={{
//                     padding: "0.8rem",
//                     borderRadius: "6px",
//                     border: "1px solid #ccc",
//                     outline: "none",
//                     minHeight: "200px",
//                     width: "100%",
//                     fontFamily: "monospace",
//                     fontSize: "0.9rem",
//                     whiteSpace: "pre-wrap"
//                   }}
//                 />
//                 <small style={{ color: "#666", display: "block", marginTop: "0.5rem" }}>
//                   💡 <strong>Tip:</strong> Press 'Enter' twice to create paragraphs. Use formatting buttons or write HTML directly!
//                 </small>
//               </div>

//               <div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleNewsImageSelect}
//                 />
//                 <small style={{ color: "#666", display: "block", marginTop: "0.5rem" }}>
//                   Maximum file size: 2MB. Recommended: Passport-style photos.
//                 </small>
//                 {errorMessage && (
//                   <div style={{
//                     backgroundColor: "#ffebee",
//                     color: "#c62828",
//                     padding: "0.75rem",
//                     borderRadius: "6px",
//                     marginTop: "0.5rem",
//                     border: "1px solid #ffcdd2",
//                     fontSize: "0.9rem"
//                   }}>
//                     ⚠️ {errorMessage}
//                   </div>
//                 )}
//               </div>
//               <div style={{ display: "flex", gap: "1rem" }}>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   style={{
//                     padding: "0.8rem",
//                     backgroundColor: editingNews ? "#ffa500" : "#002244",
//                     color: "#fff",
//                     border: "none",
//                     borderRadius: "6px",
//                     cursor: "pointer",
//                     flex: 1,
//                   }}
//                 >
//                   {loading ? "Saving..." : editingNews ? "Update Post" : "Add Post"}
//                 </button>
//                 {editingNews && (
//                   <button
//                     type="button"
//                     onClick={cancelEditNews}
//                     style={{
//                       padding: "0.8rem",
//                       backgroundColor: "#6c757d",
//                       color: "#fff",
//                       border: "none",
//                       borderRadius: "6px",
//                       cursor: "pointer",
//                     }}
//                   >
//                     Cancel
//                   </button>
//                 )}
//               </div>
//             </form>
            
//             <h2 style={{ margin: "2rem 0 1rem" }}>EXISTING NEWS POSTS</h2>
//             <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//               {newsPosts.map((post) => (
//                 <div
//                   key={post.id}
//                   style={{
//                     backgroundColor: "#fff",
//                     padding: "1rem",
//                     borderRadius: "8px",
//                     boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//                     display: "flex",
//                     alignItems: "flex-start",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flex: 1 }}>
//                     {post.image_url && (
//                       <img
//                         src={post.image_url}
//                         alt={post.title}
//                         style={{ 
//                           width: "120px", 
//                           height: "120px", 
//                           objectFit: "cover",
//                           borderRadius: "8px"
//                         }}
//                       />
//                     )}
//                     <div style={{ flex: 1 }}>
//                       <h3 style={{ margin: "0 0 0.5rem 0" }}>{post.title}</h3>
//                       <div 
//                         style={{ margin: 0, color: "#666" }}
//                         dangerouslySetInnerHTML={{ __html: post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content }}
//                       />
//                     </div>
//                   </div>
//                   <div style={{ display: "flex", gap: "0.5rem" }}>
//                     <button
//                       onClick={() => startEditNews(post)}
//                       style={{
//                         backgroundColor: "#ffa500",
//                         color: "#fff",
//                         border: "none",
//                         padding: "0.3rem 0.6rem",
//                         borderRadius: "4px",
//                         cursor: "pointer",
//                       }}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDeleteNews(post.id)}
//                       style={{
//                         backgroundColor: "#cc0000",
//                         color: "#fff",
//                         border: "none",
//                         padding: "0.3rem 0.6rem",
//                         borderRadius: "4px",
//                         cursor: "pointer",
//                       }}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}

//         {activeTab === "teachers" && (
//           <>
//             {/* Teachers section remains exactly the same */}
//             <h2 style={{ marginBottom: "1rem" }}>
//               {editingTeacher ? "Edit Teacher" : "Add Teacher"}
//             </h2>
//             <form
//               onSubmit={editingTeacher ? handleEditTeacher : handleAddTeacher}
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "1rem",
//                 backgroundColor: "#fff",
//                 padding: "1.5rem",
//                 borderRadius: "12px",
//                 boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//               }}
//             >
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={teacherName}
//                 onChange={(e) => setTeacherName(e.target.value)}
//                 required
//                 style={{
//                   padding: "0.8rem",
//                   borderRadius: "6px",
//                   border: "1px solid #ccc",
//                   outline: "none",
//                 }}
//               />
//               <input
//                 type="text"
//                 placeholder="Class"
//                 value={teacherClass}
//                 onChange={(e) => setTeacherClass(e.target.value)}
//                 required
//                 style={{
//                   padding: "0.8rem",
//                   borderRadius: "6px",
//                   border: "1px solid #ccc",
//                   outline: "none",
//                 }}
//               />
//               <div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleTeacherImageSelect}
//                 />
//                 <small style={{ color: "#666", display: "block", marginTop: "0.5rem" }}>
//                   Maximum file size: 2MB. Recommended: Passport-style photos.
//                 </small>
//                 {errorMessage && (
//                   <div style={{
//                     backgroundColor: "#ffebee",
//                     color: "#c62828",
//                     padding: "0.75rem",
//                     borderRadius: "6px",
//                     marginTop: "0.5rem",
//                     border: "1px solid #ffcdd2",
//                     fontSize: "0.9rem"
//                   }}>
//                     ⚠️ {errorMessage}
//                   </div>
//                 )}
//               </div>
//               <div style={{ display: "flex", gap: "1rem" }}>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   style={{
//                     padding: "0.8rem",
//                     backgroundColor: editingTeacher ? "#ffa500" : "#002244",
//                     color: "#fff",
//                     border: "none",
//                     borderRadius: "6px",
//                     cursor: "pointer",
//                     flex: 1,
//                   }}
//                 >
//                   {loading ? "Saving..." : editingTeacher ? "Update Teacher" : "Add Teacher"}
//                 </button>
//                 {editingTeacher && (
//                   <button
//                     type="button"
//                     onClick={cancelEditTeacher}
//                     style={{
//                       padding: "0.8rem",
//                       backgroundColor: "#6c757d",
//                       color: "#fff",
//                       border: "none",
//                       borderRadius: "6px",
//                       cursor: "pointer",
//                     }}
//                   >
//                     Cancel
//                   </button>
//                 )}
//               </div>
//             </form>

//             <h2 style={{ margin: "2rem 0 1rem" }}>Existing Teachers</h2>
//             <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//               {teachers.map((teacher) => (
//                 <div
//                   key={teacher.id}
//                   style={{
//                     backgroundColor: "#fff",
//                     padding: "1rem",
//                     borderRadius: "8px",
//                     boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
//                     {teacher.image_url && (
//                       <img
//                         src={teacher.image_url}
//                         alt={teacher.name}
//                         style={{ 
//                           width: "60px", 
//                           height: "60px", 
//                           objectFit: "cover",
//                           borderRadius: "50%" 
//                         }}
//                       />
//                     )}
//                     <div>
//                       <h4>{teacher.name}</h4>
//                       <p>{teacher.class_name}</p>
//                     </div>
//                   </div>
//                   <div style={{ display: "flex", gap: "0.5rem" }}>
//                     <button
//                       onClick={() => startEditTeacher(teacher)}
//                       style={{
//                         backgroundColor: "#ffa500",
//                         color: "#fff",
//                         border: "none",
//                         padding: "0.3rem 0.6rem",
//                         borderRadius: "4px",
//                         cursor: "pointer",
//                       }}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDeleteTeacher(teacher.id)}
//                       style={{
//                         backgroundColor: "#cc0000",
//                         color: "#fff",
//                         border: "none",
//                         padding: "0.3rem 0.6rem",
//                         borderRadius: "4px",
//                         cursor: "pointer",
//                       }}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
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

interface Teacher {
  id: number;
  name: string;
  class_name: string;
  image_url: string | null;
}

interface GalleryPhoto {
  id: number;
  image_url: string;
  description: string | null;
  created_at: string;
}

// ✅ CACHE SYSTEM - Added caching functionality
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

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"news" | "teachers" | "gallery">("news");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // News states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [newsImage, setNewsImage] = useState<File | null>(null);
  const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);

  // Teacher states
  const [teacherName, setTeacherName] = useState("");
  const [teacherClass, setTeacherClass] = useState("");
  const [teacherImage, setTeacherImage] = useState<File | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  // Gallery states
  const [galleryImage, setGalleryImage] = useState<File | null>(null);
  const [galleryDescription, setGalleryDescription] = useState("");
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Edit states
  const [editingNews, setEditingNews] = useState<NewsPost | null>(null);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  // ✅ FIXED: Enhanced fetch functions with proper state updates
  const fetchNews = async (forceRefresh: boolean = false) => {
    // Try cache first unless forced refresh
    if (!forceRefresh) {
      const cachedNews = AppCache.get('news');
      if (cachedNews) {
        setNewsPosts(cachedNews);
        return; // Use cache, no API call needed
      }
    }

    // Fetch from Supabase if no cache or forced
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      console.error(error);
      // If API fails, try to use cached data as fallback
      const cachedNews = AppCache.get('news');
      if (cachedNews) {
        setNewsPosts(cachedNews);
      }
    } else {
      setNewsPosts(data || []);
      AppCache.set('news', data); // Update cache
    }
  };

  const fetchTeachers = async (forceRefresh: boolean = false) => {
    // Try cache first unless forced refresh
    if (!forceRefresh) {
      const cachedTeachers = AppCache.get('teachers');
      if (cachedTeachers) {
        setTeachers(cachedTeachers);
        return; // Use cache, no API call needed
      }
    }

    // Fetch from Supabase if no cache or forced
    const { data, error } = await supabase
      .from("teachers")
      .select("*")
      .order("id", { ascending: true });
    
    if (error) {
      console.error(error);
      // If API fails, try to use cached data as fallback
      const cachedTeachers = AppCache.get('teachers');
      if (cachedTeachers) {
        setTeachers(cachedTeachers);
      }
    } else {
      setTeachers(data || []);
      AppCache.set('teachers', data); // Update cache
    }
  };

  // ✅ ADDED: Fetch Gallery Photos with Caching
  const fetchGalleryPhotos = async (forceRefresh: boolean = false) => {
    // Try cache first unless forced refresh
    if (!forceRefresh) {
      const cachedGallery = AppCache.get('gallery');
      if (cachedGallery) {
        setGalleryPhotos(cachedGallery);
        return; // Use cache, no API call needed
      }
    }

    // Fetch from Supabase if no cache or forced
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      console.error("Error fetching gallery:", error);
      // If API fails, try to use cached data as fallback
      const cachedGallery = AppCache.get('gallery');
      if (cachedGallery) {
        setGalleryPhotos(cachedGallery);
      }
    } else {
      setGalleryPhotos(data || []);
      AppCache.set('gallery', data); // Update cache
    }
  };

  useEffect(() => {
    fetchNews();
    fetchTeachers();
    fetchGalleryPhotos();
  }, []);

  // ✅ ENHANCED: Invalidate cache on data changes
  const invalidateCache = (type: 'news' | 'teachers' | 'gallery' | 'all') => {
    if (type === 'news' || type === 'all') {
      AppCache.remove('news');
    }
    if (type === 'teachers' || type === 'all') {
      AppCache.remove('teachers');
    }
    if (type === 'gallery' || type === 'all') {
      AppCache.remove('gallery');
    }
  };

  // ✅ FIXED: Refresh button now works properly
  const handleForceRefresh = () => {
    if (activeTab === 'news') {
      fetchNews(true);
    } else if (activeTab === 'teachers') {
      fetchTeachers(true);
    } else if (activeTab === 'gallery') {
      fetchGalleryPhotos(true);
    }
  };

  // ✅ Logout function
  const handleLogout = async () => {
    if (confirm("Are you sure you want to logout?")) {
      // Clear cache on logout for security
      AppCache.clearAll();
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error);
      } else {
        window.location.href = "/admin";
      }
    }
  };

  // ✅ Validate file size (2MB limit)
  const validateFileSize = (file: File): boolean => {
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrorMessage("File size too large! Please select an image under 2MB.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  // ✅ Upload image to Supabase Storage
  const uploadImage = async (file: File, folder: string) => {
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage.from(folder).upload(fileName, file);
    if (error) {
      console.error("Upload error:", error);
      return null;
    }
    const { data: publicData } = supabase.storage.from(folder).getPublicUrl(fileName);
    return publicData.publicUrl;
  };

  // ✅ Extract file name from Supabase storage URL
  const getFileNameFromUrl = (url: string): string | null => {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/');
      return pathParts[pathParts.length - 1];
    } catch (error) {
      console.error("Error extracting file name from URL:", error);
      return null;
    }
  };

  // ✅ Delete image from Supabase Storage
  const deleteImageFromStorage = async (imageUrl: string | null, folder: string) => {
    if (!imageUrl) return;
    const fileName = getFileNameFromUrl(imageUrl);
    if (!fileName) return;
    const { error } = await supabase.storage.from(folder).remove([fileName]);
    if (error) {
      console.error("Error deleting image from storage:", error);
    } else {
      console.log("✅ Image deleted from storage:", fileName);
    }
  };

  // Handle file selection with validation
  const handleNewsImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && !validateFileSize(file)) {
      e.target.value = "";
      return;
    }
    setNewsImage(file);
    setErrorMessage("");
  };

  const handleTeacherImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && !validateFileSize(file)) {
      e.target.value = "";
      return;
    }
    setTeacherImage(file);
    setErrorMessage("");
  };

  const handleGalleryImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && !validateFileSize(file)) {
      e.target.value = "";
      return;
    }
    setGalleryImage(file);
    setErrorMessage("");
  };

  // ✅ HTML FORMATTING FUNCTIONS (unchanged)
  const applyFormatting = (tag: string) => {
    const textarea = document.getElementById('news-content') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let newText = '';
    
    switch(tag) {
      case 'bold':
        newText = `<strong>${selectedText || 'Your text here'}</strong>`;
        break;
      case 'italic':
        newText = `<em>${selectedText || 'Your text here'}</em>`;
        break;
      case 'underline':
        newText = `<u>${selectedText || 'Your text here'}</u>`;
        break;
      case 'color-red':
        newText = `<span style="color: red">${selectedText || 'Your text here'}</span>`;
        break;
      case 'color-blue':
        newText = `<span style="color: blue">${selectedText || 'Your text here'}</span>`;
        break;
      case 'color-green':
        newText = `<span style="color: green">${selectedText || 'Your text here'}</span>`;
        break;
      case 'heading':
        newText = `<h3>${selectedText || 'Heading'}</h3>`;
        break;
      case 'paragraph':
        newText = `<p>${selectedText || 'Paragraph text'}</p>`;
        break;
      case 'list':
        newText = `<ul>\n  <li>${selectedText || 'List item'}</li>\n</ul>`;
        break;
      case 'link':
        newText = `<a href="https://example.com" target="_blank">${selectedText || 'Link text'}</a>`;
        break;
      case 'center':
        newText = `<div style="text-align: center">${selectedText || 'Centered text'}</div>`;
        break;
      case 'line-break':
        newText = `<br/>`;
        break;
      default:
        newText = selectedText;
    }

    const newContent = content.substring(0, start) + newText + content.substring(end);
    setContent(newContent);
    
    // Focus back on textarea
    setTimeout(() => {
      textarea.focus();
      if (!selectedText) {
        const newCursorPos = start + newText.length - (tag === 'list' ? 10 : 8);
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  };

  // ✅ ADDED: Add Gallery Photo with 12-photo limit
  const handleAddGalleryPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if maximum limit reached
    if (galleryPhotos.length >= 12) {
      setErrorMessage("Maximum gallery photos reached (12). Please delete an existing photo before adding a new one.");
      return;
    }

    if (!galleryImage) {
      setErrorMessage("Please select an image to upload.");
      return;
    }

    if (!validateFileSize(galleryImage)) {
      return;
    }

    setGalleryLoading(true);
    const imageUrl = await uploadImage(galleryImage, "avatars");

    if (imageUrl) {
      const { error } = await supabase
        .from("gallery")
        .insert([{ 
          image_url: imageUrl, 
          description: galleryDescription 
        }]);
        
      if (error) {
        console.error("Error adding gallery photo:", error);
        setErrorMessage("Failed to add photo. Please try again.");
      } else {
        setGalleryImage(null);
        setGalleryDescription("");
        (e.target as HTMLFormElement).reset();
        
        // ✅ INVALIDATE CACHE and fetch fresh data
        invalidateCache('gallery');
        fetchGalleryPhotos(true); // Force refresh
      }
    }
    setGalleryLoading(false);
  };

  // ✅ ADDED: Delete Gallery Photo
  const handleDeleteGalleryPhoto = async (id: number, imageUrl: string) => {
    if (!confirm("Are you sure you want to delete this photo from the gallery?")) return;
    
    try {
      // Delete image from storage
      await deleteImageFromStorage(imageUrl, "avatars");

      // Delete record from database
      const { error } = await supabase.from("gallery").delete().eq("id", id);
      
      if (!error) {
        // ✅ INVALIDATE CACHE and fetch fresh data
        invalidateCache('gallery');
        fetchGalleryPhotos(true); // Force refresh
      } else {
        console.error("Error deleting gallery photo:", error);
      }
    } catch (error) {
      console.error("Error in delete process:", error);
    }
  };

  // ✅ ENHANCED: Add News with cache invalidation
  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newsImage && !validateFileSize(newsImage)) {
      return;
    }

    setLoading(true);
    let imageUrl: string | null = null;
    if (newsImage) imageUrl = await uploadImage(newsImage, "avatars");

    // Convert line breaks to proper HTML paragraphs
    const formattedContent = content
      .split('\n\n') // Split by double line breaks for paragraphs
      .map(paragraph => {
        const trimmed = paragraph.trim();
        if (!trimmed) return '';
        // If already contains HTML tags, leave as is, otherwise wrap in <p>
        if (trimmed.startsWith('<') && trimmed.endsWith('>')) {
          return trimmed;
        }
        return `<p>${trimmed}</p>`;
      })
      .join('');

    const { error } = await supabase
      .from("news")
      .insert([{ 
        title, 
        content: formattedContent || content, 
        image_url: imageUrl 
      }]);
      
    if (error) console.error(error);
    else {
      setTitle("");
      setContent("");
      setNewsImage(null);
      (e.target as HTMLFormElement).reset();
      
      // ✅ INVALIDATE CACHE and fetch fresh data
      invalidateCache('news');
      fetchNews(true); // Force refresh
    }
    setLoading(false);
  };

  // ✅ ENHANCED: Edit News with cache invalidation
  const handleEditNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNews) return;

    if (newsImage && !validateFileSize(newsImage)) {
      return;
    }

    setLoading(true);
    let imageUrl = editingNews.image_url;

    if (newsImage) {
      if (editingNews.image_url) {
        await deleteImageFromStorage(editingNews.image_url, "avatars");
      }
      imageUrl = await uploadImage(newsImage, "avatars");
    }

    // Convert line breaks to proper HTML paragraphs for editing too
    const formattedContent = content
      .split('\n\n')
      .map(paragraph => {
        const trimmed = paragraph.trim();
        if (!trimmed) return '';
        if (trimmed.startsWith('<') && trimmed.endsWith('>')) {
          return trimmed;
        }
        return `<p>${trimmed}</p>`;
      })
      .join('');

    const { error } = await supabase
      .from("news")
      .update({ 
        title, 
        content: formattedContent || content, 
        image_url: imageUrl 
      })
      .eq("id", editingNews.id);

    if (error) console.error(error);
    else {
      setTitle("");
      setContent("");
      setNewsImage(null);
      setEditingNews(null);
      (e.target as HTMLFormElement).reset();
      
      // ✅ INVALIDATE CACHE and fetch fresh data
      invalidateCache('news');
      fetchNews(true); // Force refresh
    }
    setLoading(false);
  };

  // ✅ ENHANCED: Delete News with cache invalidation
  const handleDeleteNews = async (id: number) => {
    if (!confirm("Are you sure you want to delete this news?")) return;
    
    try {
      const { data: newsItem, error: fetchError } = await supabase
        .from("news")
        .select("image_url")
        .eq("id", id)
        .single();

      if (fetchError) return;

      if (newsItem?.image_url) {
        await deleteImageFromStorage(newsItem.image_url, "avatars");
      }

      const { error: deleteError } = await supabase.from("news").delete().eq("id", id);
      if (!deleteError) {
        // ✅ INVALIDATE CACHE and fetch fresh data
        invalidateCache('news');
        fetchNews(true); // Force refresh
      }
    } catch (error) {
      console.error("Error in delete process:", error);
    }
  };

  // Start editing news
  const startEditNews = (post: NewsPost) => {
    setEditingNews(post);
    setTitle(post.title);
    setContent(post.content);
    setNewsImage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel editing news
  const cancelEditNews = () => {
    setEditingNews(null);
    setTitle("");
    setContent("");
    setNewsImage(null);
    setErrorMessage("");
  };

  // ✅ ENHANCED: Add Teacher with cache invalidation
  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (teacherImage && !validateFileSize(teacherImage)) {
      return;
    }

    setLoading(true);
    let imageUrl: string | null = null;
    if (teacherImage) imageUrl = await uploadImage(teacherImage, "avatars");

    const { error } = await supabase
      .from("teachers")
      .insert([{ name: teacherName, class_name: teacherClass, image_url: imageUrl }]);
    if (error) console.error(error);
    else {
      setTeacherName("");
      setTeacherClass("");
      setTeacherImage(null);
      (e.target as HTMLFormElement).reset();
      
      // ✅ INVALIDATE CACHE and fetch fresh data
      invalidateCache('teachers');
      fetchTeachers(true); // Force refresh
    }
    setLoading(false);
  };


  // ✅ ENHANCED: Edit Teacher with cache invalidation
  const handleEditTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeacher) return;

    if (teacherImage && !validateFileSize(teacherImage)) {
      return;
    }

    setLoading(true);
    let imageUrl = editingTeacher.image_url;

    if (teacherImage) {
      if (editingTeacher.image_url) {
        await deleteImageFromStorage(editingTeacher.image_url, "avatars");
      }
      imageUrl = await uploadImage(teacherImage, "avatars");
    }

    const { error } = await supabase
      .from("teachers")
      .update({ name: teacherName, class_name: teacherClass, image_url: imageUrl })
      .eq("id", editingTeacher.id);

    if (error) console.error(error);
    else {
      setTeacherName("");
      setTeacherClass("");
      setTeacherImage(null);
      setEditingTeacher(null);
      (e.target as HTMLFormElement).reset();
      
      // ✅ INVALIDATE CACHE and fetch fresh data
      invalidateCache('teachers');
      fetchTeachers(true); // Force refresh
    }
    setLoading(false);
  };

  // ✅ ENHANCED: Delete Teacher with cache invalidation
  const handleDeleteTeacher = async (id: number) => {
    if (!confirm("Are you sure you want to delete this teacher?")) return;
    
    try {
      const { data: teacher, error: fetchError } = await supabase
        .from("teachers")
        .select("image_url")
        .eq("id", id)
        .single();

      if (fetchError) return;

      if (teacher?.image_url) {
        await deleteImageFromStorage(teacher.image_url, "avatars");
      }

      const { error: deleteError } = await supabase.from("teachers").delete().eq("id", id);
      if (!deleteError) {
        // ✅ INVALIDATE CACHE and fetch fresh data
        invalidateCache('teachers');
        fetchTeachers(true); // Force refresh
      }
    } catch (error) {
      console.error("Error in delete process:", error);
    }
  };

  // Start editing teacher
  const startEditTeacher = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setTeacherName(teacher.name);
    setTeacherClass(teacher.class_name);
    setTeacherImage(null);
    setErrorMessage("");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel editing teacher
  const cancelEditTeacher = () => {
    setEditingTeacher(null);
    setTeacherName("");
    setTeacherClass("");
    setTeacherImage(null);
    setErrorMessage("");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* Sidebar */}
      <div
        style={{
          width: sidebarOpen ? "220px" : "60px",
          backgroundColor: "#002244",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: "2cm",
          bottom: 0,
          left: 0,
          padding: "1rem",
          transition: "width 0.3s ease",
        }}
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            marginBottom: "1rem",
            backgroundColor: "red",
            color: "#fff",
            border: "none",
            padding: "0.5rem",
            borderRadius: "4px",
            cursor: "pointer",
            alignSelf: "center",
          }}
        >
          {sidebarOpen ? "Close" : "Open"}
        </button>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div
            style={{
              padding: "0.5rem",
              cursor: "pointer",
              backgroundColor: activeTab === "news" ? "#001733" : "transparent",
            }}
            onClick={() => setActiveTab("news")}
          >
            {sidebarOpen && "News Posts"}
          </div>
          <div
            style={{
              padding: "0.5rem",
              cursor: "pointer",
              backgroundColor: activeTab === "teachers" ? "#001733" : "transparent",
            }}
            onClick={() => setActiveTab("teachers")}
          >
            {sidebarOpen && "Teachers"}
          </div>
          {/* ✅ ADDED: Gallery Tab */}
          <div
            style={{
              padding: "0.5rem",
              cursor: "pointer",
              backgroundColor: activeTab === "gallery" ? "#001733" : "transparent",
            }}
            onClick={() => setActiveTab("gallery")}
          >
            {sidebarOpen && "Gallery"}
          </div>
          <div 
            style={{ 
              padding: "0.5rem", 
              cursor: "pointer",
              backgroundColor: "#cc0000",
              borderRadius: "4px",
              textAlign: "center"
            }}
            onClick={handleLogout}
          >
            {sidebarOpen && "Logout"}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          marginLeft: sidebarOpen ? "220px" : "60px",
          flex: 1,
          padding: "2rem",
          backgroundColor: "#f0f2f5",
          transition: "margin-left 0.3s ease",
        }}
      >
        {/* ✅ ADDED: Cache Status Indicator */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <h2 style={{ margin: 0 }}>
            {activeTab === "news" 
              ? (editingNews ? "Edit News Post" : "Add News Post") 
              : activeTab === "teachers"
              ? (editingTeacher ? "Edit Teacher" : "Add Teacher")
              : "Gallery Photos"
            }
          </h2>
          <button
            onClick={handleForceRefresh}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.9rem"
            }}
          >
            🔄 Refresh Data
          </button>
        </div>

        {activeTab === "news" && (
          <>
            <form
              onSubmit={editingNews ? handleEditNews : handleAddNews}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                backgroundColor: "#fff",
                padding: "1.5rem",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              {/* ... (YOUR EXISTING NEWS FORM CODE) ... */}
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{
                  padding: "0.8rem",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  outline: "none",
                }}
              />
              
              {/* ✅ POWERFUL HTML EDITOR TOOLBAR */}
              <div style={{ 
                display: "flex", 
                flexWrap: "wrap", 
                gap: "0.5rem", 
                padding: "0.5rem",
                backgroundColor: "#f8f9fa",
                borderRadius: "6px",
                border: "1px solid #ddd"
              }}>
                <strong style={{ marginRight: "1rem", color: "#002244" }}>Formatting:</strong>
                
                {/* Text Formatting */}
                <button type="button" onClick={() => applyFormatting('bold')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
                  <strong>B</strong>
                </button>
                <button type="button" onClick={() => applyFormatting('italic')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
                  <em>I</em>
                </button>
                <button type="button" onClick={() => applyFormatting('underline')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
                  <u>U</u>
                </button>
                
                {/* Colors */}
                <button type="button" onClick={() => applyFormatting('color-red')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#ffebee", border: "1px solid #ffcdd2", borderRadius: "4px", cursor: "pointer", color: "red" }}>
                  🔴
                </button>
                <button type="button" onClick={() => applyFormatting('color-blue')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e3f2fd", border: "1px solid #bbdefb", borderRadius: "4px", cursor: "pointer", color: "blue" }}>
                  🔵
                </button>
                <button type="button" onClick={() => applyFormatting('color-green')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e8f5e8", border: "1px solid #c8e6c9", borderRadius: "4px", cursor: "pointer", color: "green" }}>
                  🟢
                </button>
                
                {/* Structure */}
                <button type="button" onClick={() => applyFormatting('heading')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
                  H3
                </button>
                <button type="button" onClick={() => applyFormatting('paragraph')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
                  ¶
                </button>
                <button type="button" onClick={() => applyFormatting('list')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
                  • List
                </button>
                <button type="button" onClick={() => applyFormatting('center')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
                  Center
                </button>
                <button type="button" onClick={() => applyFormatting('link')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
                  🔗
                </button>
                <button type="button" onClick={() => applyFormatting('line-break')} style={{ padding: "0.4rem 0.6rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
                  ↵ Break
                </button>
              </div>

              {/* ✅ HTML CONTENT TEXTAREA */}
              // ✅ FIXED: HTML CONTENT TEXTAREA (corrected syntax)
<div>
  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#333" }}>
    Content (HTML Supported):
  </label>
  <textarea
    id="news-content"
    placeholder="Write your news content here... Use the formatting buttons above or write HTML directly! Tip: Press Enter twice to create new paragraphs automatically!"
    value={content}
    onChange={(e) => setContent(e.target.value)}
    required
    style={{
      padding: "0.8rem",
      borderRadius: "6px",
      border: "1px solid #ccc",
      outline: "none",
      minHeight: "200px",
      width: "100%",
      fontFamily: "monospace",
      fontSize: "0.9rem",
      whiteSpace: "pre-wrap"
    }}
  />
  <small style={{ color: "#666", display: "block", marginTop: "0.5rem" }}>
    💡 <strong>Tip:</strong> Press 'Enter' twice to create paragraphs. Use formatting buttons or write HTML directly!
  </small>
</div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleNewsImageSelect}
                />
                <small style={{ color: "#666", display: "block", marginTop: "0.5rem" }}>
                  Maximum file size: 2MB. Recommended: Passport-style photos.
                </small>
                {errorMessage && (
                  <div style={{
                    backgroundColor: "#ffebee",
                    color: "#c62828",
                    padding: "0.75rem",
                    borderRadius: "6px",
                    marginTop: "0.5rem",
                    border: "1px solid #ffcdd2",
                    fontSize: "0.9rem"
                  }}>
                    ⚠️ {errorMessage}
                  </div>
                )}
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: "0.8rem",
                    backgroundColor: editingNews ? "#ffa500" : "#002244",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    flex: 1,
                  }}
                >
                  {loading ? "Saving..." : editingNews ? "Update Post" : "Add Post"}
                </button>
                {editingNews && (
                  <button
                    type="button"
                    onClick={cancelEditNews}
                    style={{
                      padding: "0.8rem",
                      backgroundColor: "#6c757d",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
            
            <h2 style={{ margin: "2rem 0 1rem" }}>EXISTING NEWS POSTS</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {newsPosts.map((post) => (
                <div
                  key={post.id}
                  style={{
                    backgroundColor: "#fff",
                    padding: "1rem",
                    borderRadius: "8px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flex: 1 }}>
                    {post.image_url && (
                      <img
                        src={post.image_url}
                        alt={post.title}
                        style={{ 
                          width: "120px", 
                          height: "120px", 
                          objectFit: "cover",
                          borderRadius: "8px"
                        }}
                      />
                    )}
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: "0 0 0.5rem 0" }}>{post.title}</h3>
                      <div 
                        style={{ margin: 0, color: "#666" }}
                        dangerouslySetInnerHTML={{ __html: post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content }}
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      onClick={() => startEditNews(post)}
                      style={{
                        backgroundColor: "#ffa500",
                        color: "#fff",
                        border: "none",
                        padding: "0.3rem 0.6rem",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteNews(post.id)}
                      style={{
                        backgroundColor: "#cc0000",
                        color: "#fff",
                        border: "none",
                        padding: "0.3rem 0.6rem",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "teachers" && (
          <>
            {/* Teachers section remains exactly the same */}
            <h2 style={{ marginBottom: "1rem" }}>
              {editingTeacher ? "Edit Teacher" : "Add Teacher"}
            </h2>
            <form
              onSubmit={editingTeacher ? handleEditTeacher : handleAddTeacher}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                backgroundColor: "#fff",
                padding: "1.5rem",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <input
                type="text"
                placeholder="Name"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                required
                style={{
                  padding: "0.8rem",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  outline: "none",
                }}
              />
              <input
                type="text"
                placeholder="Class"
                value={teacherClass}
                onChange={(e) => setTeacherClass(e.target.value)}
                required
                style={{
                  padding: "0.8rem",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  outline: "none",
                }}
              />
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleTeacherImageSelect}
                />
                <small style={{ color: "#666", display: "block", marginTop: "0.5rem" }}>
                  Maximum file size: 2MB. Recommended: Passport-style photos.
                </small>
                {errorMessage && (
                  <div style={{
                    backgroundColor: "#ffebee",
                    color: "#c62828",
                    padding: "0.75rem",
                    borderRadius: "6px",
                    marginTop: "0.5rem",
                    border: "1px solid #ffcdd2",
                    fontSize: "0.9rem"
                  }}>
                    ⚠️ {errorMessage}
                  </div>
                )}
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: "0.8rem",
                    backgroundColor: editingTeacher ? "#ffa500" : "#002244",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    flex: 1,
                  }}
                >
                  {loading ? "Saving..." : editingTeacher ? "Update Teacher" : "Add Teacher"}
                </button>
                {editingTeacher && (
                  <button
                    type="button"
                    onClick={cancelEditTeacher}
                    style={{
                      padding: "0.8rem",
                      backgroundColor: "#6c757d",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <h2 style={{ margin: "2rem 0 1rem" }}>Existing Teachers</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {teachers.map((teacher) => (
                <div
                  key={teacher.id}
                  style={{
                    backgroundColor: "#fff",
                    padding: "1rem",
                    borderRadius: "8px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    {teacher.image_url && (
                      <img
                        src={teacher.image_url}
                        alt={teacher.name}
                        style={{ 
                          width: "60px", 
                          height: "60px", 
                          objectFit: "cover",
                          borderRadius: "50%" 
                        }}
                      />
                    )}
                    <div>
                      <h4>{teacher.name}</h4>
                      <p>{teacher.class_name}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      onClick={() => startEditTeacher(teacher)}
                      style={{
                        backgroundColor: "#ffa500",
                        color: "#fff",
                        border: "none",
                        padding: "0.3rem 0.6rem",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTeacher(teacher.id)}
                      style={{
                        backgroundColor: "#cc0000",
                        color: "#fff",
                        border: "none",
                        padding: "0.3rem 0.6rem",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ✅ ADDED: Gallery Section */}
        {activeTab === "gallery" && (
          <>
            <div style={{ 
              backgroundColor: "#fff", 
              padding: "1.5rem", 
              borderRadius: "12px", 
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              marginBottom: "2rem"
            }}>
              <h3 style={{ color: "#002244", marginBottom: "1rem" }}>
                Add Photo to Gallery ({galleryPhotos.length}/12)
              </h3>
              
              {galleryPhotos.length >= 12 && (
                <div style={{
                  backgroundColor: "#fff3cd",
                  color: "#856404",
                  padding: "1rem",
                  borderRadius: "6px",
                  marginBottom: "1rem",
                  border: "1px solid #ffeaa7"
                }}>
                  <strong>⚠️ Maximum Limit Reached:</strong> You have reached the maximum of 12 gallery photos. 
                  Please delete an existing photo before adding a new one to stay within free tier limits.
                </div>
              )}

              <form onSubmit={handleAddGalleryPhoto}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleGalleryImageSelect}
                      disabled={galleryPhotos.length >= 12}
                    />
                    <small style={{ color: "#666", display: "block", marginTop: "0.5rem" }}>
                      Maximum file size: 2MB. Supported formats: JPG, PNG, WebP
                    </small>
                  </div>
                  
                  <div>
                    <input
                      type="text"
                      placeholder="Photo description (optional)"
                      value={galleryDescription}
                      onChange={(e) => setGalleryDescription(e.target.value)}
                      style={{
                        padding: "0.8rem",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        outline: "none",
                        width: "100%"
                      }}
                    />
                  </div>

                  {errorMessage && (
                    <div style={{
                      backgroundColor: "#ffebee",
                      color: "#c62828",
                      padding: "0.75rem",
                      borderRadius: "6px",
                      border: "1px solid #ffcdd2",
                      fontSize: "0.9rem"
                    }}>
                      ⚠️ {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={galleryLoading || galleryPhotos.length >= 12}
                    style={{
                      padding: "0.8rem",
                      backgroundColor: galleryPhotos.length >= 12 ? "#6c757d" : "#002244",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      cursor: galleryPhotos.length >= 12 ? "not-allowed" : "pointer",
                      flex: 1,
                    }}
                  >
                    {galleryLoading ? "Uploading..." : galleryPhotos.length >= 12 ? "Limit Reached (12/12)" : "Add to Gallery"}
                  </button>
                </div>
              </form>
            </div>

            <h2 style={{ margin: "2rem 0 1rem" }}>Gallery Photos ({galleryPhotos.length}/12)</h2>
            
            {galleryPhotos.length === 0 ? (
              <div style={{ 
                textAlign: "center", 
                padding: "3rem", 
                backgroundColor: "#fff", 
                borderRadius: "8px",
                color: "#666"
              }}>
                <p>No photos in gallery yet. Add your first photo above!</p>
              </div>
            ) : (
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", 
                gap: "1rem" 
              }}>
                {galleryPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    style={{
                      backgroundColor: "#fff",
                      padding: "1rem",
                      borderRadius: "8px",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      textAlign: "center"
                    }}
                  >
                    <img
                      src={photo.image_url}
                      alt={photo.description || "Gallery photo"}
                      style={{ 
                        width: "100%", 
                        height: "150px", 
                        objectFit: "cover",
                        borderRadius: "6px",
                        marginBottom: "0.5rem"
                      }}
                    />
                    {photo.description && (
                      <p style={{ 
                        fontSize: "0.9rem", 
                        color: "#666",
                        marginBottom: "0.5rem",
                        wordBreak: "break-word"
                      }}>
                        {photo.description}
                      </p>
                    )}
                    <button
                      onClick={() => handleDeleteGalleryPhoto(photo.id, photo.image_url)}
                      style={{
                        backgroundColor: "#cc0000",
                        color: "#fff",
                        border: "none",
                        padding: "0.3rem 0.6rem",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "0.8rem"
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}