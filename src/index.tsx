import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export interface InfiniteReelProps {
  reelTexts: string[];
  duration: number[];
  directionArr: number[];
  initialXOffsetFunction?: (index: number) => number;
  strokeFunction?: (itemIndex: number, rowIndex: number) => number;
  affectOnScrollArr: boolean[];
  containerRotation?: number;
  velocityOnScroll?: number;
  smoothScrolling?: any;
}

const InfiniteReel: React.FC<InfiniteReelProps> = ({
  reelTexts = ["Strategy", "Design", "Development", "Marketing"],
  duration = [32, 30, 29, 30],
  directionArr = [1, 1, 1, 1],
  initialXOffsetFunction = (index: number) => (-index % 2) * 250,
  strokeFunction = (itemIndex: number) => !(itemIndex % 2),
  affectOnScrollArr = [true, true, true, true],
  containerRotation = 0,
  velocityOnScroll = 100,
  smoothScrolling,
}) => {
  const direction = useRef(1);
  const watchDirection = useRef<number[]>([]);
  const ItemRefs = useRef<HTMLElement[]>([]);
  const AllItemsRef = useRef<HTMLDivElement>(null);
  const ItemRowRef = useRef<HTMLElement[]>([]);

  const wrap = (value: number, min: number, max: number) => {
    var v = value - min;
    var r = max - min;
    return ((r + (v % r)) % r) + min;
  };

  const getItemWidth = () => {
    return ItemRefs.current[0].clientWidth;
  };

  const directionChanged = (index: number): boolean => {
    if (direction.current == watchDirection.current[index]) {
      return false;
    } else if (direction.current != watchDirection.current[index]) {
      watchDirection.current[index] = direction.current;
      return true;
    }
    return true;
  };

  const setItemRef = (el: any) => {
    if (el && !ItemRefs.current.includes(el)) {
      ItemRefs.current.push(el);
    }
  };

  const setRowRef = (el: any) => {
    if (el && !ItemRowRef.current.includes(el)) {
      ItemRowRef.current.push(el);
    }
  };

  useEffect(() => {
    if (smoothScrolling) smoothScrolling();
    gsap.set(AllItemsRef.current, {
      rotation: containerRotation,
      xPercent: -5,
    });

    ItemRowRef.current.forEach((el, index) => {
      const affectOnScroll = affectOnScrollArr[index];

      watchDirection.current.push(1);
      let tl: any;
      gsap.set(el, { x: initialXOffsetFunction(index) });
      tl = gsap.to(el, {
        repeat: -1,
        x: () => `+=${getItemWidth() * 2}`,
        duration: duration[index],
        paused: affectOnScroll,
        ease: "none",
        modifiers: {
          x: gsap.utils.unitize((x) => {
            return wrap(x, -getItemWidth() * 2, 0);
          }),
        },
      });

      if (affectOnScroll)
        ScrollTrigger.create({
          trigger: ".react-infinite-text-reel-items",
          start: "top bottom",
          end: "bottom top",
          onEnter: () => {
            tl.play();
          },
          onEnterBack: () => tl.play(),
          onLeave: () => {
            gsap.killTweensOf(el);
          },
          onLeaveBack: () => {
            gsap.killTweensOf(el);
          },
          onUpdate: (self) => {
            let vel = self.getVelocity() / velocityOnScroll;
            if (directionChanged(index)) {
              console.log(self.direction, direction, index);
              tl = gsap.to(el, {
                repeat: -1,
                x: () =>
                  self.direction * directionArr[index] == 1
                    ? `+=${getItemWidth() * 2}`
                    : `-=${getItemWidth() * 2}`,
                duration: duration[index],
                ease: "none",
                modifiers: {
                  x: gsap.utils.unitize((x) => {
                    return wrap(x, getItemWidth() * -2, 0);
                  }),
                },
              });
            }
            if (vel > 1 || vel < -1) {
              tl.timeScale(Math.abs(vel));
            }

            direction.current = self.direction;
          },
        });
    });
  }, []);

  const renderItems = (text: string, rowIndex: number) => {
    return new Array(5).fill(1).map((_, itemIndex) => {
      const stroke = strokeFunction(itemIndex, rowIndex);

      return (
        <div
          ref={setItemRef}
          className={`react-infinite-text-reel-item ${
            stroke ? "react-infinite-text-reel-item-stroke" : ""
          } react-infinite-text-reel-row-${rowIndex + 1}-item-${itemIndex + 1}`}
        >
          <span>{text}</span>
        </div>
      );
    });
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <div ref={AllItemsRef} className="react-infinite-text-reel-items">
        {reelTexts.map((text, rowIndex) => (
          <div
            ref={setRowRef}
            className={`react-infinite-text-reel-row react-infinite-text-reel-row-${
              rowIndex + 1
            }`}
          >
            {renderItems(text, rowIndex)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteReel;
