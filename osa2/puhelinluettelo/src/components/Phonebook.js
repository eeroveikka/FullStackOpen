const Phonebook = (props) => {
    const persons = props.persons.filter((person) => person.name.toUpperCase().includes(props.newFilter.toUpperCase()))
    return(
      <div>
        {persons.map(person =>
        <p key={person.name}>{person.name} {person.number}
        <button onClick={() => props.handleClick(person.id)}>delete</button>
        </p>
        )}
      </div>
    )
}

export default Phonebook