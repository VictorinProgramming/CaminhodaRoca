import React, { useEffect, useState } from "react";
import { View, Image, ScrollView, ActivityIndicator, Button, Alert, TextInput, TouchableOpacity, Text, BackHandler } from "react-native";
import styles from "./style";
import { firebase } from "../../../firebase/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SERVER_URL } from "@env";
import * as ImagePicker from "expo-image-picker";

export default function EditPerfilImage({ navigation }) {
	const [image, setImage] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [imageUrl, setImageUrl] = useState(null);

	useEffect(() => {
		const backAction = () => {
			navigation.navigate("ConfigScreen");
			return true;
		};
		const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
		return () => backHandler.remove();
	}, []);

	const pickImage = async () => {
		// Picker imagens da galeria
		let result = await ImagePicker.launchImageLibraryAsync({
			//tipo de midia
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 4],
			// Reduz qualidade para diminuir espaço
			quality: 0.2,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	const handleSubmit = async () => {
		await uploadImage();
	};

	const uploadImage = async () => {
		// Verifica se a variável 'image' está definida
		if (typeof image != "undefined") {
			// Obtém o ID do usuário logado a partir do armazenamento AsyncStorage
			let userId = await AsyncStorage.getItem("@_userLoggedId");
			// Cria um blob a partir da imagem usando uma solicitação XMLHttpRequest
			const blob = await new Promise((resolve, reject) => {
				const xhr = new XMLHttpRequest();
				xhr.onload = function () {
					resolve(xhr.response);
				};
				xhr.onerror = function () {
					reject(new TypeError("Network request failed"));
				};
				xhr.responseType = "blob";
				xhr.open("GET", image, true);
				xhr.send(null);
			});

			// Define o local de armazenamento no Firebase Storage
			const ref = firebase.storage().ref().child(`perfilImage/${userId}/image`);

			// Realiza o upload do blob para o Firebase Storage
			const snapshot = ref.put(blob);

			// Adiciona listeners de eventos para o upload
			snapshot.on(
				firebase.storage.TaskEvent.STATE_CHANGED,
				() => {
					setUploading(true);
				},
				(error) => {
					setUploading(false);
					alert("Perda de conexão com servidor, reinicie a página.");
					blob.close();
					return;
				},
				() => {
					snapshot.snapshot.ref.getDownloadURL().then((url) => {
						// Obtém a URL de download da imagem após o upload
						const apiUrl = `${SERVER_URL}api/perfilImage/${userId}`;
						const data = {
							userImageURL: url,
						};
						// Faz uma solicitação HTTP PUT para atualizar a imagem no servidor
						axios.put(apiUrl, data);
						navigation.navigate("ConfigScreen");
						blob.close();
					});
				}
			);
		}
	};

	return (
		<View style={styles.container}>
			<ScrollView style={styles.scrollView}>
				<TouchableOpacity style={styles.button} onPress={pickImage}>
					<Text style={styles.buttonTitle}>Selecionar Imagem</Text>
				</TouchableOpacity>
				{image && <Image source={{ uri: image }} style={styles.logo} />}

				<TouchableOpacity style={styles.button} onPress={handleSubmit}>
					<Text style={styles.buttonTitle}>Cadastrar</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
}
