# Video Archive

A simple, static video archive web app that allows users to stream and download videos from Google Drive links.

## Features

- 🎬 **Video Streaming**: Embed and play videos directly from Google Drive
- ⬇️ **Video Downloads**: Direct download links for Google Drive videos
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🚀 **GitHub Pages Ready**: Deploy directly to GitHub Pages

## Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm start
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## Adding Videos

1. Open `src/App.js`
2. Update the `videoData` array with your video information:

```javascript
const videoData = [
  {
    id: 1,
    title: "Your Video Title",
    description: "Video description here",
    videoUrl: "https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing",
    thumbnailUrl: "https://your-thumbnail-url.jpg" // Optional
  }
];
```

## Google Drive Setup

1. Upload your video to Google Drive
2. Right-click the video → Get link → Make sure it's set to "Anyone with the link"
3. Copy the sharing link (format: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`)
4. Add it to your video data

## Deployment to GitHub Pages

1. **Install gh-pages** (already included):
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Deploy**:
   ```bash
   npm run deploy
   ```

3. **Enable GitHub Pages**:
   - Go to your repository Settings
   - Scroll to Pages section
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch

Your app will be available at: `https://yourusername.github.io/your-repo-name`

## Supported Video Sources

- ✅ Google Drive (recommended)
- ✅ Dropbox (direct links)
- ✅ Direct MP4/WebM URLs
- ✅ Any publicly accessible video URL

## Project Structure

```
src/
├── App.js                 # Main app component with video data
├── components/
│   ├── VideoCard.js       # Individual video card component
│   └── VideoPlayer.js     # Video player with Google Drive support
├── index.js              # App entry point
└── index.css             # Global styles
```

## Customization

- **Colors**: Edit CSS custom properties in `src/index.css`
- **Layout**: Modify the grid in `.video-grid` class
- **Add videos**: Update `videoData` array in `src/App.js`

## Browser Support

- ✅ Chrome 60+
- ✅ Firefox 60+
- ✅ Safari 12+
- ✅ Edge 79+

## License

MIT License - see LICENSE file for details.