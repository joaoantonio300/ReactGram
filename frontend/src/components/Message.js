import "./Message.css";

const Message = ({ msg, type }) => {
  return (
    //i have to see more this kind of implemetation
    <div className={`message ${type}`}>
      <p>{msg}</p>
    </div>
  );
};

export default Message;
