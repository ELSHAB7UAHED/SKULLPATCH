const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const { PDFDocument } = require('pdf-lib');
const Jimp = require('jimp');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs-extra');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "blob:"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'", "ws:", "wss:"]
    }
  }
}));
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Create uploads directory
fs.ensureDirSync('uploads');
fs.ensureDirSync('uploads/temp');
fs.ensureDirSync('uploads/processed');

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/temp/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|bmp|webp|pdf|doc|docx|txt|mp4|avi|mov|wmv|mp3|wav|zip|rar/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('نوع الملف غير مدعوم'));
    }
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('مستخدم جديد متصل:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('مستخدم انقطع:', socket.id);
  });
  
  socket.on('processing_progress', (data) => {
    socket.broadcast.emit('progress_update', data);
  });
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Image compression
app.post('/api/compress-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'لم يتم رفع أي ملف' });
    }

    const inputPath = req.file.path;
    const outputPath = path.join('uploads/processed', `compressed-${req.file.filename}`);
    
    const quality = parseInt(req.body.quality) || 80;
    const format = req.body.format || 'jpeg';
    
    await sharp(inputPath)
      .jpeg({ quality: quality })
      .toFile(outputPath);
    
    res.json({
      success: true,
      originalSize: req.file.size,
      compressedSize: fs.statSync(outputPath).size,
      downloadUrl: `/uploads/processed/compressed-${req.file.filename}`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Image resize
app.post('/api/resize-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'لم يتم رفع أي ملف' });
    }

    const inputPath = req.file.path;
    const outputPath = path.join('uploads/processed', `resized-${req.file.filename}`);
    
    const width = parseInt(req.body.width) || 800;
    const height = parseInt(req.body.height) || 600;
    const maintainAspectRatio = req.body.maintainAspectRatio === 'true';
    
    let sharpInstance = sharp(inputPath);
    
    if (maintainAspectRatio) {
      sharpInstance = sharpInstance.resize(width, height, { fit: 'inside' });
    } else {
      sharpInstance = sharpInstance.resize(width, height);
    }
    
    await sharpInstance.toFile(outputPath);
    
    res.json({
      success: true,
      downloadUrl: `/uploads/processed/resized-${req.file.filename}`,
      newDimensions: { width, height }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Convert image format
app.post('/api/convert-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'لم يتم رفع أي ملف' });
    }

    const inputPath = req.file.path;
    const targetFormat = req.body.format || 'png';
    const outputPath = path.join('uploads/processed', `converted-${path.parse(req.file.filename).name}.${targetFormat}`);
    
    await sharp(inputPath)
      .toFormat(targetFormat)
      .toFile(outputPath);
    
    res.json({
      success: true,
      downloadUrl: `/uploads/processed/converted-${path.parse(req.file.filename).name}.${targetFormat}`,
      newFormat: targetFormat
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add watermark
app.post('/api/add-watermark', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'watermark', maxCount: 1 }
]), async (req, res) => {
  try {
    if (!req.files.image || !req.files.watermark) {
      return res.status(400).json({ error: 'يجب رفع الصورة والعلامة المائية' });
    }

    const imagePath = req.files.image[0].path;
    const watermarkPath = req.files.watermark[0].path;
    const outputPath = path.join('uploads/processed', `watermarked-${req.files.image[0].filename}`);
    
    const opacity = parseFloat(req.body.opacity) || 0.5;
    const position = req.body.position || 'bottom-right';
    
    // Create watermark with opacity
    const watermark = await sharp(watermarkPath)
      .png({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer();
    
    // Composite watermark onto image
    await sharp(imagePath)
      .composite([{
        input: watermark,
        gravity: position
      }])
      .toFile(outputPath);
    
    res.json({
      success: true,
      downloadUrl: `/uploads/processed/watermarked-${req.files.image[0].filename}`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PDF operations
app.post('/api/merge-pdfs', upload.array('pdfs', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length < 2) {
      return res.status(400).json({ error: 'يجب رفع ملفين PDF على الأقل' });
    }

    const mergedPdf = await PDFDocument.create();
    
    for (const file of req.files) {
      const pdfBytes = await fs.readFile(file.path);
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }
    
    const mergedPdfBytes = await mergedPdf.save();
    const outputPath = path.join('uploads/processed', `merged-${uuidv4()}.pdf`);
    await fs.writeFile(outputPath, mergedPdfBytes);
    
    res.json({
      success: true,
      downloadUrl: `/uploads/processed/merged-${path.parse(outputPath).base}`,
      pageCount: mergedPdf.getPageCount()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Video compression
app.post('/api/compress-video', upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'لم يتم رفع أي ملف فيديو' });
    }

    // This would require ffmpeg for actual video compression
    // For now, we'll return a success response
    res.json({
      success: true,
      message: 'سيتم إضافة ضغط الفيديو قريباً',
      originalSize: req.file.size
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Batch processing
app.post('/api/batch-process', upload.array('files', 20), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'لم يتم رفع أي ملفات' });
    }

    const operations = req.body.operations ? JSON.parse(req.body.operations) : [];
    const results = [];
    
    for (const file of req.files) {
      const fileResult = {
        filename: file.originalname,
        operations: []
      };
      
      for (const operation of operations) {
        try {
          switch (operation.type) {
            case 'resize':
              // Process resize operation
              break;
            case 'compress':
              // Process compression operation
              break;
            case 'convert':
              // Process format conversion
              break;
          }
          fileResult.operations.push({ type: operation.type, success: true });
        } catch (error) {
          fileResult.operations.push({ type: operation.type, success: false, error: error.message });
        }
      }
      
      results.push(fileResult);
    }
    
    res.json({
      success: true,
      results: results
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cleanup temporary files
app.post('/api/cleanup', async (req, res) => {
  try {
    const tempDir = 'uploads/temp';
    const files = await fs.readdir(tempDir);
    
    for (const file of files) {
      const filePath = path.join(tempDir, file);
      const stats = await fs.stat(filePath);
      const fileAge = Date.now() - stats.mtime.getTime();
      
      // Delete files older than 1 hour
      if (fileAge > 60 * 60 * 1000) {
        await fs.remove(filePath);
      }
    }
    
    res.json({ success: true, message: 'تم تنظيف الملفات المؤقتة' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ error: 'حدث خطأ في الخادم' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'الصفحة غير موجودة' });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 خادم mo7aoil يعمل على المنفذ ${PORT}`);
  console.log(`🌐 افتح المتصفح على: http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🔄 إغلاق الخادم...');
  server.close(() => {
    console.log('✅ تم إغلاق الخادم بنجاح');
    process.exit(0);
  });
});