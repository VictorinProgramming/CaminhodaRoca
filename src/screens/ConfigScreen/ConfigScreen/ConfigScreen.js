import React, { useEffect, useState } from "react";
import { Text, View, BackHandler, TouchableOpacity, ScrollView, Image } from "react-native";
import styles from "./styles";
import { Avatar } from "@rneui/themed";
import { useRoute } from "@react-navigation/native";
import { firebase } from "../../../firebase/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EvilIcons, Feather, MaterialIcons } from "@expo/vector-icons";

export default function ConfigScreen({ navigation }) {
	const route = useRoute();
	const { dataFromPerfil } = route.params;

	const [nome, setNome] = useState(dataFromPerfil.nome);
	const [email, setEmail] = useState(dataFromPerfil.email);
	const [imageUrl, setImageUrl] = useState(dataFromPerfil.imageUrl);

	useEffect(() => {
		console.log(dataFromPerfil);
	}, []);

	useEffect(() => {
		const backAction = () => {
			navigation.navigate("Perfil");
			return true;
		};
		const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
		return () => backHandler.remove();
	}, []);

	return (
		<View style={styles.container}>
			<ScrollView>
				{/* <Avatar rounded
					source={imageUrl ? { uri: imageUrl + "?" } : null}
					style={styles.profileImage}
					title="User"
					containerStyle={{ backgroundColor: "grey" }}
				></Avatar>     */}

				<View style={styles.perfilContainer}>
					<Image style={styles.perfil} source={imageUrl ? { uri: imageUrl + "?" } : null} />
					<TouchableOpacity onPress={() => navigation.navigate("EditPerfilImage")}>
						<Feather name="edit" size={40} color="black" style={styles.editIcon} />
					</TouchableOpacity>
				</View>
				<View style={styles.nameTitleContainer}>
					<Text style={styles.nameTitleText}>{nome}</Text>
				</View>

				<View style={styles.userInfoContainer}>
					<Text style={styles.userInfoText}>Username: {nome}</Text>
					<Text style={styles.userInfoText}>Email: {email}</Text>
				</View>

				<TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Ajuda")}>
					<Text style={styles.buttonText}>Ajuda / Entre em Contato</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AboutApp")}>
					<Text style={styles.buttonText}>Sobre o App</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ChangePassword")}>
					<Text style={styles.buttonText}>Mudar Senha</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => navigation.navigate("EditRole")}>
					<Text style={styles.buttonText}>Editar Papel de Ecoturismo</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.button, styles.logoutButton]}
					onPress={() => {
						firebase
							.auth()
							.signOut()
							.then(() => {
								AsyncStorage.setItem("@key_Email", "");
								AsyncStorage.setItem("@key_Password", "");
								navigation.navigate("LoginStack");
							});
					}}
				>
					<Text style={[styles.buttonText, styles.logoutButtonText]}>LogOut</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
}
