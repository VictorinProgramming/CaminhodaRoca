import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		
		flex: 1,
		alignItems: "center",
		width: "100%",
		backgroundColor: "#D1E0E8",
	},
	logo: {
		flex: 1,
		height: 300,
		width: 300,
		alignSelf: "center",
		margin: 30,
	},
	button: {
		backgroundColor: "#0B3802",
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
		paddingLeft: 25,
		paddingRight: 25,
		marginTop:50,

		
	},
	buttonTitle: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
		margin: 5,
	},
});
