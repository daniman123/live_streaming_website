import { fetchData } from "@/api/utils/fetch";
import withFeedWrapper from "@/hoc/feedWrapper";

const ChatComponent = async () => {

  const options = {
    headers: {
      "Content-Type": "application/json",
    },
    data:{"username": "grabilo", "email":"grabilo@hotmail.com", "passphrase":"12345678"},
  };

  const data  = await fetchData("/database-queries/create-new-user","post",options)
  console.log("🚀 ~ file: page.js:14 ~ ChatComponent ~ data:", data)

  return (
    <div>
    </div>
  );
};

export default withFeedWrapper(ChatComponent);
