import { useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import firestore from "@react-native-firebase/firestore";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const routes = useRoute();
  useEffect(() => {
    const subscriptions = firestore()
      .collection("chats")
      .doc(routes.params.id + routes.params.data.id)
      .collection("messages")
      .orderBy("createdAt", "desc");
    subscriptions.onSnapshot((querysnapshot) => {
      const allMsg = querysnapshot.docs.map((item) => {
        return {
          ...item.data,
          createdAt: Date.parse(new Date()),
        };
      });
      setMessages(allMsg);
    });
    return () => {
      subscriptions();
    };
  }, []);

  const onSend = useCallback((messages = []) => {
    const msg = messages[0];
    const myMsg = {
      ...msg,
      sendBy: routes.params.id,
      sendTo: routes.params.data.id,
      createdAt: Date.parse(msg.createdAt),
    };
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, myMsg)
    );
    firestore()
      .collection("chats")
      .doc("" + routes.params.id + routes.params.data.id)
      .collection("messages")
      .add(myMsg);
    firestore()
      .collection("chats")
      .doc("" + routes.params.data.id + routes.params.id)
      .collection("messages")
      .add(myMsg);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: routes.params.id,
        }}
      />
    </View>
  );
};

export default Chat;
