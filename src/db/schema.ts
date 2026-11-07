import { relations, sql } from "drizzle-orm";
import {
  boolean,
  check,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const weddingGuests = pgTable(
  "wedding_guests",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    guestName: varchar("guest_name", { length: 150 }).notNull(),
    phone: varchar("phone", { length: 20 }),
    attending: boolean("attending").notNull(),
    guestCount: integer("guest_count").notNull(),
    message: text("message"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("wedding_guests_created_at_idx").on(table.createdAt),
    index("wedding_guests_phone_idx").on(table.phone),
    index("wedding_guests_name_created_idx").on(table.guestName, table.createdAt),
    check("guest_count_non_negative", sql`${table.guestCount} >= 0`),
    check("guest_count_max", sql`${table.guestCount} <= 20`),
  ],
);

export const accompanyingGuests = pgTable(
  "accompanying_guests",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    rsvpId: uuid("rsvp_id")
      .notNull()
      .references(() => weddingGuests.id, { onDelete: "cascade" }),
    guestName: varchar("guest_name", { length: 150 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index("accompanying_guests_rsvp_id_idx").on(table.rsvpId)],
);

export const weddingGuestsRelations = relations(weddingGuests, ({ many }) => ({
  accompanyingGuests: many(accompanyingGuests),
}));

export const accompanyingGuestsRelations = relations(
  accompanyingGuests,
  ({ one }) => ({
    rsvp: one(weddingGuests, {
      fields: [accompanyingGuests.rsvpId],
      references: [weddingGuests.id],
    }),
  }),
);
