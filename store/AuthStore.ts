import { ID, Query, account, databases } from "@/appwrite";
import { Models } from "appwrite";
import { create } from "zustand";

interface UserState {
  user: Models.Document;
  registerUser: (name: string, email: string) => void;
  checkUser: (email: string) => void;
}

export const useAuthStore = create<UserState>((set, get) => ({
  user: {
    $id: "",
    $createdAt: "",
    email: "",
    name: "",
    $collectionId: "",
    $databaseId: "",
    $updatedAt: "",
    $permissions: [],
  },
  registerUser: async (name: string, email: string) => {
    const user = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
      ID.unique(),
      {
        email: email,
        name: name,
      }
    );
    set({ user: user });
  },
  checkUser: async (email: string) => {
    const data = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
      [Query.equal("email", [email])]
    );
    const user = data.documents[0];

    set({ user: user });
  },
}));
