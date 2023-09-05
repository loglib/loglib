import { twMerge } from 'tailwind-merge';


const genericHamburgerLine = `h-1 w-8 my-1 rounded-full bg-gray-100 transition ease-in transform duration-300`;
{/**
    you can reuse this component for tha dashboard page aswell.
    - use the className only to set position and size.
*/}

const Humburger = ({onClick,mobileView,className}:{onClick:Function,mobileView:boolean,className?:string}) => {
  return (
    <div className={twMerge("humberger z-50 flex",className)} onClick={()=>onClick}>
                            <button
                            className="flex flex-col h-12 w-12  rounded justify-center items-center group"
                            onClick={() => onClick}
                            >
                                    <div
                                    className={`${genericHamburgerLine} ${
                                    mobileView
                                    ? "rotate-45 translate-y-3 opacity-50 group-hover:opacity-100"
                                    : "opacity-50 group-hover:opacity-100"
                                    }`}
                                    />

                                    <div
                                    className={`${genericHamburgerLine} ${
                                    mobileView
                                    ? "-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100"
                                    : "opacity-50 group-hover:opacity-100"
                                    }`}
                                    />
                            </button>
                    </div>
  )
}

export default Humburger
