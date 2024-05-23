import { useState, useEffect } from 'react'




function App() {
  const [tasks, setTasks] = useState([])

  useEffect(()=>{
    const fetchData = async () =>{
      const response = await fetch('http://127.0.0.1:8000/api/task-list/')
      const data =  await response.json()
      setTasks(data)
      console.log(data)
    }

    fetchData()
  }, [])

  const updatePage = async () =>{
    const response = await fetch('http://127.0.0.1:8000/api/task-list/')
    const data =  await response.json()
    setTasks(data)
    console.log(data)
  }

  const addTask = async (e) => {
    e.preventDefault()
    const title = document.getElementById('form').elements[0].value
    
    const response = await fetch('http://127.0.0.1:8000/api/task-create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title
      })
    })

    const data = await response.json()
    setTasks(data)
    console.log(data)

    document.querySelector('form input').value = ""

    
    
  }

  const deleteTask = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this task? ")

    if(confirmDelete){
      const response = await fetch(`http://127.0.0.1:8000/api/task-delete/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
      })

    const data = await response.json()
    setTasks(data)
    console.log(data)
    }
  }

  return (
    
      <div id='container' className="flex justify-center h-screen bg-gradient-to-r from-sky-500 to-slate-500 p-4">
        <div id='task-container' className="py-14 px-5 bg-slate-100 rounded-[8px] w-full h-fit mt-10 sm:w-[620px]">
          <div id='form-wrapper'>
            <form id='form' className='flex items-center flex-col gap-3 sm:flex-row'>
              <input type="text" className='input rounded-[5px] text-xl px-5 py-2 w-full border-2 border-slate-700 outline-none' />
              
              <button className='text-xl bg-sky-600 text-white px-8 py-2 rounded-[5px] cursor-pointer w-full sm:w-fit ' onClick={addTask}>
                <i className="fa-solid fa-plus"></i>
              </button>
            </form>
          </div>

          <div className='flex flex-col space-y mt-10'>
            {tasks.map(task => (
              <div key={task.id} className='flex items-center justify-between space-x-5 border-b border-zinc-300 py-5 last:border-0'>

                  <p className='text-[22px] text-zinc-600'>{task.title}</p>

                  <div className='flex items-center justify-start space-x-4'>
                
                    <div onClick={()=>deleteTask(task.id)}>
                      <i className="fa-solid fa-trash-can p-2 bg-red-500 text-white rounded-[5px] cursor-pointer"></i>
                    </div>
                  </div>

              </div>
              
            )
            )}
          </div>
        </div>
      </div>
    
  )
}

export default App
