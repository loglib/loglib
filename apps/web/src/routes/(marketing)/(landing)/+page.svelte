<script>
  import Accordion from "./accordion.svelte";
  import Changelog from "./changelog.svelte";
  import FeatureCard from "./feature-card.svelte";
  import Footer from "./footer.svelte";
  import HeroSection from "./hero-section.svelte";
  import RepurposeData from "./repurpose-data.svelte";
  import Stats from "./stats.svelte";
</script>

<main class="grid place-items-center space-y-10 md:space-y-20">
  <HeroSection />
  <FeatureCard />
  <Accordion />
  <RepurposeData />
  <Changelog />
  <Stats />
  <Footer />
</main>
