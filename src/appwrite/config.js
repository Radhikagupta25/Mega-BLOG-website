import conf from "../conf/conf";
import { Client, ID, TablesDB, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    tablesDB;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectID);
        this.tablesDB = new TablesDB(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, content, featuredImg, userId, status }) {
        try {
            return await this.tablesDB.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionID,
                rowId: ID.unique(),
                data: {
                    title,
                    content,
                    featuredImg,
                    userId,
                    status,
                }
            });
        } catch (error) {
            console.log("createPost:", error);
            throw error;
        }
    }

    async updatePost(rowId, { title, content, featuredImg, userId, status }) {
        try {
            return await this.tablesDB.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionID,
                rowId: rowId,
                data: {
                    title,
                    content,
                    featuredImg,
                    userId,
                    status
                }
            });
        } catch (error) {
            console.log("updatePost:", error);
            throw error;
        }
    }

    async deletePost(rowId) {
        try {
            return await this.tablesDB.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionID,
                rowId: rowId
            });
            return true;
        } catch (error) {
            console.log("deletePost:", error);
            throw error;
            return false;
        }
    }

    async upsertPost(rowId, { title, content, featuredImg, userId, status }) {
        try {
            return await this.tablesDB.upsertRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionID,
                rowId: rowId,
                data: {
                    title, content, featuredImg, userId, status
                }
            });
            return true;
        } catch (error) {
            console.log("upsertPost:", error);
            throw error;
            return false;
        }
    }

    async getPost() {
        try {
            return await this.tablesDB.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionID,
                queries: [
                    Query.equal('status', 'active')
                ]
            })
        } catch (error) {
            console.log("getPost:", error);
            throw error;
        }
    }
}

const service = new Service();
export default service;
