<script lang="ts">
  let stars = 27;
  let contributors = 0;
  async function getGitHubStars() {
    try {
      const response = await fetch(
        "https://api.github.com/repos/loglib/loglib"
      );
      if (!response?.ok) {
        return null;
      }
      const json = await response.json();
      stars = parseInt(json["stargazers_count"]);
      console.log(stars);
      return stars;
    } catch {
      return null;
    }
  }
  async function getGitHubContributors() {
    contributors = await fetch(
      "https://api.github.com/repos/loglib/loglib/contributors"
    )
      .then((response) => response.text())
      .then((result) => JSON.parse(result).length)
      .catch((error) => console.log("error", error));
  }
  getGitHubStars();
  getGitHubContributors();
</script>

<section
  class="max-w-8xl to-50 flex-col mx-auto mt-10 w-full rounded-3xl flex md:flex-row md:justify-between justify-center md:items-start items-center bg-gradient-to-br px-4 from-slate-900/80 to-[#080812] sm:px-16"
>
  <div class="flex h-min px-2 flex-col justify-center gap-8 py-12">
    <h1
      class="font-heading max-w-3xl text-3xl font-bold sm:text-6xl text-white"
    >
      Supported by the
      <span
        class="from-logo bg-gradient-to-br to-orange-600 bg-clip-text font-black uppercase text-transparent"
      >
        Dope
      </span>
      #community
    </h1>
    <div class="flex flex-col gap-10 font-semibold sm:flex-row sm:gap-20">
      <div
        class="flex flex-col items-center justify-center rounded-lg border border-gray-900 px-16 py-4 transition-colors duration-500 hover:border-gray-800"
      >
        <div>
          <h1
            class="font-heading bg-gradient-to-bl from-red-500 to-indigo-700 bg-clip-text text-5xl font-black text-transparent"
          >
            0{stars}
          </h1>
          <p class="text-md font-thin opacity-75 text-white">GitHub Stars</p>
        </div>
      </div>
      <div
        class="flex flex-col items-center justify-center rounded-lg border border-gray-900 px-16 py-4 transition-colors duration-500 hover:border-gray-800 text-white"
      >
        <div>
          <h1
            class="font-heading bg-gradient-to-tr from-red-500 to-indigo-700 bg-clip-text text-5xl font-black text-transparent"
          >
            127
          </h1>
          <p class="text-md font-thin opacity-75">Community</p>
        </div>
      </div>

      <div
        class="flex flex-col items-center justify-center rounded-lg border border-gray-900 px-16 py-4 transition-colors duration-500 hover:border-gray-800 text-white"
      >
        <div>
          <h1
            class="font-heading bg-gradient-to-br from-red-500 to-indigo-700 bg-clip-text text-5xl font-black text-transparent"
          >
            {contributors <= 10
              ? `00${contributors}`
              : contributors <= 100
              ? `0${contributors}`
              : contributors}
          </h1>
          <p class="text-md font-thin opacity-75">Contributors</p>
        </div>
      </div>
    </div>
  </div>
</section>
