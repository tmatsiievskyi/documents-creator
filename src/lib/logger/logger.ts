import pino from 'pino';
import { env } from '../env';
import { v4 as uuidv4 } from 'uuid';
import { transport } from './transport';

// TODO: maybe add to client

const config = {
  development: {
    transport: {
      ...transport,
    },
    level: 'debug',
  },
  production: {
    level: 'info',
  },
  test: {
    level: 'silent',
  },
};

export const logger = pino({
  ...config[(env.NODE_ENV || 'development') as keyof typeof config],
  mixin() {
    return {
      timestamp: new Date().toISOString(),
    };
  },
  formatters: {
    level: label => {
      return { level: label };
    },
  },
});

export const withPerfomanceLogger = async <T>(
  fn: () => Promise<T>,
  logger: pino.Logger,
  operation: string
): Promise<T> => {
  const start = performance.now();
  try {
    const result = await fn();
    const duratoin = performance.now() - start;

    logger.debug(
      {
        operation,
        duration: `${duratoin.toFixed(2)}`,
        success: true,
      },
      `Completed ${operation}`
    );

    return result;
  } catch (error) {
    const duration = performance.now() - start;
    logger.error(
      {
        operation,
        duration: `${duration.toFixed(2)}ms`,
        error:
          error instanceof Error
            ? {
                message: error.message,
                name: error.name,
                stack: error.stack,
              }
            : String(error),
        success: false,
      },
      `Failed ${operation}`
    );

    throw error;
  }
};

export const createRequestLogger = () => {
  const reqId = uuidv4();
  return logger.child({ reqId });
};

export const createServiceLogger = (serviceName: string) => {
  return logger.child({
    layer: 'service',
    service: serviceName,
  });
};

export const createDaoLogger = (daoName: string) => {
  return logger.child({
    layer: 'dao',
    dao: daoName,
  });
};

export const appLogger = (fileName: string) => {
  return logger.child({
    layer: 'misc',
    fileName: fileName,
  });
};
