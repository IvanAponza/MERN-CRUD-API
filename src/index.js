import app from './server.js';
process.loadEnvFile()


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`[SERVER] Running on port http://localhost:${PORT}`);
});