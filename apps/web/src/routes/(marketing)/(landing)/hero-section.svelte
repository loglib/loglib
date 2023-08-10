<script>
  import GridBackground from "../../../components/grid-background.svelte";
  import LandingGraph from "./landing-graph.svelte";
  import MagicText from "./magic-text.svelte";
</script>

<div
  class="relative flex max-w-8xl card bg-gradient-radial w-full justify-between px-8 py-10 pb-8 border border-slate-900 from-slate-700/10 to-[#080812] sm:min-h-fit md:px-16 md:py-20 md:pt-24 rounded-3xl shadow-slate-900 drop-shadow-xl"
>
  <GridBackground />
  <section class="flex flex-col space-y-8 z-10">
    <div class=" space-y-4">
      <a
        href="https://google.com"
        target="_blank"
        rel="noreferrer"
        class=" underline decoration-white"
      >
        <div class="mx-auto flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            class="  text-white h-5 w-5"
          >
            <path
              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
            />
          </svg>
          <h2 class="font-heading text-lg text-white leading-[1.1] md:text-xl">
            Proudly Open Source
          </h2>
        </div>
      </a>
      <MagicText />
    </div>
    <div class=" mt-8 space-y-4">
      <div class="flex flex-col gap-3 font-semibold">
        <p class="max-w-xl text-left text-xl tracking-wider text-orange-500">
          3 Easy Step To Setup
        </p>
        <div
          class="text-md flex flex-col gap-4 text-white sm:flex-row sm:text-lg"
        >
          <div class="flex gap-2">
            <span
              class="bg-gradient-to-br from-indigo-300 to-orange-600 bg-clip-text text-transparent"
            >
              01
            </span>
            <span class=" ">Create account</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="hidden aspect-square w-5 stroke-orange-300 stroke-2 sm:block"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            />
          </svg>
          <div class="flex gap-2">
            <span
              class="bg-gradient-to-br from-indigo-300 to-orange-600 bg-clip-text text-transparent"
            >
              02
            </span>
            <span class="">Add your website</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="hidden aspect-square w-5 stroke-orange-300 stroke-2 sm:block"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            />
          </svg>
          <div class="flex gap-2">
            <span
              class="bg-gradient-to-br from-indigo-300 to-orange-600 bg-clip-text text-transparent"
            >
              03
            </span>
            <span class="">Start tracking</span>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-6 font-semibold sm:flex-row">
        <div class=" relative mt-4">
          <a
            href="/login"
            class=" text-white border broder-slate-900 py-3 px-4 rounded-md shadow-md shadow-slate-900"
          >
            Get Started
          </a>
        </div>
        <div>
          <a
            href="https://loglib.io/demo"
            class=" flex items-center gap-4 rounded-md bg-gradient-to-tr from-purple-500/80 to-orange-600/60 bg-clip-text text-transparent transition-all duration-500 hover:gap-8 hover:text-gray-800 mt-4"
            target="_blank"
          >
            <span>Live Demo</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="aspect-square w-5 stroke-orange-300 stroke-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
  <LandingGraph />
</div>
