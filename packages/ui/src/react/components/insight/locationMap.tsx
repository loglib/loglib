import { getTheme } from "@/react/lib/utils";
import React, { useEffect, useState } from "react";
import { WorldMap } from "react-svg-worldmap";


const LocationMap = ({data}: {data:{location: string, visits: number}[]})=>{
    const [theme, setTheme] = useState("")
    useEffect(()=>{

      setTheme(getTheme())
    }, [])

    const transformedData = data.map(d=>({
        country: d.location,
        value: d.visits
    }))
    return(
        <div className=" tw-flex tw-justify-center tw-items-center tw-animate-in ">
            {
                !data.length ? <div className=" flex items-center h-full justify-center relative">
                    <p className=" text-center animate-pulse bg-gradient-to-tr tw-from-emphasis absolute tw-to-white/80 tw-text-transparent tw-bg-clip-text">
                        Loading Map...
                        </p>
                        <WorldMap
                        color="#f8a857"
                        value-suffix="visits"
                        size="lg"
                        tooltipBgColor="#000"
                        richInteraction
                        borderColor={
                            theme === "dark" ? "#86868a" : "#222329"
                        }
                        backgroundColor="rgba(0, 0, 0, .0)"
                        data={[]}/>
              
                </div> : 
                        <WorldMap
                        color="#f8a857"
                        value-suffix="visits"
                        size="lg"
                        tooltipBgColor="#000"
                        richInteraction
                        borderColor={
                            theme === "dark" ? "#86868a" : "#222329"
                        }
                        backgroundColor="rgba(0, 0, 0, .0)"
                        data={transformedData}/>
            }

        </div>
   
    )
}

export default LocationMap