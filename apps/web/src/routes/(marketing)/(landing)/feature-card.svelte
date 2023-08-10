<script>
  import FeatureGraph from "./feature-graph.svelte";
  import InsightTable from "./insight-table.svelte";
  import Particles from "./particles.svelte";
  import { slide } from "svelte/transition";
  //maybe we should change this to svelte built in alt or something
  import Motion from "svelte-motion/src/motion/MotionSSR.svelte";
</script>

<div class=" space-y-8 md:space-y-16 w-full">
  <section class=" relative w-full flex items-center flex-col">
    <h2 class=" md:text-xl font-medium mt-4 text-sm text-center text-slate-300">
      Privacy-focused web analytics platform for{" "}
      <span class="text-logo">Everyone</span>
      <p class=" text-slate-400 text-xs md:text-base">
        Get valuable insights about your website visitors without compromising
        their privacy.
      </p>
    </h2>
    <div class="border border-slate-900 relative bg">
      <div
        class="absolute inset-0 blur-2xl scale-110 rounded-full animate-spin-slow bg-gradient-to-tl from-slate-800 to-slate-700 opacity-20"
      />
      <Motion
        let:motion
        animate={{ x: "-50%" }}
        initial={{ x: "80%" }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <h1
          use:motion
          class="absolute top-10 text-center bg-gradient-to-tr from-white to-slate-400 font-medium bg-clip-text text-transparent"
        >
          privacy. analytics. insights. open source. secure. user-friendly.
          customizable. fast. lightweight. privacy. privacy.
        </h1>
      </Motion>
      <Particles />
      <div class="" />
    </div>
  </section>
  <div
    class=" flex items-center justify-center gap-4 w-full flex-col md:flex-row"
  >
    <InsightTable />
    <FeatureGraph />
  </div>
</div>

<style>
  .bg {
    pointer-events: none;
    user-select: none;
    position: relative;
    width: 50%;
    margin: 0px auto;
    height: 250px;
    overflow: hidden;
    -webkit-mask-image: radial-gradient(
      circle at center center,
      black,
      transparent 80%
    );
  }

  .bg::before {
    content: "";
    position: absolute;
    inset: 0px;
    background: radial-gradient(
      circle at bottom center,
      #1d1c2e,
      transparent 70%
    );
    opacity: 0.4;
  }

  .bg::after {
    content: "";
    position: absolute;
    background: rgba(31, 8, 52, 0.9);
    width: 200%;
    left: -50%;
    aspect-ratio: 1 / 0.7;
    border-radius: 50%;
    border-top: 1px solid rgba(197, 127, 118, 0.4);
    top: 50%;
  }
</style>
