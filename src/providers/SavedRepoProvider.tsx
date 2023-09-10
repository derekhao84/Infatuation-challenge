import React, { useContext } from "react";
import { gitRepositoryInApp, RepoServer } from "../utility";

interface SavedRepoProviderProps {
    repos: gitRepositoryInApp[],
    setRepos: (data: gitRepositoryInApp[])=> void
    isListReady: boolean //Indicate if the save list has been successfully retrieve from server on page initial loading.
}

const SavedRepoContext = React.createContext<SavedRepoProviderProps>({
    repos: [],
    isListReady: false,
    setRepos: (data) => {},
});



export default function SavedRepoProvider({ children }: { children: React.ReactNode }) {
    const [isListReady, setIsListReady] = React.useState(false); 
    const [repos, setRepos] = React.useState<Array<gitRepositoryInApp>>([]);
    React.useEffect(()=>{
        const res = RepoServer.getRepos();
        res.then((data)=>{
            if(data.repos){
                setRepos(data.repos);
            }
        });
        setIsListReady(true);
    },[]);


    return (
        <SavedRepoContext.Provider value={{ 
                repos,
                setRepos,
                isListReady,
                }}>
        {children}
        </SavedRepoContext.Provider>
    );
}

export function useSavedRepo(){
    const context =  useContext(SavedRepoContext);
    if(!context){
     throw new Error('useSavedRepo is been used outside the SavedRepoProvider' );
    }
    return context;
}