/* eslint-disable react/prop-types */


const Header = (props) => {
  console.log(props)
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )

}

const Content = (props) => {
  return (

    <> 
    <ol>
      <li>{props.part} Exercises count {props.exercises}</li>
      
    </ol>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <span>Total Exercise Count {props.total}</span>
    </>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',

    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
       name:'State of a component',
       exercises: 14
     }
    ]

  }
  
  const total = course.parts.reduce((a,c) => {
    return a + c.exercises
  },0)

  

  return (
    <div>
      <Header course={course.name}/>

      {course.parts.map((e,i) =>{
       return <Content key={i} part={e.name} exercises={e.exercises} />
      })}

  
      <Total total={total} />
    </div>
  )
}

export default App