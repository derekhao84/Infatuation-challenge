import React from 'react';
import { Input, Container } from '@chakra-ui/react';
import { gitRepositoryInApp, config, reposReducer } from '../utility';
import  SearchResultRow  from './SearchResultIRow';


let timer: ReturnType<typeof setTimeout>;

/**
 * 
 * A search box component, including the dropdown menu from GitHub API response
 */
const SearchBox = () => {
    const [value, setValue] = React.useState('');
    const [resultsDisplayed, setResultsDisplayed] = React.useState<gitRepositoryInApp[]>([]);
    const searchBoxChangeHandler = (event: any) => {
        clearTimeout(timer);
        setResultsDisplayed([]);
        setValue(event.target.value);
        timer = setTimeout(()=>{
            fetch(`https://api.github.com/search/repositories?sort=stars&per_page=10&q=${event.target.value}`,{
                method: "GET",
                headers: config.get('githubAPICallHeader'),
            }).then(response => response.json()).then((data) => {
                setResultsDisplayed(reposReducer(data.items));
            }).catch((message)=> {
                //Error handler
                console.log(message);
            });
        }, config.get('searchDebounce'));
    };
    return (
        <>
        <Input 
            size='lg'
            value={value}
            onChange={searchBoxChangeHandler}
            placeholder='Search GitHub Repository' >
        </Input>
        <Container bg="gray.100" maxHeight="500px" display="inline-block" overflowY="scroll" >
        {
            resultsDisplayed.map((item) => {
                return <SearchResultRow {...item } />
            }) 
        }
        </Container>

        </>
    )
}
export default SearchBox;