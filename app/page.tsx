import { redirect } from "next/navigation";

// The middleware (next-intl) redirects / → /fr automatically.
// This fallback handles edge cases where middleware is not invoked.
export default function RootPage() {
  redirect("/fr");
}
