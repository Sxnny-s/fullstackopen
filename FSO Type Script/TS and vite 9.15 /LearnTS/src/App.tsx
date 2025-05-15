
interface Course {
  name: string;
  exerciseCount: number
}

interface HeaderProps {
  name: string
}

interface TotalProps {
  total: number
}

interface ContentProps {
  course: Array<CoursePart>
}


interface descript extends CoursePartBase {
  description: string;
  
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartSpecial {
  name: string,
  exerciseCount: number,
  description: string,
  requirements: Array<string>,
  kind: 'special';
}


interface CoursePartBasic extends descript {
  //description: string;
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends descript {
  //description: string;
  backgroundMaterial: string;
  kind: "background"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;
const Header = ({ name }: HeaderProps) => {
  return <h1>{name}</h1>
}


const Total = ({ total }: TotalProps) => {
  return <span> Total Exercises: {total}</span>
}

const Part = ({ part } : {part: CoursePart}) => {
  
  
    switch (part.kind) {
      case "basic":
        return <>
          <h3>{part.name} {part.exerciseCount}</h3>
          <span>{part.description}</span>
        </>
      case "group":
        return <>
          <h3>{part.name} {part.exerciseCount}</h3>
          <span> project exercises {part.groupProjectCount}</span>
        </>
      case "background":
        return <>
        <h3>{part.name} {part.exerciseCount}</h3>
        <span>{part.description}</span>
        <span> background Material {part.backgroundMaterial}</span>
        </>
      case "special":
        return <>
          <h3>{part.name}</h3>
          <span>{part.description}</span>    
          <p>required skills: {part.requirements.map(skill => <span> {skill} , </span>)} </p>   
        </>
      default:
        break
      }
    }
    
  
  const Content = ({ course } : ContentProps) => {
    return <>
  
      <div>
        {course.map( (part, index) => {
         return <Part key={index} part={part}/>
        
        })}
      </div>
      </>
  
    
  }
  

const App = () => {
  const courseName = "Half Stack application development";
  
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }

  ];
  
  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);


  return (
    <>
    <Header name={courseName}></Header>
    <Content course={courseParts} />
    {/* <Part parts={courseParts}/> */}
    <Total total={totalExercises}/>
    </>
  );
};

export default App;