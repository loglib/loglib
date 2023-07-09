"use client"

import Link from "next/link"
import { useMDXComponent } from "next-contentlayer/hooks"
import Tweet from "@/components/tweet"
import GithubRepo, { GithubRepoProps } from "@/components/github-repo"
import BlurImage from "@/components/ui/blur-image"
import { Tweet as TweetProps } from "react-tweet/api"
import { components } from "./mdx-components"

const CustomLink = (props: any) => {
  const href = props.href

  if (href.startsWith("/")) {
    return (
      <Link {...props} href={href}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith("#")) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

interface MDXProps {
  code: string
  images?: { url: string; blurDataURL: string }[]
  tweets?: any[]
  repos?: GithubRepoProps[]
}

export function MDX({ code, images, tweets, repos }: MDXProps) {
  const Component = useMDXComponent(code)

  const MDXImage = (props: any) => {
    if (!images) return null
    const blurDataURL = images.find(
      (image) => image.url === props.src
    )?.blurDataURL

    return (
      <BlurImage
        {...props}
        alt={props.alt || "Image"}
        placeholder="blur"
        blurDataURL={
          blurDataURL ||
          "data:image/webp;base64,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
        }
      />
    )
  }

  const MDXTweet = ({ id }: { id: string }) => {
    if (!tweets) return null
    const tweet = tweets.find((tweet: TweetProps) => tweet.id_str === id)
    return <Tweet data={tweet} />
  }

  const MDXRepo = ({ url }: { url: string }) => {
    if (!repos) return null
    const repo = repos.find((repo) => repo.url === url)
    return <GithubRepo {...repo!} />
  }

  return (
    <article>
      <Component components={{ ...components, MDXImage, MDXTweet, MDXRepo }} />
    </article>
  )
}
