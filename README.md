# react-infinite-text-reel

## _The Last Reel, Ever_

## 🎉 Version 1.0.3.x is live ! 🎉

## Installation

### NPM

`npm install --save react-infinite-text-reel`

### Yarn

`yarn add react-infinite-text-reel`

![Example GIf](https://media.giphy.com/media/FD0vH6d9cKHou41e03/giphy.gif)

## Example app

You can look for an example [here](https://github.com/vineetpjp/react-infinite-text-reel/tree/master/example)
Make sure to install the latest version of the package before testing it out.

---

**Parameters:**

| Name                   | Required | Type      | Description                                                                                                                                   |
| ---------------------- | -------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| reelTexts              | Yes      | string[]  | An array of string for multiple reels altogether.                                                                                             |
| duration               | Yes      | number[]  | duration will determine the speed of reel. The smaller the faster it is.(keep it around `30` for better experience)                           |
| directionArr           | Yes      | number[]  | Determines the direction for each text reel.                                                                                                  |
| initialXOffsetFunction | no       | function  | This function helps in tweeking around the initialXOffset of the reel.(look for default parameter for more info.)                             |
| strokeFunction         | no       | function  | it determines if you want to make every second text stoke or depends on you                                                                   |
| affectOnScrollArr      | Yes      | boolean[] | Increases velocity of the reel based on scrolling speed(works best with smooth scrolling).                                                    |
| containerRotation      | no       | number    | This accepts degrees by which the whole container will be rotated - It looks cool. Make sure to keep it from `(-10 to 10)` or depends on you. |
| velocityOnScroll       | no       | number    | The larger the value the slower it will be (default-100).                                                                                     |
| smoothScrolling        | no       | any       | `Discussed about it ->below.`                                                                                                                 |

**Default Parameters:**

- containerRotation = `0`
- velocityOnScroll = `100`
- initialXOffsetFunction
  ```javascript
  (index: number) => (-index % 2) * 250,
  ```
  (`index`) here represent every text reel starting from 0
- strokeFunction
  ```javascript
  (itemIndex: number,rowIndex:number) => !(itemIndex % 2),
  ```

---

## Usage

> Note: `Make sure to include the css from node_modules`
> Your can change css to suite your need.

```javascript
import InfiniteTextReel from "react-infinite-text-reel";
import "react-infinite-text-reel/lib/css/text-reel.css";

<InfiniteTextReel
  reelTexts={["Vineet"]}
  affectOnScrollArr={[true]}
  directionArr={[1]}
  duration={[30]}
/>;
```

#

#

---

#

# _SmoothScrolling_

If you are using any external library for smooth scrolling
You need to pass your custom scrolling function as a parameter to `smoothScrolling`

_An Example is demonstrated below :_

```javascript
import ScrollBar from "smooth-scrollbar";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export default () => {
  let bodyScrollBar;

  bodyScrollBar = ScrollBar.init(document.querySelector("#viewport"), {
    damping: 0.07,
  });

  bodyScrollBar.track.xAxis.element.remove();

  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (arguments.length) {
        bodyScrollBar.scrollTop = value; // setter
      }
      return bodyScrollBar.scrollTop; // getter
    },

    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });
  // when the smooth scroller updates, tell ScrollTrigger to update() too:
  bodyScrollBar.addListener(ScrollTrigger.update);
};
```

`Now pass this function as a smoothScrolling parameter and everthing would work fine.`
✨ This can only be understood if you have some knowledge of integrating smooth scrolling with gsap.

## If you liked 🤩 it. Make sure to leave a ⭐ on my `github Repo`
