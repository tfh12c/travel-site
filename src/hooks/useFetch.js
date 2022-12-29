import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null); 

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url);
            const json = await response.json();
            setData(json);
        }
        fetchData();
    }, [url])

    return { data }
}

export default useFetch;

{/* By using this custom hook we are bundling up all of the logic to fetch data that can be reused in other components. So if we have an event list and more events data,
    we could use this useFetch hook to grab the event list data  */}