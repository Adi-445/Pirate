import React, { useState } from 'react';
import './App.css';
import VideoCard from './components/VideoCard';

// Placeholder video data for development purposes
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
    title: "Mufasa",
    description: "(development placeholder)",
    videoUrl: "https://drive.google.com/file/d/1H41vVDXvYbbo1VdtlN6V83vCBXGKrtRA",
    thumbnailUrl: "https://via.placeholder.com/400x250/dc3545/ffffff?text=Mufasa",
    rating: "8.0/10",
    status: "available",
    category: "Animation",
    genre: ["Adventure", "Family", "Drama"],
    duration: "118 min",
    year: "2024",
    quality: "HD"
  },
  {
    id: 4,
    title: "Miss Peregrine's Home For Peculiar Children",
    description: "Placeholder entry - Google Drive link redirects to blank page (development placeholder)",
    videoUrl: "https://drive.google.com/file/d/1-RXy0cD-xZy8vTB86s0z5a1-tV43MM8o",
    thumbnailUrl: "https://via.placeholder.com/400x250/6f42c1/ffffff?text=Miss+Peregrine",
    rating: "7.8/10",
    status: "Available",
    category: "Fantasy",
    genre: ["Fantasy", "Adventure", "Family"],
    duration: "127 min",
    year: "2016",
    quality: "HD"
  },
  {
    id: 5,
    title: "Godzilla vs Kong",
    description: "Placeholder entry - Google Drive link redirects to blank page (development placeholder)",
    videoUrl: "https://drive.google.com/file/d/1-YrLGLyF0r5ehu5OXcbLt8RHt4_9_ajo",
    thumbnailUrl: "https://via.placeholder.com/400x250/fd7e14/ffffff?text=Godzilla+vs+Kong",
    rating: "8.3/10",
    status: "Placeholder",
    category: "Action",
    genre: ["Action", "Sci-Fi", "Thriller"],
    duration: "113 min",
    year: "2021",
    quality: "4K"
  }
];

function App() {
  const [videos] = useState(videoData);

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>🎬 Video Archive</h1>
          <p>Stream and Download Your Favorite Videos</p>
          <div className="header-stats">
            <span className="stat">📊 {videos.length} Videos</span>
            <span className="stat">🎭 5 Categories</span>
            <span className="stat">⭐ Premium Quality</span>
          </div>
        </header>

        <div className="video-grid">
          {videos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {videos.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
            <h3>No videos available</h3>
            <p>Add some videos to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
