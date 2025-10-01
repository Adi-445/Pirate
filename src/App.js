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

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>🎬 Video Archive</h1>
          <p>Stream and Download Your Favorite Videos</p>
          <div className="header-stats">
            <span className="stat">📊 {videos.length} Videos</span>
            <span className="stat">🎭 3 Categories</span>
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