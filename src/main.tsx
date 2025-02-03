import {createRoot} from 'react-dom/client'
import {queryClient} from "./tools/api/query.config.ts";
import {QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {AppRoutes} from "./App/Routes.tsx";
import {BrowserRouter} from 'react-router';

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <AppRoutes/>
            <ReactQueryDevtools/>
        </BrowserRouter>
    </QueryClientProvider>
    // </StrictMode>,
)
