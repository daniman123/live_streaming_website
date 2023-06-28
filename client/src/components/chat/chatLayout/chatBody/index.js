import ChatMessage from "../../chatMessage/index";

function ChatBody({ messageList, showTime }) {
  const listStructure = getMessageListStructure(messageList);

  function getMessageListStructure(list) {
    if (Array.isArray(list[0])) {
      return "Array with an array inside";
    } else if (Array.isArray(list)) {
      return "Single array";
    } else {
      return "Not an array or doesn't match the structure";
    }
  }

  // Wrap the single array in an outer array if necessary
  const updatedMessageList =
    listStructure === "Single array" ? [messageList] : messageList;

  return (
    <div className="chat__body">
      {updatedMessageList
        .slice()
        .reverse()
        .map((messageContent, index) =>
          Object.values(messageContent).map((val, ind) => (
            <ChatMessage
              key={index}
              sender={val.author}
              content={val.message}
              timestamp={val.time}
              showTime={showTime}
            />
          ))
        )}
    </div>
  );
}

export default ChatBody;
