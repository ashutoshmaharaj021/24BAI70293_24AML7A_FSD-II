import { useCallback, useState } from "react";
import Calendar from "./components/Calendar";
import PostModal from "./components/PostModal";
import initialPosts from "./data/posts";
import "./App.css";

function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [selectedPost, setSelectedPost] = useState(null);

  /*
   * useCallback keeps the same function reference
   * between renders unless posts changes.
   */
  const handleEventClick = useCallback(
    (info) => {
      const post = posts.find(
        (post) => post.id === info.event.id
      );

      setSelectedPost(post || null);
    },
    [posts]
  );

  /*
   * Update only the post that was moved.
   */
  const handleEventDrop = useCallback((info) => {
    const updatedDate = info.event.start.toISOString();

    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === info.event.id
          ? {
              ...post,
              date: updatedDate,
            }
          : post
      )
    );
  }, []);

  /*
   * Update only the post whose duration changed.
   */
  const handleEventResize = useCallback((info) => {
    const newStart = info.event.start.toISOString();

    const newEnd = info.event.end
      ? info.event.end.toISOString()
      : null;

    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === info.event.id
          ? {
              ...post,
              date: newStart,
              end: newEnd || post.end,
            }
          : post
      )
    );
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedPost(null);
  }, []);

  console.log("App rendered");

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
        onClose={handleCloseModal}
      />

    </div>
  );
}

export default App;