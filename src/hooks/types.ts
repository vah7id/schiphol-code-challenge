export enum FlightDirection {
    Departure = 'Departure',
    Arrival = 'Arrival',
}

export type Arrival = {
    flightNumber: string;
    origin: string;
    gate: string;
    passengers: number;
    arrivalTime: string;
}

export type Arrivals = Array<Arrival>

export type Departure = {
    flightNumber: string;
    destination: string;
    gate: string;
    passengers: number;
    departureTime: string;
}

export type Departures = Array<Departure>

export type GateChange = {
    currentGate: string;
    previousGate: string;
    flightNumber: string;
    departure?: Departure;
    arrival?: Arrival;
    direction: FlightDirection.Departure | FlightDirection.Arrival
}

export type GateChanges = Array<GateChange>
