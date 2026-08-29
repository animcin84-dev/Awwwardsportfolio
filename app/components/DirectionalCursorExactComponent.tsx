"use client"

import * as React from "react"

import {
  mountDirectionalCursorExact,
  type ExactCursorController,
} from "./DirectionalCursorExact"

import "./directional-cursor-exact.css"

export type DirectionalCursorExactProps = {
  cursorImage: string
}

export default function DirectionalCursorExact(
  props: DirectionalCursorExactProps,
) {
  const controller =
    React.useRef<ExactCursorController | null>(null)

  React.useEffect(() => {
    controller.current =
      mountDirectionalCursorExact({
        cursorImage: props.cursorImage,
      })

    return () => {
      controller.current?.destroy()
      controller.current = null
    }
  }, [props.cursorImage])

  return null
}
