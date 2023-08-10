<script lang="ts">
  import MaxWidthWrapper from "$lib/components/max-width-wrapper.svelte";
  import { formatDate } from "$lib/utils";
  import type { ChangelogPost } from "contentlayer/generated";
  export let allChangelogPosts: ChangelogPost[];
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
    {#each allChangelogPosts as post}
      <li>
        <a
          href={`/changelog/${post.slug}`}
          class="group hidden md:flex items-center justify-center gap-2"
        >
          <dl>
            <dt class="sr-only">Published on</dt>
            <dd
              class="text-base font-medium underline text-gray-400 transition-colors group-hover:text-gray-700"
            >
              <time dateTime={post.publishedAt}
                >{formatDate(post.publishedAt)}</time
              >
            </dd>
          </dl>
          <h3
            class="text-2xl font-medium tracking-tight text-slate-700 dark:text-slate-400 transition-colors group-hover:dark:text-slate-100 group-hover:text-black/80"
          >
            {post.title}
          </h3>
        </a>
      </li>
    {/each}
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
