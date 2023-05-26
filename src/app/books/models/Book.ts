import { z } from 'zod';
import { isValidISBN } from '../util/isValidISBN';

export const MAX_RATING = 10;

export const bookDtoSchema = z.object({
  id: z.string(),
  authors: z.string().array().min(1, 'У книги должен быть хотя бы 1 автор'),
  title: z.string().max(100, 'Название не должно быть длиннее 100 символов'),
  year: z
    .number()
    .min(1800, 'Книга должна быть выпущена не ранее 1800-го года')
    .nullable(),
  rating: z
    .number()
    .min(0, 'Рейтинг должен быть положительным')
    .max(MAX_RATING, `Рейтинг не должен быть выше ${MAX_RATING}`)
    .nullable(),
  ISBN: z
    .string()
    .array()
    .refine((val) => isValidISBN(val), 'ISBN не валиден')
    .nullable(),
});

export type BookDto = z.infer<typeof bookDtoSchema>;

export const bookFormDtoSchema = bookDtoSchema.omit({ id: true });

export type BookFormDto = z.infer<typeof bookFormDtoSchema>;
