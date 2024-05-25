import Home from './Home';
import DataProvider from './components/context/dataContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = ()=>{
  return (<>

    <DataProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Home/>
      </ThemeProvider>
    </DataProvider>
  </>)
}
export default App;