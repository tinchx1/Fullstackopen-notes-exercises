export const PersonForm = ({
  handleSubmit,
  handleChange,
  newName,
  newNumber
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <input
            onChange={(event) => handleChange(event, 'name')}
            value={newName}
          />
        </div>
        <div>
          number:
          <input
            type='number'
            onChange={(event) => handleChange(event, 'number')}
            value={newNumber}
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  )
}
