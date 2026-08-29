/*
  Directional Cursor — EXACT engine extracted from the last approved arena.

  IMPORTANT:
  The motion equations and constants below are intentionally kept 1:1 with:
  directional-cursor-reference-image-single-arena-v7-no-halo.html

  Removed only:
  - arena/demo markup
  - stats/debug text

  Do NOT "improve" or retune constants if exact parity is required.
*/

export type ExactCursorOptions = {
  cursorImage: string
}

export type ExactCursorController = {
  destroy: () => void
}

export function mountDirectionalCursorExact(
  options: ExactCursorOptions,
): ExactCursorController {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return { destroy() {} }
  }

  if (matchMedia("(pointer:coarse)").matches) {
    return { destroy() {} }
  }

  const root = document.createElement("div")
  root.className = "exact-directional-cursor visible"
  root.setAttribute("aria-hidden", "true")

  const image = document.createElement("img")
  image.src = options.cursorImage
  image.alt = ""
  image.draggable = false

  const stateLabel = document.createElement("div")
  stateLabel.className = "exact-cursor-state-label"

  const ibeam = document.createElement("div")
  ibeam.className = "exact-cursor-ibeam"

  root.appendChild(image)
  document.body.appendChild(root)
  document.body.appendChild(stateLabel)
  document.body.appendChild(ibeam)

  document.documentElement.classList.add("exact-cursor-on")

  const now0 = performance.now()

  const s = {
    mouse: { x: innerWidth / 2, y: innerHeight / 2 },
    follower: { x: innerWidth / 2, y: innerHeight / 2 },
    followerVel: { x: 0, y: 0 },

    rawVel: { x: 0, y: 0 },
    vel: { x: 0, y: 0 },
    speed: 0,

    dir: { x: 0, y: -1 },
    prevDir: { x: 0, y: -1 },
    turnSign: 1,

    angle: 0,
    targetAngle: 0,
    angleVel: 0,

    gap: 3,
    state: "default",
    label: "",
    down: false,
    active: false,
    lastPointer: {
      x: innerWidth / 2,
      y: innerHeight / 2,
      t: now0,
    },
    lastFrame: now0,
  }

  const clamp = (v: number, a: number, b: number) =>
    Math.max(a, Math.min(b, v))

  const lerp = (a: number, b: number, t: number) =>
    a + (b - a) * t

  const expBlend = (rate: number, dt: number) =>
    1 - Math.exp(-rate * dt)

  const shortest = (a: number, b: number) =>
    ((b - a + 540) % 360) - 180

  const easeOutCubic = (t: number) =>
    1 - Math.pow(1 - t, 3)

  let raf = 0
  let destroyed = false

  function wake() {
    if (destroyed || raf || document.hidden) return
    s.lastFrame = performance.now()
    raf = requestAnimationFrame(animate)
  }

  function setInteraction(target: EventTarget | null) {
    const element =
      target instanceof Element ? target : null

    const el =
      element?.closest<HTMLElement>("[data-cursor]") ?? null

    s.state = el?.dataset.cursor || "default"

    s.label =
      el?.dataset.label ||
      (s.state === "drag" ? "← DRAG →" : "")
  }

  function onPointerMove(e: PointerEvent) {
    if (e.pointerType && e.pointerType !== "mouse") return

    s.active = true
    root.classList.add("visible")

    const events =
      e.getCoalescedEvents
        ? e.getCoalescedEvents()
        : [e]

    for (const ev of events) {
      const t =
        (ev.timeStamp > 1e12
          ? ev.timeStamp - performance.timeOrigin
          : ev.timeStamp) || performance.now()

      const dt =
        Math.max(0.001, (t - s.lastPointer.t) / 1000)

      const dx = ev.clientX - s.lastPointer.x
      const dy = ev.clientY - s.lastPointer.y

      s.rawVel.x = dx / dt
      s.rawVel.y = dy / dt

      s.mouse.x = ev.clientX
      s.mouse.y = ev.clientY

      s.lastPointer = {
        x: ev.clientX,
        y: ev.clientY,
        t,
      }
    }

    setInteraction(e.target)
    wake()
  }

  function onPointerDown(e: PointerEvent) {
    if (e.pointerType && e.pointerType !== "mouse") return

    s.down = true

    const ripple = document.createElement("div")
    ripple.className = "exact-cursor-ripple"
    ripple.style.setProperty("--x", s.follower.x + "px")
    ripple.style.setProperty("--y", s.follower.y + "px")

    document.body.appendChild(ripple)

    window.setTimeout(() => ripple.remove(), 650)
    wake()
  }

  function onPointerUp() {
    s.down = false
    wake()
  }

  function onPointerOut(e: PointerEvent) {
    if (!e.relatedTarget) {
      root.classList.remove("visible")
    }
    wake()
  }

  function onPointerEnter() {
    if (s.active) {
      root.classList.add("visible")
    }
    wake()
  }

  function onScroll() {
    setInteraction(document.elementFromPoint(s.mouse.x, s.mouse.y))
    wake()
  }

  function onVisibilityChange() {
    if (document.hidden) {
      cancelAnimationFrame(raf)
      raf = 0
      return
    }
    wake()
  }

  function animate(now: number) {
    if (destroyed) return

    const dt =
      clamp((now - s.lastFrame) / 1000, 0.001, 0.032)

    s.lastFrame = now

    /*
      EXACT LAST-ARENA MOTION START
      Do not retune these values.
    */

    const velT = expBlend(15, dt)

    s.vel.x = lerp(s.vel.x, s.rawVel.x, velT)
    s.vel.y = lerp(s.vel.y, s.rawVel.y, velT)

    s.rawVel.x *= Math.pow(0.70, dt * 60)
    s.rawVel.y *= Math.pow(0.70, dt * 60)

    s.speed = Math.hypot(s.vel.x, s.vel.y)

    const speedN =
      clamp(s.speed / 1700, 0, 1)

    const desiredGap =
      2.5 + 39 * easeOutCubic(speedN)

    const gapRate =
      s.speed < 90 ? 16 : 9

    s.gap =
      lerp(
        s.gap,
        desiredGap,
        expBlend(gapRate, dt),
      )

    if (s.speed > 35) {
      const nx = s.vel.x / s.speed
      const ny = s.vel.y / s.speed

      const cross =
        s.prevDir.x * ny -
        s.prevDir.y * nx

      if (Math.abs(cross) > 0.018) {
        s.turnSign = Math.sign(cross)
      }

      const dirT =
        expBlend(12.5, dt)

      s.dir.x =
        lerp(s.dir.x, nx, dirT)

      s.dir.y =
        lerp(s.dir.y, ny, dirT)

      const dm =
        Math.hypot(s.dir.x, s.dir.y) || 1

      s.dir.x /= dm
      s.dir.y /= dm

      s.prevDir.x = nx
      s.prevDir.y = ny
    }

    const targetX =
      s.mouse.x - s.dir.x * s.gap

    const targetY =
      s.mouse.y - s.dir.y * s.gap

    const k =
      s.speed < 80 ? 230 : 150

    const damping =
      s.speed < 80 ? 29 : 24

    const ax =
      (targetX - s.follower.x) * k -
      s.followerVel.x * damping

    const ay =
      (targetY - s.follower.y) * k -
      s.followerVel.y * damping

    s.followerVel.x += ax * dt
    s.followerVel.y += ay * dt

    s.follower.x +=
      s.followerVel.x * dt

    s.follower.y +=
      s.followerVel.y * dt

    if (s.speed > 25) {
      const rawTarget =
        Math.atan2(s.dir.y, s.dir.x) *
          180 /
          Math.PI -
        90

      let d =
        shortest(s.angle, rawTarget)

      if (Math.abs(d) > 174) {
        d = 180 * s.turnSign
      }

      s.targetAngle =
        s.angle + d
    }

    const diff =
      s.targetAngle - s.angle

    const absDiff =
      Math.abs(diff)

    const angularK =
      absDiff > 130
        ? 82
        : absDiff > 70
          ? 108
          : 142

    const angularDamping = 22

    const aa =
      diff * angularK -
      s.angleVel * angularDamping

    s.angleVel +=
      aa * dt

    s.angleVel =
      clamp(
        s.angleVel,
        -920,
        920,
      )

    s.angle +=
      s.angleVel * dt

    if (s.speed < 10) {
      s.angleVel *=
        Math.pow(0.86, dt * 60)
    }

    const widthScale =
      1 + 0.045 * speedN

    const lengthScale =
      1 - 0.014 * speedN

    const clickScale =
      s.down ? 0.84 : 1

    const textMode =
      s.state === "text"

    const labelMode =
      s.state === "action" ||
      s.state === "drag"

    root.style.opacity =
      textMode || labelMode
        ? "0"
        : "1"

    root.style.transform =
      `translate3d(${s.follower.x}px,${s.follower.y}px,0) ` +
      `rotate(${s.angle}deg) ` +
      `scale(${widthScale * clickScale},${lengthScale * clickScale})`

    ibeam.style.opacity =
      textMode ? "1" : "0"

    ibeam.style.transform =
      `translate3d(${s.follower.x}px,${s.follower.y}px,0) ` +
      `scale(${s.down ? 0.80 : 1})`

    if (stateLabel.textContent !== s.label) {
      stateLabel.textContent = s.label
    }

    stateLabel.classList.toggle(
      "visible",
      labelMode,
    )

    stateLabel.style.transform =
      `translate3d(${s.follower.x}px,${s.follower.y}px,0) ` +
      `translate(-50%,-50%) ` +
      `scale(${s.down ? 0.94 : 1})`

    /*
      EXACT LAST-ARENA MOTION END
    */

    const settled =
      !s.down &&
      s.speed < 0.35 &&
      Math.hypot(s.rawVel.x, s.rawVel.y) < 0.35 &&
      Math.hypot(targetX - s.follower.x, targetY - s.follower.y) < 0.12 &&
      Math.hypot(s.followerVel.x, s.followerVel.y) < 0.35 &&
      Math.abs(s.angleVel) < 0.25

    if (settled) {
      raf = 0
    } else {
      raf = requestAnimationFrame(animate)
    }
  }

  window.addEventListener(
    "pointermove",
    onPointerMove,
    { passive: true },
  )

  window.addEventListener(
    "pointerdown",
    onPointerDown,
  )

  window.addEventListener(
    "pointerup",
    onPointerUp,
  )

  window.addEventListener(
    "pointerout",
    onPointerOut,
  )

  window.addEventListener(
    "mouseenter",
    onPointerEnter,
  )

  window.addEventListener(
    "scroll",
    onScroll,
    { passive: true },
  )

  document.addEventListener(
    "visibilitychange",
    onVisibilityChange,
  )

  wake()

  return {
    destroy() {
      destroyed = true

      cancelAnimationFrame(raf)

      window.removeEventListener(
        "pointermove",
        onPointerMove,
      )

      window.removeEventListener(
        "pointerdown",
        onPointerDown,
      )

      window.removeEventListener(
        "pointerup",
        onPointerUp,
      )

      window.removeEventListener(
        "pointerout",
        onPointerOut,
      )

      window.removeEventListener(
        "mouseenter",
        onPointerEnter,
      )

      window.removeEventListener(
        "scroll",
        onScroll,
      )

      document.removeEventListener(
        "visibilitychange",
        onVisibilityChange,
      )

      document.documentElement.classList.remove(
        "exact-cursor-on",
      )

      root.remove()
      stateLabel.remove()
      ibeam.remove()

      document
        .querySelectorAll(".exact-cursor-ripple")
        .forEach((node) => node.remove())
    },
  }
}
