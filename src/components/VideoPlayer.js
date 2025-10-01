import React from 'react';

const VideoPlayer = ({ videoUrl, onClose }) => {
  // Extract Google Drive file ID and create embed URL
  const extractGoogleDriveId = (url) => {
    const patterns = [
      /\/file\/d\/([a-zA-Z0-9-_]+)/,  // /file/d/ID
      /id=([a-zA-Z0-9-_]+)/,         // ?id=ID
      /\/d\/([a-zA-Z0-9-_]+)/        // /d/ID
    ];
    
    for (let pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const getEmbedUrl = (url) => {
    const fileId = extractGoogleDriveId(url);
    if (fileId) {
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    // Fallback for direct video URLs
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <div className="video-player-container">
      <div className="video-player-header">
        <button className="close-btn" onClick={onClose}>
          ✕ Close
        </button>
      </div>
      
      <div className="video-embed">
        {embedUrl.includes('drive.google.com') ? (
          <iframe
            src={embedUrl}
            width="100%"
            height="250"
            frameBorder="0"
            allowFullScreen
            title="Video Player"
            style={{ borderRadius: '8px' }}
          ></iframe>
        ) : (
          <video 
            controls 
            width="100%" 
            height="250"
            style={{ borderRadius: '8px' }}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      <style jsx>{`
        .video-player-container {
          background: #000;
          border-radius: 8px;
        }
        
        .video-player-header {
          display: flex;
          justify-content: flex-end;
          padding: 0.5rem;
          background: rgba(0,0,0,0.8);
        }
        
        .close-btn {
          background: rgba(255,255,255,0.2);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
        }
        
        .close-btn:hover {
          background: rgba(255,255,255,0.3);
        }
        
        .video-embed {
          padding: 0 0.5rem 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default VideoPlayer;