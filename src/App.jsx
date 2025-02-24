import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {

  const [isSubmit, setIsSubmit] = useState(false)
  const [inputFields, setInputFields] = useState([{ name: "", age: "", district: "" },]);

  //Function to update the value of an input field
  const handleValueChange = (index, field, event) => {
    const value = [...inputFields];
    if (field == "name") {
      value[index].name = event.target.value;
    }
    if (field == "age") {
      value[index].age = event.target.value;
    }
    if (field == "district") {
      value[index].district = event.target.value;
    }
    setInputFields(value);

  };

  //Function to add new input fields
  const handleAddFields = () => {
    let flag = true
    inputFields.map((inputField) => {
      if (inputField.name.trim() === "" || inputField.age.trim() === "" || inputField.district.trim() === "") {
        alert("Please fill out the fields")
        flag = false
      }
      else if (!(inputField.age >= 1 && inputField.age <= 100)) {
        alert("Please enter valid age");
        flag = false;
      }
    })
 
    if (flag) {
      setInputFields([...inputFields, { name: "", age: "", district: "" }]);
    }
  }

  //Function to remove input field by index
  const handleRemoveFields=(index) =>{
    setInputFields(inputFields.filter((inputField, inx) => inx != index));
  }

  //Function to handle submit
  const handleSubmit = (event) => {

    let flag = true
    inputFields.map((inputField) => {
      if (inputField.name.trim() === "" || inputField.age.trim() === "" || inputField.district.trim() === "") {
        alert("Please fill out the fields")
        // setIsSubmit(false)
        flag = false
      }
      else if (!(inputField.age >= 1 && inputField.age <= 100)) {
        alert("Please enter valid age");
        flag = false;
      }
    })

    if (flag) {
      setIsSubmit(true);
    }
  }

  return (
    <>
      {
        !isSubmit ?
        <div className="input">
          <h1>Adding Dynamic Input Fields</h1>
  
          {inputFields.map((inputField, index) => (
            <div className='container' key={index}>
              <input
                type="text"
                placeholder="Enter Name"
                value={inputField.name}
                onChange={(e) => handleValueChange(index, "name", e)}
  
              />
  
              <input
                type="number"
                placeholder="Enter Age"
                value={inputField.age}
                onChange={(e) => handleValueChange(index, "age", e)}
              />
  
              <input
                type="text"
                placeholder="Enter District"
                value={inputField.district}
                onChange={(e) => handleValueChange(index, "district", e)}
              />
  
              <button className='plus' onClick={handleAddFields}>+</button>
              <button className='minus' hidden={inputFields.length == 1} onClick={() => handleRemoveFields(index)}>-</button>
  
  
            </div>
          ))}
  
  
          <button className='submit' onClick={handleSubmit}>Submit</button>
  
        </div>
          :
        <div className='details'>
          <h2>Details</h2>
          <table>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Age</th>
              <th>District</th>
            </tr>
  
            {inputFields.map((inputField, index) => (
  
              <tr key={index}>
                <td>{index+1}</td>
                <td>{inputField.name}</td>
                <td>{inputField.age}</td>
                <td>{inputField.district}</td>
              </tr>
  
            ))}
          </table>
        </div>
      }


    </>
  )
}

export default App
