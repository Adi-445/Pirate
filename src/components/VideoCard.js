import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';

const VideoCard = ({ video }) => {
  const [showPlayer, setShowPlayer] = useState(false);

  // Detect video platform and extract necessary info
  const detectPlatform = (url) => {
    if (!url || url === 'placeholder') return { platform: null, id: null };
    
    // Google Drive patterns
    const drivePatterns = [
      /\/file\/d\/([a-zA-Z0-9-_]+)/,  // /file/d/ID
      /id=([a-zA-Z0-9-_]+)/,         // ?id=ID
      /\/d\/([a-zA-Z0-9-_]+)/        // /d/ID
    ];
    
    for (let pattern of drivePatterns) {
      const match = url.match(pattern);
      if (match) return { platform: 'gdrive', id: match[1] };
    }
    
    // Dropbox patterns
    if (url.includes('dropbox.com')) {
      return { platform: 'dropbox', id: url };
    }
    
    // Terabox patterns
    if (url.includes('terabox.com') || url.includes('1024terabox.com')) {
      return { platform: 'terabox', id: url };
    }
    
    // Direct video URLs
    if (url.match(/\.(mp4|webm|ogg|avi|mov)(\?.*)?$/i)) {
      return { platform: 'direct', id: url };
    }
    
    return { platform: 'unknown', id: url };
  };

  // Generate Google Drive direct download link
  const getDownloadLink = (url) => {
    // Use custom download URL if provided
    if (video.downloadUrl) {
      return video.downloadUrl;
    }
    
    const fileId = extractGoogleDriveId(url);
    if (!fileId) return null;
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  };

  // Generate Google Drive streaming link
  const getStreamLink = (url) => {
    const fileId = extractGoogleDriveId(url);
    if (!fileId) return null;
    return `https://drive.google.com/file/d/${fileId}/preview`;
  };

  const handleDownload = () => {
    const downloadUrl = getDownloadLink(video.videoUrl);
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    } else {
      alert('Download not available - Please add a valid Google Drive link');
    }
  };

  const handlePlay = () => {
    if (video.videoUrl !== 'placeholder') {
      setShowPlayer(true);
    } else {
      alert('Video not available - Please add a valid Google Drive link');
    }
  };

  const isPlaceholder = video.videoUrl === 'placeholder';

  return (
    <div className="video-card">
      {showPlayer && !isPlaceholder ? (
        <VideoPlayer 
          videoUrl={video.videoUrl} 
          onClose={() => setShowPlayer(false)}
        />
      ) : (
        <div className="video-thumbnail">
          <img 
            src={video.thumbnailUrl || `https://via.placeholder.com/400x250/667eea/ffffff?text=${encodeURIComponent(video.title)}`}
            alt={video.title}
            className="video-player"
          />
        </div>
      )}
      
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
        <p className="video-description">{video.description}</p>
        
        {(video.rating || video.status) && (
          <div className="video-metadata">
            {video.rating && <span className="rating">⭐ {video.rating}</span>}
            {video.status && <span className="status">📺 {video.status}</span>}
          </div>
        )}
        
        <div className="video-actions">
          <button 
            className="btn btn-primary" 
            onClick={handlePlay}
            disabled={isPlaceholder}
          >
            {isPlaceholder ? '⏸️ Placeholder' : '▶️ Play'}
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={handleDownload}
            disabled={isPlaceholder}
          >
            {isPlaceholder ? '📁 No Link' : '⬇️ Download'}
          </button>
        </div>
        
        {isPlaceholder && (
          <div style={{ 
            marginTop: '1rem', 
            padding: '0.5rem', 
            background: '#f8f9fa', 
            borderRadius: '4px', 
            fontSize: '0.8rem', 
            color: '#666' 
          }}>
            💡 Replace with Google Drive share link
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCard;