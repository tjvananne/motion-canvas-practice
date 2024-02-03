import {Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {waitFor, createSignal, Color, createRef} from '@motion-canvas/core';

export default makeScene2D(function* (view) {

  // This scene gives me a red square that slowly turns green and then back to red.
  // I have a text box underneath it that shows the hex component of the Red channel,
  // but it isn't updating as the color of the square animates.


  // Idea #1: create a primitive int signal. Use the int in the text box but
  // conver to and from hex when passing the value into .fill().

  // const sigred = createSignal(255);
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
        fill="#FF0000"
      />
      <Txt
        ref={txt}
        text={`red: ${rect().fill().toString().slice(1,3)}`} // Not updating during animation... so rect isn't a signal?
        y={200}
      />
    </>
  )

  yield* rect().fill("#35FF00", 2).to("#FF0000", 2);
});
