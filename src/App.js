import React, { useState } from 'react';
import './App.css';
import VideoCard from './components/VideoCard';

// Enhanced video data with categories and metadata
const videoData = [
  {
    id: 1,
    title: "Paddington in Peru",
    description: "Family adventure featuring everyone's favorite bear exploring Peru with the Brown family.",
    videoUrl: "https://1024terabox.com/s/1Pn27hHcL-otcIXe8etP8-Q",
    thumbnailUrl: "https://via.placeholder.com/400x250/667eea/ffffff?text=Paddington+in+Peru",
    rating: "8.2/10",
    status: "Available",
    category: "Family",
    genre: ["Adventure", "Comedy", "Family"],
    duration: "106 min",
    year: "2024",
    quality: "HD"
  },
  {
    id: 2,
    title: "Lokah Chapter 1: Chandra", 
    description: "Epic fantasy series following the mystical adventures of Chandra in the realm of Lokah.",
    videoUrl: "https://drive.google.com/file/d/1r2wCFi2sG2pwmAJ64olBwZ2ehQko7THH/",
    downloadUrl: "https://drive.usercontent.google.com/download?id=1r2wCFi2sG2pwmAJ64olBwZ2ehQko7THH",
    thumbnailUrl: "https://via.placeholder.com/400x250/764ba2/ffffff?text=Lokah+Ch1",
    rating: "7.4/10",
    status: "Ongoing Release",
    category: "Series",
    genre: ["Fantasy", "Adventure", "Drama"],
    duration: "45 min",
    year: "2024",
    quality: "HD"
  },
  {
    id: 3,
    title: "Sample Video 3",
    description: "Placeholder for additional content - demonstrates app scalability",
    videoUrl: "placeholder",
    thumbnailUrl: "https://via.placeholder.com/400x250/28a745/ffffff?text=Sample+3",
    rating: "8.5/10",
    status: "Coming Soon",
    category: "Action",
    genre: ["Action", "Thriller"],
    duration: "120 min",
    year: "2024",
    quality: "4K"
  }
];

function App() {
  const [videos] = useState(videoData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('title');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(false);

  // Get unique categories
  const categories = ['All', ...new Set(videos.map(video => video.category))];

  // Filter and sort videos
  const filteredVideos = useMemo(() => {
    let filtered = videos.filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           video.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort videos
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return parseFloat(b.rating) - parseFloat(a.rating);
        case 'year':
          return b.year - a.year;
        case 'duration':
          return parseInt(b.duration) - parseInt(a.duration);
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [videos, searchTerm, selectedCategory, sortBy]);

  const handleSearch = (term) => {
    setLoading(true);
    setSearchTerm(term);
    // Simulate search delay
    setTimeout(() => setLoading(false), 300);
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>🎬 Video Archive</h1>
          <p>Stream and Download Your Favorite Videos</p>
          <div className="header-stats">
            <span className="stat">📊 {videos.length} Videos</span>
            <span className="stat">🎭 {categories.length - 1} Categories</span>
            <span className="stat">⭐ Premium Quality</span>
          </div>
        </header>

        <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />
        
        <FilterBar 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalResults={filteredVideos.length}
        />

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Searching videos...</p>
          </div>
        ) : (
          <>
            <div className={`video-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
              {filteredVideos.map(video => (
                <VideoCard key={video.id} video={video} viewMode={viewMode} />
              ))}
            </div>

            {filteredVideos.length === 0 && (
              <div className="no-results">
                <h3>🔍 No videos found</h3>
                <p>Try adjusting your search terms or filters</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;