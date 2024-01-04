import React, { useEffect, useState } from 'react';
import { fetchGateChanges } from '../../hooks/useGateChangesQuery';
import { GateChanges, GateChange, Arrival, Departure, Arrivals, Departures, FlightDirection } from '../../hooks/types';
import { formattedDateTime } from './utils';

function AutocompleteListItems({ searchQuery, arrivals, departures }: { searchQuery: string, arrivals: Arrivals, departures: Departures }) {
    const [isLoading, setIsLoading] = useState(false);
    const [gateChanges, setGateChanges] = useState<GateChanges>([]);

    useEffect(() => {
        const updateGateChanges = async () => {
            let data = await fetchGateChanges(searchQuery.toUpperCase());

            // Slice to max 5 items and sort by direction
            data = data.slice(0, 5);

            // map the arrival and departure data
            if (data.length > 0) {
                data.map((gateChange: GateChange) => {
                    if (gateChange.direction === FlightDirection.Arrival) {
                        gateChange.arrival = arrivals.filter((arrival: Arrival) => arrival.flightNumber === gateChange.flightNumber)[0];
                    } else {
                        gateChange.departure = departures.filter((departure: Departure) => departure.flightNumber === gateChange.flightNumber)[0];
                    }
                    return gateChange;
                });
            }

            // sort based on arrival / departure time
            data.sort((a, b) => {
                if (a.direction < b.direction) {
                    return -1;
                }
                if (a.direction > b.direction) {
                    return 1;
                }
                // If direction is the same, compare by time
                const aTime = (a.arrival && a.arrival.arrivalTime) || (a.departure && a.departure.departureTime);
                const bTime = (b.arrival && b.arrival.arrivalTime) || (b.departure && b.departure.departureTime);
                if (aTime && bTime) {
                    return aTime.localeCompare(bTime);
                } else {
                    return -1;
                }
            });

            setIsLoading(false);
            setGateChanges(data);
        }

        // Fetch on search query change
        if (searchQuery.length > 1) {
            setIsLoading(true);
            updateGateChanges();
        }

        // Clear search results
        if (searchQuery === "") {
            setIsLoading(false);
            setGateChanges([]);
        }

    }, [searchQuery, departures, arrivals]);

    return (
        <>
            {isLoading && <p>Searching...</p>}
            {(gateChanges.length === 0 && searchQuery !== "" && !isLoading) &&
                <p>No Gate Changes Found!</p>
            }
            <ul>
                {gateChanges.map((gateChange, i) => (
                    <li>
                        <p style={{ background: i % 2 === 0 ? 'orange' : 'yellow' }}>
                            <b>
                                {gateChange.flightNumber}
                            </b>
                            <>
                                {gateChange.direction.toString()} :
                            </>
                            {gateChange.direction === FlightDirection.Arrival &&
                                <> {gateChange.arrival?.origin} - <b>{formattedDateTime(gateChange.arrival?.arrivalTime)}</b></>
                            }
                            {gateChange.direction === FlightDirection.Departure &&
                                <> {gateChange.departure?.destination} - <b>{formattedDateTime(gateChange.departure?.departureTime)}</b></>
                            }
                        </p>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default AutocompleteListItems;
