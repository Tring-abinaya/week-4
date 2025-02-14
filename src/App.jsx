import { useState } from 'react'
import './App.css'

function App() {
  const [inputFields, setInputFields] = useState([{ name: "", age: "", skills: "", district: "" }])
  const [isAdd, setIsAdd] = useState(false);

  const handleInputsChange = (name, field, event) => {
    const value = { ...inputFields };
    if (field == "name") {
      value[index].name = event.target.value;
    }
    if (field == "age") {
      value[index].age = event.target.value;
    }
    if (field == "skills") {
      value[index].skills = event.target.value;
    }
    if (field == "district") {
      value[index].district = event.target.value;
    }
    setInputFields(value);
  }

  const showInputContainer=()=>{
    setIsAdd(true);
  }

  return (
    <>
      <div class="heading">
        <h1>Crud Operation</h1>
        <button className='addbtn' onClick={showInputContainer}>+ Add More</button>
      </div>
      {
        isAdd &&
        
          inputFields.map((inputField) => (
            <div class="input_container">
              <input
                type="text"
                placeholder="Enter your name"
                value={inputFields.name}
                onChange={(e) => handleInputsChange(index, "name", e)}
              />
              <input
                type="number"
                placeholder="Enter your age"
                value={inputFields.age}
                onChange={(e) => handleInputsChange(index, "age", e)}
              />
              <input
                type="text"
                placeholder="Enter your skills"
                value={inputFields.skills}
                onChange={(e) => handleInputsChange(index, "skills", e)}
              />
              <input
                type="text"
                placeholder="Enter your district"
                value={inputFields.district}
                onChange={(e) => handleInputsChange(index, "district", e)}
              />

              <button className='savebtn'>Save</button>
            </div>
          ))
        
      }
      <div className='display'>
      <table>
        <tr>
          <th>SNo</th>
          <th>Name</th>
          <th>Age</th>
          <th>Skills</th>
          <th>District</th>
          <th>Actions</th>
        </tr>
        <tr>
          <td>dsf</td>
          <td>sd</td>
          <td>gdsgf</td>
          <td>dgs</td>
          <td>dsf</td>
          <td>  
            <button className='editbtn'>Edit</button>
            <button className='deletebtn'>Delete</button>
          </td>
        </tr>
      </table>
      </div>

    </>
  )
}

export default App
