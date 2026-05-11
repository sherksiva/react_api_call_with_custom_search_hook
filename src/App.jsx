/****Search Main Component 
 * Author : Sivaprakash Raman
 * Version : 0.0.1
 * Common component : Custom Search
 * Release : 0.0.1
 * Ticket : 1
*/

import { useState, useEffect } from 'react'
import CustomSearch from './CustomSearch'
import './App.css'

function App() {

  const [originalData, setOringinalData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const { customFilter, customPush, customData} = CustomSearch();

  // Get Api Funnction
  const getApiData = async()=> {

    try {
      const getApi = await fetch('https://jsonplaceholder.typicode.com/posts');

      const response = await getApi.json();

      if(response && response.length > 0) {
        customPush(response);
        setOringinalData(response);
      }

    }catch(e){
      console.log(e);
    }

  }

  // Clear Action 
  const clearAction = () => {
    setSearchInput("");
  }
  //Component inital Effect
  useEffect(()=> {

    getApiData();

  }, []);
  
  // it will occur While Input Changes
  useEffect(()=> {

    if(originalData && originalData.length) {
      customFilter(searchInput, originalData);
    }

  }, [searchInput])

  return (
    <>
      <section id="center">
        <h5>Custom Search with Http Api Request</h5>
        <br/>
        <input type="text" value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} />
        <button onClick={()=>clearAction()} >Clear</button>
        {
          customData && customData.length > 0 && 

          <ul>
            {
              customData.map((list)=> <li key={list.id} >{list.title}</li>)
            }
          </ul>
        }
        <br />
        {
          customData && customData.length == 0 && 

          <span>No Record Found</span>
        }
      </section>
    </>
  )
}

export default App;
