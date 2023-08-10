<script lang="ts">
  import { fade } from "svelte/transition";
  import { inview } from "svelte-inview";
  import AccordionFeatures from "./accordion-features.svelte";
  let isInView = false;
</script>

<div
  use:inview={{ unobserveOnEnter: true, rootMargin: "-20%" }}
  on:inview_enter={() => {
    isInView = true;
  }}
>
  <div
    class=" space-y-8 md:space-y-16 w-full flex items-center flex-col justify-center relative"
  >
    <div class=" space-y-6 text-center" in:fade>
      <h2 class=" font-medium text-3xl encbSy">
        <span class="magic-text">Beyond</span>{" "}
        <span class=" text-white">
          <span class=" font-bold">the basics</span>
        </span>
      </h2>
      <p class=" text-slate-300">
        Loglib is beyond a basic analytics tool, it&apos;s a powerful tool that
        can help you understand your users and your product better.
      </p>
    </div>
    <AccordionFeatures />
  </div>
</div>

<style>
  @keyframes background-pan {
    from {
      background-position: 0% center;
    }

    to {
      background-position: -200% center;
    }
  }

  .magic-text {
    animation: background-pan 3s linear infinite;
    background: linear-gradient(
      to right,
      rgba(203, 75, 5, 0.776),
      rgb(116, 53, 11),
      rgb(255, 210, 143),
      rgba(203, 75, 5, 0.776)
    );
    background-size: 200%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    white-space: nowrap;
  }
</style>
