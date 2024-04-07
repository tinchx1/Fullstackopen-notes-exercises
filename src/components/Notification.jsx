export const Notification = ({ Message }) => {
  if (Message === null) {
    return (
      <div className='Notification' />
    )
  } else if (Message.includes('error')) {
    return (
      <div className='Notification'>
        <div className='MessageError'>{Message}</div>;
      </div>
    )
  } else {
    return (
      <div className='Notification'>
        <div className='Message'>{Message}</div>
      </div>
    )
  }
}
