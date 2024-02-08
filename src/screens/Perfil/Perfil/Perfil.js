import React, { useEffect, useState, useLayoutEffect } from "react";
import { Text, TouchableOpacity, View, Image, ScrollView, RefreshControl, Modal } from "react-native";
import styles from "./style";
import { useRoute } from "@react-navigation/native";
import { Avatar } from "@rneui/themed";
import { EvilIcons, Feather, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SERVER_URL } from "@env";

export default function Perfil({ navigation }) {
	// Estados para armazenar informações do usuário
	const [nome, setNome] = useState("");
	const [email, setEmail] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [refreshing, setRefreshing] = useState(false);
	const [role, setRole] = useState("");

	// Estado para controlar a visibilidade do modal
	const [isModalVisible, setIsModalVisible] = useState(false);

	// Estado para armazenar dados de itens selecionados
	const [resultArray, setResultArray] = useState([]);

	// Estado para rastrear o índice do item selecionado
	const [selectedItemIndex, setSelectedItemIndex] = useState(-1);

	// Estado para armazenar os dados do item selecionado
	const [selectedItemData, setSelectedItemData] = useState(null);

	// Estado para armazenar as credenciais do usuário
	const [credentials, setCredentials] = useState({ email: "", nome: "", imageUrl: "" });

	// UseLayoutEffect para configurar o botão de configurações na barra de cabeçalho de navegação
	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					onPress={() => {
						console.log(credentials);
						navigation.navigate("ConfigStack", { screen: "ConfigScreen", params: { dataFromPerfil: credentials } });
					}}
					style={{ marginRight: 20 }}
				>
					<Feather name="settings" size={26} color="black" />
				</TouchableOpacity>
			),
		});
	}, [navigation, credentials]);

	useEffect(() => {
		getUserData();
	}, []);

	// Função para alternar a visibilidade do modal
	const toggleModal = () => {
		setIsModalVisible(!isModalVisible);
	};

	// Função para lidar com o pressionamento de um item
	const handleItemPress = (index) => {
		setSelectedItemIndex(index);
		console.log(resultArray[index]);
	};

	// Função para buscar os dados do usuário a partir do AsyncStorage e do servidor
	const getUserData = async () => {
		try {
			const userId = await AsyncStorage.getItem("@_userLoggedId");
			const res = await axios.post(SERVER_URL + "api/perfil", { userId });

			const { nome, role, userImageURL, email } = res.data;
			setNome(nome);
			setRole(role);
			setEmail(email);
			setImageUrl(userImageURL);

			const updatedCredentials = {
				email,
				nome,
				imageUrl,
			};

			setCredentials(updatedCredentials);

			if (res.data.role === "Ecoturismo") {
				try {
					const userId = await AsyncStorage.getItem("@_userLoggedId");
					const response = await axios.post(SERVER_URL + "api/perfil/get_ecotourism", { userId });

					setResultArray(response.data);
				} catch (error) {
					console.error(error);
				}
			}
		} catch (error) {
			console.error(error);
		}
	};

	// Função para lidar com o evento de atualização (refresh) dos dados
	const handleRefresh = () => {
		setRefreshing(true);
		getUserData();
		setRefreshing(false);
	};

	return (
		<View style={styles.container}>
			<ScrollView style={styles.scrollView} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
				<View style={[styles.headerContainer, styles.shadowProp]}>
					<TouchableOpacity>
						<Avatar
							rounded
							source={imageUrl ? { uri: imageUrl + "?" } : null}
							style={styles.profileImage}
							title="User"
							containerStyle={{ backgroundColor: "grey" }}
						></Avatar>
					</TouchableOpacity>

					<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1, paddingRight: 20 }}>
						<View style={styles.headerDetails}>
							<Text style={styles.name}>{nome}</Text>
							<Text style={styles.subname}>{email}</Text>
							<View style={{ flexDirection: "row", alignItems: "center" }}>
								<EvilIcons name="star" size={24} color="black" />
								<EvilIcons name="star" size={24} color="black" />
								<EvilIcons name="star" size={24} color="black" />
								<EvilIcons name="star" size={24} color="black" />
								<EvilIcons name="star" size={24} color="black" />
							</View>
						</View>
					</View>
				</View>

				{role == "Ecoturismo" && (
					<View>
						<View>
							<TouchableOpacity style={styles.button} onPress={toggleModal}>
								<Text style={styles.buttonText}> + Ecoturismo</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.content}>
							{resultArray.map((item, index) => (
								<TouchableOpacity
									key={index}
									style={styles.card}
									onPress={() => {
										handleItemPress(index);
									}}
								>
									<Text style={styles.cardText}>{item.nome_propriedade}</Text>
									<Text style={styles.cardText}>{item.endereco}</Text>
									<Image source={item.propriedadeImageURL ? { uri: item.propriedadeImageURL + "?" } : null} style={styles.logo} />
									{selectedItemIndex === index && (
										<TouchableOpacity onPress={() => navigation.navigate("Edit", { selectedItemData })}>
											<Feather name="edit-2" size={24} color="black" style={styles.editIcon} />
										</TouchableOpacity>
									)}
								</TouchableOpacity>
							))}
						</View>
					</View>
				)}
			</ScrollView>

			<Modal visible={isModalVisible} animationType="slide">
				<View style={styles.modalContainer}>
					<TouchableOpacity
						onPress={() => {
							toggleModal();
							navigation.navigate("NewEcotourism");
						}}
					>
						<Text style={styles.addCommentButton}>+ Local de ecoturismo</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							toggleModal();
							navigation.navigate("NewTrail");
						}}
					>
						<Text style={styles.addCommentButton}>+ Trilha de ecoturismo</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							toggleModal();
							navigation.navigate("NewFarm");
						}}
					>
						<Text style={styles.closeModalButton}>+ Fazenda de ecoturismo</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={toggleModal}>
						<Text style={styles.closeModalButton}>Close</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		</View>
	);
}
