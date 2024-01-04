import React from 'react';
import './App.scss';
import Autocomplete from '../Autocomplete/Autocomplete';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <>
                <header>
                    <h1>Gate changes</h1>
                </header>
                <main>
                    <Autocomplete />
                </main>
            </>
        </QueryClientProvider>
    );
}

export default App;
