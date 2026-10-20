const iconShow = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>`;

const iconHide = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.11"/><path d="m2 2 20 20"/></svg>`;

const VISIBLE_ATTR = "data-vx-pass-visible";

type InputStyle = CSSStyleDeclaration & { webkitTextSecurity?: string };

function supportsWebkitMask(): boolean {
  if (typeof CSS !== "undefined" && CSS.supports("-webkit-text-security", "disc")) return true;
  if (typeof document === "undefined") return false;
  return "webkitTextSecurity" in document.createElement("input").style;
}

function isVisible(wrap: HTMLElement): boolean {
  return wrap.getAttribute(VISIBLE_ATTR) === "true";
}

function getInput(wrap: HTMLElement): HTMLInputElement | null {
  return wrap.querySelector("input");
}

/** Apply masked/visible state to the current input (React may replace the node). */
export function applyPasswordDisplay(wrap: HTMLElement) {
  const input = getInput(wrap);
  if (!input) return;

  const visible = isVisible(wrap);
  const style = input.style as InputStyle;

  if (supportsWebkitMask()) {
    if (input.type !== "text") input.type = "text";
    style.webkitTextSecurity = visible ? "none" : "disc";
  } else {
    style.webkitTextSecurity = "";
    const nextType = visible ? "text" : "password";
    if (input.type !== nextType) input.type = nextType;
  }
}

function syncToggleButton(wrap: HTMLElement, showLabel: string, hideLabel: string) {
  const btn = wrap.querySelector<HTMLButtonElement>(".vx-pass-toggle");
  if (!btn) return;
  const visible = isVisible(wrap);
  btn.setAttribute("aria-label", visible ? hideLabel : showLabel);
  btn.setAttribute("aria-pressed", visible ? "true" : "false");
  btn.innerHTML = visible ? iconHide : iconShow;
}

function setVisible(wrap: HTMLElement, visible: boolean, showLabel: string, hideLabel: string) {
  wrap.setAttribute(VISIBLE_ATTR, visible ? "true" : "false");
  applyPasswordDisplay(wrap);
  syncToggleButton(wrap, showLabel, hideLabel);
}

function watchWrap(wrap: HTMLElement) {
  if (wrap.dataset.vxPassWatch === "1") return;
  wrap.dataset.vxPassWatch = "1";

  const observer = new MutationObserver(() => {
    applyPasswordDisplay(wrap);
  });
  observer.observe(wrap, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["type"],
  });
}

export function syncPasswordToggleLabels(showLabel: string, hideLabel: string) {
  document.querySelectorAll<HTMLElement>(".vx-pass-field").forEach((wrap) => {
    applyPasswordDisplay(wrap);
    syncToggleButton(wrap, showLabel, hideLabel);
  });
}

/** Wrap a password input with a show/hide eye control. */
export function mountPasswordToggle(input: HTMLInputElement, showLabel: string, hideLabel: string) {
  const existingWrap = input.closest<HTMLElement>(".vx-pass-field");
  if (existingWrap) {
    applyPasswordDisplay(existingWrap);
    syncToggleButton(existingWrap, showLabel, hideLabel);
    return;
  }
  if (input.type !== "password" && input.type !== "text") return;

  const wrap = document.createElement("div");
  wrap.className = "vx-pass-field";
  wrap.setAttribute(VISIBLE_ATTR, "false");
  input.parentNode?.insertBefore(wrap, input);
  wrap.appendChild(input);

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "vx-pass-toggle";
  btn.setAttribute("aria-label", showLabel);
  btn.setAttribute("aria-pressed", "false");
  btn.innerHTML = iconShow;

  btn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    setVisible(wrap, !isVisible(wrap), showLabel, hideLabel);
    getInput(wrap)?.focus();
  });

  wrap.appendChild(btn);
  watchWrap(wrap);
  applyPasswordDisplay(wrap);
  syncToggleButton(wrap, showLabel, hideLabel);
}

export function scanPasswordFields(showLabel: string, hideLabel: string) {
  document.querySelectorAll<HTMLInputElement>('input[type="password"]').forEach((input) => {
    mountPasswordToggle(input, showLabel, hideLabel);
  });
  document.querySelectorAll<HTMLElement>(".vx-pass-field").forEach((wrap) => {
    applyPasswordDisplay(wrap);
  });
  syncPasswordToggleLabels(showLabel, hideLabel);
}
