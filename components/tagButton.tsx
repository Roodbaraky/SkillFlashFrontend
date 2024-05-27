import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface TagButtonProps {
  text: string;
  onPress: () => {};
  tagSelection: string[];
}

export default function TagButton({
  text,
  onPress,
  tagSelection,
}: TagButtonProps) {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (tagSelection && tagSelection.includes(text)) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [tagSelection, text]);

  return (
    <Pressable
      style={[styles.tag, isSelected ? styles.tagSelected : null]}
      onPress={() => {
        onPress();
        if (tagSelection && tagSelection.includes(text)) {
          setIsSelected(true);
        } else {
          setIsSelected(false);
        }
      }}
    >
      <Text style={styles.tagText}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tag: {
    padding: 6,
    paddingHorizontal: 20,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "grey",
    justifyContent: "center",
  },
  tagText: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
  },
  tagSelected: {
    backgroundColor: "blue",
  },
});
