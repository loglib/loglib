import {
  ArrowUpRight,
  Facebook,
  Github,
  Instagram,
  Link,
  Twitter,
} from "lucide-react"
import { Icons } from "@/components/icons"

export const RefIcons = {
  vercel: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 76 65"
      className=" dark:fill-white fill-black"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
    </svg>
  ),
  github: () => <Github size={18} />,
  twitter: () => <Twitter size={18} />,
  direct: () => <ArrowUpRight size={18} />,
  facebook: () => <Facebook size={18} />,
  google: () => (
    <svg
      viewBox="0 0 48 48"
      width={16}
      height={16}
      className=" stroke-black stroke-2 dark:stroke-white fill-none"
      id="b"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        defs
        <path d="m31.6814,34.8868c-1.9155,1.29-4.3586,2.0718-7.2514,2.0718-5.59,0-10.3395-3.7723-12.04-8.8541v-.0195c-.43-1.29-.6841-2.6582-.6841-4.085s.2541-2.795.6841-4.085c1.7005-5.0818,6.45-8.8541,12.04-8.8541,3.1664,0,5.9809,1.0945,8.2286,3.2055l6.1568-6.1568c-3.7332-3.4791-8.5805-5.6095-14.3855-5.6095-8.4045,0-15.6559,4.8277-19.1936,11.8641-1.4659,2.8927-2.3064,6.1568-2.3064,9.6359s.8405,6.7432,2.3064,9.6359v.0195c3.5377,7.0168,10.7891,11.8445,19.1936,11.8445,5.805,0,10.6718-1.9155,14.2291-5.1991,4.0655-3.7527,6.4109-9.2645,6.4109-15.8123,0-1.5245-.1368-2.9905-.3909-4.3977h-20.2491v8.3264h11.5709c-.5082,2.6777-2.0327,4.945-4.3195,6.4695h0Z"></path>
      </g>
    </svg>
  ),
  telegram: () => (
    <svg
      width="18px"
      className=" stroke-black stroke-2 dark:stroke-white fill-none"
      height="18px"
      viewBox="0 0 48 48"
      id="Layer_2"
      data-name="Layer 2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M40.83,8.48c1.14,0,2,1,1.54,2.86l-5.58,26.3c-.39,1.87-1.52,2.32-3.08,1.45L20.4,29.26a.4.4,0,0,1,0-.65L35.77,14.73c.7-.62-.15-.92-1.07-.36L15.41,26.54a.46.46,0,0,1-.4.05L6.82,24C5,23.47,5,22.22,7.23,21.33L40,8.69a2.16,2.16,0,0,1,.83-.21Z" />
    </svg>
  ),
  instagram: () => <Instagram size={16} />,
  loglib: () => <Icons.logo className=" h-4 w-4 md:h-5 md:w-5" />,
  android: () => (
    <svg
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <title>Android_2_line</title>{" "}
        <g
          id="页面-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          {" "}
          <g
            id="Logo"
            transform="translate(0.000000, -96.000000)"
            fill-rule="nonzero"
          >
            {" "}
            <g id="Android_2_line" transform="translate(0.000000, 96.000000)">
              {" "}
              <path
                d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
                id="MingCute"
                fill-rule="nonzero"
              >
                {" "}
              </path>{" "}
              <path
                d="M18.4472,4.10555 C18.9412,4.35254 19.1414,4.95321 18.8944,5.44719 L17.7199,7.79629 C20.3074,9.60378 22,12.6042 22,16 L22,17 C22,18.1045 21.1046,19 20,19 L4,19 C2.89543,19 2,18.1045 2,17 L2,16 C2,12.6042 3.69258,9.60377 6.28012,7.79629 L5.10557,5.44719 C4.85858,4.95321 5.05881,4.35254 5.55279,4.10555 C6.04676,3.85856 6.64744,4.05878 6.89443,4.55276 L8.02799,6.81988 C9.24552,6.29237 10.5886,5.99997 12,5.99997 C13.4114,5.99997 14.7545,6.29237 15.972,6.81988 L17.1056,4.55276 C17.3526,4.05878 17.9532,3.85856 18.4472,4.10555 Z M12,7.99998 C7.58172,7.99998 4,11.5817 4,16 L4,17 L20,17 L20,16 C20,11.5817 16.4183,7.99998 12,7.99998 Z M8.5,12 C9.32843,12 10,12.6715 10,13.5 C10,14.3284 9.32843,15 8.5,15 C7.67157,15 7,14.3284 7,13.5 C7,12.6715 7.67157,12 8.5,12 Z M15.5,12 C16.3284,12 17,12.6715 17,13.5 C17,14.3284 16.3284,15 15.5,15 C14.6716,15 14,14.3284 14,13.5 C14,12.6715 14.6716,12 15.5,12 Z"
                id="形状"
                className=" fill-black dark:fill-white"
              >
                {" "}
              </path>{" "}
            </g>{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  ),
  default: () => <Link size={18} />,
}