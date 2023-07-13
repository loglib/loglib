"use client"
import Image from "next/image"
import Link from "next/link"
import Features from "./features"
import styles from "./features.module.css"
import ScrollAnimation from "react-animate-on-scroll"
import { useScroll, motion } from "framer-motion"

export const Section3 = () => {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className=" space-y-8 md:space-y-16 w-full flex items-center  flex-col justify-center relative"
    >
      <div className=" space-y-6 text-center">
        <h2 className=" font-medium text-3xl encbSy">
          <span className={styles.magicText}>Beyond</span>{" "}
          <span className=" ">
            <span className=" font-bold">the basics</span>
          </span>
        </h2>

        <p className=" text-slate-300">
          Loglib is beyond a basic analytics tool, it's a powerful tool that can
          help you understand your users and your product better.
        </p>
      </div>

      <Features />

      {/* <section className="relative mx-4 md:mx-0">
        <div className="relative bg-gradient-br from-slate-900/40 to-slate-900/20 backdrop-blur-sm flex w-10/12 border-spacing-2  flex-col items-center border border-black/20 p-6 decoration-dashed dark:border-white/20 md:w-1/2 lg:flex-row lg:space-x-8">
          <div className="border dark:border-white/40 border-black/50 border-dashed p-1 absolute -top-5 -left-4">
            <div className="text-xs text-white md:text-sm font-bold bg-gradient-to-tr from-zinc-800 to-gray-700 px-2 py-1">
              Coming Soon
            </div>
          </div>
          <Image
            src="/assets/bot-white.svg"
            className="h-20 w-16"
            alt=""
            width={64}
            height={80}
          />
          <div>
            <p className="md:text-3xl text-xl font-bold bg-gradient-to-br from-logo to-yellow-800 text-transparent bg-clip-text">
              Integrated Artifical Intelligence
            </p>
            <p className="max-w-md text-sm">
              master at juicy summarizations, eye-opening insights, and clever
              suggestions yours truly
              <span className="font-semibold text-gold">co-pilot 👀</span>
              on the stranded land of logs .
            </p>
          </div>
        </div>

        <svg
          width="33"
          height="26"
          viewBox="0 0 33 26"
          className="absolute left-1/2 -mx-4 -mt-3"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="5.58862"
            y="-2"
            width="33.7566"
            height="15.286"
            rx="7"
            transform="rotate(29.7652 5.58862 -2)"
            fill="#F89624"
          ></rect>
        </svg>

        <div className="ml-auto  flex w-10/12 border-spacing-2 flex-col items-center border border-dashed border-black/40 border-opacity-25 bg-white/10 p-6 px-10 dark:border-white/25 dark:bg-black/10 md:w-1/2 lg:flex-row lg:space-x-5">
          <svg
            height="200px"
            className=" h-16 w-16 fill-gray-800 dark:fill-white/90"
            width="200px"
            version="1.1"
            id="_x32_"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g>
                {" "}
                <path d="M153.527,138.934c-0.29,0-0.581,0.088-0.826,0.258L0.641,242.995C0.238,243.27,0,243.721,0,244.213v27.921 c0,0.484,0.238,0.943,0.641,1.21l152.06,103.811c0.246,0.17,0.536,0.258,0.826,0.258c0.238,0,0.468-0.064,0.686-0.169 c0.484-0.258,0.782-0.758,0.782-1.306v-44.478c0-0.476-0.238-0.936-0.641-1.202L48.769,258.166l105.585-72.068 c0.403-0.282,0.641-0.734,0.641-1.226V140.41c0-0.548-0.298-1.049-0.782-1.299C153.995,138.991,153.765,138.934,153.527,138.934z"></path>{" "}
                <path d="M511.358,242.995l-152.06-103.803c-0.246-0.169-0.536-0.258-0.827-0.258c-0.238,0-0.467,0.056-0.685,0.177 c-0.484,0.25-0.782,0.751-0.782,1.299v44.478c0,0.484,0.238,0.936,0.641,1.21l105.586,72.068l-105.586,72.092 c-0.403,0.266-0.641,0.725-0.641,1.217v44.462c0,0.548,0.298,1.049,0.782,1.306c0.218,0.105,0.448,0.169,0.685,0.169 c0.291,0,0.581-0.088,0.827-0.258l152.06-103.811c0.404-0.267,0.642-0.726,0.642-1.21v-27.921 C512,243.721,511.762,243.27,511.358,242.995z"></path>{" "}
                <path d="M325.507,114.594h-42.502c-0.629,0-1.186,0.395-1.387,0.984l-96.517,279.885 c-0.153,0.443-0.08,0.943,0.194,1.322c0.278,0.387,0.722,0.621,1.198,0.621h42.506c0.625,0,1.182-0.395,1.387-0.992l96.513-279.868 c0.153-0.452,0.081-0.952-0.193-1.339C326.427,114.828,325.982,114.594,325.507,114.594z"></path>{" "}
              </g>{" "}
            </g>
          </svg>

          <div>
            <p className="text-xl font-bold md:text-3xl">
              Embeddable in your app
            </p>
            <p className="max-w-md text-sm">
              The self hosted version of loglib is fully embeddable inside your
              app and can use your current database.{" "}
              <Link
                target="_blank"
                className=" text-blue-500"
                href="https://github.com/loglib/loglib"
              >
                Learn more
              </Link>
            </p>
          </div>
        </div>

        <div className="relative z-10 bg-gradient-tr from-slate-800 to-slate-900/20 backdrop-blur-md -mt-2 flex w-10/12 border-spacing-2 flex-col items-center space-x-4 border border-black/20 border-opacity-25 p-6 dark:border-white/25 md:w-[52%] lg:flex-row">
          <div className="absolute -left-4 -top-5 border border-dashed border-black/50 p-1 dark:border-white/40">
            <div className="bg-gradient-to-tr from-orange-800/80 to-yellow-700 px-2 py-1 text-xs font-bold text-white md:text-sm">
              Coming Soon
            </div>
          </div>
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M46.3955 9.36182C46.4316 9.36729 46.3014 9.3721 46.0331 9.3721C44.0084 9.3721 42.1197 11.5662 42.1197 14.5674C42.1197 16.0801 42.6351 17.4339 43.3911 18.3715L44.5086 19.7524L42.7518 20.0226C41.5968 20.1995 40.8199 20.7261 40.1678 21.5913C39.5157 22.4564 39.0364 23.6891 38.7186 25.1289C38.1514 27.6983 38.1072 30.8629 38.1033 33.6772H41.4325L41.4974 34.6309L42.2733 46.2896H49.4716L50.3498 34.6203L50.4217 33.6771H53.9217C53.8955 30.9008 53.7445 27.7782 53.1185 25.2279C52.767 23.7966 52.2672 22.5641 51.6214 21.6868C50.9756 20.8097 50.2324 20.2814 49.2082 20.0907L47.4888 19.7695L48.6135 18.4297C49.4041 17.4865 49.9464 16.1177 49.9464 14.5673C49.9464 11.752 48.2511 9.60102 46.4157 9.36521L46.3952 9.36193L46.3955 9.36182ZM19.626 9.73096C14.6057 9.73161 8.70554 10.3186 1.94824 11.6893V13.7812C31.2627 9.66347 39.3047 17.9539 26.6943 22.4595C13.8617 27.0445 3.67057 50.0502 44.1294 52.0557C44.6065 52.1036 45.0973 52.1308 45.5989 52.1308C48.0358 52.1308 50.2299 51.5345 51.7376 50.644C53.2456 49.7537 53.9902 48.6599 53.9902 47.5919C53.9902 46.5238 53.2456 45.4302 51.7377 44.5397C51.7126 44.5246 51.685 44.5099 51.6593 44.495L51.4405 47.3902L51.3687 48.3369H40.3593L40.2977 47.3799L39.939 41.9658C25.9178 42.2721 22.0829 30.9726 31.1787 27.6957C33.4083 26.8924 35.235 25.9636 36.6679 24.958C36.6865 24.8681 36.7029 24.777 36.7226 24.6879C37.0794 23.072 37.6256 21.5709 38.5376 20.3608C39.0785 19.643 39.7669 19.0406 40.5851 18.6141C40.2434 13.9605 33.1109 9.72888 19.6259 9.73096H19.626Z"
              fill="#EAD5D5"
              className="fill-black/80 dark:fill-[#EAD5D5]"
            ></path>
          </svg>
          <div>
            <p className="text-xl font-bold md:text-3xl">Journey builder</p>
            <p className="max-w-md text-sm">
              build a journey using events or page views and get analyzed
              information about your funnel and your users flow.
            </p>
          </div>
        </div>
        <div className="relative -mt-3 ml-auto flex w-10/12 border-spacing-2 flex-col items-center border border-black/40 border-opacity-25 bg-white/10 p-6 px-10 dark:border-white/20 dark:bg-black/10 md:w-[50%] lg:flex-row lg:space-x-5">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 10C17.3478 10 14.8043 11.0536 12.9289 12.9289C11.0536 14.8043 10 17.3478 10 20V27.5C10 28.163 10.2634 28.7989 10.7322 29.2678C11.2011 29.7366 11.837 30 12.5 30C13.163 30 13.7989 29.7366 14.2678 29.2678C14.7366 28.7989 15 28.163 15 27.5V20C15 18.6739 15.5268 17.4021 16.4645 16.4645C17.4021 15.5268 18.6739 15 20 15H27.5C28.163 15 28.7989 14.7366 29.2678 14.2678C29.7366 13.7989 30 13.163 30 12.5C30 11.837 29.7366 11.2011 29.2678 10.7322C28.7989 10.2634 28.163 10 27.5 10H20ZM20 70C17.3478 70 14.8043 68.9464 12.9289 67.0711C11.0536 65.1957 10 62.6522 10 60V52.5C10 51.837 10.2634 51.2011 10.7322 50.7322C11.2011 50.2634 11.837 50 12.5 50C13.163 50 13.7989 50.2634 14.2678 50.7322C14.7366 51.2011 15 51.837 15 52.5V60C15 61.3261 15.5268 62.5979 16.4645 63.5355C17.4021 64.4732 18.6739 65 20 65H27.5C28.163 65 28.7989 65.2634 29.2678 65.7322C29.7366 66.2011 30 66.837 30 67.5C30 68.163 29.7366 68.7989 29.2678 69.2678C28.7989 69.7366 28.163 70 27.5 70H20ZM70 20C70 17.3478 68.9464 14.8043 67.0711 12.9289C65.1957 11.0536 62.6522 10 60 10H52.5C51.837 10 51.2011 10.2634 50.7322 10.7322C50.2634 11.2011 50 11.837 50 12.5C50 13.163 50.2634 13.7989 50.7322 14.2678C51.2011 14.7366 51.837 15 52.5 15H60C61.3261 15 62.5979 15.5268 63.5355 16.4645C64.4732 17.4021 65 18.6739 65 20V27.5C65 28.163 65.2634 28.7989 65.7322 29.2678C66.2011 29.7366 66.837 30 67.5 30C68.163 30 68.7989 29.7366 69.2678 29.2678C69.7366 28.7989 70 28.163 70 27.5V20ZM60 70C62.6522 70 65.1957 68.9464 67.0711 67.0711C68.9464 65.1957 70 62.6522 70 60V52.5C70 51.837 69.7366 51.2011 69.2678 50.7322C68.7989 50.2634 68.163 50 67.5 50C66.837 50 66.2011 50.2634 65.7322 50.7322C65.2634 51.2011 65 51.837 65 52.5V60C65 61.3261 64.4732 62.5979 63.5355 63.5355C62.5979 64.4732 61.3261 65 60 65H52.5C51.837 65 51.2011 65.2634 50.7322 65.7322C50.2634 66.2011 50 66.837 50 67.5C50 68.163 50.2634 68.7989 50.7322 69.2678C51.2011 69.7366 51.837 70 52.5 70H60ZM27.5 45C27.5 41.6848 28.817 38.5054 31.1612 36.1612C33.5054 33.817 36.6848 32.5 40 32.5C43.3152 32.5 46.4946 33.817 48.8388 36.1612C51.183 38.5054 52.5 41.6848 52.5 45C52.5 48.3152 51.183 51.4946 48.8388 53.8388C46.4946 56.183 43.3152 57.5 40 57.5C36.6848 57.5 33.5054 56.183 31.1612 53.8388C28.817 51.4946 27.5 48.3152 27.5 45ZM40 37.5C38.0109 37.5 36.1032 38.2902 34.6967 39.6967C33.2902 41.1032 32.5 43.0109 32.5 45C32.5 46.9891 33.2902 48.8968 34.6967 50.3033C36.1032 51.7098 38.0109 52.5 40 52.5C41.9891 52.5 43.8968 51.7098 45.3033 50.3033C46.7098 48.8968 47.5 46.9891 47.5 45C47.5 43.0109 46.7098 41.1032 45.3033 39.6967C43.8968 38.2902 41.9891 37.5 40 37.5ZM16.57 39.82C17.1853 40.0665 17.8733 40.0586 18.4828 39.7979C19.0922 39.5372 19.5732 39.0452 19.82 38.43L19.845 38.38L19.985 38.08C20.12 37.805 20.345 37.395 20.665 36.88C21.5589 35.4833 22.635 34.2121 23.865 33.1C26.88 30.365 31.92 27.5 40 27.5C48.085 27.5 53.12 30.365 56.13 33.1C57.655 34.485 58.69 35.865 59.33 36.885C59.6357 37.3658 59.9112 37.8651 60.155 38.38C60.155 38.38 61.375 40.64 63.43 39.82C64.0452 39.5732 64.5372 39.0922 64.7979 38.4828C65.0586 37.8733 65.0665 37.1853 64.82 36.57V36.56L64.81 36.54L64.785 36.49C64.6935 36.2711 64.5934 36.056 64.485 35.845C64.2023 35.2849 63.8919 34.7392 63.555 34.21C62.4219 32.433 61.0565 30.8154 59.495 29.4C55.625 25.885 49.41 22.5 39.995 22.5C30.585 22.5 24.37 25.885 20.505 29.4C18.9416 30.8149 17.5745 32.4326 16.44 34.21C15.978 34.9408 15.567 35.7026 15.21 36.49L15.19 36.54L15.18 36.565C14.9335 37.1803 14.9415 37.8733 15.2021 38.4828C15.4628 39.0922 15.9548 39.5732 16.57 39.82Z"
              className="fill-black/80 dark:fill-[#CED2CD]"
            ></path>
          </svg>
          <div>
            <p className="text-xl font-bold md:text-3xl">Event tracking</p>
            <p className="max-w-md text-sm">
              With automatic and manual event tracking view how users interact
              with your website.
            </p>
          </div>
        </div>

        <svg
          width="33"
          height="26"
          viewBox="0 0 33 26"
          className="absolute left-1/2 -mx-4 -mt-3 z-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="5.58862"
            y="-2"
            width="33.7566"
            height="15.286"
            rx="7"
            transform="rotate(29.7652 5.58862 -2)"
            fill="#F89624"
          ></rect>
        </svg>

        <div className="relative bg-gradient-br from-slate-900/40 to-slate-900/20 backdrop-blur-sm flex w-10/12 border-spacing-8 flex-col items-center space-x-4 border border-dashed border-black/20 p-6 decoration-dashed dark:border-white/25 md:w-1/2 lg:flex-row">
          <svg
            width="71"
            height="71"
            viewBox="0 0 71 71"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M35.5 65.0834C31.4076 65.0834 27.5618 64.3064 23.9625 62.7522C20.3632 61.1981 17.2323 59.0908 14.5698 56.4303C11.9073 53.7678 9.79993 50.6369 8.24779 47.0376C6.69565 43.4383 5.9186 39.5924 5.91663 35.5001C5.91663 31.4077 6.69368 27.5619 8.24779 23.9626C9.8019 20.3633 11.9092 17.2324 14.5698 14.5699C17.2323 11.9074 20.3632 9.80005 23.9625 8.24792C27.5618 6.69578 31.4076 5.91872 35.5 5.91675C39.5923 5.91675 43.4382 6.6938 47.0375 8.24792C50.6368 9.80203 53.7677 11.9093 56.4302 14.5699C59.0927 17.2324 61.201 20.3633 62.7551 23.9626C64.3092 27.5619 65.0853 31.4077 65.0833 35.5001V59.1667C65.0833 60.7938 64.5035 62.1872 63.3438 63.3469C62.1841 64.5065 60.7917 65.0854 59.1666 65.0834H35.5ZM35.5 59.1667C42.1069 59.1667 47.7031 56.874 52.2885 52.2886C56.8739 47.7032 59.1666 42.107 59.1666 35.5001C59.1666 28.8931 56.8739 23.297 52.2885 18.7115C47.7031 14.1261 42.1069 11.8334 35.5 11.8334C28.893 11.8334 23.2968 14.1261 18.7114 18.7115C14.126 23.297 11.8333 28.8931 11.8333 35.5001C11.8333 36.6341 11.9073 37.7435 12.0552 38.8282C12.2031 39.9129 12.425 40.973 12.7208 42.0084L21.7437 32.9855C21.9902 32.739 22.2861 32.5417 22.6312 32.3938C22.9763 32.2459 23.3461 32.1473 23.7406 32.098C24.0857 32.098 24.4309 32.1601 24.776 32.2844C25.1211 32.4086 25.4416 32.593 25.7375 32.8376L33.4291 39.272L43.1177 29.5834H41.4166C40.5784 29.5834 39.8753 29.2994 39.3073 28.7314C38.7393 28.1634 38.4563 27.4613 38.4583 26.6251C38.4583 25.7869 38.7423 25.0838 39.3103 24.5158C39.8783 23.9478 40.5804 23.6648 41.4166 23.6667H50.2916C51.1298 23.6667 51.8329 23.9507 52.4009 24.5187C52.9689 25.0867 53.2519 25.7889 53.25 26.6251V35.5001C53.25 36.3383 52.966 37.0414 52.398 37.6094C51.83 38.1774 51.1278 38.4604 50.2916 38.4584C49.4534 38.4584 48.7503 38.1744 48.1823 37.6064C47.6143 37.0384 47.3313 36.3363 47.3333 35.5001V33.799L35.6479 45.4105C35.4013 45.657 35.1055 45.8542 34.7604 46.0022C34.4152 46.1501 34.0701 46.224 33.725 46.224C33.3305 46.2733 32.9607 46.2359 32.6156 46.1116C32.2704 45.9874 31.95 45.803 31.6541 45.5584L24.0364 39.0501L15.3093 47.7772C17.3802 51.1792 20.1787 53.9285 23.7051 56.025C27.2314 58.1215 31.163 59.1687 35.5 59.1667ZM57.6875 60.6459C58.5257 60.6459 59.2287 60.3619 59.7967 59.7939C60.3647 59.2259 60.6478 58.5238 60.6458 57.6876C60.6458 56.8494 60.3618 56.1463 59.7938 55.5783C59.2258 55.0103 58.5237 54.7273 57.6875 54.7292C56.8493 54.7292 56.1462 55.0132 55.5782 55.5812C55.0102 56.1492 54.7272 56.8514 54.7291 57.6876C54.7291 58.5258 55.0131 59.2289 55.5811 59.7969C56.1491 60.3649 56.8512 60.6479 57.6875 60.6459Z"
              fill="#DDDDDD"
              className="fill-black/80 dark:fill-[#DDDDDD]"
            ></path>
          </svg>

          <div>
            <p className="text-xl font-bold md:text-3xl">Rest Api</p>
            <p className="max-w-md text-sm">
              Our rest api will provide you a way to repurpose your data for any
              other use case. You can get your data as you should and use it for
              your own purposes.
            </p>
          </div>
        </div>
      </section> */}
    </motion.div>
  )
}
