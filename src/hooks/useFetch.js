import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null); 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        //need controller var for cleanup function
        const controller = new AbortController();

        const fetchData = async () => {
            setIsLoading(true);

            { /*The try...catch statement is comprised of a try block and either a catch block, a finally block, or both. 
            The code in the try block is executed first, and if it throws an exception, the code in the catch block will be executed. 
            The code in the finally block will always be executed before control flow exits the entire construct. */}

            {/* Erro Handling:
            we have the try block and use the if check to see if the response is ok. If it's not, we throw an error right away and move into the catch block */}
            try {
                const response = await fetch(url, { signal: controller.signal });
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                const json = await response.json();

                setIsLoading(false);
                setData(json);
                setError(null);
            } catch (error) {
                //AbortError will come from controller/abort
                if (error.name === "AbortError") {
                    console.log('Fetch was aborted');
                } else {
                    setIsLoading(true);
                    setError('Could not fetch data.');
                }
            }
        }
        fetchData();

        //cleanup function uses the controller and AbortError. 
        return () => {
            controller.abort();
        }
        //When using useEffect to do async code, it's best practice to include a cleanup function incase the component unmounts and we dont try to update state when the component has left the DOM
    }, [url])

    return { data, isLoading, error }
}

export default useFetch;

{/* By using this custom hook we are bundling up all of the logic to fetch data that can be reused in other components. So if we have an event list and more events data,
    we could use this useFetch hook to grab the event list data  */}