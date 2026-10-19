import { NextResponse, type NextRequest } from "next/server";

// Solo el dominio real se indexa: vercel.app, previews de Vercel y localhost llevan noindex,
// para que Google no indexe copias del sitio. (Los canonical ya apuntan a 2wheelsrental.com.)
const PROD = /(^|\.)2wheelsrental\.com$/;

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const host = (req.headers.get("host") || "").split(":")[0];
  if (!PROD.test(host)) res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}

export const config = {
  // páginas, robots y sitemap; no assets estáticos ni imágenes optimizadas
  matcher: ["/((?!_next/static|_next/image|images/|wp-content/|videos/|favicon).*)"],
};
