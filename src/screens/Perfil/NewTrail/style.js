import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F9FF",
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
	map: {
		flex: 1,
		borderWidth: 1,
		borderColor: "#000000",
		height: 100,
	},
});
