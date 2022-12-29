import { useState, useEffect, useCallback } from "react";
import './TripList.scss';

function TripList() {

    //init of state for using data
    const [trips, setTrips] = useState([]);
    const [url, setUrl] = useState('http://localhost:3000/trips')

    {/* When using functions inside of useEffect, each time the page or component renders, useEffect will reference the function and notice differences and keep refiring and refiring 
    causeing an endless loop. To get around that, you need to use useCallback hook. The hook creates a cached version of a function. On every evaluation of the component,
    the cached function is not being recreated. Therefore, not being seen as changed by useEffect, and wont refire.

    The useCallback hook also has a dependency array as a second argument. This depend. array will tell the callback hook when to create a new function */}
    const fetchTrips = useCallback(async () => {
        const response = await fetch(url);
        const json = await response.json();
        setTrips(json);
    }, [url])

    //if you want the function to only run once inside useEffect, you must and always need to pass in an empty array as a second arg (a dependency)
    useEffect(() => {
        // //we cant use async functions inside of useEffect. We can however, extract the fetch logic into it's own asyn function and run it inside useEffect
        // fetch(url)
        //     .then(response => response.json())
        //     //when we have json data back, we want to call setTrips/hook function to update state
        //     .then(json => setTrips(json));
        fetchTrips();
    } , [fetchTrips])

    console.log(trips);

    return (
        <div className="trip-list">
            <h2>Trip List</h2>
            <ul className="trip-list__list">
                {trips.map(trip => (
                    <li key={trip.id} className="trip-list__items ">
                        <h3>{trip.title}</h3>
                        <p>{trip.price}</p>
                    </li>
                ))}
            </ul>
            <div className="trip-list__filtered">
                <button className="trip-list__button" onClick={() => setUrl('http://localhost:3000/trips?loc=Europe')}>European Trips</button>
                <button className="trip-list__button" onClick={() => setUrl('http://localhost:3000/trips')}>ALl Trips</button>
            </div>
        </div>
    )
}

export default TripList; 