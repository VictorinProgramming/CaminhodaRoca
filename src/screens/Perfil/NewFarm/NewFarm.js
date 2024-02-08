import React, { useEffect, useState } from "react";
import { Text, View, BackHandler, TextInput, TouchableOpacity, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Location from "expo-location";
import styles from "./style";
import axios from "axios";
import { firebase } from "../../../firebase/config";
import { SERVER_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export default function NewFarm({ navigation }) {
	const [buttonVisible, setButtonVisible] = useState(true);

	const [nomePropriedade, setNomePropriedade] = useState("Exemplo de Propriedade");
	const [endereco, setEndereco] = useState("Rua Exemplo, 123");
	const [cep, setCep] = useState("12345-678");
	const [bairro, setBairro] = useState("Exemplo");
	const [siglaUf, setSiglaUf] = useState("GO");
	const [municipio, setMunicipio] = useState("Goias");
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");

	const [idEcotourism, setIdEcotourism] = useState([]);

	const [etapa, setEtapa] = useState("1");

	const [image, setImage] = useState(null);
	const [propriedadeImageURL, setPropriedadeImageURL] = useState([]);

	useEffect(() => {
		const backAction = () => {
			navigation.navigate("Perfil");
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
			// Crie um novo array espalhando o propriedadeImageURL atual e adicionando o novo URI
			setPropriedadeImageURL((prevURLs) => [...prevURLs, result.assets[0].uri]);
		}
	};

	const getGeolocation = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			return;
		}
		let location = await Location.getCurrentPositionAsync({});
		setLatitude(location.coords.latitude);
		setLongitude(location.coords.longitude);
		setButtonVisible(false);
	};

	const onRegisterPress = async () => {
		let userId = await AsyncStorage.getItem("@_userLoggedId");
		// verificar se o campo nomePropriedade esta vazio
		// verificar se o campo endereco esta vazio
		// verificar se o campo cep esta vazio || cep valido
		// verificar se o campo bairro esta vazio
		// verificar se o campo siglaUf esta vazio || valido somente a versao abreviada "GO"
		// verificar se o campo municipio esta vazio

		await axios
			.post(SERVER_URL + "api/new_ecotourism", {
				nome_propriedade: nomePropriedade,
				endereco,
				cep,
				bairro,
				sigla_uf: siglaUf,
				municipio,
				localisacao_geografica: {
					type: "Point",
					coordinates: [`${latitude}`, `${longitude}`],
				},
				user_id: userId,
				tipo: "farm",
			})
			.then((response) => {
				const newEcotourismId = response.data.id;
				setIdEcotourism(newEcotourismId);
				setEtapa("2");
			})
			.catch((error) => {
				console.error("Error sending data:", error);
			});
	};

	const uploadImage = async () => {
		if (propriedadeImageURL.length === 0) {
			console.log("No images to upload.");
			return;
		}

		try {
			// Obter o ID do usuário do AsyncStorage
			const userId = await AsyncStorage.getItem("@_userLoggedId");

			// Inicializar um array para armazenar promessas para cada tarefa de upload
			const uploadPromises = [];

			// Iterar pelo array propriedadeImageURL e enviar cada imagem
			propriedadeImageURL.forEach((imageUri, index) => {
				const imageBlob = fetch(imageUri)
					.then((response) => response.blob())
					.catch((error) => {
						console.error(`Failed to fetch image blob for index ${index}:`, error);
						throw error;
					});

				const imageUploadTask = imageBlob.then((blob) => {
					const ref = firebase.storage().ref().child(`ecotourismImage/${userId}/${idEcotourism}/image${index}`);

					return ref.put(blob).then((snapshot) => {
						return snapshot.ref.getDownloadURL();
					});
				});

				uploadPromises.push(imageUploadTask);
			});

			// Aguardar o término de todos os uploads de imagens
			const uploadedImageUrls = await Promise.all(uploadPromises);

			const apiUrl = `${SERVER_URL}api/new_ecotourism/new_images/${userId}/${idEcotourism}`;
			const data = {
				propriedadeImageURL: uploadedImageUrls,
			};

			// Faz uma solicitação HTTP PUT para atualizar a imagem no servidor
			await axios.post(apiUrl, data);

			// Reset as propriedades
			setEtapa("1");
			setPropriedadeImageURL([]);
			setButtonVisible(true);
			setNomePropriedade("");
			setEndereco("");
			setCep("");
			setBairro("");
			setSiglaUf("");
			setMunicipio("");
			setLatitude("");
			setLongitude("");

			navigation.navigate("Perfil");
		} catch (error) {
			console.error("Image upload failed:", error);
		}
	};

	const removeImage = (indexToRemove) => {
		// Crie uma cópia da lista de imagens
		const updatedImages = [...propriedadeImageURL];
		// Remova a imagem com o índice especificado
		updatedImages.splice(indexToRemove, 1);
		// Atualize o estado com a nova lista de imagens
		setPropriedadeImageURL(updatedImages);
	};

	return (
		<View style={styles.container}>
			<KeyboardAwareScrollView style={{ flex: 1, width: "100%" }} keyboardShouldPersistTaps="always">
				<View style={styles.container}>
					{etapa == 1 && (
						<View>
							<TextInput
								style={styles.input}
								placeholder="Nome da Propriedade *"
								placeholderTextColor="#aaaaaa"
								onChangeText={(text) => setNomePropriedade(text)}
								value={nomePropriedade}
								underlineColorAndroid="transparent"
								required={true}
							/>
							<TextInput
								style={styles.input}
								placeholder="Endereço"
								placeholderTextColor="#aaaaaa"
								onChangeText={(text) => setEndereco(text)}
								value={endereco}
								underlineColorAndroid="transparent"
							/>
							<TextInput
								style={styles.input}
								placeholder="CEP"
								placeholderTextColor="#aaaaaa"
								onChangeText={(text) => setCep(text)}
								value={cep}
								underlineColorAndroid="transparent"
								keyboardType="phone-pad"
							/>
							<TextInput
								style={styles.input}
								placeholder="Bairro"
								placeholderTextColor="#aaaaaa"
								onChangeText={(text) => setBairro(text)}
								value={bairro}
								underlineColorAndroid="transparent"
							/>
							<TextInput
								style={styles.input}
								placeholder="Sigla UF"
								placeholderTextColor="#aaaaaa"
								onChangeText={(text) => setSiglaUf(text)}
								value={siglaUf}
								underlineColorAndroid="transparent"
							/>
							<TextInput
								style={styles.input}
								placeholder="Município"
								placeholderTextColor="#aaaaaa"
								onChangeText={(text) => setMunicipio(text)}
								value={municipio}
								underlineColorAndroid="transparent"
							/>
							{buttonVisible ? (
								<TouchableOpacity style={styles.button} onPress={() => getGeolocation()}>
									<Text style={styles.buttonTitle}>Definir Local Geografico Atual</Text>
								</TouchableOpacity>
							) : (
								<View>
									<TouchableOpacity style={styles.button} onPress={() => getGeolocation()}>
										<Text style={styles.buttonTitle}>redefinir Local Geografico Atual</Text>
									</TouchableOpacity>
									<Text style={styles.text}>Local</Text>
									<Text style={styles.text}>Latitude: {latitude}</Text>
									<Text style={styles.text}>Longitude: {longitude}</Text>
									<TouchableOpacity style={styles.button} onPress={() => onRegisterPress()}>
										<Text style={styles.buttonTitle}>Proxima Etapa</Text>
									</TouchableOpacity>
								</View>
							)}
						</View>
					)}
					{etapa == 2 && (
						<View>
							<TouchableOpacity style={styles.button} onPress={() => pickImage()}>
								<Text style={styles.buttonTitle}>Select Image</Text>
							</TouchableOpacity>
							{propriedadeImageURL.map((imageUri, index) => (
								<View key={index} style={styles.imageContainer}>
									<Image source={{ uri: imageUri }} style={styles.logo} />
									<TouchableOpacity style={styles.removeButton} onPress={() => removeImage(index)}>
										<Text style={styles.removeButtonText}>Remover</Text>
									</TouchableOpacity>
								</View>
							))}
							<TouchableOpacity style={styles.button} onPress={() => uploadImage()}>
								<Text style={styles.buttonTitle}>Salvar Mudanças</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>
			</KeyboardAwareScrollView>
		</View>
	);
}
