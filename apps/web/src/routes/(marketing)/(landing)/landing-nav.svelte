<script lang="ts">
  import { cn } from "$lib/utils";
  import { page } from "$app/stores";
  $: pathname = $page.url.pathname;
</script>

<header
  class="flex items-center justify-between top-0 md:px-16 px-4 max-w-8xl sticky mb-16 w-full z-50 bg-white/60 backdrop-blur-sm dark:bg-slate-950/80 py-4 dark:border-slate-800 border-slate-300"
>
  <div
    class=" absolute h-1 bottom-0 w-full"
    style="background:radial-gradient(62.87% 100% at 50% 100%,rgba(255,255,255,.12) 0%,rgba(255,255,255,0) 100%);"
  />
  <!-- icon -->
  <div />
  <div class=" hidden md:block">
    <div
      class=" relative overflow-hidden rounded-xl [--duration:500ms] [transform:translateZ(0)]"
    >
      <nav
        class="relative w-full rounded-xl border border-black/10 p-2 dark:border-white/10"
      >
        <div
          class="dark:bg-logo/95 absolute bottom-0 left-0 h-1/2 w-[var(--width)] translate-x-2 bg-black/75 blur-xl transition-[width,transform] duration-500 {pathname ===
            '/' && 'translate-x-2'} {pathname === '/pricing' &&
            'translate-x-20'}"
          style="width: 84.5px; left: 0px;"
        />
        <div
          class="absolute inset-0 rounded-xl bg-gradient-to-tr backdrop-blur-md dark:from-slate-950 dark:to-slate-950/80"
        />
        <div class="relative">
          <div
            class={cn(
              "bg-black/39 dark:bg-logo/30 absolute bottom-0 left-0 h-1/3 w-7 translate-x-2 translate-y-full rounded-full blur-md transition-[width,transform] duration-500 {pathname && 'translate-x-2'}",
              pathname === "/pricing" && "translate-x-20",
              pathname?.includes("/changelog") && "translate-x-44",
              pathname?.includes("/docs") && " translate-x-72"
            )}
            style="width: 84.5px; left: 0px;"
          />
          <ul class="relative flex items-center gap-4">
            <li class="">
              <a href="/">
                <button
                  type="button"
                  class={cn(
                    "px-4 py-1 text-sm font-light text-black/60 transition-[text-shadow,color] duration-200 hover:text-black/80 focus:outline-none dark:text-white/60 dark:hover:text-white/75",
                    pathname === "/" && "text-black/80 dark:text-white/75"
                  )}
                >
                  Home
                </button>
              </a>
            </li>

            <li class="">
              <a href="/pricing">
                <button
                  type="button"
                  class={cn(
                    "text-black/6 0 px-4 py-1 text-sm font-light transition-[text-shadow,color] duration-200 hover:text-black/80 focus:outline-none dark:text-white/60 dark:hover:text-white/75",
                    pathname === "/pricing" &&
                      "text-black/80 dark:text-white/75"
                  )}
                >
                  Pricing
                </button>
              </a>
            </li>

            <li class="hidden md:block">
              <a href="/changelog">
                <button
                  type="button"
                  class={cn(
                    "px-4 py-1 text-sm font-light text-black/60 transition-[text-shadow,color] duration-200 hover:text-black/80 focus:outline-none dark:text-white/60 dark:hover:text-white/75",
                    pathname?.includes("/docs") &&
                      "text-black/80 dark:text-white/75"
                  )}
                >
                  Changelog
                </button>
              </a>
            </li>
            <li class="hidden md:block">
              <a href="/docs">
                <button
                  type="button"
                  class={cn(
                    "px-4 py-1 text-sm font-light text-black/60 transition-[text-shadow,color] duration-200 hover:text-black/80 focus:outline-none dark:text-white/60 dark:hover:text-white/75",
                    pathname?.includes("/docs") &&
                      "text-black/80 dark:text-white/75"
                  )}
                >
                  Docs
                </button>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
  <div class="flex items-center gap-2 font-medium">
    <a href="/login">
      <button>Login</button>
    </a>
    <!-- 
    <div
      class="relative col-span-1 select-none flex-col items-center justify-center self-center lg:flex"
    >
      <button id="dark-switch">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 53 53"
          class="h-5 w-5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M26.5 46.375C24.0708 46.375 21.9913 45.5101 20.2615 43.7802C18.5316 42.0504 17.6667 39.9708 17.6667 37.5417H11.0417C9.82709 37.5417 8.78696 37.1088 7.9213 36.2432C7.05563 35.3775 6.62353 34.3381 6.625 33.125C6.625 27.9722 8.31806 23.5276 11.7042 19.7911C15.0903 16.0546 19.2861 13.911 24.2917 13.3604V8.83334C24.2917 8.20765 24.5037 7.6828 24.9277 7.2588C25.3517 6.8348 25.8758 6.62354 26.5 6.62501C27.1257 6.62501 27.6505 6.83701 28.0745 7.26101C28.4985 7.68501 28.7098 8.20912 28.7083 8.83334V13.3604C33.7139 13.9125 37.9097 16.0568 41.2958 19.7933C44.6819 23.5298 46.375 27.9737 46.375 33.125C46.375 34.3396 45.9422 35.3797 45.0765 36.2454C44.2108 37.111 43.1714 37.5431 41.9583 37.5417H35.3333C35.3333 39.9708 34.4684 42.0504 32.7385 43.7802C31.0087 45.5101 28.9292 46.375 26.5 46.375ZM11.0417 33.125H41.9583C41.9583 28.8556 40.4493 25.2118 37.4313 22.1938C34.4132 19.1757 30.7694 17.6667 26.5 17.6667C22.2306 17.6667 18.5868 19.1757 15.5688 22.1938C12.5507 25.2118 11.0417 28.8556 11.0417 33.125Z"
            fill="#161010"
            class="transition-all duration-700 dark:fill-white"
          />
        </svg>
      </button>
      <audio id="switch-on" src="/audio/switch-on.mp3" />
      <audio id="switch-off" src="/audio/switch-off.mp3" />
    </div> -->
  </div>
</header>
