import { useEffect, useState } from 'react';
import './Persona.css';
import { useNavigate, useParams } from "react-router-dom"

function Persona() {

  // const { card} = useParams();
  const [showPersona,setShowPersona]=useState([]);
  const [personaCardIndex,setPersonaCardIndex]=useState(-1)
  const navigate = useNavigate();
  const { id } = useParams();

  const addPersona = () => {
    console.log("Inside add persona")
    const items = localStorage.getItem('users')
    const itemsArray=JSON.parse(items)

    const foundIndex = itemsArray.findIndex(item =>item.id==id)
    
    console.log("Found Index:",foundIndex)

    console.log("Found Index ItemsArray:",itemsArray[foundIndex])

    const cardIndex =itemsArray[foundIndex].personas.length;
    navigate(`/Persona/${id}/Save/${cardIndex}`)
 
  }
  const editPersona=(index)=>
  {
    navigate(`/Persona/${id}/Save/${index}`)
  }

  const getPersona = async () => {
    const items = localStorage.getItem('users')
    const itemsArray=JSON.parse(items)

    const foundIndex = itemsArray.findIndex(item =>item.id==id)
    setPersonaCardIndex(foundIndex)
    console.log("FoundIndex:", foundIndex)

    console.log("JSON parse:", JSON.parse(items))
    console.log("itemsArray:", itemsArray)


    setShowPersona(itemsArray[foundIndex])

    console.log("length:",itemsArray[foundIndex].personas.length)
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

      <div className="addPersonaContainer">
        <p className='addPersonaRight' onClick={addPersona}>+ Add Persona</p>

        <div className='card-container'  >
          {showPersona?.personas?.map((persona, index) => (
            <div className='card' key={index} onClick={()=>editPersona(index)}>
              <div className='cardImage'>
                <img src={persona.image} alt='Persona'/>
              </div>
              <div className='cardContent'>
                <h3>{persona.name}</h3>
                <p>{persona.quote}</p>
                <p>{persona.description}</p>
                <p>{persona.motivations}</p>
                <p>{persona.painPoints}</p>
                <p>{persona.jobNeeds}</p>
                <p>{persona.activities}</p>
              </div>
            </div>

          ))}
          
          <div className='card'>
         
            <button className="add" onClick={addPersona}>+</button>
            <p style={{ color: 'grey', fontSize: "18px" }}>Add a Persona</p>
          </div> 

        </div>
      </div>

    </>

  )
}

export default Persona