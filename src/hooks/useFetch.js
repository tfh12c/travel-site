import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null); 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            { /*The try...catch statement is comprised of a try block and either a catch block, a finally block, or both. 
            The code in the try block is executed first, and if it throws an exception, the code in the catch block will be executed. 
            The code in the finally block will always be executed before control flow exits the entire construct. */}

            {/* Erro Handling:
            we have the try block and use the if check to see if the response is ok. If it's not, we throw an error right away and move into the catch block */}
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                const json = await response.json();

                setIsLoading(false);
                setData(json);
                setError(null);
            } catch (error) {
                setIsLoading(true);
                setError('Could not fetch data.');
                console.log(error.message);
            }
        }
        fetchData();
    }, [url])

    return { data, isLoading, error }
}

export default useFetch;

{/* By using this custom hook we are bundling up all of the logic to fetch data that can be reused in other components. So if we have an event list and more events data,
    we could use this useFetch hook to grab the event list data  */}