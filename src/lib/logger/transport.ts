const SETTING_PINO = {
  errorLikeObjectKeys: ['err', 'error'],
};

const PRETTY_PRINT = {
  ...SETTING_PINO,
  colorize: true,
  singleLine: true,
  levelFirst: false,
  translateTime: "yyyy-mm-dd'T'HH:MM:ss.l'Z'",
  messageFormat:
    '{if req.headers.x-correlation-id}{req.headers.x-correlation-id} {end}{if context}[{context}] {end}{msg}',
  ignore: 'pid,hostname,context,req,res.headers',
};

export const transport = {
  target: 'pino-pretty',
  options: { destination: 1, ...PRETTY_PRINT },
};
