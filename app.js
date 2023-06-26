const tlEnter = gsap.timeline({
  defaults: { duration: 0.75, ease: "Power2.easeOut" },
});
const tlLeave = gsap.timeline({
  defaults: { duration: 0.75, ease: "Power2.easeOut" },
});

const leaveAnimation = (current, done) => {
  const product = current.querySelector(".image-container");
  const text = current.querySelector(".showcase-text");
  const circles = current.querySelectorAll(".circle");
  const arrow = current.querySelector(".showcase-arrow");

  return (
    tlLeave.fromTo(arrow, { opacity: 1, x: 0 }, { opacity: 0, x: 50 }),
    tlLeave.fromTo(product, { y: 0, opacity: 1 }, { y: 100, opacity: 0 }, "<"),
    tlLeave.fromTo(
      text,
      { y: 0, opacity: 1 },
      { y: 100, opacity: 0, onComplete: done },
      "<"
    ),
    tlLeave.fromTo(
      circles,
      { y: 0, opacity: 1 },
      {
        y: -200,
        opacity: 0,
        stagger: 0.1,
        ease: "back.out(1.7)",
        duration: 0.5,
      },
      "<"
    )
  );
};

const enterAnimation = (current, done, gradient) => {
  const product = current.querySelector(".image-container");
  const text = current.querySelector(".showcase-text");
  const circles = current.querySelectorAll(".circle");
  const arrow = current.querySelector(".showcase-arrow");

  return (
    tlEnter.from(current, { autoAlpha: 0 }),
    tlEnter.fromTo(arrow, { opacity: 0 }, { opacity: 1 }),
    tlEnter.to("body", { background: gradient }, "<"),
    tlEnter.fromTo(product, { y: -100, opacity: 0 }, { y: 0, opacity: 1 }, "<"),
    tlEnter.fromTo(
      text,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, onComplete: done },
      "<"
    ),
    tlEnter.fromTo(
      circles,
      { y: -200, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "back.out(1.7)",
        duration: 0.5,
      },
      "<"
    )
  );
};

//  Barba page transition
const init = () =>
  barba.init({
    preventRunning: true,
    transitions: [
      {
        name: "default",
        once(data) {
          const done = this.async();
          let next = data.next.container;
          let gradient = getGradient(data.next.namespace);
          gsap.set("body", { background: gradient });
          enterAnimation(next, done, gradient);
        },
        leave(data) {
          const done = this.async();
          let current = data.current.container;
          leaveAnimation(current, done);
        },
        enter(data) {
          const done = this.async();
          let next = data.next.container;
          let gradient = getGradient(data.next.namespace);
          enterAnimation(next, done, gradient);
        },
      },
      // product page
      {
        name: "product-transition",
        sync: true,
        from: { namespace: ["handbag", "boot", "hat"] },
        to: { namespace: ["product"] },
        leave(data) {
          const done = this.async();
          let current = data.current.container;
          productLeaveAnimation(current, done);
        },
        enter(data) {
          const done = this.async();
          let next = data.next.container;
          productEnterAnimation(next, done);
        },
      },
    ],
  });

const productEnterAnimation = function (next, done) {
  tlEnter.fromTo(next, { y: "100%" }, { y: "0%" });
  tlEnter.fromTo(
    ".card",
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, stagger: 0.1, onComplete: done }
  );
};

const productLeaveAnimation = function (next, done) {
  tlLeave.fromTo(next, { y: "0%" }, { y: "-120%", onComplete: done });
};

const getGradient = function (name) {
  switch (name) {
    case "handbag":
      return "linear-gradient(260deg, #b75d62, #754d4f)";
    case "boot":
      return "linear-gradient(260deg, #5d8cb7, #4c4f70)";
    case "hat":
      return "linear-gradient(260deg, #b27a5c, #7f5450)";
  }
};

window.addEventListener("load", () => {
  init();
});
