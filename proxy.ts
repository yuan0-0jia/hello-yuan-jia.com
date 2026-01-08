// import { auth } from "./app/_lib/auth";
// export const middleware = auth;

// export const config = {
//   matcher: ["/account"],
// };
import { type NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";

export default async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ["/account/:path*"],
};
