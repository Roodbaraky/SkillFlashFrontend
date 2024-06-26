import {
	Pressable,
	SafeAreaView,
	ScrollView,
	Text,
	TextInput,
	View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { splitByCategory } from "@/utils/utils";
import Loading from "../../components/Loading";
import { generateDeck, getAllTags } from "@/utils/api";
import { UserContext } from "@/contexts/UserContext";
import { router } from "expo-router";
import TagButton from "@/components/tagButton";
import { DecksContext } from "@/contexts/DecksContext";
import styles from "@/styling/style";
import Accordion from 'react-native-collapsible/Accordion';

interface Tags {
	category: string;
	tags: string[];
}
interface Error {
	send?: string;
	deckName?: string;
	selection?: string;
}

export default function CreateDeck() {
	const [tags, setTags] = useState<Tags[]>([]);
	const [tagSelection, setTagSelection] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { userDetails } = useContext(UserContext);
	const [deckName, setDeckName] = useState<string>("");
	const [isError, setIsError] = useState<Error>({});
	const { decks, setDecks } = useContext(DecksContext);
	const [activeSections, setActiveSections] = useState<number[]>([]);

	useEffect(() => {
		getAllTags()
			.then((allTags) => {
				const tagsByCategory = splitByCategory(allTags);
				setTags(tagsByCategory);
			})
			.catch((err) => { });
	}, []);

	function checkField(field: string) {
		if (field === "deckName" && deckName.length < 3) {
			setIsError({
				...isError,
				deckName: "Deck name must be at least 3 characters long",
			});
		}
		if (field === "deckName" && decks.map((deck) => deck.deckName).includes(deckName)) {
			setIsError({
				...isError,
				deckName: `A deck with this name already exists`,
			});
		}
		else if (field === "deckName" && deckName.length >= 3) {
			setIsError({
				...isError,
				deckName: "",
			});
		}
		if (field === "selection" && tagSelection.length < 3) {
			setIsError({
				...isError,
				selection: "Please select at least 3 tags",
			});
		} else if (field === "selection" && tagSelection.length > 2) {
			setIsError({
				...isError,
				selection: "",
			});
		}
	}

	function sendRequest() {
		if (deckName.length < 3 && tagSelection.length < 3) {
			setIsError({
				...isError,
				deckName: "Deck name must be at least 3 characters long",
				selection: "Please select at least 3 tags",
			});
		} else if (deckName.length < 3) {
			setIsError({
				...isError,
				deckName: "Deck name must be at least 3 characters long",
			});
		} else if (tagSelection.length < 3) {
			setIsError({
				...isError,
				selection: "Please select at least 3 tags",
			});
		} else if (decks.map((deck) => deck.deckName).includes(deckName)) {
			setIsError({
				...isError,
				deckName: `A deck with this name already exists`,
			});
		}
		else {
			setIsError({});
			setIsLoading(true);
			generateDeck(userDetails.username, deckName, tagSelection)
				.then((deck) => {
					if (deck) {
						setDecks([deck, ...decks]);
						setIsLoading(false);
						setTagSelection([]);
						setDeckName("");
						router.push(`/deck`);
					}
				})
				.catch((err) => {
					setIsLoading(false);
					setIsError({
						send: "Sorry, there has been a problem handling your request. Please try again.",
					});
					console.log(err);
				});
		}
	}

	if (isLoading) return <Loading />;

	const renderHeader = (section, index, isActive) => {
		return (
			<View >
				<Text style={styles.newDeckCategoryName}>{`${section.category} ${isActive ? `-` : `⌄`}`}</Text>
			</View>
		);
	};

	const renderContent = (section) => {
		return (
			<View style={styles.newDeckCategoryContainer}>
				{section.tags.map((tag) => (
					<TagButton
						key={tag}
						text={tag}
						onPress={() => {
							setTagSelection((currentSelection) => {
								if (
									tagSelection &&
									!tagSelection.includes(tag) &&
									tagSelection.length < 10
								) {
									return [...currentSelection, tag];
								}
								return currentSelection;
							});
						}}
						tagSelection={tagSelection}
					/>
				))}
			</View>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.newDeckScrollContainer}>
				<Text style={styles.mediumTitle}>
					Let AI create a customized deck of questions for your role
				</Text>
				<Text style={styles.smallTitle}>
					1. Choose a unique name for your new deck:
				</Text>
				<TextInput
					style={styles.input}
					onChangeText={(text) => {
						setDeckName(text);
						setIsError({ ...isError, deckName: "" });
					}}
					onBlur={() => {
						checkField("deckName");
					}}
					value={deckName}
					placeholder="Job name you are applying for ..."
					id="deckName"
				/>
				{isError.deckName ? (
					<Text style={styles.error}>{isError.deckName}</Text>
				) : (
					<></>
				)}

				<Text style={styles.smallTitle}>
					2. Select 3-10 topics from the skills list below:
				</Text>

				<View style={styles.newDeckTagSelection}>
					{tagSelection.map((tag) => {
						return (
							<TagButton
								key={tag}
								text={"X  " + tag}
								onPress={() => {
									setTagSelection((currentSelection) => {
										const filtered = currentSelection.filter(
											(item) => item !== tag
										);
										return filtered;
									});
								}}
							/>
						);
					})}
				</View>

				{isError.selection ? (
					<Text style={styles.error}>{isError.selection}</Text>
				) : (
					<></>
				)}
				<Text style={styles.smallTitle}>
					3. Press the button to create your deck:
				</Text>
				<Pressable
					style={[styles.button, styles.newDeckButton]}
					onPress={sendRequest}
				>
					<Text style={styles.buttonText}>Get your cards!</Text>
				</Pressable>
				{isError.send ? (
					<Text style={styles.error}>{isError.send}</Text>
				) : (
					<></>
				)}

				<View style={styles.newDeckTagListContainer}>
					<Text style={styles.newDeckTagListContainerTitle}>Skills list:</Text>
					<Accordion
						sections={tags}
						activeSections={activeSections}
						renderHeader={renderHeader}
						renderContent={renderContent}
						onChange={setActiveSections}
						underlayColor='#489FB5'
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
