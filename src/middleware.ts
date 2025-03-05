import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthServices";
import { getMe } from "./services/User";
type role = keyof typeof roleBasedPrivateRoutes;
const authRoutes = ["/login", "/register"];
const roleBasedPrivateRoutes = {
  tenant: [/^\/tenant/],
  admin: [/^\/admin/],
  landlord: [/^\/landlord/],
};
export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const userInfo = await getCurrentUser();
  const user = await getMe();
  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `http://localhost:3000/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }
  if (user?.success === false) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as role]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/login",
    "/admin",
    "/admin/:page",
    "/tenant",
    "/tenant:page",
    "/landlord",
    "/landlord/:page",
  ],
};
