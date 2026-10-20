import http from 'http';
import { App } from './app.js';
import { EnvironmentConfig, env } from './config/EnvironmentConfig.js';
import { verifyDatabaseConnection, prisma } from './db.js';

export class Server {
  private readonly httpServer: http.Server;

  constructor(
    private readonly appInstance: App,
    private readonly config: EnvironmentConfig
  ) {
    this.httpServer = http.createServer(this.appInstance.app);
    this.setupProcessSignals();
  }

  public async start(): Promise<void> {
    await verifyDatabaseConnection();

    this.httpServer.listen(this.config.port, () => {
      console.log('\n==================================================');
      console.log('🌿 JEEVAYURNIKETAN AYURVEDA CLINIC - BACKEND');
      console.log('==================================================');
      console.log(`🚀 Server running on port : http://localhost:${this.config.port}`);
      console.log(`🩺 Health check endpoint  : http://localhost:${this.config.port}/health`);
      console.log(`🌐 Base API endpoint      : http://localhost:${this.config.port}/api`);
      console.log(`🔒 Environment            : ${this.config.nodeEnv}`);
      console.log(`⚡ Allowed CORS Origin    : ${this.config.corsOrigin}`);
      console.log('==================================================\n');
    });
  }

  public async stop(): Promise<void> {
    try {
      await prisma.$disconnect();
    } catch {
      // Disconnect cleanly
    }

    return new Promise((resolve, reject) => {
      this.httpServer.close((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }

  private setupProcessSignals(): void {
    const handleShutdown = (signal: string): void => {
      console.log(`\n[Server] Received ${signal}. Shutting down gracefully...`);
      this.stop()
        .then(() => {
          console.log('[Server] HTTP server closed cleanly.');
          process.exit(0);
        })
        .catch((error: Error) => {
          console.error('[Server] Error while shutting down:', error);
          process.exit(1);
        });

      setTimeout(() => {
        console.error('[Server] Forcefully shutting down due to timeout.');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => handleShutdown('SIGTERM'));
    process.on('SIGINT', () => handleShutdown('SIGINT'));
  }
}

const appInstance = App.create(env);
const server = new Server(appInstance, env);
server.start();
