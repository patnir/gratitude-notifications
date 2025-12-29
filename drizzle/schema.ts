// drizzle/schema.ts
import { bigint, index, pgTable, text, unique, uuid } from "drizzle-orm/pg-core";

// ============ USER PROFILE ============

export const users = pgTable("users", {
  id: text("id").primaryKey(), // Clerk user ID
  displayName: text("display_name").notNull().default("Member"), // Min 1, max 50 chars
  createdAt: bigint("created_at", { mode: "number" }).notNull().$defaultFn(() => Date.now()),
  updatedAt: bigint("updated_at", { mode: "number" }).notNull().$defaultFn(() => Date.now()),
}, (table) => ({
  displayNameIdx: index("users_display_name_idx").on(table.displayName),
}));

// ============ CIRCLES FEATURE ============

export const circles = pgTable("circles", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(), // Min 1, max 50 chars
  ownerId: text("owner_id").notNull(), // Clerk user ID of creator
  inviteCode: text("invite_code").notNull().unique(), // Exactly 6 uppercase chars
  createdAt: bigint("created_at", { mode: "number" }).notNull().$defaultFn(() => Date.now()),
}, (table) => ({
  ownerIdIdx: index("circles_owner_id_idx").on(table.ownerId),
  inviteCodeIdx: index("circles_invite_code_idx").on(table.inviteCode),
}));

export const circleMembers = pgTable("circle_members", {
  id: uuid("id").defaultRandom().primaryKey(),
  circleId: uuid("circle_id").notNull().references(() => circles.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  joinedAt: bigint("joined_at", { mode: "number" }).notNull().$defaultFn(() => Date.now()),
}, (table) => ({
  circleIdIdx: index("circle_members_circle_id_idx").on(table.circleId),
  userIdIdx: index("circle_members_user_id_idx").on(table.userId),
  uniqueMembership: unique("circle_members_unique").on(table.circleId, table.userId),
}));

// ============ CORE TABLES ============

export const gratitudeEntries = pgTable("gratitude_entries", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(), // Min 1 char after trim
  location: text("location"), // Optional: stores JSON with {latitude, longitude, city, state, country, address}
  imageUri: text("image_uri"), // Optional: local file path to attached image
  circleId: uuid("circle_id").references(() => circles.id, { onDelete: "set null" }), // If null, entry is private
  createdAt: bigint("created_at", { mode: "number" }).notNull().$defaultFn(() => Date.now()),
  updatedAt: bigint("updated_at", { mode: "number" }).notNull().$defaultFn(() => Date.now()),
}, (table) => ({
  userIdIdx: index("gratitude_entries_user_id_idx").on(table.userId),
  createdAtIdx: index("gratitude_entries_created_at_idx").on(table.createdAt),
  circleIdIdx: index("gratitude_entries_circle_id_idx").on(table.circleId),
}));

// ============ PUSH NOTIFICATIONS ============

export const pushTokens = pgTable("push_tokens", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  deviceId: text("device_id"), // Optional: track which device
  platform: text("platform").notNull(), // "ios" or "android"
  createdAt: bigint("created_at", { mode: "number" }).notNull().$defaultFn(() => Date.now()),
  updatedAt: bigint("updated_at", { mode: "number" }).notNull().$defaultFn(() => Date.now()),
}, (table) => ({
  userIdIdx: index("push_tokens_user_id_idx").on(table.userId),
  tokenIdx: index("push_tokens_token_idx").on(table.token),
}));

