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
	input: {
		height: 48,
		borderRadius: 7,
		overflow: "hidden",
		backgroundColor: "#ffffff",
		shadowColor: "#000000",
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 5,
		marginVertical: 10,
		marginHorizontal: 30,
		paddingLeft: 16,
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
	buttonTitle: {
		color: "black",
		fontSize: 16,
		fontWeight: "bold",
	},
	imageContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
		marginRight: 10,
		paddingRight: 20,
	},
	logo: {
		width: 100,
		height: 100,
		resizeMode: "cover",
		marginRight: 10,
		paddingRight: 20,
	},
	removeButton: {
		backgroundColor: "red",
		padding: 10,
		borderRadius: 5,
	},
	removeButtonText: {
		color: "white",
		fontWeight: "bold",
	},
});
