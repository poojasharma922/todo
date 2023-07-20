import {useEffect, useState} from 'react'
import axios from 'axios'
import './App.css';

function App() {

  const [itemText, setItemText] = useState('')
  const [listItems, setListItems] = useState([])
  const [isUpdating, setIsUpdating] = useState('')
  const [updateItemText, setUpdateItemText] = useState('');

  //add new todo item to database
  const addItem = async (e) =>{
    e.preventDefault();
    try {
      
      if(itemText.length < 4){
        
      }
      const res = await axios.post('http://localhost:5000/api/item',{
        item: itemText
      })
      setListItems((prev) =>[...prev, res.data]);
      //console.log(res);
      setItemText('')
     
    } catch (err) {
      console.log(err);
    }
  }

  const isButtonDisabled = itemText.length < 4;
  
  //create function to fetch all todo items from database -- using useEffect
  useEffect(()=>{
    const getItemsList = async () =>{
      try {
        const res= await axios.get('http://localhost:5000/api/items')
        //console.log(res.data)
        setListItems(res.data)
      } catch (err) {
        console.log(err);
      }
    }
    getItemsList()
  },[]);
  

  //Delete item
  const deleteItem = async (id) =>{
    try {
      const res = await axios.delete(`http://localhost:5000/api/item/${id}`)
      const newListItems =listItems.filter(item => item._id !== id);
      setListItems(newListItems);
    } catch (err) {
      console.log(err);
    }
  }

  //update item
  // const updateItem = async(e)=>{
  //   e.preventDefault();
  //   try {
  //     const res = await axios.put(`http://localhost:5000/api/item/${isUpdating}`, {item: updateItemText})
      
  //     //new updated items
  //     const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
  //     const updatedItem = listItems[updatedItemIndex].item = updateItemText;
     

  //     setUpdateItemText('')
  //     setIsUpdating('')

  //   } catch (err) {
  //     console.log(err);
      
  //   }
  // }




// update item
const updateItem = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.put(`http://localhost:5000/api/item/${isUpdating}`, {
      item: updateItemText
    });

    // create a new array with the updated item and keep the rest of the items unchanged
    const updatedItems = listItems.map((item) => {
      if (item._id === isUpdating) {
        return { ...item, item: updateItemText };
      }
      return item;
    });

    setListItems(updatedItems);
    setUpdateItemText('');
    setIsUpdating('');
  } catch (err) {
    console.log(err);
  }
};




//  before updating item we need to show input field where we'll create our updated item
  // const renderUpdateForm = () =>(
  //   <form className="update-form" onSubmit={(e)=> updateItem(e)}>
  //     <input className='update-new-input' type="text" placeholder='New Item' onChange={e => {setUpdateItemText(e.target.value)}} value={updateItemText}/>
  //     <button className='update-new-btn' type='submit'><i class="fa-solid fa-check edit" ></i></button>

  //   </form>
  // )


  const renderUpdateForm = () => (
    <form className="update-form" onSubmit={(e) => updateItem(e)}>
      <input
        className="update-new-input"
        type="text"
        placeholder="New Item"
        onChange={(e) => {
          setUpdateItemText(e.target.value);
        }}
        value={updateItemText !== '' ? updateItemText : listItems.find((item) => item._id === isUpdating).item}
      />
      <button className="update-new-btn" type="submit">
        <i className="fa-solid fa-check edit"></i>
      </button>
    </form>
  );


  return (
    <div className="App ">
      <h1>Todo List</h1>
      {/* <form className = "form" onSubmit={e => addItem(e)}>
        <input type="text" placeholder = "Add Todo Item" onChange={(e) => {setItemText(e.target.value)} } value={itemText}/>
        <button type="submit" >Add</button>
      </form> */}


<div class="card card1 text-center">
  <div class="card-body">
  <form className = "form" onSubmit={e => addItem(e)}>
      <input type="text" placeholder = "Add Todo Item" onChange={(e) => {setItemText(e.target.value)} } value={itemText}/>
      <button type="submit" disabled={isButtonDisabled} >
        {
          isButtonDisabled ? <div style={{color:'gray'}}>Add</div> : <div>Add</div>
        }
      </button>
      
  </form>
  <button onClick={()=>alert('hii')}>hiii</button>
  </div>
  
</div>

<div class="card card2 text-center scroller" >
  <div class="card-body" >
      <div className="todo-listItems" >
        <br />
        {
          listItems.map(item => (
          <div className="todo-item" key={item._id}>
            {
              isUpdating === item._id
              ? renderUpdateForm()
              :
            <>
            
              <p className="item-content" >{item.item}</p>
              <div className='deleteupdate' style={{display: 'flex', flexDirection: 'column'}}>
              {/* <button className="update-item" onClick={()=> {setIsUpdating(item._id)}}>Update</button> */}
              <i class="fa-solid fa-pen-to-square fa-sm update"  onClick={()=> {setIsUpdating(item._id)}}></i>
              {/* <button className="delete-item" onClick={()=> {deleteItem(item._id)}}>Delete</button> */}
              <i class="fa-solid fa-trash delete" onClick={()=> {deleteItem(item._id)}}></i>
              </div>
            
            </>
            }
          </div>
          ))
        } 
      </div>
      </div>
      </div>
    </div>
  );
}

export default App;