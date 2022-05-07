import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get("authorization");

  if (basicAuth) {
    const [, auth] = basicAuth.split(" ");
    const [username, password] = atob(auth).split(":");

    if (
      process.env.BASIC_AUTH_USERNAME === username &&
      process.env.BASIC_AUTH_PASSWORD === password
    ) {
      return NextResponse.next();
    }
  }

  return new Response("認証が必要です", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}
