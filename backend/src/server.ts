import http from 'http';
import { createApp } from './app.js';
import { env } from './config/environment.js';

const app = createApp();
const server = http.createServer(app);

const startServer = (): void => {
  server.listen(env.port, () => {
    console.log('\n==================================================');
    console.log('🌿 JEEVAYURNIKETAN AYURVEDA CLINIC - BACKEND');
    console.log('==================================================');
    console.log(`🚀 Server running on port : http://localhost:${env.port}`);
    console.log(`🩺 Health check endpoint  : http://localhost:${env.port}/health`);
    console.log(`🌐 Base API endpoint      : http://localhost:${env.port}/api`);
    console.log(`🔒 Environment            : ${env.nodeEnv}`);
    console.log(`⚡ Allowed CORS Origin    : ${env.corsOrigin}`);
    console.log('==================================================\n');
  });

  const handleShutdown = (signal: string): void => {
    console.log(`\n[Server] Received ${signal}. Shutting down gracefully...`);
    server.close(() => {
      console.log('[Server] HTTP server closed cleanly.');
      process.exit(0);
    });

    setTimeout(() => {
      console.error('[Server] Forcefully shutting down due to timeout.');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  process.on('SIGINT', () => handleShutdown('SIGINT'));
};

startServer();
