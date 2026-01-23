import { db } from "./firebase";
import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import type { Project } from "../types";

// 즐겨찾기 토글 (추가/삭제)
export const toggleBookmark = async (userId: string, project: Project) => {
  try {
    const bookmarkRef = doc(db, "users", userId, "bookmarks", project.id);
    const snap = await getDoc(bookmarkRef);

    if (snap.exists()) {
      await deleteDoc(bookmarkRef);
      return false; // 삭제됨
    } else {
      await setDoc(bookmarkRef, {
        projectId: project.id,
        title: project.title,
        organization: project.organization,
        region: project.region,
        supportType: project.supportType,
        status: project.status,
        applicationEndDate: project.applicationEndDate || null,
        detailUrl: project.detailUrl,
        tags: project.tags || [],
        createdAt: serverTimestamp(),
      });
      return true; // 저장됨
    }
  } catch (error) {
    console.error("Error toggling bookmark:", error);
    throw error;
  }
};

// 즐겨찾기 여부 확인
export const checkIsBookmarked = async (userId: string, projectId: string) => {
  try {
    const bookmarkRef = doc(db, "users", userId, "bookmarks", projectId);
    const snap = await getDoc(bookmarkRef);
    return snap.exists();
  } catch (error) {
    console.error("Error checking bookmark:", error);
    throw error;
  }
};
