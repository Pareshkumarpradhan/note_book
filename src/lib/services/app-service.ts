import type { Store } from "@cloudparker/easy-idb";
import { writable } from "svelte/store";
export const booksStore = writable<Store>();
export const notesStore = writable<Store>();
export const notesByBookStore = writable<Store>();