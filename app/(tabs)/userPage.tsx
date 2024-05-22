import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Text, View } from "react-native";
import { UserContext } from "@/contexts/UserContext";
import { getDecksByUsername } from "@/utils/api";
import { HomeDeck } from "@/utils/utils";
import DeckTile from "../../components/DeckTile";
import { Link } from "expo-router";

export default function UserPage() {
  const { userDetails } = useContext(UserContext);
  const [decks, setDecks] = useState<HomeDeck[]>([]);
  useEffect(() => {
    getDecksByUsername(userDetails.username || "")
      .then((data) => {
        const decksDisplay: HomeDeck[] = [...data] || [];
        return decksDisplay;
      })
      .then((decksDisplay) => {
        setDecks(decksDisplay);
        // console.log(decks);
      });
  }, [userDetails.username]);
  return (
    <SafeAreaView testID="home-container">
      <Text>Hi {userDetails.username} !</Text>
      <Text>Welcome to SkillFlash</Text>
      <View>
        <Text>Your decks</Text>
        <FlatList
          data={decks}
          renderItem={({ item }) => <DeckTile deck={item} />}
        />
      </View>
    </SafeAreaView>
  );
}