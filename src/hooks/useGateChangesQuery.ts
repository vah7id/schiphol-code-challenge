import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GateChanges } from "./types";
import { API_URL } from "./configs";

export const gateChangesQueryCacheKey = 'gate-changes';

export async function fetchGateChanges<T = GateChanges>(query: string): Promise<T> {
    const response = await axios.get<T>(`${API_URL}/gate-changes/${query}`);
    return response.data;
}

export const useGateChangesQuery = ({ query }: {query: string}) => useQuery({ 
    queryKey: [gateChangesQueryCacheKey], 
    queryFn: () => fetchGateChanges(query)
})
