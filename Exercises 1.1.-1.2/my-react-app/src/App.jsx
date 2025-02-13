
const Content = ({part}) => {
  return (
    <li>{part.name} {part.exercises}</li>
  )
}
const Total = ({part}) => {
  return (
    <strong>Total of {part} exercises</strong>
  )
}

const Course = ({course}) => {
  return (
    <>
    <h1>{course.name}</h1>

    <ul>
      {course.parts.map(part => 
        <Content  key={part.id} part={part} />
      )}
    </ul>

    <Total part={course.parts.reduce((a,c) => a + c.exercises,0)} />
  
    </>

    
  )
}



const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]



  return courses.map(course =>  <Course key={course.id} course={course} />)
  
}

export default App