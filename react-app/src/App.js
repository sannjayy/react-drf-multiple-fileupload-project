import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DocketPage from './pages/docket';

const queryClient = new QueryClient();


function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <DocketPage />
        </QueryClientProvider>
    );
}

export default App;
