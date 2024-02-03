import {Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, createSignal, createRef, SimpleSignal} from '@motion-canvas/core';

export default makeScene2D(function* (view) {

  // At this point, I have three separate signals that each individually get converted
  // into RGB hex code in the Rect.fill and Txt.text objects. I've created a function
  // that calculates the hex code for each signal integer to simplify the logic in
  // the Rect.fill attribute. Next step is giving more thought to the overall Layout.
  // Might need to go learn FlexBox.

  const sig_red = createSignal(255);
  const sig_green = createSignal(255);
  const sig_blue = createSignal(255);
  const rect = createRef<Rect>();
  const txt = createRef<Txt>();

  function int_sig_to_hex(s: SimpleSignal<number, void>): string {
    // Example: 168 --> "a8"
    return Math.round(s()).toString(16).padStart(2, '0');
  }

  view.add(
    <>
      <Rect
        ref={rect}
        width={300}
        height={300}
        fill={() => `#${int_sig_to_hex(sig_red)}${int_sig_to_hex(sig_green)}${int_sig_to_hex(sig_blue)}`}
      />
      <Txt
        ref={txt}
        // TODO: should probably be individual Txt objects once I start creating their own <Rect>...
        text={() => `red: ${Math.round(sig_red())}\ngreen: ${Math.round(sig_green())}\nblue: ${Math.round(sig_blue())}`}
        y={250}
      />
    </>
  )

  yield* all(
    sig_red(0, 2).to(255, 2),
    sig_green(0, 3).to(255, 3),
    sig_blue(0, 4).to(255, 4),
  )
});
