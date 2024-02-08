import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#D1E0E8",
		// paddingTop: 40,
		paddingHorizontal: 20,
	},
	perfilContainer: {
		alignItems: "center",
		justifyContent: "center",
	},
	perfil: {
		width: 220,
		height: 220,
		borderRadius: 220 / 2,
		marginVertical: 20,
		borderWidth: 5,
		borderColor: "#fff",
	},
	

	editIcon: {
		position: "absolute",
		top: -90,
		left: 60,
	},


	nameTitleContainer: {
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 20,
	},
	nameTitleText: {
		color: "#1E1E1E",
		fontSize: 24,
		fontWeight: "bold",
	},


	userInfoContainer: {
		alignItems: "left",
		justifyContent: "left",
		marginBottom: 20,
		marginHorizontal: 20,
	},
	userInfoText: {
		color: "#1E1E1E",
		fontSize: 16,
		fontWeight: "bold",
		marginVertical: 1,
	},



	button: {
		backgroundColor: "#0B3802",
		//shadowColor: "#000000",
		//shadowOffset: { width: 0, height: 5 },
		//shadowOpacity: 0.3,
		//shadowRadius: 5,
		//elevation: 5,
		marginHorizontal: 10,
		marginVertical: 6,
		height: 48,
		borderRadius: 4,
		alignItems: "left",
		justifyContent: "center",
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "normal",
		marginLeft: 15,
	},
	logoutButton: {
		backgroundColor: "#f44336",
		alignItems: "center",
		marginVertical: 20,
		marginBottom: 70,
	},
	logoutButtonText: {
		color: "white",
		marginLeft: 0,
	},

	/* profileImage: {
		width: 80,
		height: 80,
		borderRadius: 40,
		marginRight: 20,
	},   */

});
