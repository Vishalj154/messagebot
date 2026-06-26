import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot,
  serverTimestamp,
  doc,
  setDoc,
  getDoc,
  updateDoc
} from "firebase/firestore";
import { db } from "../firebase";

/**
 * Chat Service to handle all Firestore operations for real-time messaging
 * Uses text-only messaging, skipping image uploads for now.
 */
class ChatService {
  /**
   * Listen to all messages in a specific chat room
   */
  listenToMessages(chatId, callback) {
    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(messages);
    });
  }

  /**
   * Send a text message to a specific chat room
   */
  async sendMessage(chatId, senderId, text) {
    if (!text.trim()) return;

    const messagesRef = collection(db, "chats", chatId, "messages");
    const newMessage = {
      senderId,
      text: text.trim(),
      createdAt: serverTimestamp(),
      type: "text" // Placeholder for future expansion (e.g. "image")
    };

    // Add message
    await addDoc(messagesRef, newMessage);

    // Update the parent chat document with the last message info
    const chatRef = doc(db, "chats", chatId);
    await updateDoc(chatRef, {
      lastMessage: text.trim(),
      lastMessageTime: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  }

  /**
   * Create a new chat room between two users
   */
  async createDirectChat(user1Id, user2Id) {
    // A simple way to generate a unique, consistent ID for a direct chat
    const chatId = [user1Id, user2Id].sort().join("_");
    const chatRef = doc(db, "chats", chatId);
    
    const chatSnap = await getDoc(chatRef);
    if (!chatSnap.exists()) {
      await setDoc(chatRef, {
        participants: [user1Id, user2Id],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        type: "direct"
      });
    }
    
    return chatId;
  }

  /**
   * Listen to all chats for a specific user
   */
  listenToUserChats(userId, callback) {
    const chatsRef = collection(db, "chats");
    // We listen to all chats where this user is a participant
    const q = query(chatsRef, orderBy("updatedAt", "desc"));
    
    return onSnapshot(q, (snapshot) => {
      // Note: Firestore array-contains query is limited if we want to order by updatedAt. 
      // For simplicity in a small app, we fetch and filter in memory, or we can add a specific index.
      const chats = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(chat => chat.participants?.includes(userId));
        
      callback(chats);
    });
  }
}

export const chatService = new ChatService();
