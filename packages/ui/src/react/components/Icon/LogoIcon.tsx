import { cn } from "@/react/lib/utils";
import React from "react";



const LogoIcon = ({className}: {className?:string}) => {
  return (
    <svg
      width="59"
      height="55"
      viewBox="0 0 59 55"
      className={cn(" tw-w-8 tw-h-8 md:tw-w-12 md:tw-h-12", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_245_858)">
        <path
          d="M47.7214 23.6888C47.2594 23.7686 47.0733 24.3944 47.4471 24.6775C47.6666 24.8437 47.7101 25.1562 47.5443 25.3761L36.977 39.3936C36.1483 40.4928 34.4828 40.4457 33.7175 39.3015L26.8179 28.9852C26.0299 27.8069 24.3001 27.7997 23.5023 28.9715L17.4237 37.8991C16.7438 38.8976 15.3407 39.0702 14.4392 38.2661L10.8367 35.053C10.2236 34.5062 10.1629 33.5685 10.7003 32.9472C11.2486 32.3133 12.2094 32.2501 12.836 32.8067L13.8427 33.7008C14.7442 34.5015 16.1439 34.3284 16.8232 33.3322L23.5022 23.5375C24.3003 22.3669 26.029 22.3745 26.8168 23.5521L33.8451 34.0567C34.6106 35.2009 36.2763 35.2476 37.1047 34.148L42.7182 26.6971C43.6648 25.4407 42.8435 23.5466 41.4116 22.895C41.2014 22.7994 40.994 22.6967 40.7899 22.5872C39.5182 21.9046 38.3987 20.9688 37.5 19.8369C36.6013 18.705 35.9423 17.401 35.5635 16.0047C35.3863 15.3517 35.2721 14.685 35.2215 14.0137C35.1301 12.8011 34.2097 11.7163 32.9936 11.7163H8.84849C8.09302 11.7163 7.3685 12.0174 6.8343 12.5534C6.30011 13.0895 6 13.8164 6 14.5745V46.0144C6 46.7724 6.30011 47.4994 6.8343 48.0354C7.3685 48.5715 8.09302 48.8726 8.84849 48.8726H48.7273C49.4827 48.8726 50.2073 48.5715 50.7415 48.0354C51.2757 47.4994 51.5758 46.7724 51.5758 46.0144V24.3914C51.5758 23.4428 50.5099 22.8434 49.6212 23.1751C49.0057 23.4048 48.3697 23.5769 47.7214 23.6888Z"
          className="tw-fill-[#2E2F33] dark:tw-fill-white tw-transition-all tw-duration-700"
        ></path>
        <path
          d="M45.8788 20.2909C49.8117 20.2909 53 17.0918 53 13.1454C53 9.19912 49.8117 6 45.8788 6C41.9458 6 38.7576 9.19912 38.7576 13.1454C38.7576 17.0918 41.9458 20.2909 45.8788 20.2909Z"
          fill="#F9A858"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_d_245_858"
          x="0"
          y="0"
          width="59"
          height="54.8726"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          ></feColorMatrix>
          <feOffset></feOffset>
          <feGaussianBlur stdDeviation="3"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.976471 0 0 0 0 0.658823 0 0 0 0 0.345098 0 0 0 0.2 0"
          ></feColorMatrix>
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_245_858"
          ></feBlend>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_245_858"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
};

export default LogoIcon;
