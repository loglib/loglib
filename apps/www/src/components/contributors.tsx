'use client'
import { AvatarGroup } from "@nextui-org/react";
import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ContributorProps {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  contributions: number;
};
interface ContributorsProps {
  contributors : ContributorProps[]
}
const  ContributorsAvatar = ({contributions}) => {
   
  return (
    <AvatarGroup isBordered max={9}>
      {contributions.map((image: any) => {
        return (
          <Avatar className="mx-[40px]">
            <AvatarImage src={image.avatar_url} />
            <AvatarFallback>{image.login.slice(0, 2)}</AvatarFallback>
          </Avatar>
        );
      })}
    </AvatarGroup>
  );
}

export default ContributorsAvatar
