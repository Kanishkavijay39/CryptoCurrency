import { LinearProgress, makeStyles, Typography } from '@material-ui/core'
import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import CoinChart from '../components/CoinChart'
import { SingleCoin } from '../config/api'
import { CryptoState } from '../CryptoContext'


const CoinPage = () => {

  const {id} = useParams();
  const[coin,setCoin] = useState();
  const{currency,symbol} = CryptoState();
  const fetchCoin = async()=>{
    const{data} = await axios.get(SingleCoin(id));
   
    setCoin(data);
  }

  useEffect(() => {
    fetchCoin();
  }, [])
  const useStyles = makeStyles((theme) => ({

    container : {
      display : "flex",
      [theme.breakpoints.down("md")]:{
        flexDirection : "column",
        alignItems : "center"
      },
    },
    sidebar:{
      width : "30%",
      [theme.breakpoints.down("md")]:{
        width:"100%"
      },
      display:"flex",
      flexDirection : "column",
      alignItems : "center",
      marginTop:25,
      borderRight : "2px solid grey"
    },
    heading : {
      fontWeight : "bold",
      marginBottom : 20
    },
    description:{
      width:"100%",
      padding : 25,
      paddingBottom:15,
      paddingTop:0,
      textAlign:"justify"
    },
    marketData:{
      alignSelf:"start",
      padding : 25,
      paddingTop : 10,
      width:"100%",
    }
  }))

  console.log(coin)
  const classes = useStyles();
  if(!coin)return <LinearProgress style={{backgroundColor :"yellow"}} />
  return (
    <div className={classes.container}>
    <div className={classes.sidebar}>
        
        <img src={coin?.image.large} alt={coin?.name} height="200" style={{marginBottom : 20}} />
        
        <Typography variant='h3' className={classes.heading}>
          {coin?.name}
        </Typography>

        <Typography variant='subtitle1' className={classes.description}>
          {coin?.description.en.split(". ")[0]}.
        </Typography>
        <div className={classes.marketData}>
          <span style={{display:"flex"}}>
            <Typography variant='h5' className={classes.heading} >
              Rank : 
            </Typography>
            &nbsp; &nbsp;
            <Typography
            variant='h5'
            
            >
              {coin?.market_cap_rank}
            </Typography>

          </span>

          <span style={{display:"flex"}}>

            <Typography
            variant='h5'
            className = {classes.heading}
            >
              Current Price : 
            </Typography>
            &nbsp; &nbsp;
            <Typography
            variant='h5'>

              {symbol} {" "}
              {coin?.market_data.current_price[currency.toLowerCase()]}
              
            </Typography>


          </span>

          <span style={{display:"flex"}}>

        <Typography
        variant='h5'
        className = {classes.heading}
        >
          Market Price : 
        </Typography>
        &nbsp; &nbsp;
        <Typography
        variant='h5'>

          {symbol} {" "}
          {coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6)} M
        </Typography>


        </span>

        </div>
      </div>
      
        <CoinChart coin = {coin} />
      
    </div>
  )
}

export default CoinPage