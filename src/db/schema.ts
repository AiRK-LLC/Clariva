import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const courses = sqliteTable('courses', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  level: text('level').notNull(), // "Beginner" | "Intermediate" | "Advanced"
  durationWeeks: integer('duration_weeks').notNull(),
  priceAed: integer('price_aed').notNull(),
  imageUrl: text('image_url').notNull(),
  description: text('description').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});