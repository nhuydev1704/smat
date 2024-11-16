import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { setupGlobalErrorHandling } from './utils/setupGlobalErrorHandling.ts';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import reduxStore from './store/redux.store.ts';

// 自定义错误处理∏
setupGlobalErrorHandling();
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <Provider store={reduxStore}>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </Provider>
);
