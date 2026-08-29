import { Fragment } from "react";

export function MotionWords({ text }: { text: string }) {
  const words = text.trim().split(/\s+/);

  return words.map((word, index) => (
    <Fragment key={`${word}-${index}`}>
      <span className="motion-word-mask" aria-hidden="true"><span className="motion-word">{word}</span></span>
      {index < words.length - 1 ? " " : null}
    </Fragment>
  ));
}
