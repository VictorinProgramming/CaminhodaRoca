import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#D1E0E8",
	},
	scrollView: {
		flex: 1,
	},

	input: {
		height: 48,
		fontSize: 14,
		borderRadius: 4,
		overflow: "hidden",
		backgroundColor: "#ffffff",
		//shadowColor: "#000000",
		//shadowOffset: { width: 0, height: 5 },
		//shadowOpacity: 0.3,
		//shadowRadius: 5,
		//elevation: 5,
		marginHorizontal: 20,
		paddingLeft: 16,
	},
	textInputTitle: {
		fontSize: 14,
		fontWeight: "normal",
		marginHorizontal: 20,
		marginTop: 15,
		marginBottom: 5,

	},

	containerInput: {
		marginBottom: 20,
	},

	button: {
		backgroundColor: "#0B3802",
		//shadowColor: "#000000",
		//shadowOffset: { width: 0, height: 5 },
		//shadowOpacity: 0.3,
		//shadowRadius: 5,
		//elevation: 5,
		marginHorizontal: 40,
		marginVertical: 15,
		height: 48,
		borderRadius: 4,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonTitle: {
		color: "white",
		fontSize: 16,
		fontWeight: "normal",
	},

	text: {
		fontSize: 14,
		fontWeight: "normal",
		marginHorizontal: 40,
		marginVertical: 2,
	},

	imageContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 10,
		marginHorizontal: 40,
		paddingRight: 0,
	},
	logo: {
		width: 300,
		height: 300,
		resizeMode: "cover",
		marginRight: 10,
		paddingRight: 0,
	},
	removeButton: {
		position: "absolute",
		top: 20,
		right: 0,
		backgroundColor: "red",
		padding: 0,
		width: 50,
		height: 50,
		borderRadius: 50 / 2,
		alignItems: "center",
		justifyContent: "center",
	},
	removeButtonText: {
		fontSize: 30,
		color: "white",
		fontWeight: "bold",
	},
});
