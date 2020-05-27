import React from 'react';

import {Cards, Charts, CountryPicker} from './components';
import styles from './App.module.css';
import {  fetchData } from './api';

import logo from './images/logo.png';



class App extends React.Component {

    state ={
       data: {}, 
       country:'', 
    }

    handleCountryChange = async (country)  => {
        const fetchedData = await fetchData(country);

        this.setState({data: fetchedData, country: country});
    }
    async componentDidMount() {
        const fetchedData = await fetchData();

        this.setState({ data: fetchedData});
    }
   render() {
       const { data, country } = this.state;
       return(
           <div className={styles.container}>
              <img className ={styles.image} src={logo}  alt="logo"/>
              <Cards data ={data} />
              <CountryPicker handleCountryChange = {this.handleCountryChange} />
              <Charts data= {data} country= {country} />
           </div>
       )
   }
}

export default App;