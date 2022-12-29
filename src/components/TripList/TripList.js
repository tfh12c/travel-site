import { useState, useEffect } from "react";
import './TripList.scss';

function TripList() {

    //init of state for using data
    const [trips, setTrips] = useState([]);

    //if you want the function to only run once inside useEffect, you must and always need to pass in an empty array as a second arg (a dependency)
    useEffect(() => {
        fetch('http://localhost:3000/trips')
            .then(response => response.json())
            //when we have json data back, we want to call setTrips/hook function to update state
            .then(json => setTrips(json));
    } , [])

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
        </div>
    )
}

export default TripList; 