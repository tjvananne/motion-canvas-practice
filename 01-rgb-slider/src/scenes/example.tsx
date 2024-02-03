import {Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, createSignal, createRef, SimpleSignal} from '@motion-canvas/core';

export default makeScene2D(function* (view) {

  // Corners of the Rect objects are rounded and I set a columnar layout. 
  // Next step is to create sub-layouts so I can have Rects next to each
  // R/G/B label.

  // I've discovered that I didn't truly need three individual signals and could just
  // use `() => `${rect.()}` like I originally though. The issue was I didn't set it
  // up as a lambda. Oh well, I actually like individual signals for each channel.


  const sig_red = createSignal(255);
  const sig_green = createSignal(255);
  const sig_blue = createSignal(255);
  const rect = createRef<Rect>();
  const txt = createRef<Txt>();

  const width = 800;
  const rect_radius = 50;

  function int_sig_to_hex(s: SimpleSignal<number, void>): string {
    // Example: 168 --> "a8"
    return Math.round(s()).toString(16).padStart(2, '0');
  }

  view.add(
    
    <Rect layout height={800} width={width} fill={"#BBBBBB"} direction={"column"} radius={rect_radius}>
      <Rect
        ref={rect}
        width={width}
        height={300}
        fill={() => `#${int_sig_to_hex(sig_red)}${int_sig_to_hex(sig_green)}${int_sig_to_hex(sig_blue)}`}
        radius={rect_radius}
      />
      <Txt
        ref={txt}
        text={() => `R: ${Math.round(sig_red())}`}
        y={250}
      />
      <Txt
        ref={txt}
        text={() => `G: ${Math.round(sig_green())}`}
        y={250}
      />
      <Txt
        ref={txt}
        text={() => `B: ${Math.round(sig_blue())}`}
        y={250}
      />
    </Rect>
  )

  yield* all(
    sig_red(0, 2).to(255, 2),
    sig_green(0, 3).to(255, 3),
    sig_blue(0, 4).to(255, 4),
  )
});
