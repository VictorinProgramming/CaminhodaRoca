import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F9FF",
	},
	scrollView: {
		flex: 1,
	},
	headerContainer: {
		padding: 20,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 30,
		backgroundColor: "#D1E0E8",
	},
	shadowProp: {
		elevation: 10,
		shadowColor: "#373B40",
	},
	profileImage: {
		width: 80,
		height: 80,
		borderRadius: 40,
		marginRight: 20,
	},
	headerDetails: {
		flex: 1,
		justifyContent: "center",
		position: "relative",
	},
	name: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#000000",
	},
	button: {
		backgroundColor: "#ffffff",
		shadowColor: "#000000",
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 5,
		marginHorizontal: 30,
		marginVertical: 20,
		height: 48,
		borderRadius: 7,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		color: "black",
		fontSize: 16,
		fontWeight: "bold",
	},
	content: {
		marginTop: 10,
		marginHorizontal: 10,
		borderColor: "black",
		borderWidth: 3,
		borderRadius: 7,
	},
	cardContainer: {
		margin: 20,
		borderColor: "black",
		borderRadius: 5,
		borderWidth: 2,
	},
	card: {
		backgroundColor: "#f0f0f0",
		padding: 20,
		borderRadius: 10,
		paddingBottom: 20,
		marginBottom: 10,
	},
	cardText: {
		marginTop: 10,
		fontSize: 16,
	},
	editIcon: {
		position: "absolute",
		top: 10,
		right: 10,
	},
});
