
import app from './src/config/app.js';
import { connectDB } from './src/config/db.js';

const port = 4000;

const startServer = async () => {
  try {
    
    await connectDB();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
