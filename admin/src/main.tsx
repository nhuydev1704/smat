import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { setupGlobalErrorHandling } from './utils/setupGlobalErrorHandling.ts';

// 自定义错误处理
setupGlobalErrorHandling();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
