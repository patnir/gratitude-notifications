// drizzle/schema.ts
import { bigint, boolean, index, integer, pgTable, text, unique, uuid } from "drizzle-orm/pg-core";

// ============ USER PROFILE ============

export const users = pgTable("users", {
  id: text("id").primaryKey(), // Clerk user ID
  displayName: text("display_name").notNull().default("Member"), // Min 1, max 50 chars
  profileImageUrl: text("profile_image_url"), // Optional: cloud URL for profile picture
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
  color: text("color").notNull().default("green"), // Circle color name
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
  imageUrl: text("image_url"), // Optional: cloud URL for attached image
  circleId: uuid("circle_id").references(() => circles.id, { onDelete: "set null" }), // If null, entry is private
  commentCount: integer("comment_count").notNull().default(0), // Denormalized count for feed performance
  createdAt: bigint("created_at", { mode: "number" }).notNull().$defaultFn(() => Date.now()),
  updatedAt: bigint("updated_at", { mode: "number" }).notNull().$defaultFn(() => Date.now()),
}, (table) => ({
  userIdIdx: index("gratitude_entries_user_id_idx").on(table.userId),
  createdAtIdx: index("gratitude_entries_created_at_idx").on(table.createdAt),
  circleIdIdx: index("gratitude_entries_circle_id_idx").on(table.circleId),
}));

// ============ NOTIFICATION PREFERENCES ============

export const notificationPreferences = pgTable("notification_preferences", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull().unique().references(() => users.id, { onDelete: "cascade" }),
  dailyReminderEnabled: boolean("daily_reminder_enabled").notNull().default(true),
  dailyReminderTime: text("daily_reminder_time").notNull().default("09:00"),
  pastReminderEnabled: boolean("past_reminder_enabled").notNull().default(true),
  pastReminderTime: text("past_reminder_time").notNull().default("18:00"),
  createdAt: bigint("created_at", { mode: "number" }).notNull().$defaultFn(() => Date.now()),
  updatedAt: bigint("updated_at", { mode: "number" }).notNull().$defaultFn(() => Date.now()),
});

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

// ============ EMOJI REACTIONS ============

export const entryReactions = pgTable("entry_reactions", {
  id: uuid("id").defaultRandom().primaryKey(),
  entryId: uuid("entry_id").notNull().references(() => gratitudeEntries.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  emoji: text("emoji").notNull().default("👍"),
  createdAt: bigint("created_at", { mode: "number" }).notNull().$defaultFn(() => Date.now()),
}, (table) => ({
  entryIdIdx: index("entry_reactions_entry_id_idx").on(table.entryId),
  userIdIdx: index("entry_reactions_user_id_idx").on(table.userId),
  uniqueReaction: unique("entry_reactions_unique").on(table.entryId, table.userId),
}));

// ============ COMMENTS ============

export const entryComments = pgTable("entry_comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  entryId: uuid("entry_id").notNull().references(() => gratitudeEntries.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(), // Min 1 char, max 500 chars
  createdAt: bigint("created_at", { mode: "number" }).notNull().$defaultFn(() => Date.now()),
}, (table) => ({
  entryIdIdx: index("entry_comments_entry_id_idx").on(table.entryId),
  userIdIdx: index("entry_comments_user_id_idx").on(table.userId),
  entryCreatedIdx: index("entry_comments_entry_created_idx").on(table.entryId, table.createdAt),
}));

