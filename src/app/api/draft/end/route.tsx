import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  draftMode().disable();

  redirect(`https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/`);
}
