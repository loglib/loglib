<script>
  import LandingNav from "./(landing)/landing-nav.svelte";
</script>

<div class=" dark bg-black">
  <div
    class=" px-16 h-full w-full bg-gradient-to-tr font-sans antialiased to-[#040116] from-[#090815] transition-all duration-300"
  >
    <LandingNav />
    <slot />
  </div>
</div>
