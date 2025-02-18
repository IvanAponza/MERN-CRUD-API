import app from './config/server.js';
import {connectDB} from './config/db.js';
process.loadEnvFile();
const PORT = process.env.PORT || 4000;

connectDB();

app.listen(PORT, () => {
    console.log(`[SERVER] Running on port http://localhost:${PORT}`);
});