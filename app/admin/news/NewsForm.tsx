// // "use client";

// // import { useState } from "react";
// // import { supabase } from "@/lib/supabaseClient";

// // interface NewsFormProps {
// //   onNewsAdded: () => void;
// // }

// // const NewsForm: React.FC<NewsFormProps> = ({ onNewsAdded }) => {
// //   const [title, setTitle] = useState("");
// //   const [content, setContent] = useState("");
// //   const [imageUrl, setImageUrl] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     const { error } = await supabase.from("news").insert([
// //       { title, content, image_url: imageUrl }
// //     ]);

// //     if (error) {
// //       alert("Error adding news: " + error.message);
// //     } else {
// //       setTitle("");
// //       setContent("");
// //       setImageUrl("");
// //       onNewsAdded(); // refresh list
// //     }

// //     setLoading(false);
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md bg-white">
// //       <h2 className="text-xl font-bold mb-4">Add News</h2>
// //       <input
// //         type="text"
// //         placeholder="Title"
// //         value={title}
// //         onChange={(e) => setTitle(e.target.value)}
// //         className="w-full mb-2 p-2 border"
// //         required
// //       />
// //       <textarea
// //         placeholder="Content"
// //         value={content}
// //         onChange={(e) => setContent(e.target.value)}
// //         className="w-full mb-2 p-2 border"
// //         rows={5}
// //         required
// //       />
// //       <input
// //         type="text"
// //         placeholder="Image URL (optional)"
// //         value={imageUrl}
// //         onChange={(e) => setImageUrl(e.target.value)}
// //         className="w-full mb-2 p-2 border"
// //       />
// //       <button
// //         type="submit"
// //         className="bg-blue-600 text-white px-4 py-2 rounded"
// //         disabled={loading}
// //       >
// //         {loading ? "Adding..." : "Add News"}
// //       </button>
// //     </form>
// //   );
// // };

// // export default NewsForm;
// // "use client";

// // import { useState } from "react";
// // import { supabase } from "@/lib/supabaseClient";

// // interface NewsFormProps {
// //   onNewsAdded: () => void;
// // }

// // const NewsForm: React.FC<NewsFormProps> = ({ onNewsAdded }) => {
// //   const [title, setTitle] = useState("");
// //   const [content, setContent] = useState("");
// //   const [imageFile, setImageFile] = useState<File | null>(null);
// //   const [loading, setLoading] = useState(false);

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     let imageUrl = "";

// //     // 1️⃣ Upload image if one is selected
// //     if (imageFile) {
// //       const fileName = `${Date.now()}_${imageFile.name}`;
// //       const { data, error: uploadError } = await supabase.storage
// //         .from("news") // Make sure you have a bucket named "news"
// //         .upload(`images/${fileName}`, imageFile);

// //       if (uploadError) {
// //         alert("Error uploading image: " + uploadError.message);
// //         setLoading(false);
// //         return;
// //       }

// //       // 2️⃣ Get public URL of uploaded image
// //       const { publicUrl } = supabase.storage.from("news").getPublicUrl(data.path);
// //       imageUrl = publicUrl;
// //       console.log("Uploaded image URL:", imageUrl);
// //     }

// //     // 3️⃣ Insert news into the database
// //     const { error } = await supabase.from("news").insert([
// //       { title, content, image_url: imageUrl }
// //     ]);

// //     if (error) {
// //       alert("Error adding news: " + error.message);
// //     } else {
// //       setTitle("");
// //       setContent("");
// //       setImageFile(null);
// //       onNewsAdded(); // Refresh list
// //     }

// //     setLoading(false);
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md bg-white">
// //       <h2 className="text-xl font-bold mb-4">Add News</h2>
// //       <input
// //         type="text"
// //         placeholder="Title"
// //         value={title}
// //         onChange={(e) => setTitle(e.target.value)}
// //         className="w-full mb-2 p-2 border"
// //         required
// //       />
// //       <textarea
// //         placeholder="Content"
// //         value={content}
// //         onChange={(e) => setContent(e.target.value)}
// //         className="w-full mb-2 p-2 border"
// //         rows={5}
// //         required
// //       />
// //       <input
// //         type="file"
// //         accept="image/*"
// //         onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
// //         className="w-full mb-2 p-2 border"
// //       />
// //       <button
// //         type="submit"
// //         className="bg-blue-600 text-white px-4 py-2 rounded"
// //         disabled={loading}
// //       >
// //         {loading ? "Adding..." : "Add News"}
// //       </button>
// //     </form>
// //   );
// // };

// // export default NewsForm;

// "use client";

// import { useState } from "react";
// import { supabase } from "@/lib/supabaseClient";

// interface NewsFormProps {
//   onNewsAdded: () => void;
// }

// const NewsForm: React.FC<NewsFormProps> = ({ onNewsAdded }) => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     let imageUrl = "";
//     console.log("hello")

//     // 1️⃣ Upload image if one is selected
//     if (imageFile) {
//       const fileName = `${Date.now()}_${imageFile.name}`;
//       const { data, error: uploadError } = await supabase.storage
//         .from("avatars") // ✅ correct bucket name
//         .upload(`images/${fileName}`, imageFile);

//       console.log("Upload response data:", data);
//       console.log("Upload error:", uploadError);

//       if (uploadError) {
//         alert("Error uploading image: " + uploadError.message);
//         setLoading(false);
//         return;
//       }

//       // 2️⃣ Get public URL of uploaded image
//       const { publicUrl } = supabase.storage.from("avatars").getPublicUrl(data.path);
//       imageUrl = publicUrl;
//       console.log("Uploaded image URL:", imageUrl);
//       console.log("Uploaded image URL:");
//     }

//     // 3️⃣ Insert news into the database
//     const { error } = await supabase.from("news").insert([
//       { title, content, image_url: imageUrl }
//     ]);

//     if (error) {
//       alert("Error adding news: " + error.message);
//     } else {
//       setTitle("");
//       setContent("");
//       setImageFile(null);
//       onNewsAdded(); // Refresh list
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md bg-white">
//       <h2 className="text-xl font-bold mb-4">Add News</h2>
//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="w-full mb-2 p-2 border"
//         required
//       />
//       <textarea
//         placeholder="Content"
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         className="w-full mb-2 p-2 border"
//         rows={5}
//         required
//       />
//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
//         className="w-full mb-2 p-2 border"
//       />
//       <button
//         type="submit"
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//         disabled={loading}
//       >
//         {loading ? "Adding..." : "Add News"}
//       </button>
//     </form>
//   );
// };

// export default NewsForm;


// "use client";

// import { useState } from "react";
// import { supabase } from "@/lib/supabaseClient";

// interface NewsFormProps {
//   onNewsAdded: () => void;
// }

// const NewsForm: React.FC<NewsFormProps> = ({ onNewsAdded }) => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     let imageUrl = "";

//     try {
//       // 1️⃣ Upload image if selected
//       if (imageFile) {
//         const fileName = `${Date.now()}_${imageFile.name}`;
//         const { data: uploadData, error: uploadError } = await supabase.storage
//           .from("avatars")
//           .upload(`images/${fileName}`, imageFile);

//         if (uploadError) throw new Error(uploadError.message);

//         // 2️⃣ Get public URL
//         const { data: publicData, error: urlError } = supabase.storage
//           .from("avatars")
//           .getPublicUrl(uploadData.path);

//           console.log("Naye kiki ennyo")

//         if (urlError) throw new Error(urlError.message);

//         imageUrl = publicData.publicUrl;
//         console.log("Uploaded image URL:", imageUrl);
//       }

//       // 3️⃣ Insert news into database
//       const { error: insertError } = await supabase.from("news").insert([
//         { title, content, image_url: imageUrl }
//       ]);

//       if (insertError) throw new Error(insertError.message);

//       // ✅ Reset form
//       setTitle("");
//       setContent("");
//       setImageFile(null);
//       onNewsAdded(); // Refresh list
//     } catch (err: any) {
//       alert("Error: " + err.message);
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md bg-white">
//       <h2 className="text-xl font-bold mb-4">Add News</h2>

//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="w-full mb-2 p-2 border"
//         required
//       />

//       <textarea
//         placeholder="Content"
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         className="w-full mb-2 p-2 border"
//         rows={5}
//         required
//       />

//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
//         className="w-full mb-2 p-2 border"
//       />

//       <button
//         type="submit"
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//         disabled={loading}
//       >
//         {loading ? "Adding..." : "Add News"}
//       </button>
//     </form>
//   );
// };

// export default NewsForm;
// "use client";

// import { useState } from "react";
// import { supabase } from "@/lib/supabaseClient";

// interface NewsFormProps {
//   onNewsAdded: () => void;
// }

// const NewsForm: React.FC<NewsFormProps> = ({ onNewsAdded }) => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

  
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     let imageUrl = "";

//     try {
//       if (imageFile) {
//         const fileName = `${Date.now()}_${imageFile.name}`;
//         const { data: uploadData, error: uploadError } = await supabase.storage
//           .from("avatars")
//           .upload(`images/${fileName}`, imageFile);

//         if (uploadError) throw new Error(uploadError.message);

//         // ✅ Get public URL (no error returned here)
//         const { publicUrl } = supabase.storage
//           .from("avatars")
//           .getPublicUrl(uploadData.path);

//         imageUrl = publicUrl;
//         console.log("Uploaded image URL:", imageUrl);
//       }

//       const { error: insertError } = await supabase.from("news").insert([
//         { title, content, image_url: imageUrl }
//       ]);

//       if (insertError) throw new Error(insertError.message);

//       // Reset form
//       setTitle("");
//       setContent("");
//       setImageFile(null);
//       onNewsAdded();
//     } catch (err: any) {
//       alert("Error: " + err.message);
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md bg-white">
//       <h2 className="text-xl font-bold mb-4">Add News</h2>

//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="w-full mb-2 p-2 border"
//         required
//       />

//       <textarea
//         placeholder="Content"
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         className="w-full mb-2 p-2 border"
//         rows={5}
//         required
//       />

//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
//         className="w-full mb-2 p-2 border"
//       />

//       <button
//         type="submit"
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//         disabled={loading}
//       >
//         {loading ? "Adding..." : "Add News"}
//       </button>
//     </form>
//   );
// };

// export default NewsForm;
"use client";

import { useState} from "react";
import { supabase } from "@/lib/supabaseClient";

interface NewsFormProps {
  onNewsAdded: () => void;
}


const NewsForm: React.FC<NewsFormProps> = ({ onNewsAdded }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState(""); // store uploaded public URL
  const [loading, setLoading] = useState(false);

  // Upload image immediately when selected
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log("handleImageChange triggered"); // <-- test if it fires
  if (!e.target.files || e.target.files.length === 0) {
    console.log("No file selected");
    console.log(e.target.files)
    console.log("End of a function ,")
    return;
  }
  const file = e.target.files[0];
  console.log("Selected file:", file.name); // check if the file is detected
  setImageFile(file);
};
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("news").insert([
        {
          title,
          content,
          image_url: imageUrl,
          author_id: "existing-admin-id" // replace with a valid admin id
        }
      ]);

      if (error) throw error;

      setTitle("");
      setContent("");
      setImageFile(null);
      setImageUrl("");
      onNewsAdded();
    } catch (err: any) {
      console.error("Error inserting news:", err.message);
      alert("Error inserting news: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Add News</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-2 p-2 border"
        required
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full mb-2 p-2 border"
        rows={5}
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full mb-2 p-2 border"
      />

      {imageUrl && (
        <div className="mb-2">
          <p className="text-sm">Image uploaded successfully:</p>
          <img src={imageUrl} alt="Preview" className="h-32 mt-1 object-cover border" />
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add News"}
      </button>
    </form>
  );
};

export default NewsForm;
