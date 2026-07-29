import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import App from './App.jsx';
import store from './app/store.js';

import AuthInitializer from './features/auth/components/AuthInitializer.jsx';
import UserListener from './features/users/components/UserListener.jsx';
import MessageListener from './features/chat/components/MessageListener/MessageListener.jsx';
import NotificationListener from './features/notifications/components/NotificationListener.jsx';
import GlobalMessageListener from './features/chat/listeners/GlobalMessageListener.jsx';
import ChatListListener from './features/chat/listeners/ChatListListener.jsx';
import TypingListener from './features/chat/listeners/TypingListener.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthInitializer>
          <UserListener>
            <ChatListListener>
              <TypingListener>
                <GlobalMessageListener>
                  <NotificationListener>
                    <MessageListener>
                      <App />
                      <Toaster
                        position="top-right"
                        reverseOrder={false}
                        gutter={10}
                        toastOptions={{
                          duration: 3000,
                          style: {
                            background: "#fff",
                            color: "#111827",
                            borderRadius: "12px",
                            padding: "14px 18px",
                            fontSize: "14px",
                          },
                          success: {
                            iconTheme: {
                            primary: "#22c55e",
                            secondary: "#fff",
                            },
                          },
                          error: {
                            iconTheme: {
                              primary: "#ef4444",
                              secondary: "#fff",
                            },
                          },
                        }}
                      />
                    </MessageListener>
                  </NotificationListener>
                </GlobalMessageListener>
              </TypingListener>
            </ChatListListener>
          </UserListener>
        </AuthInitializer>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
