import { z } from 'zod';

const phone = z
  .string()
  .trim()
  .min(9, 'Enter a valid phone number')
  .max(20, 'Enter a valid phone number')
  .regex(/^[+0-9 ()-]+$/, 'Use digits, spaces and + only');

const base = {
  fullName: z.string().trim().min(2, 'Enter your full name').max(100),
  email: z.string().trim().email('Enter a valid email address'),
  phone,
  company: z.string().trim().max(120).optional().default(''),
  captchaToken: z.string().optional(),
};

// The website sends "1-10", "11-50"...; the database stores size_1_10, size_11_50...
export const fleetSizes = {
  '1-10': 'size_1_10',
  '11-50': 'size_11_50',
  '51-200': 'size_51_200',
  '200+': 'size_200_plus',
} as const;

export const demoRequestSchema = z.object({
  ...base,
  fleetSize: z.enum(['1-10', '11-50', '51-200', '200+'], { message: 'Choose your fleet size' }),
  industry: z.string().trim().max(80).optional().default(''),
  services: z.array(z.string().max(60)).max(10).default([]),
  preferredDate: z.string().trim().max(40).optional().default(''),
  message: z.string().trim().max(2000).optional().default(''),
});

export const contactSchema = z.object({
  ...base,
  subject: z.string().trim().min(2, 'Add a subject').max(150),
  message: z.string().trim().min(5, 'Write a short message').max(2000),
});

export const quoteRequestSchema = z.object({
  ...base,
  product: z.string().trim().min(1).max(120),
  quantity: z.coerce.number().int().min(1, 'At least 1').max(10000),
  message: z.string().trim().max(2000).optional().default(''),
});
