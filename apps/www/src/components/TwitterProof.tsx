"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import TweetCard from "./TweetCard";
import Tweets from "@/lib/twitter.json";
import Link from "next/link";
import { DiscordIcon, GithubIcon } from "./extra-icons";

function TwitterSocialProof() {
  // base path for images
  //   const { basePath } = useRouter()

  const [tweets, setTweets] = useState(Tweets.slice(0, 10));
  const [showButton, setShowButton] = useState(true);

  const handleShowMore = () => {
    setTweets((prevTweets) => [
      ...prevTweets,
      ...Tweets.slice(prevTweets.length, prevTweets.length + 10),
    ]);

    if (tweets.length >= Tweets.length) {
      setShowButton(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-12 text-center flex flex-col justify-center items-center">
          {/* <div className="flex flex-col justify-center items-center"> */}
          <h1 className="font-heading max-w-3xl text-3xl font-bold sm:text-6xl">
            Loved & Used{" "}
            <span className="from-logo bg-gradient-to-br to-orange-600 bg-clip-text font-black lowercase text-transparent">
              By #community
            </span>
          </h1>
          {/* </div> */}
          <p className="p">
            Don't take it from us – here's what our users have to say about{" "}
            <span className="from-logo bg-gradient-to-br to-orange-600 bg-clip-text font-black uppercase text-transparent">
              Loglib
            </span>
          </p>
          <div className="my-8 flex justify-center gap-2">
            <Link
              href={"https://github.com/loglib/loglib/discussions"}
              target="_blank"
              passHref
            >
              {/* <Button className="bg-gradient-to-br from-slate-700 border to-[#120c08] text-white">
                GitHub
              </Button> */}
            </Link>
            <Link
              href={"https://discord.loglib.com/"}
              target="_blank"
              passHref
            >
              {/* <Button>Discord</Button> */}
           
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div
          className={`columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 overflow-hidden relative transition-all`}
        >
          {showButton && (
            <div
              className={`absolute bottom-0 left-0 z-10 w-full h-[25%] bg-gradient-to-t from-s via-transparent`}
            />
          )}
          {tweets.map((tweet: any, i: number) => (
            <div className="mb-4 z-0 break-inside-avoid-column" key={i}>
              <Link href={tweet.url} target="_blank">
                <TweetCard
                  handle={`@${tweet.handle}`}
                  quote={tweet.text}
                  img_url={`https://supabase.com/${tweet.img_url}`}
                />
              </Link>
            </div>
          ))}
          {showButton && (
            <div className="absolute flex justify-center bottom-0 left-0 right-0 z-20 mb-10">
              {/** type="default" size="small" onClick={() => handleShowMore() */}

              <Button onClick={() => handleShowMore()}>Show More</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TwitterSocialProof;
