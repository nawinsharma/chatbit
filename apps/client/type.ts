export interface GroupChatType {
    id: string;
    user_id: string;
    title: string;
    passcode: string;
    created_at: string;
  }
  
  export interface GroupChatUserType {
    id: number;
    name: string;
    group_id: string;
    created_at: string;
    isOnline?: boolean;
  };
  
  export interface MessageType {
    id: string;
    message: string;
    group_id: string;
    name: string;
    created_at: string;
  };
  