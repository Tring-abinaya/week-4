import './Persona.css';

function Persona() {

    return (
        <>

        <div className='header'>
        <h2>tringapps</h2>
        <h1>Persona</h1>
        <div className='btns'>
          <button className='login'>Logout</button>
        </div>
      </div>

      <div class="addPersonaContainer">
        <p className='addPersonaRight'>+ Add Persona</p>

        <div className='card-container'>
          <div className='card'>
            <button className="add">+</button>
            <p style={{color:'grey',fontSize:"18px"}}>Add a Persona</p>
          </div>
        </div>
      </div>

        </>

    )
}

export default Persona