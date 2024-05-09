import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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
          <Input
            className='my-5'
            placeholder='add name'
            onChange={(event) => handleChange(event, 'name')}
            value={newName}
          />
        </div>
        <div>
          <Input
            placeholder='add number'
            type='text'
            onChange={(event) => handleChange(event, 'number')}
            value={newNumber}
          />
        </div>
        <div>
          <Button className='w-full my-4' type='submit'>ADD</Button>
        </div>
      </form>
    </div>
  )
}
