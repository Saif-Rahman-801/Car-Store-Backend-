import { z } from 'zod';

export const carSchemaValidation = z.object({
  brand: z.string(),
  model: z.string(),
  year: z.number().int().min(1886),
  price: z.number().positive(),
  category: z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible']),
  description: z.string(),
  quantity: z.number().int().nonnegative(),
  inStock: z.boolean(),
});
