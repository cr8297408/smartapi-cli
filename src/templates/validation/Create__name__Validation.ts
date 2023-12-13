import z from 'zod';

export const Create__name__SchemaValidator = z.object({
  body: z.object({
    saludo: z.string()
  }),
  query: z.object({}),
  params: z.object({}),
}).strict();
