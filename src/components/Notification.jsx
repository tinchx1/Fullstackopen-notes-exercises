export const Notification = ({ Message }) => {
  if (Message === null) {
    return null;
  } else if (Message.includes("error")) {
    return <div className="MessageError">{Message}</div>;
  } else return <div className="Message">{Message}</div>;
};
