import { Client, Account, Databases, Storage } from "appwrite";

const client = new Client()

client.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
client.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)

const databases = new Databases(client)
const storage = new Storage(client)
const account = new Account(client)

const DB = import.meta.env.VITE_APPWRITE_DATABASE_ID
const CARDS = import.meta.env.VITE_APPWRITE_COLLECTION_ID
const STORAGE = import.meta.env.VITE_APPWRITE_STORAGE_ID


export { databases, storage, account, DB, CARDS, STORAGE, client }

