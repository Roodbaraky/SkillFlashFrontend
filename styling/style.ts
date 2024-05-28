import { Dimensions, StyleSheet } from "react-native";
const orange = "#FFA62B";
const blue = "#16697A";
const lightBlue = "#489FB5";
const screenWidth = Dimensions.get("window").width;

export default exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    height: "auto",
    width: "auto",
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    color: blue,
    marginBottom: 20,
    alignSelf: "center",
  },
  mediumTitle: {
    fontSize: 35,
    color: blue,
    margin: 20,
    textAlign: "center",
  },
  smallTitle: {
    color: blue,
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 10,
    paddingTop: 10,
    textAlign: "center",
  },
  lessMargin: {
    margin: 1,
  },
  addTopMargin: {
    marginTop: 20,
  },
  fontSize12: {
    fontSize: 12,
  },
  alignLeft: {
    textAlign: "left",
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    alignSelf: "center",
    backgroundColor: blue,
    margin: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderColor: "white",
    borderWidth: 2,
  },
  "technical-skills": { backgroundColor: "#1E90FF" },
  "problem-solving": { backgroundColor: "#32CD32" },
  "system-design": { backgroundColor: "#FFA500" },
  behavioral: { backgroundColor: "#9370DB" },
  "practical-knowledge": { backgroundColor: "#008080" },
  default: { backgroundColor: "#9e9e9e" },

  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: 400,
  },

  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 30,
  },
  backButtonText: {
    textDecorationLine: "underline",
    textDecorationColor: blue,
    color: blue,
    fontSize: 18,
  },
  input: {
    height: 50,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    width: 250,
    alignSelf: "center",
    borderColor: blue,
    borderRadius: 10,
  },
  label: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
  },
  error: {
    color: "red",
    marginVertical: 5,
    textAlign: "center",
  },
  //createNewDeck page
  newDeckButton: {
    margin: 0,
  },
  newDeckScrollContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  newDeckTagSelection: {
    flexDirection: "row",
    flexWrap: "wrap",
    maxHeight: 200,
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: blue,
    borderRadius: 10,
    minHeight: 50,
    marginVertical: 10,
  },

  newDeckTagListContainer: {
    flex: 1,
    backgroundColor: lightBlue,
    padding: 5,
    marginHorizontal: 5,
    borderRadius: 10,
    marginTop: 20,
  },
  newDeckTagListContainerTitle: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    margin: 10,
  },
  newDeckCategoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  newDeckCategoryName: {
    margin: 10,
    marginHorizontal: "auto",
    minWidth: 350,
    color: blue,
    backgroundColor: "white",
    fontSize: 22,
    fontWeight: 500,
    lineHeight: 25,
    textAlign: "center",
  },
  tagButton: {
    padding: 6,
    paddingHorizontal: 12,
    margin: 5,
    borderRadius: 10,
    backgroundColor: blue,
    justifyContent: "center",
    height: 27,
  },
  tagButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize",
  },
  tagButtonSelected: {
    backgroundColor: "white",
  },
  tagButtonTextSelected: {
    color: orange,
  },
  //decksPage
  scrollViewContainer: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
  deckTileFront: {
    backgroundColor: "#FFF",
    borderBottomColor: "#CCC",
    borderBottomWidth: 1,
    justifyContent: "center",
    width: screenWidth,
  },
  deckTileBack: {
    alignItems: "center",
    backgroundColor: orange, //"#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 15,
    width: screenWidth - 20,
    marginVertical: 10,
  },
  backRightBtn: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    width: 75,
  },
  //deck tile component
  deckTileContainer: {
    flex: 1,
    padding: 10,
    height: 160,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: blue,
    backgroundColor: "white",
    shadowColor: lightBlue,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,

    justifyContent: "center",
    width: screenWidth - 20,
    alignSelf: "center",
  },
  deckName: {
    fontSize: 20,
    textTransform: "capitalize",
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    height: 115,
    marginBottom: 10,
    overflow: "hidden",
  },

  cardCount: {
    fontSize: 12,
    fontWeight: "bold",
    position: "absolute",
    bottom: 5,
    right: 20,
  },
});
