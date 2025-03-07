/* import { z } from 'zod';

export const orderSchemaValidation = z.object({
  email: z.string().email(),
  car: z.string(),
  quantity: z.number().int().positive(),
  totalPrice: z.number().positive(),
});
 */

import { z } from 'zod';

export const orderSchemaValidation = z.object({
  email: z.string().email(),
  car: z.string(),
  quantity: z.number(),
  totalPrice: z.number(),
});
