import React from 'react';
import { RepoList, SearchBox } from './components';
import { Box, ChakraProvider } from '@chakra-ui/react';
import SavedRepoProvider from './providers/SavedRepoProvider';
function App() {
  return (
    <>
    
    <ChakraProvider>
      <SavedRepoProvider>
      <Box w="100%" display="flex">
      <Box pt="50" pl="50" width="40%" display="inline-block">
          <SearchBox />
      </Box>
      <Box mt="50" ml="50" minHeight="500px" width="55%" display="inline-block">
          <RepoList />
      </Box>
      
      </Box>
      </SavedRepoProvider>
    </ChakraProvider>
    </>

  );
}

export default App;
