import { useState, useEffect} from 'react'
import jobServices from './services/jobs';
import { use } from 'react';
import "./styles.css"


const Header = () => {
  return <h1>Welcome to your Hitlist</h1>
}

const Add = ({jobNameFunc,jobLocationFunc,jobSalaryFunc ,onSubmit,jobName,jobLocation,jobSalary,jobLink,jobLinkFunc}) => {
  return <>
  <form onSubmit={onSubmit}>
    
    <label htmlFor="company">Add a company: </label>
    <input value={jobName}  onChange={jobNameFunc} type="text" name="company" id="company" placeholder='Enter company'/>
    <br/>
    <label htmlFor="location">location: </label>
    <input value={jobLocation} onChange={jobLocationFunc} type="text" name="location" id="location" placeholder='Enter location'/>
    <br/>
    <label htmlFor="salary">Salary: </label>
    <input value={jobSalary} onChange={jobSalaryFunc} type="number" name="salary" id="salary" placeholder='Enter salary'/>
    <br/>
    <label htmlFor="link">Job Link: </label>
    <input value={jobLink} onChange={jobLinkFunc} type="text" name="link" id="link" placeholder='Enter application link'/>
    <button type='submit'>add</button>
  </form>
  </>
}


const Search = ({onChange}) => {
  return <>
    <h2>Search</h2>
    <input onChange={onChange} type="text" placeholder='Enter company name'/>
  </>
}

const ViewCompany = ({jobs, deleteFunc, filter, toggleFunc}) => {
  filter = filter.toLowerCase()

  const filtedJobs = jobs.filter(job => job.companyName.toLowerCase().includes(filter))

  return <>
    <h2>Current HitList</h2>
    <div>
    <div className="job-container">
    {filtedJobs.map((job) => {
      return <div className='job-card' key={job.id}> 
        <button onClick={() => deleteFunc(job.id)} >Delete</button>
        <button id='applied' onClick={() => toggleFunc(job.id)} >Applied</button>

        <li >Company: {job.companyName}</li>  
        <li >Location: {job.location}</li>  
        <li >Salary: ${Number(job.salary).toLocaleString()}</li>
        <li >Application Link: <a target='_blank' href={job.link}>Click here</a> </li>
        <li >Applied: 
        <span 

        style={{
          width: '15px',
          height: '15px',
          borderRadius: '50%',
          backgroundColor: job.applied ? 'green' : 'red',
          display: 'inline-block',
          marginLeft: '5px'
        }}>
        </span>
           </li> 
      </div>
    })}
    </div>

    </div>
  </>
}


function App() {

  const [jobName, setJobName] = useState('')
  const [jobLocation, setJobLocation] = useState('')
  const [jobSalary, setJobSalary] = useState('')
  const [jobs, setJobs] = useState([])
  const [filter, setFilter]  = useState('')
  const [jobLink, setJobLink] = useState('')


  // HOOKS
  const hook = () => {
    jobServices.getAll()
      .then(res => {
        setJobs(res.data)
      })
  }
  useEffect(hook,[])
  //Input functions 
  const handleNewJobName = (e) => {
    setJobName(e.target.value)
    console.log(jobName)
  }
  const handleNewJobLocation = (e) => {
    console.log(e.target.value)
    setJobLocation(e.target.value)
  }
  const handleNewJobSalary = (e) => {
    console.log(e.target.value)
    setJobSalary(e.target.value)
  }

  const handleNewFilter = (e) => {
    console.log(e.target.value)
    setFilter(e.target.value)
  }
  const handleNewJobLink = (e) => {
    console.log(e.target.value)
    setJobLink(e.target.value)
  }

  
  
  // Push to database
  const pushToDataBase = (e) => {
    e.preventDefault()
    
    const newJob =  {
      companyName: jobName ,
      location: jobLocation,
      salary: jobSalary,
      link: jobLink,
      applied: false
    }
    
    jobServices.create(newJob)
    .then(res => {
      setJobs(jobs.concat(res.data))
      console.log(res.data)
      
      // Reset input fields
      setJobName('');
      setJobLocation('');
      setJobSalary('');
      setJobLink('')
    })
    .catch(err => console.error(err))
    
    
  }
  // Delete from database
  const removeFromDatabase = (id) => {
    jobServices.remove(id)
    .then(res => {
      console.log(res)
      setJobs(jobs.filter(job => job.id !== id))
    })
  }
  // Toggle applied stastus
  
  const handleToggleApplied = id => {
    jobServices.toggleApplied(id)
      .then(res => {
        console.log(res.data)
        setJobs(jobs.map(job => job.id === id ? {...job, applied: res.data.applied} : job))
      })
  }

  

  return (
    <>
    <Header/>
    <Add  jobLink={jobLink} jobName={jobName} jobLocation={jobLocation} jobSalary={jobSalary} jobLinkFunc={handleNewJobLink} jobNameFunc={handleNewJobName} jobLocationFunc={handleNewJobLocation} jobSalaryFunc={handleNewJobSalary} onSubmit={pushToDataBase} />
    <Search onChange={handleNewFilter}/>
    <ViewCompany toggleFunc={handleToggleApplied} filter={filter} jobs={jobs} deleteFunc={removeFromDatabase}/>
  
    </>
  )
}

export default App
