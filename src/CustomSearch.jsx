import { useState } from "react";

function CustomSearch () {

    const [customData, setCustomData] = useState([]);

    const customPush = (data) => {
        setCustomData(data);
    }

    const customFilter = (inputText, originalData) => {

      if(inputText) {
        let filterData = originalData.filter((data)=>data.title.toLowerCase().includes(inputText.toLowerCase()));
        setCustomData(filterData);
      }
      if(inputText == "") {
        setCustomData(originalData);
      }

    }

    return {customPush, customData, customFilter};

}

export default CustomSearch;