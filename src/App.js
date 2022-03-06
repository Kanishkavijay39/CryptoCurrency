import './App.css';
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoinPage from './pages/CoinPage';
import Header from './components/Header';
import { makeStyles } from '@material-ui/core';
import { pink } from '@material-ui/core/colors';

function App() {

  const useStyles = makeStyles({

    App : {
      backgroundColor : "#14161a",
      color : "white",
      minHeight : "100vh"
    }
  })

  const classes = useStyles();

  return (
    <Router>
      
      <div className={classes.App} >
      <Header />  
        <Routes>
         
          <Route exact path='/' element={<HomePage/>} />
          <Route exact path='/coins/:id' element={<CoinPage />} />
       
        </Routes>
      </div>
    </Router>
  );
}

export default App;