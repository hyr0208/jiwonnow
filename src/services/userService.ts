import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import type { UserProfile } from "../types";

// 사용자 프로필 가져오기
export const getUserProfile = async (
  userId: string,
): Promise<UserProfile | null> => {
  try {
    const profileRef = doc(db, "users", userId, "profile", "data");
    const snap = await getDoc(profileRef);

    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

// 사용자 프로필 업데이트 (저장)
export const updateUserProfile = async (
  userId: string,
  profile: UserProfile,
) => {
  try {
    const profileRef = doc(db, "users", userId, "profile", "data");
    await setDoc(profileRef, {
      ...profile,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};
