/** Decorative shapes for login / forgot-password brand column (DOM — not limited to ::before/::after). */
export function mountAuthBrandArt(brand: HTMLElement) {
  if (brand.querySelector(".vx-auth-art")) return;

  const art = document.createElement("div");
  art.className = "vx-auth-art";
  art.setAttribute("aria-hidden", "true");

  for (let i = 1; i <= 8; i++) {
    const shape = document.createElement("span");
    shape.className = `vx-auth-art__shape vx-auth-art__shape--${i}`;
    art.appendChild(shape);
  }

  brand.insertBefore(art, brand.firstChild);
}
