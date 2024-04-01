import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import { Number } from "./components/Number.tsx";
import { PersonForm } from "./components/PersonForm.tsx";
import { Notification } from "./components/Notification.tsx";
import {
  getAll,
  create,
  deletePerson,
  update,
} from "./services/persons/numbers.js";
const App = () => {
  const [persons, setPersons] = useState([
    {
      name: "Arto Hellas",
      number: 2242424,
    },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [Message, setMessage] = useState(null);
  useEffect(() => {
    getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const handleChange = (event, type) => {
    const value = event.target.value;
    if (type === "name") {
      setNewName(value);
    } else if (type === "number") {
      setNewNumber(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isDuplicate = persons.some((person) => person.name === newName);
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    if (isDuplicate) {
      const duplicatePerson = persons.find((person) => person.name === newName);
      const id = duplicatePerson.id;
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        update(id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : returnedPerson
              )
            );
          })
          .catch((error) => {
            setMessage("error");
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
        setMessage(`${newPerson.name} has been updated with ly`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
    } else {
      create(newPerson).then((persons) => {
        setPersons((prevPersons) => prevPersons.concat(persons));
        setMessage(`${newPerson.name} has been added ly`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
      setNewName("");
      setNewNumber("");
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      deletePerson(id).then((response) => {
        setPersons(response);
      });
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification Message={Message} />
      <PersonForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>
          <Number number={person.number} name={person.name} />
          <button onClick={() => handleDelete(person.id, person.name)}>
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
};

export default App;
