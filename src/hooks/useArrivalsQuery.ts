import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Arrivals } from "./types";
import { API_URL } from "./configs";

export const arrivalsQueryCacheKey = 'arrivals';

export async function fetchArrivals<T = Arrivals>(): Promise<T> {
    console.log(API_URL)
    const response = await axios.get<T>(`${API_URL}/arrivals`);
    return response.data;
}

export const useArrivalsQuery = () => useQuery({ 
    queryKey: [arrivalsQueryCacheKey], 
    queryFn: fetchArrivals 
})
  
