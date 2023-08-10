<script>
  import MaxWidthWrapper from "$lib/components/max-width-wrapper.svelte";
</script>

<MaxWidthWrapper className="space-y-5 pt-20 md:space-y-10 relative">
  <div class="mx-auto max-w-md text-center sm:max-w-xl">
    <h2
      class="font-display text-white text-3xl font-extrabold leading-tight md:text-5xl sm:leading-tight"
    >
      A lot
      <span
        class="bg-gradient-to-br from-orange-600 to-orange-500 bg-clip-text pr-2 text-transparent"
      >
        In the making
      </span>
    </h2>
    <p class="mt-5 text-gray-600 text-sm sm:text-lg">
      Check out our changelog to see what&apos;s new on Loglib.
    </p>
  </div>
  <ul class="max-w-2xl md:mx-auto">
    <!-- {allChangelogPosts
            .sort(
                (a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
            )
            .slice(0, 6)
            .map((post) => (
                <li key={post.slug}>
                    <DesktopChangelogEntry post={post} />
                    <MobileChangelogEntry post={post} />
                </li>
            ))} -->
  </ul>
  <a
    href="/changelog"
    class="mx-auto block max-w-fit rounded-full border border-black hover:bg-slate-950 px-4 py-1.5 text-sm text-black hover:text-white bg-slate-100/90"
  >
    Full changelog
  </a>
</MaxWidthWrapper>
