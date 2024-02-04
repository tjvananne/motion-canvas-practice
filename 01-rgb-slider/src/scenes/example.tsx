import {Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, createSignal, createRef, SimpleSignal} from '@motion-canvas/core';

export default makeScene2D(function* (view) {

  // Wrestled with FlexBox to get the layout just right. If you set
  // the flex direction to "column" and you want to use justifyContent,
  // then you should also set an explicit height on that container.


  const sig_red = createSignal(255);
  const sig_green = createSignal(255);
  const sig_blue = createSignal(255);
  const rect = createRef<Rect>();

  const width = 800;
  const rect_radius = 15;

  function int_sig_to_hex(s: SimpleSignal<number, void>): string {
    // Example: 168 --> "a8"
    return Math.round(s()).toString(16).padStart(2, '0');
  }

  view.add(
    
    <Rect layout height={800} width={width} fill={"#CCCCCC"} direction={"column"} radius={rect_radius}>
      <Rect
        ref={rect}
        width={width}
        height={"40%"}
        fill={() => `#${int_sig_to_hex(sig_red)}${int_sig_to_hex(sig_green)}${int_sig_to_hex(sig_blue)}`}
        radius={rect_radius}
      />

      <Rect layout direction={"column"} justifyContent={"space-evenly"} alignItems={"center"} height={"60%"}>

        {/* Red channel sub-layout */}
      <Rect layout width={"80%"}>
        <Txt
          text={"R :"}
          padding={[20, 30, 20, 0]}
        />
        <Rect layout fill={"#FFFFFF"} width={"100%"} radius={rect_radius}>
          <Rect fill={() => rect().fill()} radius={rect_radius} width={() => `${sig_red()/255*100}%`}> 
            <Txt
            text={() => `${Math.round(sig_red())}`}
            padding={20}
            />
          </Rect>
        </Rect>
      </Rect>

      {/* Green channel sub-layout */}
      <Rect layout width={"80%"}>
        <Txt
          text={"G :"}
          padding={[20, 30, 20, 0]}
        />
        <Rect layout fill={"#FFFFFF"} width={"100%"} radius={rect_radius}>
          <Rect fill={() => rect().fill()} radius={rect_radius} width={() => `${sig_green()/255*100}%`}> 
            <Txt
            text={() => `${Math.round(sig_green())}`}
            padding={20}
            />
          </Rect>
        </Rect>
      </Rect>

      {/* Blue channel sub-layout */}
      <Rect layout width={"80%"}>
        <Txt
          text={"B :"}
          padding={[20, 30, 20, 0]}
        />
        <Rect layout fill={"#FFFFFF"} width={"100%"} radius={rect_radius}>
          <Rect fill={() => rect().fill()} radius={rect_radius} width={() => `${sig_blue()/255*100}%`}> 
            <Txt
            text={() => `${Math.round(sig_blue())}`}
            padding={20}
            />
          </Rect>
        </Rect>
        </Rect>
      </Rect>

    </Rect>
  )

  yield* all(
    sig_red(0, 2).to(255, 3),
    sig_green(0, 3).to(255, 3),
    sig_blue(0, 4).to(255, 3),
  )
});
