const configObj: Record<string, any> = {
    repoServerHost: 'http://localhost:8080',
    repoCallTimeout: 500,
    gitHubToken: '',
    githubAPIDomain: 'https://api.github.com',
    githubAPICallHeader: {
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
    },
    searchDebounce: 800
}

export const config = {
    /**
     * Read the App's configuration, in this task, use plain object to store but in real app it should be read from configuration file(s).
     * @param {string} key - Key of the configuration
     * @returns value of the configuration, null if on such value found.
     */
    get: (key: string) => {
        return configObj[key] ?? null;
    },
};