/* eslint-disable @next/next/no-img-element */
import Link from "next/link"

import { getCurrentUser } from "@/lib/session"

import Changelog from "@/components/changelog"
import { HeroSection } from "@/components/landing/hero"
import { FeatureCard } from "@/components/landing/feature-cards"
import { FeatureAccordion } from "@/components/landing/feature-accordion"
import { RepurposeYourData } from "@/components/landing/repurpose-your-data"
import { Twitter } from "lucide-react"
import Background from "@/components/landing/grid-background/background"
import { Particles } from "@/components/landing/feature-cards/particles"

async function getGitHubStars() {
  try {
    const response = await fetch("https://api.github.com/repos/loglib/loglib", {
      next: {
        revalidate: 60,
      },
    })
    if (!response?.ok) {
      return null
    }
    const json = await response.json()
    const stars = parseInt(json["stargazers_count"]).toLocaleString()
    return stars
  } catch (error) {
    return null
  }
}
async function getGitHubContributors() {
  return await fetch(
    "https://api.github.com/repos/loglib/loglib/contributors",
    {
      method: "GET",
      redirect: "follow",
      next: {
        revalidate: 60,
      },
    }
  )
    .then((response) => response.text())
    .then((result) => JSON.parse(result).length)
    .catch((error) => console.log("error", error))
}

export default async function IndexPage() {
  const stars = await getGitHubStars()
  const contributors = await getGitHubContributors()
  const user = await getCurrentUser()
  return (
    <main className="  grid place-items-center  space-y-10 md:space-y-20">
      <HeroSection />
      <FeatureCard />
      <FeatureAccordion />
      <section className="w-full">
        <RepurposeYourData />
        <section className="w-full">
          <Changelog />
        </section>
      </section>

      <section className="max-w-8xl to-50 flex-col mx-auto mt-10 w-full rounded-3xl flex  md:flex-row md:justify-between justify-center md:items-start items-center  bg-gradient-to-br from-gray-100 px-4 dark:from-slate-900/80 dark:to-[#080812] sm:px-16 ">
        <div className="flex h-min px-2  flex-col justify-center gap-8 py-12">
          <h1 className="font-heading max-w-3xl text-3xl font-bold sm:text-6xl">
            Supported by the
            <span className="from-logo bg-gradient-to-br to-orange-600 bg-clip-text font-black uppercase text-transparent">
              {" "}
              Dope{" "}
            </span>
            #community
          </h1>
          <div className="flex flex-col gap-10 font-semibold sm:flex-row sm:gap-20">
            <div className="flex flex-col items-center justify-center rounded-lg  border border-gray-900 px-16 py-4 transition-colors duration-500 hover:border-gray-800">
              <div>
                <h1 className="font-heading bg-gradient-to-bl from-red-500 to-indigo-700 bg-clip-text text-5xl font-black text-transparent ">
                  0{stars}
                </h1>
                <p className="text-md  font-thin opacity-75">GitHub Stars</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg  border border-gray-900 px-16 py-4 transition-colors duration-500 hover:border-gray-800">
              <div>
                <h1 className="font-heading bg-gradient-to-tr from-red-500 to-indigo-700 bg-clip-text text-5xl font-black text-transparent ">
                  127
                </h1>
                <p className="text-md  font-thin opacity-75">Community</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-lg  border border-gray-900 px-16 py-4 transition-colors duration-500 hover:border-gray-800">
              <div>
                <h1 className="font-heading bg-gradient-to-br from-red-500 to-indigo-700 bg-clip-text text-5xl font-black text-transparent ">
                  {contributors <= 10
                    ? "00" + contributors
                    : contributors <= 100
                    ? "0" + contributors
                    : contributors}
                </h1>
                <p className="text-md font-thin opacity-75">Contributors</p>
              </div>
            </div>
          </div>
        </div>
        <div className=" py-12 px-2 flex items-center gap-2">
          <Link
            href="https://t.me/loglib_community"
            className=" cursor-pointer flex items-center gap-2 border-l px-2 border-l-slate-900"
          >
            <svg
              viewBox="0 0 24 24"
              className=" w-5 h-5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M12 4C10.4178 4 8.87103 4.46919 7.55544 5.34824C6.23985 6.22729 5.21447 7.47672 4.60897 8.93853C4.00347 10.4003 3.84504 12.0089 4.15372 13.5607C4.4624 15.1126 5.22433 16.538 6.34315 17.6569C7.46197 18.7757 8.88743 19.5376 10.4393 19.8463C11.9911 20.155 13.5997 19.9965 15.0615 19.391C16.5233 18.7855 17.7727 17.7602 18.6518 16.4446C19.5308 15.129 20 13.5823 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4ZM15.93 9.48L14.62 15.67C14.52 16.11 14.26 16.21 13.89 16.01L11.89 14.53L10.89 15.46C10.8429 15.5215 10.7824 15.5715 10.7131 15.6062C10.6438 15.6408 10.5675 15.6592 10.49 15.66L10.63 13.66L14.33 10.31C14.5 10.17 14.33 10.09 14.09 10.23L9.55 13.08L7.55 12.46C7.12 12.33 7.11 12.03 7.64 11.83L15.35 8.83C15.73 8.72 16.05 8.94 15.93 9.48Z"
                  fill="#fff"
                ></path>
              </g>
            </svg>
            <p>Telegram</p>
          </Link>
          <Link
            href="https://discord.gg/vBkrdDER"
            className=" flex items-center gap-2 cursor-pointer"
          >
            <svg
              viewBox="0 0 24 24"
              className=" w-5 h-5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M18.8944 4.34399C17.5184 3.71467 16.057 3.256 14.5317 3C14.3397 3.33067 14.1263 3.77866 13.977 4.13067C12.3546 3.89599 10.7439 3.89599 9.14394 4.13067C8.9946 3.77866 8.77059 3.33067 8.58925 3C7.05328 3.256 5.59194 3.71467 4.22555 4.34399C1.46289 8.41865 0.716219 12.3973 1.08955 16.3226C2.92421 17.6559 4.6949 18.4666 6.43463 19C6.86129 18.424 7.2453 17.8053 7.57597 17.1546C6.94663 16.92 6.3493 16.632 5.7733 16.2906C5.92263 16.184 6.07197 16.0667 6.21064 15.9493C9.68796 17.5387 13.4544 17.5387 16.889 15.9493C17.0383 16.0667 17.177 16.184 17.3263 16.2906C16.7503 16.632 16.153 16.92 15.5237 17.1546C15.8543 17.8053 16.2384 18.424 16.665 19C18.4037 18.4666 20.185 17.6559 22.0101 16.3226C22.4687 11.7787 21.2837 7.83202 18.8944 4.34399ZM8.05596 13.9013C7.01061 13.9013 6.15728 12.952 6.15728 11.7893C6.15728 10.6267 6.98928 9.67731 8.05596 9.67731C9.11194 9.67731 9.97591 10.6267 9.95457 11.7893C9.95457 12.952 9.11194 13.9013 8.05596 13.9013ZM15.065 13.9013C14.0197 13.9013 13.1653 12.952 13.1653 11.7893C13.1653 10.6267 13.9983 9.67731 15.065 9.67731C16.121 9.67731 16.985 10.6267 16.9637 11.7893C16.9637 12.952 16.1317 13.9013 15.065 13.9013Z"
                  fill="#fff"
                ></path>
              </g>
            </svg>
            <p>Discord</p>
          </Link>
          <Link
            href="https://twitter.com/loglib_io"
            className=" flex items-center gap-2 cursor-pointer"
          >
            <Twitter className=" w-5 h-5 text-white" />
            <p>Twitter</p>
          </Link>
        </div>
      </section>
    </main>
  )
}
