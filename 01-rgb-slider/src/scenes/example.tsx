import {Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, createSignal, createRef, SimpleSignal} from '@motion-canvas/core';

export default makeScene2D(function* (view) {

  // Created some basic sub-layouts for each color channel. Each
  // channel has a text label as well as it's numerical value. The
  // numerical value is inside of it's own Rect which has a fill of
  // the main Rect's color.


  const sig_red = createSignal(255);
  const sig_green = createSignal(255);
  const sig_blue = createSignal(255);
  const rect = createRef<Rect>();
  const txt = createRef<Txt>();

  const width = 800;
  const rect_radius = 15;

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

      {/* Red channel sub-layout */}
      <Rect layout>
        <Txt
          text={"R:"}
          y={250}
        />
        <Rect fill={() => rect().fill()} radius={rect_radius}> 
          <Txt
          ref={txt}
          text={() => `${Math.round(sig_red())}`}
          y={250}
          />
        </Rect>
      </Rect>

      {/* Green channel sub-layout */}
      <Rect layout>
        <Txt
          text={"G:"}
          y={250}
        />
        <Rect fill={() => rect().fill()} radius={rect_radius}> 
          <Txt
          ref={txt}
          text={() => `${Math.round(sig_green())}`}
          y={250}
          />
        </Rect>
      </Rect>

      {/* Blue channel sub-layout */}
      <Rect layout>
        <Txt
          text={"B:"}
          y={250}
        />
        <Rect fill={() => rect().fill()} radius={rect_radius}> 
          <Txt
          ref={txt}
          text={() => `${Math.round(sig_blue())}`}
          y={250}
          />
        </Rect>
      </Rect>

    </Rect>
  )

  yield* all(
    sig_red(0, 2).to(255, 2),
    sig_green(0, 3).to(255, 3),
    sig_blue(0, 4).to(255, 4),
  )
});
