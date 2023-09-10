export interface gitRepositoryInApp {
    id: string,
    url: string,
    stargazersCount: number,
    fullName: string,
    language: string,
    createdAt: string,
    description: string,
}

/**
 * Interface for data in github's response, the field names are different from the reposerver
 */

interface gitRepositoryInResponse {
    id: string,
    url: string,
    stargazers_count: number,
    full_name: string,
    language: string,
    created_at: string,
    description: string,
}

/*
**  Convert the github repo in response from github api to repository object used in this app by removed unused fields.
*/ 

export const reposReducer = ( responseData:gitRepositoryInResponse[] ) => {
    return responseData.map((item :gitRepositoryInResponse) => {
        const { id, url, stargazers_count, created_at, full_name, language, description } = item;
        return {
            id: id + '',
            language,
            description,
            url: url,
            stargazersCount: stargazers_count,
            fullName: full_name,
            createdAt: created_at
        }
    })
}