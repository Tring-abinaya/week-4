// import Persona from './assets/Persona1.jpg';
import './SavePersona.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
import image from './assets/image.png';

function SavePersona() {
    const navigate=useNavigate();
    const [show, setShow] = useState(false);
    const [image, setImage] = useState(null);
    const handleShow = () => setShow(true);
    const [cardInfo,setCardInfo]=useState({
        name:"",
        quote: "",
        description: "",
        motivations: "",
        painPoints: "",
        jobNeeds: "",
        activities: "",
        image:"image"
      });
    const {id,cid}=useParams();

      useEffect(()=>{
        const items = localStorage.getItem('users')
        const itemsArray = JSON.parse(items)       
        const foundIndex = itemsArray.findIndex(item =>item.id==id)
        if(itemsArray[foundIndex].personas.length!=0)
        {
        setCardInfo(itemsArray[foundIndex].personas[cid]);
        console.log("effect",itemsArray[foundIndex].personas[cid]);
        }
      },[cid])
useEffect(()=>{
    console.log("cardddd",cardInfo.name);
    
},[cardInfo]);      
    

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const readImage = new FileReader();
            readImage.onloadend = () => {
                
                setImage(readImage.result)
                setCardInfo({...cardInfo,image:readImage.result})
                setShow(false);
                console.log("Image:",readImage.result)
            }
            readImage.readAsDataURL(file);
            
        }
        console.log("Before add image in cardinfo:",cardInfo)
        
        
    }
    console.log("After add image in cardinfo:",cardInfo)
    const handleChange=(e)=>{
        console.log("event:",e)
        setCardInfo({...cardInfo,[e.target.name]:e.target.value})
    }

    const handleRichTextChange=(e,richTextName)=>{
        console.log("event:",e,"richtextname:",richTextName,[richTextName])
        setCardInfo({...cardInfo,[richTextName]:e})
    }

    console.log("cardInfo before update:",cardInfo)
    const handleUpdate=()=>{


        const items = localStorage.getItem('users')
        console.log("Items getItem:",items)

        const itemsArray = JSON.parse(items)
        console.log("ItemsArray after parse:",itemsArray)        

        const foundIndex = itemsArray.findIndex(item =>item.id==id)

        console.log("Found detail:",foundIndex)

        if (foundIndex !== -1) {
            console.log("cardInfo:",cardInfo)
            console.log("ItemsArray:",itemsArray)
            itemsArray[foundIndex].personas[cid]=cardInfo
            localStorage.setItem('users', JSON.stringify(itemsArray));
            // console.log("Updated item:", itemsArray[foundIndex]);
            navigate(`/Persona/${id}`)
        }

    }

    return (
        <>
            <img src={cardInfo.image}></img>
            <div className='editNameImage'>
                <div>
                    <label style={{ fontSize: "20px" }}>Name:</label>
                    <input type="text" 
                    name="name"
                    value={cardInfo.name}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <button className='editImageBtn' onClick={handleShow}>Change Image</button>
                </div>
            </div>

            {show &&
                <input type="file" accept="image/*" onChange={handleImageChange} style={{marginLeft:"500px"}}></input>
            }

            <div className='textArea'>
                <div>

                    <h4>Notable Quote</h4>
                    <textarea 
                    name="quote" 
                    value={cardInfo.quote}
                    placeholder='Enter a quote that identifies the persona' 
                    rows={10} 
                    cols={65} 
                    
                    style={{ resize: "none" }} 
                    onChange={handleChange}
                    />
                </div>
                <div>

                    <h4>Description</h4>
                    <textarea
                        name="description"
                        placeholder='Enter a general description/bio about the persona'
                        value={cardInfo.description}
                        rows={10}
                        cols={65}
                        style={{ resize: "none" }}
                        onChange={handleChange}
                    />
                </div>
                <div>

                    <h4>Attitudes/Motivations</h4>
                    <textarea 
                    name="motivations" 
                    placeholder='What mindset does persona have?' 
                    value={cardInfo.motivations}
                    rows={10} 
                    cols={65} 
                    style={{ resize: "none" }}
                    onChange={handleChange}
                    />
                </div>
            </div>

            <div className='richText'>
                <div>
                    <h4>Pain Points</h4>
                    <ReactQuill 
                    theme="snow" 
                    name="painPoints"
                    value={cardInfo.painPoints}
                    onChange={(e)=>handleRichTextChange(e,"painPoints")}
                    />
                </div>
                <div>
                    <h4>Jobs/Needs</h4>
                    <ReactQuill 
                    theme="snow" 
                    name="jobNeeds"
                    value={cardInfo.jobNeeds}
                    onChange={(e)=>handleRichTextChange(e,"jobNeeds")}
                    />
                </div>
                <div>
                    <h4>Activites</h4>
                    <ReactQuill 
                    theme="snow" 
                    name="activities"
                    value={cardInfo.activities}
                    onChange={(e)=>handleRichTextChange(e,"activities")}
                    />
                </div>
            </div>

            <div className='btns'>
                <div className='deleteBtn'>DELETE</div>
                <div>
                    <button className='updateBtn'>Close</button>
                    <button className='updateBtn' onClick={handleUpdate}>Update Persona</button>
                </div>
            </div>


        </>

    )
}

export default SavePersona