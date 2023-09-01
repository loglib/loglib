import { MapIcon } from "lucide-react";
import Image from "next/image";

export const Graph = () => {
	return (
		<div className="rounded-xl md:rounded-3xl border dark:border-stone-800 border-stone-100 relative bg-stone-950/40 overflow-hidden h-full">
			<svg
				width="325"
				height="351"
				viewBox="0 0 325 351"
				fill="none"
				className="absolute right-0 top-0 pointer-events-none select-none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g opacity="0.15">
					<g filter="url(#filter0_f_295_3421)">
						<circle
							cx="300"
							cy="300"
							r="300"
							transform="matrix(1 0 0 -1 120.455 231)"
							fill="url(#paint0_linear_295_3421)"
						></circle>
					</g>
					<circle
						cx="267.312"
						cy="267.312"
						r="267.312"
						transform="matrix(1 0 0 -1 158.643 192.812)"
						fill="url(#paint1_linear_295_3421)"
						fill-opacity="0.9"
					></circle>
					<circle
						cx="267.312"
						cy="267.312"
						r="264.767"
						transform="matrix(1 0 0 -1 158.643 192.812)"
						stroke="url(#paint2_linear_295_3421)"
						stroke-opacity="0.3"
						strokeWidth="5.09167"
					></circle>
				</g>
				<defs>
					<filter
						id="filter0_f_295_3421"
						x="0.455078"
						y="-489"
						width="840"
						height="840"
						filterUnits="userSpaceOnUse"
						color-interpolation-filters="sRGB"
					>
						<feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="BackgroundImageFix"
							result="shape"
						></feBlend>
						<feGaussianBlur
							stdDeviation="60"
							result="effect1_foregroundBlur_295_3421"
						></feGaussianBlur>
					</filter>
					<linearGradient
						id="paint0_linear_295_3421"
						x1="476.268"
						y1="421.277"
						x2="125.205"
						y2="70.2128"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#7FBCDB"></stop>
						<stop offset="1" stop-color="#fff"></stop>
					</linearGradient>
					<linearGradient
						id="paint1_linear_295_3421"
						x1="280.812"
						y1="42.8125"
						x2="193.812"
						y2="385.812"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-opacity="0"></stop>
						<stop offset="1"></stop>
					</linearGradient>
					<linearGradient
						id="paint2_linear_295_3421"
						x1="267.312"
						y1="0"
						x2="267.313"
						y2="534.625"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0.605709" stop-color="white" stop-opacity="0"></stop>
						<stop offset="0.81137" stop-color="white"></stop>
					</linearGradient>
				</defs>
			</svg>
			<div className="p-5 md:p-10 h-full flex flex-col">
				<h3 className="text-stone-200 text-xl md:text-3xl font-medium mb-4">
					Visualize <span className=" text-stone-300">Your data</span>
				</h3>
				<p className="text-white/50 text-base md:text-lg font-medium mb-8 max-w-md">
					Get a clear picture of your website visitors with our beautiful graphs
				</p>
				<div className="h-40 md:h-72 relative w-full rounded-xl flex justify-end items-end flex-col gap-2">
					<div className="  overflow-clip absolute -right-40">
						<Image
							alt="Feature 1"
							draggable="false"
							decoding="async"
							loading="lazy"
							width="400"
							height="400"
							className=" scale-90"
							data-nimg="1"
							src="/assets/graph.png"
						/>
					</div>
					<div className=" mt-2  overflow-clip">
						<Image
							alt="Feature 1"
							draggable="false"
							decoding="async"
							loading="lazy"
							width="400"
							height="300"
							className=" "
							data-nimg="1"
							src="/assets/map.png"
						/>
					</div>
				</div>
			</div>
			<div className=" rounded-full absolute top-2 right-2">
				<div className="md:h-14 md:w-14 h-10 w-10 border border-stone-800/[0.2] bg-background flex flex-shrink-0 items-center justify-center rounded-full relative">
					<div className="h-8 md:h-12 md:w-12 w-8 rounded-full  border-2 border-orange-500/60 relative overflow-hidden  flex items-center justify-center">
						<svg
							width="52"
							height="52"
							viewBox="0 0 52 52"
							fill="none"
							className="absolute inset-0 h-[36px] w-[36px]"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g opacity="0.2">
								<rect
									x="-6.5"
									y="-6.5"
									width="21.6667"
									height="21.6667"
									fill="#132872"
								></rect>
								<rect
									x="-6.22917"
									y="-6.22917"
									width="21.125"
									height="21.125"
									stroke="white"
									stroke-opacity="0.2"
									strokeWidth="0.541667"
								></rect>
								<path
									d="M15.166 -5.95833H36.8327V-7.04167H15.166V-5.95833ZM36.8327 14.625H15.166V15.7083H36.8327V14.625Z"
									fill="#3360A3"
									mask="url(#path-3-inside-1_295_3315)"
								></path>
								<rect
									x="36.834"
									y="-6.5"
									width="21.6667"
									height="21.6667"
									fill="#132872"
								></rect>
								<rect
									x="37.1048"
									y="-6.22917"
									width="21.125"
									height="21.125"
									stroke="white"
									stroke-opacity="0.2"
									strokeWidth="0.541667"
								></rect>
								<path
									d="M14.625 15.1666V36.8333H15.7083V15.1666H14.625ZM-5.95833 36.8333V15.1666H-7.04167V36.8333H-5.95833Z"
									fill="#3360A3"
									mask="url(#path-7-inside-2_295_3315)"
								></path>
								<path
									d="M15.166 15.1666H36.8327V36.8333H15.166V15.1666Z"
									fill="#f79624"
								></path>
								<path
									d="M57.959 15.1666V36.8333H59.0423V15.1666H57.959ZM37.3757 36.8333V15.1666H36.2923V36.8333H37.3757Z"
									fill="#3360A3"
									mask="url(#path-10-inside-3_295_3315)"
								></path>
								<rect
									x="-6.5"
									y="36.8334"
									width="21.6667"
									height="21.6667"
									fill="#f79624"
								></rect>
								<rect
									x="-6.22917"
									y="37.1042"
									width="21.125"
									height="21.125"
									stroke="white"
									stroke-opacity="0.2"
									strokeWidth="0.541667"
								></rect>
								<path
									d="M15.166 37.375H36.8327V36.2917H15.166V37.375ZM36.8327 57.9584H15.166V59.0417H36.8327V57.9584Z"
									fill="#3360A3"
									mask="url(#path-14-inside-4_295_3315)"
								></path>
								<rect
									x="36.834"
									y="36.8334"
									width="21.6667"
									height="21.6667"
									fill="#132872"
								></rect>
								<rect
									x="37.1048"
									y="37.1042"
									width="21.125"
									height="21.125"
									stroke="white"
									stroke-opacity="0.2"
									strokeWidth="0.541667"
								></rect>
							</g>
						</svg>
						<div className="absolute h-full flex items-center justify-center rounded-full w-full bg-stone-900">
							<MapIcon size={18} className=" text-orange-400" />
						</div>
					</div>
					<svg
						width="64"
						height="64"
						viewBox="0 0 64 64"
						fill="none"
						className="absolute inset-0 md:h-14 md:w-14 h-10 w-10 animate-spin-slow"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M59.934 17.3986C60.169 17.2758 60.2602 16.9856 60.1339 16.7525C57.3457 11.608 53.1986 7.32344 48.1407 4.36888C43.0828 1.41433 37.3137 -0.0937062 31.4631 0.00450389C31.198 0.00895321 30.99 0.230954 30.9984 0.495917C31.0068 0.76088 31.2285 0.968456 31.4936 0.96413C37.1638 0.871578 42.7545 2.33432 47.6565 5.19782C52.5585 8.06132 56.5786 12.2127 59.283 17.1973C59.4094 17.4303 59.6991 17.5214 59.934 17.3986Z"
							fill="url(#paint0_linear_295_3336)"
						></path>
						<path
							d="M0.728977 35.9539C0.465974 35.9872 0.279361 36.2275 0.316556 36.4899C1.13755 42.2835 3.53209 47.7445 7.24366 52.2762C10.9552 56.8078 15.8374 60.2314 21.3557 62.1778C21.6057 62.266 21.878 62.1303 21.9624 61.879C22.0468 61.6278 21.9114 61.356 21.6614 61.2677C16.3143 59.3788 11.5835 56.0599 7.98635 51.6679C4.38917 47.2759 2.06735 41.984 1.26908 36.3695C1.23176 36.107 0.991979 35.9207 0.728977 35.9539Z"
							fill="url(#paint1_linear_295_3336)"
						></path>
						<defs>
							<linearGradient
								id="paint0_linear_295_3336"
								x1="61.5"
								y1="24.5"
								x2="31.8785"
								y2="25.4481"
								gradientUnits="userSpaceOnUse"
							>
								<stop stop-color="#564439"></stop>
								<stop offset="1" stop-color="#564439" stop-opacity="0"></stop>
							</linearGradient>
							<linearGradient
								id="paint1_linear_295_3336"
								x1="-1"
								y1="27"
								x2="35"
								y2="64"
								gradientUnits="userSpaceOnUse"
							>
								<stop stop-color="#564439"></stop>
								<stop offset="1" stop-color="#564439" stop-opacity="0"></stop>
							</linearGradient>
						</defs>
					</svg>
				</div>
			</div>
		</div>
	);
};
