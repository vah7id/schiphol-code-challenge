import React, { useEffect, useState } from 'react';
import { Arrivals, Departures } from '../../hooks/types';
import { useArrivalsQuery } from '../../hooks/useArrivalsQuery';
import { useDeparturesQuery } from '../../hooks/useDeparturesQuery';
import AutocompleteListItems from './AutocompleteListItems';

function Autocomplete() {
    const [arrivals, setArrivals] = useState<Arrivals>([]);
    const [departures, setDepartures] = useState<Departures>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [query, setQuery] = useState<string>('');

    const handleOnChangeGateChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        const el = e.currentTarget;
        setQuery(el.value);
    }

    const {
        data: defaultArrivals,
        isLoading: isArrivalsLoading,
    } = useArrivalsQuery();

    const {
        data: defaultDepartures,
        isLoading: isDeparturesLoading,
    } = useDeparturesQuery();

    useEffect(() => {
        if (defaultArrivals) {
            setArrivals(defaultArrivals);
        }

        if (defaultDepartures) {
            setDepartures(defaultDepartures);
        }

        if (!isArrivalsLoading || !isDeparturesLoading) {
            setIsLoading(false);
        }
    }, [
        arrivals,
        departures,
        defaultArrivals,
        defaultDepartures,
        isArrivalsLoading,
        isDeparturesLoading
    ]);

    return (
        <>
            <input
                disabled={isLoading}
                value={query}
                onChange={handleOnChangeGateChanges}
                className="search"
                placeholder="Search gate changes..."
                type="text"
            />
            <AutocompleteListItems
                searchQuery={query}
                arrivals={arrivals}
                departures={departures}
            />
        </>
    );
}

export default Autocomplete;
