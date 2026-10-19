// Convierte una URL de wp-content (absoluta o relativa) a ruta local en /public
export function localImg(u: string): string {
  if (!u) return "";
  let p = u.replace(/^https?:\/\/(www\.)?2wheelsrental\.com/i, "");
  if (!p.startsWith("/")) p = "/" + p;
  return p;
}
