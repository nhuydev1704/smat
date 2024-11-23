import './index.css';
import 'overlayscrollbars/overlayscrollbars.css';

import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { setupGlobalErrorHandling } from './utils/setupGlobalErrorHandling.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OverlayScrollbars, ClickScrollPlugin } from 'overlayscrollbars';

OverlayScrollbars.plugin(ClickScrollPlugin);

// 自定义错误处理∏
setupGlobalErrorHandling();
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
);
