import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	inicio:{
		backgroundColor: "#F5F9FF",
	},
	nearyou:{
		backgroundColor: "#F5F9FF",
	},
	item: {
		paddingVertical: 16,
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: "#E5E5E5",
		flexDirection: "row",
		alignItems: "center",
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#333333",
	},
	card: {
		backgroundColor: "#f0f0f0",
		padding: 20,
		borderRadius: 10,
		paddingBottom: 20,
		marginBottom: 10,
	},
	text: {
		paddingLeft: 20,
		fontSize: 20,
		fontWeight: "bold",
		color: "black",
		//backgroundColor: "blue",
	},
	content: {
		padding: 10,
		marginTop: 10,
		//marginHorizontal: 10,
		 //borderColor: "gray",
		 //borderWidth: 1,
		 //borderRadius: 7,
		 backgroundColor:"#F5F9FF",
	},
	logo: {
		width: 324,
		height: 250,
		marginTop: 10,
		marginBottom: 10,
		//flex: ,
		//padding: 10,
	},
	buttons: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 10,
	},
	routs:{
		width: 100,
		height: 100,
		flexDirection: "row",
		justifyContent: "space-between",
		borderRadius:50,
		
		
	},
	star:{
		flexDirection: "row",
		alignItems: "flex-start",
		flex: 1,
		paddingLeft: 15,
	},
	button: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		borderRadius: 5,
		padding: 10,
		marginHorizontal: 5,
	},
	selectedButton: {
		backgroundColor: "#007AFF",
	},
	buttonText: {
		textAlign: "center",
		color: "#333",
	},
	selectedButtonText: {
		color: "#fff",
	},
	searchBar: {
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 16,
		marginVertical: 12,
		borderRadius: 8,
		//backgroundColor: "#EDEDED",
		padding: 8,
	},
	inputContainer: {
		flex: 1,
	},
	textInput: {
		color:"black",
		flex: 1,
		paddingVertical: 8,
		paddingHorizontal: 12,
		fontSize: 16,
		backgroundColor: "#99BF47",
		borderRadius: 25,
	},
	searchButton: {
		marginLeft: 8,
		paddingVertical: 8,
		paddingHorizontal: 12,
		backgroundColor: "#486607",
		borderRadius: 25,
	},
	searchButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	foto:{
		margin:20,
		width: 315,
		height: 215,
	},
	locais:{
		backgroundColor: "#D1E0E8",
		margin:15,

	},
	titulo:{
		padding: 20,
	},
	cardTitle:{
		fontSize: 17,
		fontWeight: "bold",
		paddingBottom: 10,

	},
	cardAddress:{
		//paddingTop: 10,
	},
	
	
});


