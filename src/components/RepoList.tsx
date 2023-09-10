import React, { useEffect } from "react";

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Text,
  } from '@chakra-ui/react'
import { CloseButton } from "@chakra-ui/react";
import { useSavedRepo } from "../providers/SavedRepoProvider";
import { gitRepositoryInApp, RepoServer } from "../utility";

function RepoList(){
    const { repos, setRepos } = useSavedRepo();
    const [repoInView, setRepoInView] = React.useState<gitRepositoryInApp[]>([]);
    useEffect(()=>{
        setRepoInView(repos);
    },[repos]);
    

    const removeRepo = (id:string) => {
        const response = RepoServer.deleteRepo(id);
        response.then((data) => {
            let reposCopy = repos.filter((repo)=> repo.id !== id);
            setRepos(reposCopy);
        }).catch((message) => {
            //TODO Error handler
            console.log(message);
        });
    };

    const sortByDate = () => {
        const sortedByDate = [...repoInView];
        sortedByDate.sort((a,b)=> {
            let da = new Date(a.createdAt), db = new Date(b.createdAt);
            return da > db ? 1 : -1
        });
        setRepoInView(sortedByDate);
    };
    const sortByStars = () => {
        const sortedByStars = [...repoInView];
        sortedByStars.sort((a,b) => {
            return a.stargazersCount < b.stargazersCount ? 1 : -1;
        });
        setRepoInView(sortedByStars);
    }
    return (
        <TableContainer>
  <Table variant='simple'>
    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th w="100px">Language</Th>
        <Th w="100px" isNumeric onClick={()=> sortByStars()}>Stars(click to sort)</Th>
        <Th onClick={()=> sortByDate()}>Create Date(click to sort)</Th>
        <Th>Remove</Th>
      </Tr>
    </Thead>
    <Tbody>
        {
            repoInView.map((repo) => {
                return (
                    <Tr key={repo.id}>
                    <Td 
                     maxW="200px"
                     overflowX="scroll"
                     ><Text>{repo.fullName}</Text></Td>
                    <Td w="100px">{repo.language}</Td>
                    <Td w="100px">{repo.stargazersCount}</Td>
                    <Td>{repo.createdAt}</Td>
                    <Td><CloseButton bg="green.400" onClick={() => {removeRepo(repo.id)}} /></Td>
                  </Tr>
                )
            })
        }
    </Tbody>
  </Table>
</TableContainer>
    )
}
export default RepoList;