<script lang="ts">
  import { Accordion as AccordionPrimitive } from "radix-svelte";
  export let value: any = undefined;
</script>

<AccordionPrimitive.Root bind:value {...$$restProps}>
  <slot />
</AccordionPrimitive.Root>
