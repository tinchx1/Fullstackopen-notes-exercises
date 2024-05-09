import { Input } from '@/components/ui/input'

export const Filter = ({ handleFilter, textFiltered }) => {
  return (
    <Input className='mb-9' placeholder='Filter' value={textFiltered} onChange={(event) => handleFilter(event)} type='text' />
  )
}
