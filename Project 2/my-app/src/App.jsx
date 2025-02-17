import { useState, useEffect } from 'react'
import axios from 'axios'

const Search = ({onChange}) => {
  return <>
   <h1>Get info on any country</h1>
   <label htmlFor="search">Search counties </label>
   <input onChange={onChange} id='search' type="text" placeholder='Enter country' /> 
   </>
}

const Countries = ({counties,filter,info}) => {

  const filtered = counties.filter(county => county.toLowerCase().includes(filter.toLowerCase()))

  if(!filter){
    return <h2>Start typing to search for a country</h2>
  }


  if (filtered.length === 0) {
    return <h2>No matches found</h2>;
  } else if (filtered.length > 10) {
    return <h2>Too many matches, specify another filter</h2>;
  }

  if (filtered.length === 1) {
    const found = filtered[0]
    const countyInfo = info.find(info => info.name.common == found)
    console.log(countyInfo.flags)
 
    return <>
      <h2>{found}</h2>
      <h5>Capital: {countyInfo.capital} </h5>
      <h5>Area: {countyInfo.area} </h5>
      <h3>Languages</h3>
      <ul>
        {Object.values(countyInfo.languages).map(lang => (
            <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={countyInfo.flags.png} alt="flag" />


    </>
  } 

  return (
    <>
      <h2>Countries</h2>
      <ul>
        {filtered.map(country => (
          <li key={country}>{country}</li>
        ))}
      </ul>
    </>
  );
};




function App() {

  const [counties, setCountries] = useState([])
  const [info, setInfo] = useState()
  const [county, setCounty] = useState('')

  const handleNewCounrty = (e) => {
    const newCoutry = e.target.value
    setCounty(newCoutry)
  }

  useEffect(() => {
    console.log(`Effect country is ${county}`)

      console.log('fetching country data');

      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(res => {
          setInfo(res.data)
          setCountries(res.data.map(county => county.name.common))
        })
        .catch(err => { console.error('Error fetching data:', err)})
    
  },[])



  return (
    <>
     <Search onChange={handleNewCounrty}/>
     <Countries counties={counties} filter={county} info={info} />
    </>
  )
}

export default App
