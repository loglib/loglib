<script lang="ts">
  import MaxWidthWrapper from "$lib/components/max-width-wrapper.svelte";
  import Accordion from "$lib/components/ui/accordion/Accordion.svelte";
  import AccordionContent from "$lib/components/ui/accordion/AccordionContent.svelte";
  import AccordionItem from "$lib/components/ui/accordion/AccordionItem.svelte";
  import AccordionTrigger from "$lib/components/ui/accordion/AccordionTrigger.svelte";
  import { BarChart, Filter, MousePointerClick, Users } from "lucide-svelte";
  import { slide } from "svelte/transition";
  import FeatureCard from "./feature-card.svelte";
  const featureList = [
    {
      key: "analytics",
      title: "Analytics that matter",
      icon: BarChart,
      description:
        "Get insights into your users, their devices, and their locations.",
      cta: { link: "/demo", title: "View Demo" },
      demo: "/assets/features/analytics.mp4",
      thumbnail: "/assets/features/analytics.png",
    },
    {
      key: "filters",
      title: "Advanced Filters",
      icon: Filter,
      description:
        "Combine multiple filters to create advanced filters for your data.",
      cta: { link: "/dashboard", title: "Add Your Website" },
      demo: "/assets/features/filters.mp4",
    },
    {
      key: "events",
      title: "Custom Events",
      icon: MousePointerClick,
      description:
        "Track custom events on your website and filter by them in your dashboard",
      cta: { link: "/dashboard", title: "Dashboard" },
      demo: "/assets/features/events.mp4",
    },
    {
      key: "team",
      title: "Collaborate with your team",
      icon: Users,
      description:
        "With Loglib, you can invite your teammates to collaborate on your websites.",
      cta: { link: "/dashboard", title: "Invite your teammates" },
      demo: "/assets/features/teams.mp4",
    },
  ];
  let activeFeature = featureList[0];
  let demo = featureList[0].demo;
  let value = "analytics";
  $: {
    activeFeature = featureList.find((f) => f.key === value) ?? featureList[0];
    demo =
      featureList.find((f) => f.key === value)?.demo ?? featureList[0].demo;
    console.log(demo);
  }
</script>

<MaxWidthWrapper>
  <div
    class="my-10 w-full overflow-hidden text-white rounded-xl border relative bg-slate-950/40 shadow-[inset_10px_-50px_94px_0_rgb(112, 128, 144, 0.2)] backdrop-blur h-max"
  >
    <div class="grid grid-cols-1 gap-10 p-5 lg:grid-cols-3">
      <Accordion bind:value>
        {#each featureList as Feature}
          <AccordionItem value={Feature.key}>
            <AccordionTrigger>
              <div class="flex items-center space-x-3 p-3">
                <Feature.icon />
                <h3 class="text-base font-semibold text-slate-100">
                  {Feature.title}
                </h3>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div class="p-3">
                <p class="mb-4 text-sm text-slate-200">
                  {Feature.description}
                </p>
                {#if Feature.cta}
                  <a
                    href="https://loglib.io/dashboard"
                    target="_blank"
                    rel="noreferrer"
                    class="block max-w-fit rounded-full border border-slate-900 bg-slate-200 px-4 py-1.5 text-sm text-slate-950 transition-all hover:bg-white hover:text-black"
                  >
                    {Feature.cta.title}
                  </a>
                {/if}
              </div>
            </AccordionContent>
          </AccordionItem>
        {/each}
      </Accordion>
      <div class="lg:col-span-2">
        <div
          class="relative min-h-[200px] w-full overflow-hidden flex h-full items-center justify-center px-6 rounded-md lg:w-[700px]"
        >
          <video
            autoPlay
            muted
            loop
            width={700}
            height={400}
            class="rounded-md"
            poster={activeFeature.thumbnail}
          >
            <source src={demo} type="video/mp4" class="rounded-md" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  </div>
</MaxWidthWrapper>
