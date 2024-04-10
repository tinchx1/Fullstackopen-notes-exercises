export const PersonForm = ({
  handleSubmit,
  handleChange,
  newName,
  newNumber
}) => {
  return (
    <div>
      <form className='form-container' onSubmit={handleSubmit}>
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
            type='text'
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
