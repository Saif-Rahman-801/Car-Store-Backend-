/* import { z } from 'zod';

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

export const carUpdateSchemaValidation = z.object({
  price: z.number().optional(),
  quantity: z.number().optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  year: z.number().optional(),
  category: z
    .enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'])
    .optional(),
  description: z.string().optional(),
  inStock: z.boolean().optional(),
});
 */

import { z } from 'zod';

export const carSchemaValidation = z.object({
  brand: z.string(),
  model: z.string(),
  year: z.number(),
  price: z.number(),
  category: z.string(),
  description: z.string(),
  quantity: z.number(),
  inStock: z.boolean(),
});

export const carUpdateSchemaValidation = z.object({
  brand: z.string().optional(),
  model: z.string().optional(),
  year: z.number().optional(),
  price: z.number().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  quantity: z.number().optional(),
  inStock: z.boolean().optional(),
});
