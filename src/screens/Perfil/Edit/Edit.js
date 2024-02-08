import React, { useEffect, useState } from "react";
import { Text, View, BackHandler, TextInput, TouchableOpacity, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRoute } from "@react-navigation/native";
import styles from "./style";
import axios from "axios";
import { firebase } from "../../../firebase/config";
import { SERVER_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

export default function Edit({ navigation }) {
	const route = useRoute();

	// Estado para armazenar os dados do local selecionado
	const [updatedPlace, setUpdatedPlace] = useState(route.params.selectedItemData);

	// Estado para controlar a visibilidade do botão
	const [buttonVisible, setButtonVisible] = useState(true);

	// Estados para armazenar os dados do formulário
	const [nomePropriedade, setNomePropriedade] = useState("");
	const [endereco, setEndereco] = useState("");
	const [cep, setCep] = useState("");
	const [bairro, setBairro] = useState("");
	const [siglaUf, setSiglaUf] = useState("");
	const [municipio, setMunicipio] = useState("");
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");

	// Estado para armazenar os dados de ecoturismo
	const [ecotourismData, setEcotourismData] = useState({
		propriedadeImageURL: [],
	});

	// Efeito para controlar a ação do botão de voltar
	useEffect(() => {
		const backAction = () => {
			navigation.navigate("Perfil");
			return true;
		};
		const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
		return () => backHandler.remove();
	}, []);

	// Efeito para atualizar os dados do local quando a rota muda
	useEffect(() => {
		setUpdatedPlace(route.params.selectedItemData);
	}, [route.params.selectedItemData]);

	// Efeito para buscar os dados de ecoturismo do local
	useEffect(() => {
		const fetchEcotourismData = async () => {
			try {
				const response = await axios.post(SERVER_URL + "api/new_ecotourism/find_ecotourism/" + updatedPlace._id);

				const ecotourismData = response.data.ecotourism;

				setEcotourismData(ecotourismData);

				setNomePropriedade(ecotourismData.nome_propriedade);
				setEndereco(ecotourismData.endereco);
				setCep(ecotourismData.cep);
				setBairro(ecotourismData.bairro);
				setSiglaUf(ecotourismData.sigla_uf);
				setMunicipio(ecotourismData.municipio);
			} catch (error) {
				console.error("Erro ao buscar dados de ecoturismo:", error);
			}
		};

		// Chama a função fetchEcotourismData quando o componente é montado
		fetchEcotourismData();
	}, [updatedPlace._id]);

	// Função para obter a geolocalização
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

	// Função para lidar com o pressionar do botão de registro
	const onRegisterPress = async () => {
		// Verificar se nao esta vazio
		if (!nomePropriedade || !siglaUf || !municipio || !bairro || !cep || !endereco) {
			alert("Por favor, preencha todos os campos obrigatórios.");
			return;
		}

		try {
			let userId = await AsyncStorage.getItem("@_userLoggedId");

			// Faz uma solicitação Axios PUT para atualizar os dados no banco de dados
			const response = await axios.put(SERVER_URL + "api/new_ecotourism/edit_ecotourism/" + updatedPlace._id, {
				nome_propriedade: nomePropriedade,
				endereco: endereco,
				cep: cep,
				bairro: bairro,
				sigla_uf: siglaUf,
				municipio: municipio,
				localisacao_geografica: {
					type: "Point",
					coordinates: [`${latitude}`, `${longitude}`],
				},
				user_id: userId,
				tipo: "place",
			});

			// Verifica se a solicitação foi bem-sucedida
			if (response.status === 200) {
				// Dados atualizados com sucesso
				navigation.navigate("Perfil");
				console.log("Dados atualizados com sucesso");
				// Você pode navegar para uma tela diferente ou executar qualquer outra ação aqui
			} else {
				// Lidar com o caso em que a solicitação não foi bem-sucedida
				navigation.navigate("Perfil");
				console.error("Falha ao atualizar os dados");
			}
		} catch (error) {
			console.error("Erro ao atualizar os dados", error);
		}
	};

	return (
		<View style={styles.container}>
			<KeyboardAwareScrollView style={{ flex: 1, width: "100%" }} keyboardShouldPersistTaps="always">
				<View style={styles.container}>
					<View style={styles.containerInput}>
						<Text style={styles.textInputTitle}>Nome da Propriedade</Text>
						<TextInput
							style={styles.input}
							placeholder="Nome da Propriedade"
							placeholderTextColor="#aaaaaa"
							onChangeText={(text) => setNomePropriedade(text)}
							value={nomePropriedade}
							underlineColorAndroid="transparent"
							required={true}
						/>
						<Text style={styles.textInputTitle}>Endereço</Text>
						<TextInput
							style={styles.input}
							placeholder="Endereço"
							placeholderTextColor="#aaaaaa"
							onChangeText={(text) => setEndereco(text)}
							value={endereco}
							underlineColorAndroid="transparent"
						/>
						<Text style={styles.textInputTitle}>CEP</Text>
						<TextInput
							style={styles.input}
							placeholder="CEP"
							placeholderTextColor="#aaaaaa"
							onChangeText={(text) => setCep(text)}
							value={cep}
							underlineColorAndroid="transparent"
							keyboardType="phone-pad"
						/>
						<Text style={styles.textInputTitle}>Bairro</Text>
						<TextInput
							style={styles.input}
							placeholder="Bairro"
							placeholderTextColor="#aaaaaa"
							onChangeText={(text) => setBairro(text)}
							value={bairro}
							underlineColorAndroid="transparent"
						/>
						<Text style={styles.textInputTitle}>Sigla UF</Text>
						<TextInput
							style={styles.input}
							placeholder="Sigla UF"
							placeholderTextColor="#aaaaaa"
							onChangeText={(text) => setSiglaUf(text)}
							value={siglaUf}
							underlineColorAndroid="transparent"
						/>
						<Text style={styles.textInputTitle}>Município</Text>
						<TextInput
							style={styles.input}
							placeholder="Município"
							placeholderTextColor="#aaaaaa"
							onChangeText={(text) => setMunicipio(text)}
							value={municipio}
							underlineColorAndroid="transparent"
						/>
					</View>

					<View>
						{buttonVisible ? (
							<TouchableOpacity style={styles.button} onPress={() => getGeolocation()}>
								<Text style={styles.buttonTitle}>Definir Local Geografico Atual</Text>
							</TouchableOpacity>
						) : (
							<View>
								<TouchableOpacity style={styles.button} onPress={() => getGeolocation()}>
									<Text style={styles.buttonTitle}>Redefinir Local Geográfico Atual</Text>
								</TouchableOpacity>
								<Text style={styles.text}>Latitude: {latitude}</Text>
								<Text style={styles.text}>Longitude: {longitude}</Text>
								<TouchableOpacity style={styles.button} onPress={() => onRegisterPress()}>
									<Text style={styles.buttonTitle}>Salvar</Text>
								</TouchableOpacity>
							</View>
						)}
					</View>
				</View>
			</KeyboardAwareScrollView>
		</View>
	);
}
