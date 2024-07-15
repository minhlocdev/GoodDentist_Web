import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Toaster } from './components/ui/toast.tsx';
import './index.css';
import { queryClient } from './lib/queryClient.ts';
import AuthProvider from './providers/AuthProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <App />
            </AuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
            <Toaster
                position="top-right"
                toastOptions={{
                    classNames: {
                        error: 'text-destructive',
                        success: 'text-green-600'
                    }
                }}
            />
        </QueryClientProvider>
    </React.StrictMode>
);
