import React, { useState, useEffect } from "react";
import { View, Text, Button, SafeAreaView, Linking } from "react-native";

// import firebase from "firebase";

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  databaseURL: "https://your-project-id.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
};

// firebase.initializeApp(firebaseConfig);

const PageOne = ({ setPage }) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text style={{ fontSize: 20 }}>Page One</Text>
    <Button title="Go to Page Two" onPress={() => setPage(2)} />
  </View>
);

const PageTwo = ({ setPage }) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text style={{ fontSize: 20 }}>Page Two</Text>
    <Button title="Go to Page One" onPress={() => setPage(1)} />
  </View>
);

export default function App() {
  const [page, setPage] = useState(1);

  useEffect(() => {
    const handleUrl = async (event) => {
      if (event.url.endsWith("page2")) {
        setPage(2);
      }
    };

    Linking.addEventListener("url", handleUrl);

    Linking.getInitialURL().then((url) => {
      if (url) {
        handleUrl({ url });
      }
    });

    return () => Linking.removeEventListener("url", handleUrl);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {page === 1 ? (
        <PageOne setPage={setPage} />
      ) : (
        <PageTwo setPage={setPage} />
      )}
    </SafeAreaView>
  );
}
