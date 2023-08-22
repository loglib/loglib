import { WorldMap } from "react-svg-worldmap";

const LocationMap = ({
    data,
}: {
    data: { location: string; visits: number }[];
}) => {
    const transformedData = data.map((d) => ({
        country: d.location,
        value: d.visits,
    }));
    return (
        <div className=" flex justify-center items-center animate-in min-h-[400px]">
            {!data.length ? (
                <div className=" flex items-center h-full justify-center relative">
                    <p className=" text-center animate-pulse bg-gradient-to-tr from-emphasis absolute to-white/80 text-transparent bg-clip-text">
                        Loading Map...
                    </p>
                    <WorldMap
                        color="#f8a857"
                        value-suffix="visits"
                        size="lg"
                        tooltipBgColor="#000"
                        richInteraction
                        borderColor={"#86868a"}
                        backgroundColor="rgba(0, 0, 0, .0)"
                        data={[]}
                    />
                </div>
            ) : (
                <WorldMap
                    color="#f8a857"
                    value-suffix="visits"
                    size="lg"
                    tooltipBgColor="#000"
                    richInteraction
                    borderColor={"#86868a"}
                    backgroundColor="rgba(0, 0, 0, .0)"
                    data={transformedData}
                />
            )}
        </div>
    );
};

export default LocationMap;
