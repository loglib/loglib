<script>
  import Heading from "$lib/components/md/heading.svelte";
  import SvelteMarkdown from "svelte-markdown";
  import markdown from "$lib/content/docs/index.md?raw";
</script>

<div class=" h-screen text-white">
  <SvelteMarkdown
    source={markdown}
    renderers={{
      heading: Heading,
    }}
  />
</div>
