"use client";

import React, { useEffect } from "react";
import { AvatarGroup } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
export default function ContributorsAvatar() {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    const data = await fetch(
      "https://api.github.com/repos/loglib/loglib/contributors"
    );

    const response = await data.json();
    console.log(response)
    const filteredUsers = await response.filter((user) => user.id != 41898282)
    setImages(filteredUsers);
    console.log(filteredUsers);
  };

  useEffect(() => {
    fetchImages();
  }, []);
  return (
    <AvatarGroup isBordered max={9}>
      {images.map((image : any) => {
        return (
          <Avatar className="mx-[40px]">
            <AvatarImage src={image.avatar_url}/>
            <AvatarFallback>{image.login.slice(0 , 2)}</AvatarFallback>
          </Avatar>
        );
      })}
     
    </AvatarGroup>
  );
}
