import { openDB, type IDBPDatabase } from "idb";
import type { ProgressSnapshot } from "@/types/progress";

const DB_NAME = "ts-handbook";
const DB_VERSION = 1;
const STORE = "kv";

async function db(): Promise<IDBPDatabase> {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(database) {
      if (!database.objectStoreNames.contains(STORE)) {
        database.createObjectStore(STORE);
      }
    },
  });
}

export async function idbGet<T>(key: string): Promise<T | undefined> {
  const database = await db();
  return database.get(STORE, key) as Promise<T | undefined>;
}

export async function idbSet<T>(key: string, value: T): Promise<void> {
  const database = await db();
  await database.put(STORE, value, key);
}

export async function idbDelete(key: string): Promise<void> {
  const database = await db();
  await database.delete(STORE, key);
}

const PROGRESS_KEY = "progress";

export async function loadProgress(): Promise<ProgressSnapshot | undefined> {
  return idbGet<ProgressSnapshot>(PROGRESS_KEY);
}

export async function saveProgress(snapshot: ProgressSnapshot): Promise<void> {
  await idbSet(PROGRESS_KEY, snapshot);
}

export async function clearProgress(): Promise<void> {
  await idbDelete(PROGRESS_KEY);
}
