"use client"
// this is mostly from steven dub.sh
import Link from "next/link"

import MaxWidthWrapper from "@/components/max-width-wrapper"
import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { AnimatePresence, motion } from "framer-motion"

import { Airplay, Link2, PhoneOutgoing, QrCode, Users } from "lucide-react"
import { BarChart } from "lucide-react"

const featureList = [
  {
    key: "analytics",
    title: "Analytics that matter",
    icon: <BarChart className="h-5 w-5 text-gray-600" />,
    description:
      "Dub provides powerful analytics for your links, including geolocation, device, browser, and referrer information.",
    cta: (
      <Link
        href="/stats/github"
        className="block max-w-fit rounded-full border border-black bg-black px-4 py-1.5 text-sm text-white transition-all hover:bg-white hover:text-black"
      >
        View demo
      </Link>
    ),
    demo: "https://vgssydupjvshgeeeqjvo.supabase.co/storage/v1/object/public/images/869745cd-da8c-418b-8365-ba4a174cef6f.mp4",
    thumbnail: "/_static/features/analytics.png",
  },
  {
    key: "domains",
    title: "Use your own domain",
    icon: <Airplay className="h-5 w-5 text-gray-600" />,
    description:
      "Dub offers free custom domains on all plans - start personalizing your links today.",
    cta: (
      <a
        href="https://app.dub.sh"
        target="_blank"
        rel="noreferrer"
        className="block max-w-fit rounded-full border border-black bg-black px-4 py-1.5 text-sm text-white transition-all hover:bg-white hover:text-black"
      >
        Create your project
      </a>
    ),
    demo: "https://d2vwwcvoksz7ty.cloudfront.net/custom-domain.mp4",
  },
  {
    key: "link",
    title: "Powerful link builder",
    icon: <Link2 className="h-5 w-5 text-gray-600" />,
    description:
      "Build your links with UTM parameters, password protection, expiration dates, iOS/Android targeting, etc.",
    cta: "View demo", //custom cta
    demo: "https://d2vwwcvoksz7ty.cloudfront.net/link.mp4",
  },
  {
    key: "social",
    title: "Custom social media cards",
    icon: <PhoneOutgoing className="h-5 w-5 text-gray-600" />,
    description:
      "Overlay custom OG images on your links to make them stand out on social media.",
    cta: "View demo", //custom cta
    demo: "https://d2vwwcvoksz7ty.cloudfront.net/og.mp4",
  },

  {
    key: "team",
    title: "Collaborate with your team",
    icon: <Users className="h-5 w-5 text-gray-600" />,
    description:
      "With Dub, you can invite unlimited team members to collaborate on your project for free - no more sharing logins via Google groups.",
    cta: (
      <a
        href="https://app.dub.sh"
        target="_blank"
        rel="noreferrer"
        className="block max-w-fit rounded-full border border-black bg-black px-4 py-1.5 text-sm text-white transition-all hover:bg-white hover:text-black"
      >
        Invite your teammates
      </a>
    ),
    demo: "https://d2vwwcvoksz7ty.cloudfront.net/team.mp4",
  },
]

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0)

  return (
    <div id="features">
      {featureList.map(({ key, demo }) => (
        // preload videos
        <link key={key} rel="preload" as="video" href={demo} />
      ))}
      <MaxWidthWrapper className="pb-10">
        <div className="my-10 h-[840px]  w-full overflow-hidden text-white rounded-xl border relative  bg-slate-900/40 shadow-[inset_10px_-50px_94px_0_rgb(112, 128, 144, 0.2)] backdrop-blur lg:h-[630px]">
          <div className="grid grid-cols-1 gap-10 p-5 lg:grid-cols-3">
            <Accordion
              type="single"
              defaultValue="analytics"
              onValueChange={(e) => {
                setActiveFeature(featureList.findIndex(({ key }) => key === e))
              }}
            >
              {featureList.map(({ key, title, icon, description, cta }) => (
                <AccordionItem key={key} value={key}>
                  <AccordionTrigger>
                    <div className="flex items-center space-x-3 p-3">
                      {icon}
                      <h3 className="text-base font-semibold text-slate-100">
                        {title}
                      </h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-3">
                      <p className="mb-4 text-sm text-slate-200">
                        {description}
                      </p>
                      <button className="block max-w-fit rounded-full border border-black bg-white px-4 py-1.5 text-sm text-black transition-all hover:bg-white hover:text-black">
                        View demo
                      </button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {featureList.map((feature, index) => {
                  if (index === activeFeature) {
                    return (
                      <motion.div
                        key={feature.title}
                        initial={{
                          y: 10,
                          opacity: 0,
                        }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{
                          y: -10,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.15,
                          stiffness: 300,
                          damping: 30,
                        }}
                        className="relative min-h-[400px] w-full overflow-hidden flex h-full items-center justify-center px-6 rounded-md lg:w-[700px]"
                      >
                        <div className=" absolute top-0 w-full h-full bg-gradient-to-tr from-slate-900 to-slate-950 opacity-10 blur-2xl scale-125 "></div>
                        <video
                          autoPlay
                          muted
                          loop
                          width={700}
                          height={400}
                          className=" rounded-md"
                          poster={feature.thumbnail}
                        >
                          <source
                            src={feature.demo}
                            type="video/mp4"
                            className=" rounded-md"
                          />
                          Your browser does not support the video tag.
                        </video>
                      </motion.div>
                    )
                  }
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}
