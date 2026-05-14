/****Search Main Component 
 * Author : Sivaprakash Raman
 * Version : 0.0.1
 * Common component : Custom Search
 * Release : 0.0.2
 * Ticket : 1, 2
*/

import { useState, useEffect } from 'react';
import CustomSearch from './CustomSearch';
import AdvancedFilter from './AdvancedFilter';
import Game from './TicTocTic';
import './App.css'

function App() {

  //For Search Component
  const [originalData, setOringinalData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // For ToDo List
  const [toDoValue, setToDoValue] = useState("");
  const [toDos, setToDos] = useState([]);
  const [tempid, setTempid] = useState(0);

  const { customFilter, customPush, customData} = CustomSearch();

  // Get Api Funnction
  const getApiData = async()=> {

    try {
      const getApi = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');

      const response = await getApi.json();

      if(response && response.length > 0) {
        customPush(response);
        setOringinalData(response);
      }

    }catch(e){
      console.log(e);
    }

  }

  //ToDo Input Changes 
  const onChangeToDo = (inputValue) => {
    setToDoValue(inputValue);
  }

  // ToDo submit
  const submitFormData = (event) => {
    setTempid(tempid + 1);
    let data = [{text: toDoValue, tempid, status: false}];
    setToDos([...toDos, ...data]);
    setToDoValue("");
    event.preventDefault();
  }

  const deleteList = (tempIds) => {
    let filteredData = toDos.filter((data) => data.tempid != tempIds);
    setToDos(filteredData);
  }

  const editList = (data, index) => {

    let tempData = [...toDos];
     if(tempData[index]) {
      tempData[index].status = true;

      setToDos(tempData);
     }
  };

  // Save List
  const savelist = (data, index) => {

    let tempData = [...toDos];  
      if(tempData[index]) {
        tempData[index].status = false;

        setToDos(tempData);
        alert("Welcome to Save");
      }
    };

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
    {/* Search Main Component */}
      <section id="center">
        <h5>Custom Search</h5>
        <br/>
        <input name="SearchInput" type="text" value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} />
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
      {/* ToDo List  */}
      <section id="center" className="secton_top">
        <h5>To Do </h5>
        <form onSubmit={(e)=>submitFormData(e)}>
          <div>
            <input type="text" value={toDoValue} onChange={(e)=>onChangeToDo(e.target.value)} />
            <button type="submit">Submit</button>
          </div>
        </form>
        {
          toDos && toDos.length == 0 &&
          <span>No Records Added</span>
        }
        {
          toDos && toDos.length > 0 &&
          <ul>
            {toDos.map((data, index)=> 
            <li key={index}>
              <div>
                { 
                !data.status ? 
                <div>{data.text}</div> : <div><input type="text" name="ToDoInput" value={data.text} onChange={(e)=>{ let tempData = [...toDos]; tempData[index].text = e.target.value; setToDos(tempData); }} /></div> }

                <div>{!data.status ? <button onClick={()=>editList(data,index)}>Edit</button> : <button onClick={()=>savelist(data,index)}>save</button>}
                  <button onClick={()=>deleteList(data.tempid)}>Delete</button>
                </div>
              </div>
            </li>)}
          </ul>
        }
      </section>
      <section id="center" className="secton_top">
        <h5>Advance Filter</h5>
        <AdvancedFilter />
      </section>
      <section id="center" className="secton_top">
        <h5>Tic Tac Toe</h5>
        <Game />
      </section>
      {/* Pretty Print Section */}
      <section id="pretty_print">
        {/* Custom Search Print Section */}
        <h5 className="pretty_header">Custom Search</h5>
        <div className="pretty_column">
          <pre>{JSON.stringify(customData, null, 2)}</pre>
        </div>
        {/* To Do Print Section */}
        <h5 className="pretty_header">To Do</h5>
        <div className="pretty_column">
          <pre>{JSON.stringify(toDos, null, 2)}</pre>
        </div>
      </section>
    </>
  )
}

export default App;
