import React, { useEffect, useState } from "react";
import pubsub from "pubsub-js";

const Child = () => {
  const [msg, setMessage] = useState("");
  useEffect(() => {
    const token = pubsub.subscribe("push", (_, data) => {
      setMessage(`${JSON.stringify(data)}`);
    });

    return () => {
      pubsub.unsubscribe(token);
    };
  }, []);

  return (
    <div>
      websocket child
      <br />
      pubsub.subscribe-push: {msg}
    </div>
  );
};

export default Child;
