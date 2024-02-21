import { useState } from 'react'
import './App.css'


function App() {

  const [file, setFile] = useState()
  const [description, setDescription] = useState("")
  // const [images, setImages] = useState([])
  const [key,setKey] = useState("")

  const submit = async event => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("image", file)
    formData.append("description", description)
    const result = await fetch(`http://localhost:3000/images`,{
      method : "POST",
      body : formData,
    })       
    if (!result.ok) {
      return
    }
    const data = await result.json();
    setKey(data.key)
  }


  const fileSelected = event => {
    const file = event.target.files[0]
    setFile(file)
  }

  // Now on the client we can use the key of that image to view it,we get the key in our post request

  return (
    <div className="App">
      <form onSubmit={submit}>
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <input value={description} onChange={e => setDescription(e.target.value)} type="text"></input>
        <button type="submit">Submit</button>
      </form>

      {/* { images.map( image => (
        <div key={image}>
          <img src={image}></img>
        </div>
      ))} */}

      <img src={`http://localhost:3000/image/${key}`} alt="" />
      
    </div>
  );
}

export default App;