import { config } from './config';
import { gitRepositoryInApp } from './helper';

export const RepoServer = {
    /**
     * Call repo server API to retrieve list of repos been save.
     * @returns Promise, resolved if server returns list of repo. rejected if api call failed.
     */
    getRepos: async () => {
        const response = await fetch(`${config.get('repoServerHost')}/repo/`,{
            method: "GET",
        });
        return response.json();
    },
    /**
     * Call api to delete a repo from repo server.
     * @param {string} id - id of the repo to be deleted.
     * @returns Promise, resolved with http status 200 means delete success, rejected if api call failed.
     */
    deleteRepo: async (id: string) => {
        const response = await fetch(`${config.get('repoServerHost')}/repo/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": 'application/json'
            }
        });
        return response.status;
    },
    /**
     * Call api to add a new repo to repo server
     * @param {object} newRepo - The repository 
     * @returns Promise, resolved if server added the repo. rejected if api call failed.
     */
    addRepo: async (newRepo: gitRepositoryInApp) =>{
        const response = await fetch(`${config.get('repoServerHost')}/repo/`,{
            method: "POST",
            body: JSON.stringify(newRepo)
        });
        return response.json();
    },
    healthCheck: ()=> {},
} 