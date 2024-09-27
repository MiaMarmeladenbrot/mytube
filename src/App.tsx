import "./App.css";
import PageHeader from "./layouts/PageHeader";
import { CategoryPills } from "./components/CategoryPills";
import { categories, videos } from "./data/home";
import { useState } from "react";
import { VideoGridItem } from "./components/VideoGridItem";
import { SideBar } from "./components/SideBar";
import { SideBarProvider } from "./contexts/SideBarContext";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <SideBarProvider>
      <div className="max-h-screen flex flex-col">
        {/* Header */}
        <PageHeader />

        {/* Sidebar + Videos */}
        <div className="grid grid-cols-[auto,1fr] flex-grow-l overflow-auto">
          <SideBar />

          <div className="overflow-x-hidden px-5">
            {/* Categories */}
            <div className="sticky top-0 bg-white z-10 pb-4">
              <CategoryPills
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>

            {/* Videos */}
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
              {videos.map((video) => (
                <VideoGridItem key={video.id} {...video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SideBarProvider>
  );
}

export default App;
