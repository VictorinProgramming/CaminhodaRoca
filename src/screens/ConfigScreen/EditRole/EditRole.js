import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, Text, BackHandler } from "react-native";
import styles from "./styles";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SERVER_URL } from "@env";

export default function EditRole({ navigation }) {
	const [role, setRole] = useState("");

	useEffect(() => {
		const backAction = () => {
			navigation.navigate("ConfigScreen");
			return true;
		};
		const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
		return () => backHandler.remove();
	}, []);

	const handleSubmit = async () => {
		// Obter o ID do usuário logado
		const userId = await AsyncStorage.getItem("@_userLoggedId");

		try {
			// Enviar uma solicitação HTTP POST para atualizar o ROLE no servidor
			const response = await axios.post(SERVER_URL + "api/perfil/add_role", { userId, role });

			// Navegar de volta para a tela de ConfigScreen após a conclusão bem-sucedida
			navigation.navigate("ConfigScreen");
		} catch (error) {
			console.error("Erro ao atualizar o papel:", error);
		}
	};

	return (
		<View style={styles.container}>
			<ScrollView style={styles.scrollView}>
				<Picker selectedValue={role} style={styles.picker} onValueChange={(itemValue, itemIndex) => setRole(itemValue)}>
					<Picker.Item label="Selecione um cargo" value="" />
					<Picker.Item label="Responsável de Ecoturismo" value="Ecoturismo" />
					{/* Adicionar mais Picker.Item com a criaçao de novos papeis se necessario */}
				</Picker>

				<TouchableOpacity style={styles.button} onPress={handleSubmit}>
					<Text style={styles.buttonTitle}>Salvar Mudanças</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
}

//  "The ache for home lives in all of us, the safe place where we can go as we are and not be questioned." —Maya Angelou
