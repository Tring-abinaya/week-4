import { useEffect, useState } from 'react';
import './Persona.css';
import { useNavigate, useParams } from "react-router-dom"

function Persona() {

  const [showPersona, setShowPersona] = useState([]);
  const [personaCardIndex, setPersonaCardIndex] = useState(-1)
  const navigate = useNavigate();
  const { id } = useParams();

  const addPersona = () => {
    const items = localStorage.getItem('users')
    const itemsArray = JSON.parse(items)
    const foundIndex = itemsArray.findIndex(item => item.id == id)
    const cardIndex = itemsArray[foundIndex].personas.length;
    navigate(`/Persona/${id}/Save/${cardIndex}`)

  }
  const editPersona = (index) => {
    navigate(`/Persona/${id}/Save/${index}`)
  }

  const getPersona = async () => {
    const items = localStorage.getItem('users')
    const itemsArray = JSON.parse(items)
    const foundIndex = itemsArray.findIndex(item => item.id == id)
    setPersonaCardIndex(foundIndex)
    setShowPersona(itemsArray[foundIndex])
  }

  useEffect(() => {
    getPersona()
  }, [])

  return (
    <>

      <div className='header'>
        <h2>tringapps</h2>
        <h1>Persona</h1>
        <div className='btns'>
          <button className='login' onClick={() => { navigate("/signin") }}>Logout</button>
        </div>
      </div>

      <div className="addPersonaContainer">
        <p className='addPersonaRight' onClick={addPersona}>+ Add Persona</p>

        <div className='card-container'  >
          {showPersona?.personas?.map((persona, index) => (
            <div className='card' key={index} onClick={() => editPersona(index)}>
              <div className='cardImage'>
                <img src={persona.image} alt='Persona' />
              </div>
              <div className='cardContent'>
                <h3>{persona.name}</h3>
              </div>
            </div>

          ))}

          <div className='card' onClick={addPersona}>

            <button className="add" onClick={addPersona}>+</button>
            <p style={{ color: 'grey', fontSize: "18px" }}>Add a Persona</p>
          </div>

        </div>
      </div>

    </>

  )
}

export default Persona