const Header = (props) => {
  return (
    <div>
      <h2>
        {props.course.name}
      </h2>
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
    <h3>total of {props.parts.reduce((t, cv) => t = t + cv.exercises, 0)} exercises</h3>
    </div>
  )
}

const Course = (props) => {
  return(
    <div>
      <Header course={props.course}/>
      <Content parts={props.course.parts}/>
      <Total parts={props.course.parts}/>
    </div>
  )
}

export default Course
