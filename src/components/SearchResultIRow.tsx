import { AddIcon } from "@chakra-ui/icons";
import { Button, Container, Link, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { gitRepositoryInApp, RepoServer } from "../utility";
import { useSavedRepo } from "../providers/SavedRepoProvider";

export default function SearchResultRow(item: gitRepositoryInApp){
    const { repos, setRepos } = useSavedRepo();
    const [showAddBtn, setShowAddBtn] = React.useState(!repos.find((repo)=> repo.id === item.id));
    
    useEffect(()=>{
        //Update the Add button display based on current repo list.
        setShowAddBtn(!repos.find((repo)=> repo.id === item.id));
    },
    [repos, item.id]);
    
    /**
     * Add a repository by call reposerver api, and update the view accordingly.
     * @param {object} repo  The Repo to add to repo server
     * @returns void
     */
    const addRepo = (repo: gitRepositoryInApp) => {
        // Such limitations should set in backend but repo server does not have such setup yet.
        if(repos.length > 9){
            alert("You have reached the limitation on saved repositories");
            return;
        }
        const response = RepoServer.addRepo(repo);
        response.then((data:gitRepositoryInApp)=>{ 
            // Assume resolved promoise (200 from server) means successfully added the repo, no need extra check the response body here.
            setShowAddBtn(false);
            repos.push(repo);
            const newRepo = [...repos];
            setRepos(newRepo);
        }).catch(message => {
            //TODO: Error handler
            console.log(message);
        });
    }
    return (
        <Container
          key={item.id} 
          lineHeight="20px"
           pt={5} 
           pb={5} 
           float="left"
           display="inline-block">
            <Link p="2" color="blue.400" href={item.url} target="_blank" fontWeight={600}>{item.fullName} </Link>
            <Text p="2">{item.description} </Text>
            <Text p="2" bg="blue.200" borderRadius={4}>{item.language} </Text>
            <Text p="2">Starts: {item.stargazersCount} </Text>
            {showAddBtn && <Button bg="green.400" onClick={() => {addRepo(item)}}><AddIcon /></Button>}
        </Container>
    )
}

