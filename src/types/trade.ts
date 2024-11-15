import { z } from "zod";

export const tradeSchema = z.object({
  entry: z.number().positive("Entry price must be positive"),
  amount: z.number().positive("Amount must be positive"),
  fee: z.number().min(0, "Fee cannot be negative"),
  exit: z.number().positive("Exit price must be positive").optional(),
  exitFee: z.number().min(0, "Exit fee cannot be negative").optional(),
});

export type Trade = z.infer<typeof tradeSchema>;
