/****Search Main Component 
 * Author : Sivaprakash Raman
 * Version : 0.0.1
 * Common component : Custom Search
 * Release : 0.0.2
 * Ticket : 1, 2
*/

import { useState, useEffect } from 'react'
import CustomSearch from './CustomSearch'
import './App.css'

function App() {

  const [originalData, setOringinalData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [toDoValue, setToDoValue] = useState("");
  const [toDos, setToDos] = useState([]);
  const [tempid, setTempid] = useState(0);

  const { customFilter, customPush, customData} = CustomSearch();
  // let id = 0;
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

  //ToDo Input Changes 
  const onChangeToDo = (inputValue) => {
    setToDoValue(inputValue);
  }

  // ToDo submit
  const submitFormData = (event) => {
    // console.log(event, "Event")
    setTempid(tempid + 1);
    // event.preventDefault();
    let data = [{text: toDoValue, tempid, status: false}];
    console.log(toDos, "Data")
    setToDos([...toDos, ...data], ()=>{
      console.log(toDos, "ToDos")
    });
    setToDoValue("");
    event.preventDefault();
  }

  const deleteList = (tempIds) => {
    let filteredData = toDos.filter((data) => data.tempid != tempIds);
    console.log(filteredData, "Filtered Data");
    setToDos(filteredData);
  }

  const editList = (data, index) => {

    let tempData = [...toDos];
     if(tempData[index]) {
      tempData[index].status = true;

      setToDos(tempData);
      alert("Welcome to Edit");
     }
    // let editData = toDos.filter((data) => data.tempid == tempIds);
    // console.log(editData, "Edit Data");
  };

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
              <div>{ !data.status ? <span>{data.text}</span> : <input type="text" value={data.text} onChange={(e)=>{ let tempData = [...toDos]; tempData[index].text = e.target.value; setToDos(tempData); }} />} <span>{!data.status ? <button onClick={()=>editList(data,index)}>Edit</button> : <button onClick={()=>savelist(data,index)}>save</button>}<button onClick={()=>deleteList(data.tempid)}>Delete</button></span></div>
              </li>)}
          </ul>
        }
      </section>
    </>
  )
}

export default App;
