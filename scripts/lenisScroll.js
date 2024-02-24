import Lenis from "@studio-freight/lenis";

// Create a new Lenis instance
const lenis = new Lenis();

// Listen to scroll events
lenis.on("scroll", (e) => {
  // console.log(e)
});

// Call lenis.raf inside a requestAnimationFrame loop
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
