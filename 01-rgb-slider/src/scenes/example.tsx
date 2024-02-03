import {Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {waitFor, createSignal, Color, createRef} from '@motion-canvas/core';

export default makeScene2D(function* (view) {

  // Idea #1 is the only one I'm able to make work. I now have a red square
  // where the red channel slowly moves from 255 to 0. The text box below
  // it reports out the hex code associated with the red channel. Both the
  // fill of the rect and the content of the text box are connected to a
  // primitive integer signal. The animation takes place on the signal
  // directly, which then updates the Rect/Txt.

  // Idea #1: create a primitive int signal. Use the int in the text box but
  // conver to and from hex when passing the value into .fill().

  const sigred = createSignal(255);
  // convert between int and hex; is this necessary for what I'm trying to do?
  // myHex = myInt.toString(16);
  // myInt = parseInt(myHex, 16);


  // Idea #2: There is a "Color" class which has a .createSignal() method.
  // I have no idea how I'd use this though.
  // const color = createRef<Color>();
  // let color_signal = Color.createSignal();
  // color().rgb() = [255, 0, 0];
  // color_signal().rgb = [255, 0, 0];

  // Idea #3: Apparently this createRef method creates a "signal-like" object?
  // I don't really know what that means or if it's useful for what I'm doing.
  const rect = createRef<Rect>();
  const txt = createRef<Txt>();
  view.add(
    <>
      <Rect
        ref={rect}
        width={300}
        height={300}
        fill={() => `#${Math.round(sigred()).toString(16).padStart(2, '0')}0000`}
      />
      <Txt
        ref={txt}
        text={() => `red: ${Math.round(sigred()).toString(16).padStart(2, '0')}`}
        y={200}
      />
    </>
  )

  yield* sigred(0, 4).to(255, 4);
});
