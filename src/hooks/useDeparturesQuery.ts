import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Departures } from "./types";
import { API_URL } from "./configs";

export const departuresQueryCacheKey = 'departures';

export async function fetchDepartures<T = Departures>(): Promise<T> {
    const response = await axios.get<T>(`${API_URL}/departures`);
    return response.data;
}

export const useDeparturesQuery = () => useQuery({ 
    queryKey: [departuresQueryCacheKey], 
    queryFn: fetchDepartures
})
