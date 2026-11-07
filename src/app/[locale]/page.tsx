import { redirect } from "next/navigation";

/** Legacy locale URLs redirect into the rebuilt root experience. */
export default function LocalePage() {
  redirect("/");
}
