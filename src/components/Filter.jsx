export const Filter = ({ handleFilter, textFiltered }) => {
  return (
    <input value={textFiltered} onChange={(event) => handleFilter(event)} type='text' />
  )
}
