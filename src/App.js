const Header = (props) => {
  return (
    <div>
      <h1>
        {props.course0}
      </h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

const Content = (props) => { 
  return(
    props.parts.map((part) => {
      return <Part key={part.id} name={part.name} exercises={part.exercises}/>
    })
  )
}

const Total = (props) => {
  return(
    <div>
    <p>Number of exercises: {props.parts.reduce((t, cv) => t = t + cv.exercises, 0)} </p>
    </div>
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
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App