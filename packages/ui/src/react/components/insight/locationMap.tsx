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
                !data.length ? <>
                </> : 
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