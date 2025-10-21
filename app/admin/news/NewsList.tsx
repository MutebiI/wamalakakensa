"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  image_url: string;
}

const NewsList: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("news").select("*").order("created_at", { ascending: false });
    if (error) {
      alert("Error fetching news: " + error.message);
    } else {
      setNews(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this news?")) return;
    const { error } = await supabase.from("news").delete().eq("id", id);
    if (error) alert("Error deleting news: " + error.message);
    else fetchNews();
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">News List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : news.length === 0 ? (
        <p>No news yet.</p>
      ) : (
        <ul>
          {news.map((item) => (
            <li key={item.id} className="mb-4 border p-4 rounded bg-white">
              <h3 className="font-bold">{item.title}</h3>
              {item.image_url && <img src={item.image_url} alt={item.title} className="my-2 w-full max-h-64 object-cover" />}
              <p>{item.content}</p>
              <button
                onClick={() => handleDelete(item.id)}
                className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsList;
