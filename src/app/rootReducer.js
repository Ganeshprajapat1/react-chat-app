import { combineReducers } from "@reduxjs/toolkit";

import authReducer from '../features/auth/store/authSlice.js';
import userReducer from '../features/users/store/userSlice.js';
import messageReducer from '../features/chat/store/messageSlice.js';
import notificationReducer from '../features/notifications/store/notificationSlice.js';
import chatListReducer from '../features/chat/store/chatListSlice.js';
import typingReducer from '../features/chat/store/typingSlice.js';
import messageActionReducer from '../features/chat/store/messageActionSlice.js';
import replyReducer from '../features/chat/store/replySlice.js';

const rootReducer = combineReducers({
    auth: authReducer,
    users: userReducer,
    messages: messageReducer,
    notifications: notificationReducer,
    chatList: chatListReducer,
    typing: typingReducer,
    messageAction: messageActionReducer,
    reply: replyReducer,
});

export default rootReducer;