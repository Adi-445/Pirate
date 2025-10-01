import React, { useState } from 'react';
import './App.css';
import VideoCard from './components/VideoCard';

// Placeholder video data - will be replaced with Google Drive links
const videoData = [
  {
    id: 1,
    title: "mfasa",
    description: "Placeholder video - Google Drive link will be added soon",
    videoUrl: "placeholder", // Will be replaced with Google Drive link
    thumbnailUrl: "https://via.placeholder.com/400x250/667eea/ffffff?text=mfasa"
  },
  {
    id: 2,
    title: "lokah", 
    description: "Placeholder video - Google Drive link will be added soon",
    videoUrl: "placeholder", // Will be replaced with Google Drive link
    thumbnailUrl: "https://via.placeholder.com/400x250/764ba2/ffffff?text=lokah"
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
          <strong>📝 Setup Notice:</strong> Video placeholders created for "mfasa" and "lokah". 
          Replace the placeholder URLs with actual Google Drive links to enable playback and downloads.
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