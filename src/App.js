import React, { useState } from 'react';
import './App.css';
import VideoCard from './components/VideoCard';

// Video data with Google Drive links
const videoData = [
  {
    id: 1,
    title: "Mufasa",
    description: "Available via Terabox streaming",
    videoUrl: "https://1024terabox.com/s/1Pn27hHcL-otcIXe8etP8-Q",
    thumbnailUrl: "https://via.placeholder.com/400x250/667eea/ffffff?text=Mufasa",
    rating: null,
    status: "Available"
  },
  {
    id: 2,
    title: "Lokah Chapter 1: Chandra", 
    description: "Rating: 7.4/10 | Status: Ongoing Release",
    videoUrl: "https://drive.google.com/file/d/1r2wCFi2sG2pwmAJ64olBwZ2ehQko7THH/",
    downloadUrl: "https://drive.usercontent.google.com/download?id=1r2wCFi2sG2pwmAJ64olBwZ2ehQko7THH",
    thumbnailUrl: "https://via.placeholder.com/400x250/764ba2/ffffff?text=Lokah+Ch1",
    rating: "7.4/10",
    status: "Ongoing Release"
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
        </header>

        <div className="placeholder-notice">
          <strong>📝 Setup Notice:</strong> "mufasa" still needs Google Drive link. "Lokah Chapter 1: Chandra" is ready for playback and download!
        </div>

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