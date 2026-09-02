import { useState } from "react";
import Calendar from "./components/Calendar";
import PostModal from "./components/PostModal";
import initialPosts from "./data/posts";
import "./App.css";

function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [selectedPost, setSelectedPost] = useState(null);

  // Handle event click
  const handleEventClick = (info) => {
    const post = posts.find(
      (post) => post.id === info.event.id
    );

    setSelectedPost(post);
  };

  // Handle drag and drop
  const handleEventDrop = (info) => {
    const updatedDate = info.event.start;

    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === info.event.id
          ? {
              ...post,
              date: updatedDate.toISOString(),
            }
          : post
      )
    );
  };

  // Handle event resize
  const handleEventResize = (info) => {
    const newStart = info.event.start;
    const newEnd = info.event.end;

    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === info.event.id
          ? {
              ...post,
              date: newStart.toISOString(),
              end: newEnd
                ? newEnd.toISOString()
                : post.end,
            }
          : post
      )
    );
  };

  return (
    <div className="app">

      <header className="app-header">
        <div>
          <h1>📅 Post Scheduler</h1>
          <p>
            Plan and manage your social media content
          </p>
        </div>
      </header>

      <main className="main-content">

        <section className="calendar-section">

          <Calendar
            posts={posts}
            onEventClick={handleEventClick}
            onEventDrop={handleEventDrop}
            onEventResize={handleEventResize}
          />

        </section>

      </main>

      <PostModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />

    </div>
  );
}

export default App;