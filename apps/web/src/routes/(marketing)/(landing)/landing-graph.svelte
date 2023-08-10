<script>
  import { onMount } from "svelte";
  import { fade, draw } from "svelte/transition";
  import { quintInOut } from "svelte/easing";

  let ready = false;
  onMount(() => (ready = true));
</script>

<div class=" md:flex items-center justify-center hidden">
  <svg
    class="main-svg"
    viewBox="0 0 800 600"
    height="400"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
  >
    <defs>
      <filter
        id="glow"
        x="-100%"
        y="-100%"
        width="350%"
        height="350%"
        color-interpolation-filters="sRGB"
      >
        <feGaussianBlur stdDeviation="5" result="coloredBlur" />
        <feOffset dx="0" dy="20" result="offsetblur" />
        <feFlood id="glowAlpha" flood-color="#000" flood-opacity="0.123" />
        <feComposite in2="offsetblur" operator="in" />
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <g id="graphTextGroup" opacity="0.5">
      <text
        transform="translate(48.33 473.71)"
        font-size="18"
        font-weight="700"
        class=" fill-black dark:fill-white stroke-black dark:stroke-white"
      >
        0 Visitors
      </text>

      <text
        transform="translate(48.33 301.71)"
        font-size="18"
        class=" fill-black dark:fill-white stroke-black dark:stroke-white"
      >
        200 Visitors
      </text>

      <text
        transform="translate(48.33 101.71)"
        font-size="18"
        class=" fill-black dark:fill-white stroke-black dark:stroke-white"
      >
        400 Visitors
      </text>
    </g>
    {#if ready}
      <g
        id="horizontalLinesGroup"
        fill="none"
        stroke="#FFF"
        stroke-miterlimit="10"
      >
        <line
          in:fade={{ delay: 200, duration: 500 }}
          x1="780"
          y1="481.7"
          opacity="0.2"
          x2="30"
          y2="481.7"
          class=" fill-black dark:fill-white stroke-black dark:stroke-white"
        />

        <line
          in:fade={{ delay: 400, duration: 500 }}
          x1="780"
          y1="381.7"
          opacity="0.2"
          x2="30"
          y2="381.7"
          class=" fill-black dark:fill-white stroke-black dark:stroke-white"
        />

        <line
          in:fade={{ delay: 600, duration: 500 }}
          x1="780"
          y1="281.7"
          opacity="0.2"
          x2="30"
          y2="281.7"
          class=" fill-black dark:fill-white stroke-black dark:stroke-white"
        />

        <line
          in:fade={{ delay: 800, duration: 500 }}
          x1="780"
          y1="181.7"
          opacity="0.2"
          x2="30"
          class=" fill-black dark:fill-white stroke-black dark:stroke-white"
          y2="181.7"
        />

        <line
          in:fade={{ delay: 1000, duration: 500 }}
          x1="780"
          y1="81.7"
          opacity="0.2"
          x2="30"
          y2="81.7"
          class=" fill-black dark:fill-white stroke-black dark:stroke-white"
        />
      </g>
    {/if}
    <g id="uiGroup" filter="url(#glow)">
      {#if ready}
        <path
          in:draw={{ duration: 2000, easing: quintInOut }}
          id="graphLine"
          fill="none"
          stroke-linecap="round"
          stroke="#F79819"
          stroke-width="4"
          stroke-miterlimit="10"
          d="M94.6,405.1
c62.9-95,109.2-111.7,142.4-103.8c44.6,10.6,74.8,67.9,143.4,63.8c35-2.1,32.7-17.4,73.9-21.7c77.7-8.2,105.9,44,136.3,13.6
c30.6-30.5,10.8-91.7,44.9-127.5c29.1-30.6,56.7,0,94.1-33.9c20.6-18.6,32.6-46.2,39.6-66.5"
        />

        <g id="connectorGroup">
          <line
            id="connector"
            x1="92"
            x2="92"
            y1="0"
            y2="0"
            class=" stroke-black dark:stroke-white"
          />
        </g>
      {/if}
    </g>
  </svg>
</div>

<style>
  .main-svg {
    position: absolute;
    transform: translate(-50%, 0%);
    overflow: visible;
  }
</style>
