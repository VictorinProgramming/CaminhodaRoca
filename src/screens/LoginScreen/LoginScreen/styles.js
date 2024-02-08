import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#F5F9FF",
	},
	title: {
	 
	},
	logo: {
		flex: 1,
		height: 200,
		width: 200,
		alignSelf: "center",
		borderRadius: 10,
		margin: 30,
	},
	input: {
		height: 48,
		borderRadius: 10,
		overflow: "hidden",
		backgroundColor: "#F5F9FF",
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
		backgroundColor: "#0B3802",
		shadowColor: "#000000",
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
		elevation: 5,
		marginHorizontal: 30,
		marginVertical: 20,
		height: 48,
		borderRadius: 9,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonTitle: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	footerView: {
		flex: 1,
		alignItems: "center",
		marginTop: 20,
	},
	footerText: {
		fontSize: 16,
		color: "#2e2e2d",
	},
	footerLink: {
		color: "#788eec",
		fontWeight: "bold",
		fontSize: 16,
		marginTop: 10,
	},
});