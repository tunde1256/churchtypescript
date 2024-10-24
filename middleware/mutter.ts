import multer from 'multer';

const storage = multer.memoryStorage(); // Files will be stored in memory before being uploaded
const upload = multer({ storage });

export default upload;
