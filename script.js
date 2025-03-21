function LocomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);
  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);
  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
LocomotiveAnimation();

// LogoScrolling Animation
function LogoScrolling() {
  gsap.to(".nav-part1 svg", {
    transform: "translateY(-100%)",
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      start: "top 0%",
      end: "top -5%",
      scrub: true,
    },
  });
  gsap.to(".nav-part2 .links", {
    transform: "translateY(-100%)",
    opacity: 0,
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      start: "top 0%",
      end: "top -5%",
      scrub: true,
    },
  });
}
LogoScrolling();
function VideoConFunction() {
  let videoCon = document.querySelector(".video-container");
  let playBtn = document.querySelector("#play");
  videoCon.addEventListener("mouseenter", () => {
    gsap.to(playBtn, {
      opacity: 1,
      scale: 1,
    });
  });
  videoCon.addEventListener("mouseleave", () => {
    gsap.to(playBtn, {
      opacity: 0,
      scale: 0,
    });
  });

  videoCon.addEventListener("mousemove", (dets) => {
    const rect = videoCon.getBoundingClientRect(); // Get container position
    gsap.to(playBtn, {
      x: dets.clientX - rect.left - 50, // Corrected subtraction
      y: dets.clientY - rect.top - 50,
      cursor: "pointer",
    });
  });
}
VideoConFunction();

// Heading Animations
function HeadingImageAnimation() {
  gsap.from("#page1 h1", {
    duration: 1,
    delay: 0.5,
    y: 100,
    opacity: 0,
    stagger: 0.2,
  });
  gsap.from("#page1 .video-container", {
    duration: 0.6,
    delay: 1.3,
    scale: 0.85,
    opacity: 0,
  });
}
HeadingImageAnimation();

// cursor animation
document.addEventListener("mousemove", (dets) => {
  gsap.to("#cursor", {
    x: dets.clientX - 50,
    y: dets.clientY - 50,
  });
});

// const page3 = document.querySelector("#page3");
// page3.addEventListener("mousemove", (dets) => {
//   const rect = page3.getBoundingClientRect(); // Get container position
//   gsap.to("#cursor", {
//     x: dets.clientX - rect.left, // Corrected subtraction
//     y: dets.clientY - rect.top,
//     cursor: "pointer",
//   });
// });

// Hovering effects on the images of the page3
function HoveringEffects() {
  const childs = document.querySelectorAll(".child");
  childs.forEach((child) => {
    child.addEventListener("mouseenter", () => {
      gsap.to("#cursor", {
        transform: "translate(-50%, -50%) scale(1)",
      });
    });
  });
  childs.forEach((child) => {
    child.addEventListener("mouseleave", () => {
      gsap.to("#cursor", {
        transform: "translate(-50%, -50%) scale(0)",
      });
    });
  });
}
HoveringEffects();
