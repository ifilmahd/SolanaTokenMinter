import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const tokens = pgTable("tokens", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  symbol: text("symbol").notNull(),
  supply: text("supply").notNull(), // Using text to handle large numbers
  decimals: integer("decimals").notNull().default(9),
  description: text("description"),
  freezeAuthority: boolean("freeze_authority").notNull().default(false),
  mintAuthority: boolean("mint_authority").notNull().default(false),
  creatorWallet: text("creator_wallet").notNull(),
  tokenAddress: text("token_address"),
  transactionId: text("transaction_id"),
  status: text("status").notNull().default("pending"), // pending, deployed, failed
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertTokenSchema = createInsertSchema(tokens).omit({
  id: true,
  tokenAddress: true,
  transactionId: true,
  status: true,
  createdAt: true,
}).extend({
  supply: z.string().min(1, "Supply must be greater than 0"),
  decimals: z.number().min(0).max(18),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertToken = z.infer<typeof insertTokenSchema>;
export type Token = typeof tokens.$inferSelect;
