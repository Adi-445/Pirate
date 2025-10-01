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

  // Generate download link based on platform
  const getDownloadLink = (url) => {
    // Use custom download URL if provided
    if (video.downloadUrl) {
      return video.downloadUrl;
    }
    
    const { platform, id } = detectPlatform(url);
    
    switch (platform) {
      case 'gdrive':
        return `https://drive.google.com/uc?export=download&id=${id}`;
      case 'dropbox':
        // Convert Dropbox share link to direct download
        return url.replace('dropbox.com', 'dl.dropboxusercontent.com').replace('?dl=0', '');
      case 'terabox':
        // Terabox direct download (limited functionality)
        return url;
      case 'direct':
        return url;
      default:
        return null;
    }
  };

  // Generate streaming link based on platform
  const getStreamLink = (url) => {
    const { platform, id } = detectPlatform(url);
    
    switch (platform) {
      case 'gdrive':
        return `https://drive.google.com/file/d/${id}/preview`;
      case 'dropbox':
        // Dropbox embedded player
        return url.replace('?dl=0', '?raw=1');
      case 'terabox':
        // Terabox has limited embed support
        return url;
      case 'direct':
        return url;
      default:
        return url;
    }
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
    const { platform } = detectPlatform(video.videoUrl);
    
    if (platform && platform !== null) {
      if (platform === 'terabox') {
        // Terabox has limited embed support, open in new tab
        window.open(video.videoUrl, '_blank');
      } else {
        setShowPlayer(true);
      }
    } else {
      alert('Video not available - Please add a valid video link');
    }
  };

  const isPlaceholder = video.videoUrl === 'placeholder';

  if (viewMode === 'list') {
    return (
      <div className="video-card list-card">
        <div className="list-thumbnail">
          <img 
            src={video.thumbnailUrl || `https://via.placeholder.com/150x100/667eea/ffffff?text=${encodeURIComponent(video.title)}`}
            alt={video.title}
            className="list-image"
          />
          {video.quality && <span className="quality-badge">{video.quality}</span>}
        </div>
        
        <div className="list-content">
          <div className="list-info">
            <h3 className="video-title">{video.title}</h3>
            <p className="video-description">{video.description}</p>
            
            <div className="list-metadata">
              <span className="metadata-item">🎭 {video.category}</span>
              <span className="metadata-item">🕒 {video.duration}</span>
              <span className="metadata-item">📅 {video.year}</span>
              {video.rating && <span className="metadata-item">⭐ {video.rating}</span>}
            </div>
            
            <div className="genre-tags">
              {video.genre.map(genre => (
                <span key={genre} className="genre-tag">{genre}</span>
              ))}
            </div>
          </div>
          
          <div className="list-actions">
            <button 
              className="btn btn-primary compact" 
              onClick={handlePlay}
              disabled={isPlaceholder}
            >
              {isPlaceholder ? '⏸️' : 
               detectPlatform(video.videoUrl).platform === 'terabox' ? '🌐' : '▶️'}
            </button>
            <button 
              className="btn btn-secondary compact" 
              onClick={handleDownload}
              disabled={isPlaceholder}
            >
              {isPlaceholder ? '📁' : '⬇️'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="video-card grid-card">
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
          <div className="thumbnail-overlay">
            {video.quality && <span className="quality-badge">{video.quality}</span>}
            {video.duration && <span className="duration-badge">{video.duration}</span>}
          </div>
        </div>
      )}
      
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
        <p className="video-description">{video.description}</p>
        
        <div className="video-metadata">
          {video.rating && <span className="rating">⭐ {video.rating}</span>}
          {video.status && <span className="status">📺 {video.status}</span>}
          {video.category && <span className="category">🎭 {video.category}</span>}
        </div>
        
        <div className="genre-tags">
          {video.genre.slice(0, 2).map(genre => (
            <span key={genre} className="genre-tag">{genre}</span>
          ))}
          {video.genre.length > 2 && <span className="genre-tag">+{video.genre.length - 2}</span>}
        </div>
        
        <div className="video-actions">
          <button 
            className="btn btn-primary" 
            onClick={handlePlay}
            disabled={isPlaceholder}
          >
            {isPlaceholder ? '⏸️ Placeholder' : 
             detectPlatform(video.videoUrl).platform === 'terabox' ? '🌐 Open' : '▶️ Play'}
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
          <div className="placeholder-hint">
            💡 Add video link to enable playback
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCard;