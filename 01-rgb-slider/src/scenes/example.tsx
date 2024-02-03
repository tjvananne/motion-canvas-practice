import {Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, createSignal, createRef} from '@motion-canvas/core';

export default makeScene2D(function* (view) {

  // At this point, I have three separate signals that each individually get converted
  // into RGB hex code in the Rect.fill and Txt.text objects. I'd really like to separate
  // out that logic for calculating those values into a separate function. I'm not sure how
  // that would work though since those properties take in a lambda with no inputs?

  const sig_red = createSignal(255);
  const sig_green = createSignal(255);
  const sig_blue = createSignal(255);
  const rect = createRef<Rect>();
  const txt = createRef<Txt>();

  view.add(
    <>
      <Rect
        ref={rect}
        width={300}
        height={300}
        fill={() => `#${Math.round(sig_red()).toString(16).padStart(2, '0')}${Math.round(sig_green()).toString(16).padStart(2, '0')}${Math.round(sig_blue()).toString(16).padStart(2, '0')}`}
      />
      <Txt
        ref={txt}
        text={() => `red: ${Math.round(sig_red()).toString(16).padStart(2, '0')}\ngreen: ${Math.round(sig_green()).toString(16).padStart(2, '0')}\nblue: ${Math.round(sig_blue()).toString(16).padStart(2, '0')}`}
        y={250}
      />
    </>
  )

  yield* all(
    sig_red(0, 4).to(255, 4),
    sig_green(0, 6).to(255, 6),
    sig_blue(0, 12).to(255, 12),
  )
});
