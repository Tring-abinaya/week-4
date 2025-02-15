import { useState } from 'react'
import './App.css'

function App() {
  const [inputFields, setInputFields] = useState({ name: "", age: "", skills: "", district: "" })
  const [details, setDetails] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleInputsChange = (field, event) => {
    setInputFields(
      {
        ...inputFields,
        [event.target.name]: event.target.value
      }
    )
  }

  const showInputContainer = () => {
    setIsAdd(true);
  }

  const showDetails = () => {
    if (inputFields.name.trim() === "" || inputFields.age.trim() === "" || inputFields.skills.trim() === "" || inputFields.district.trim() === "") {
      alert("Please fill out the fields");
    }
    else if (!(inputFields.age >= 1 && inputFields.age <= 100)) {
      alert("Please enter valid age")
    }
    else {

      if (editData !== null) {
        const updatedDetails = details.map((detail, index) =>
          index + 1 === editData.id ? inputFields : detail
        );
        setDetails(updatedDetails);

      } else {
        setDetails([...details, inputFields]);

      }
      setIsSave(true)
      setIsAdd(false)
      setInputFields({ name: "", age: "", skills: "", district: "" })
    }

  }

  const editDetails = (value, index) => {
    setIsAdd(true);
    setInputFields(value)
    setEditData({ id: index + 1, ...value })
  }

  const deleteDetails = (index) => {
    const confirmDelete = window.confirm("Are you sure want to delete this item?");
    
    if (confirmDelete) {
      const newDetails = details.filter((_,i) => i!==index);
      setDetails(newDetails);
    }
  }
  

  return (
    <>
      <div className="heading">
        <h1>Crud Operation</h1>
        <button className='addbtn' onClick={showInputContainer}>+ Add More</button>
      </div>
      {
        isAdd &&
        <div className="input_container">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={inputFields.name}
            onChange={(e) => handleInputsChange("name", e)}
          />
          <input
            type="number"
            name="age"
            placeholder="Enter your age"
            value={inputFields.age}
            onChange={(e) => handleInputsChange("age", e)}
          />
          <input
            type="text"
            name="skills"
            placeholder="Enter your skills"
            value={inputFields.skills}
            onChange={(e) => handleInputsChange("skills", e)}
          />
          <input
            type="text"
            name="district"
            placeholder="Enter your district"
            value={inputFields.district}
            onChange={(e) => handleInputsChange("district", e)}
          />

          <button className='savebtn' onClick={showDetails}>Save</button>
        </div>
      }

      {
        isSave &&
        <div className='display'>
          <table>
            <tbody>
              <tr>
                <th>SNo</th>
                <th>Name</th>
                <th>Age</th>
                <th>Skills</th>
                <th>District</th>
                <th>Actions</th>
              </tr>
              {details.map((display, index) => (

                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{display.name}</td>
                  <td>{display.age}</td>
                  <td>{display.skills}</td>
                  <td>{display.district}</td>
                  <td>
                    <button className='editbtn' onClick={() => editDetails(display, index)}>Edit</button>
                    <button className='deletebtn' onClick={()=>deleteDetails(index)}>Delete</button>
                  </td>
                </tr>

              ))}
            </tbody>
          </table>

        </div>

      }

    </>
  )
}

export default App
