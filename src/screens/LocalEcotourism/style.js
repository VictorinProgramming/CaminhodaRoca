import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#F5F9FF",
	},


	

	card: {
		backgroundColor: "#D1E0E8",
		padding: 20,
		borderRadius: 5,
		paddingBottom: 20,
		marginBottom: 10,
		//alignItems: "center",
		//justifyContent: "center",
	},
	cardTitle:{
		fontSize: 23,
		fontWeight: "bold",
		color: "#000",
		//padding: 20,
	},

	starIcon: {
		marginBottom: 5,

	},
	cardImage:{
		width: 330,
		height: 330,
		marginVertical: 10,
		justifyContent: "center",
	},

	imageContainer: {
		alignItems: "center",
		justifyContent: "center",
	},

	text: {
		paddingLeft: 20,
		fontSize: 20,
		fontWeight: "bold",
		//color: "#000000",
	},

	perfilContainer:{
		backgroundColor: "#F5F9FF",
		width: 330,
		height: 120,
		marginTop:20,
		padding: 10,
		borderRadius: 5,
		
	},
	perfilRow:{
		flex: 1,
		//justifyContent: "space-between",
		flexDirection: "row",
		height: 70,
		//alignItems: "center",
		//justifyContent: "center",
	},
	perfilImage: {
		backgroundColor: "#fff",
		width: 60,
		height: 60,
		borderRadius: 60 / 2,
		borderWidth: 1,
		borderColor: "#000",
	},
	

	nameTitle: {
		height: 60,
		marginLeft: 15,
		justifyContent: "center",
	},
	nameTitleText:{
		fontSize: 16,
		fontWeight: "normal",
	},

	perfilText:{

	},


	commentsTitle: {
		fontSize: 20,
		fontWeight: "bold",
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalTitle: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	commentInput: {
		width: "80%",
		padding: 10,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 10,
	},
	addCommentButton: {
		fontSize: 18,
		fontWeight: "bold",
		color: "blue",
		marginBottom: 10,
	},
	closeModalButton: {
		fontSize: 18,
		color: "red",
	},
	commentText: {
		fontSize: 16,
	},
	commentContainer: {
		marginBottom: 10,
	},
	commentUserId: {
		fontSize: 14,
		fontWeight: "bold",
	},
});
