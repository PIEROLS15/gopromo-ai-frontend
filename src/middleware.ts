import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { canAccessAdminPath } from "@/services/adminAccess.service";
import type { MeResponse } from "@/types/admin";

async function getRoleFromSession(accessToken: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return null;
  }

  try {
    const response = await fetch(`${apiUrl}/api/v1/auth/me`, {
      method: "GET",
      headers: {
        Cookie: `access_token=${accessToken}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as MeResponse;
    return data?.data?.user?.role?.name ?? null;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("access_token")?.value;

  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  const roleName = await getRoleFromSession(accessToken);
  const canAccess = canAccessAdminPath(pathname, roleName);

  if (!canAccess) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
