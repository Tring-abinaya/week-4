import { useEffect, useState } from 'react';
import './Persona.css';
import { useNavigate, useParams } from "react-router-dom"

function Persona() {

  // const { userId } = useParams();
  const [ShowPersona,setShowPersona]=useState([]);
  const [personaCardIndex,setPersonaCardIndex]=useState(-1)
  const navigate = useNavigate();
  const { id } = useParams();

  const addPersona = () => {
    // const cardIndex = users.personas.length;
    navigate(`/Persona/${id}/Save`)
  }

  const getPersona = async () => {
    const items = localStorage.getItem('users')
    const itemsArray=JSON.parse(items)

    const foundIndex = itemsArray.findIndex(item =>item.id==id)
    setPersonaCardIndex(foundIndex)

    console.log("JSON parse:",JSON.parse(items))
    console.log("itemsArray:",itemsArray)

    setShowPersona(itemsArray[foundIndex])
  }

  

  useEffect(() => {
    console.log("inside useeffect")
    getPersona()
  }, [])

  return (
    <>

      <div className='header'>
        <h2>tringapps</h2>
        <h1>Persona</h1>
        <div className='btns'>
          <button className='login'>Logout</button>
        </div>
      </div>

      <div className="addPersonaContainer" onClick={addPersona}>
        <p className='addPersonaRight' onClick={addPersona}>+ Add Persona</p>

        <div className='card-container'>
          <div className='card'>
            <button className="add" onClick={addPersona}>+</button>
            <p style={{ color: 'grey', fontSize: "18px" }}>Add a Persona</p>
          </div>
        </div>
      </div>
{/* 
      {console.log("ItemsArray:",itemsArray)}
      {console.log("ItemdArray[personaCardIndex]",itemsArray[personaCardIndex])} */}
      
      {consol}
      {console.log("Personas:",ShowPersona.personas)}

      {ShowPersona.personas.map((persona, index) => (
            <div className='card' key={index}>
              <img src={persona.image} width={"50px"} height={"50px"} />
              <div>
                <p>persona.name</p>
                <p>persona.quote</p>
                <p>persona.description</p>
                <p>persona.motivations</p>
                <p>persona.painPoints</p>
                <p>persona.jobNeeds</p> 
                <p>persona.activities</p>

              </div>
            </div>

          ))}
      <div className='card'>
        <button className="add" onClick={addPersona}>+</button>
        <p style={{ color: 'grey', fontSize: "18px" }}>Add a Persona</p>
      </div>
      

    </>

  )
}

export default Persona