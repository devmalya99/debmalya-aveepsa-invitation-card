CREATE TABLE "accompanying_guests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"rsvp_id" uuid NOT NULL,
	"guest_name" varchar(150) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wedding_guests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"guest_name" varchar(150) NOT NULL,
	"phone" varchar(20),
	"attending" boolean NOT NULL,
	"guest_count" integer NOT NULL,
	"message" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "guest_count_non_negative" CHECK ("wedding_guests"."guest_count" >= 0),
	CONSTRAINT "guest_count_max" CHECK ("wedding_guests"."guest_count" <= 20)
);
--> statement-breakpoint
ALTER TABLE "accompanying_guests" ADD CONSTRAINT "accompanying_guests_rsvp_id_wedding_guests_id_fk" FOREIGN KEY ("rsvp_id") REFERENCES "public"."wedding_guests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "accompanying_guests_rsvp_id_idx" ON "accompanying_guests" USING btree ("rsvp_id");--> statement-breakpoint
CREATE INDEX "wedding_guests_created_at_idx" ON "wedding_guests" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "wedding_guests_phone_idx" ON "wedding_guests" USING btree ("phone");--> statement-breakpoint
CREATE INDEX "wedding_guests_name_created_idx" ON "wedding_guests" USING btree ("guest_name","created_at");