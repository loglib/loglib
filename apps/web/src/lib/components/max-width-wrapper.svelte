<script>
  import { cn } from "$lib/utils";
  export let className = "";
</script>

<div class={cn("mx-auto w-full max-w-screen-xl px-2.5 md:px-20", className)}>
  <slot />
</div>
