# 🚀 mo7aoil - Professional & Modern Image & File Processing Platform

`mo7aoil` is a highly professional and modern platform for processing images and files, designed with cutting-edge technologies and best practices in web development.

## ✨ Key Features

### 🎨 Modern & Professional Design
- Responsive design that works on all devices
- Modern and user-friendly interface
- Gradient colors and stunning visual effects
- Professional Arabic fonts (Cairo)
- Smooth and attractive animations

### 🛠️ Powerful & Advanced Tools
- **Image Processing**: Compression, resizing, format conversion, watermarking
- **PDF Tools**: Merge, split, convert to images
- **Video Processing**: Compression and format conversion
- **Advanced Tools**: Batch processing, OCR text extraction

### 🚀 Cutting-Edge Technologies
- Node.js with Express.js
- Socket.IO for real-time communication
- File processing using Sharp and Jimp
- PDF processing using pdf-lib
- High security with Helmet and CORS
- Data compression with Compression

## 🏗️ Project Structure

```
mo7aoil/
├── server.js              # Main server
├── package.json           # Project dependencies
├── public/                # Frontend files
│   ├── index.html        # Main page
│   ├── styles.css        # Styling files
│   └── app.js           # Interactive functions
├── uploads/              # Uploaded files directory
│   ├── temp/            # Temporary files
│   └── processed/       # Processed files
├── scripts/              # Utility scripts
├── test/                 # Test files
└── README.md            # Project guide
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (Version 16 or later)
- npm or yarn

### Installation Steps

1. **Clone the project**
```bash
git clone <repository-url>
cd mo7aoil
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the project**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

4. **Open browser**
```
http://localhost:3001
```

## 🛠️ Available Commands

```bash
npm start          # Start server
npm run dev        # Start in development mode with auto-reload
npm run build      # Build project for production
npm run build:dev  # Build project for development
npm test           # Run tests
npm run health     # Health check
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file to customize settings:

```env
PORT=3001
NODE_ENV=development
MAX_FILE_SIZE=100MB
UPLOAD_PATH=./uploads
```

### Customize File Size Limits
```javascript
// In server.js
const upload = multer({
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
  }
});
```

## 📱 Advanced Features

### 🔄 Real-time Processing
- Real-time file processing
- Live updates using Socket.IO
- Progress bars for processing

### 📱 Enhanced User Experience
- Drag and drop support
- Instant notifications
- Clear error messages
- Keyboard shortcuts

### 🎯 Performance Optimization
- Data compression
- Lazy loading for images
- Scroll optimization
- Comprehensive error handling

## 🌐 API Endpoints

### Image Processing
- `POST /api/compress-image` - Compress images
- `POST /api/resize-image` - Resize images
- `POST /api/convert-image` - Convert image formats
- `POST /api/add-watermark` - Add watermarks

### PDF Processing
- `POST /api/merge-pdfs` - Merge PDF files
- `POST /api/split-pdf` - Split PDF file
- `POST /api/pdf-to-image` - Convert PDF to images

### Video Processing
- `POST /api/compress-video` - Compress video
- `POST /api/convert-video` - Convert video

### Advanced Tools
- `POST /api/batch-process` - Batch processing
- `POST /api/cleanup` - Clean temporary files

## 🎨 Customizing Design

### Colors
```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --accent-color: #06b6d4;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
}
```

### Fonts
```css
body {
  font-family: 'Cairo', sans-serif;
}
```

### Effects
```css
.btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
```

## 📱 Responsive Design

The website is designed to work perfectly on:
- 🖥️ Desktop computers
- 📱 Smartphones
- 📱 Tablets
- 🖥️ Large screens

## 🔒 Security

- CSRF protection
- Rate limiting
- File type filtering
- Automatic temporary file cleanup
- XSS protection

## 🚀 Deployment

### Deploy on Heroku
```bash
heroku create mo7aoil-app
git push heroku main
```

### Deploy on Vercel
```bash
vercel --prod
```

### Deploy with Docker
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Deploy with Docker Compose
```bash
docker-compose up -d
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 📊 Monitoring

### Health Check
```bash
npm run health
```

### PM2 Status
```bash
pm2 status
```

### View Logs
```bash
pm2 logs mo7aoil
```

## 🤝 Contributing

We welcome your contributions! Please follow these steps:

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## 📞 Support

- 📧 Email: support@mo7aoil.com
- 📱 Phone: +966 50 123 4567
- 🌐 Website: https://mo7aoil.com

## 🙏 Acknowledgments

Special thanks to all contributors and developers who helped develop this project.

---

**Developed with ❤️ by the mo7aoil team**

*Professional and modern platform for processing images and files with cutting-edge technologies*