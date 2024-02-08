import React, { useEffect, useState } from "react";
import { Text, View, BackHandler, Image, TouchableOpacity, Modal } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from "../../../firebase/config";

import styles from "./style";

export default function ChangePassword({ navigation }) {
	const [email, setEmail] = useState(""); // Initialize with an empty string
	const [message, setMessage] = useState("");
	const [modalVisible, setModalVisible] = useState(false);

	useEffect(() => {
		const backAction = () => {
			navigation.navigate("ConfigScreen");
			return true;
		};
		const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
		return () => backHandler.remove();
	}, []);

	useEffect(() => {
		const getEmailFromStorage = async () => {
			const storedEmail = await AsyncStorage.getItem("@key_Email");
			if (storedEmail) {
				setEmail(storedEmail);
			}
		};
		getEmailFromStorage();
	}, []);

	const onResetPasswordPress = async () => {
		await firebase
			.auth()
			.sendPasswordResetEmail(email)
			.then(() => {
				setMessage("Verifique seu email para redefinir a senha.");
				setModalVisible(true);
			})
			.catch((error) => {
				alert("Perda de conexão com servidor, reinicie a página.");
			});
	};

	const closeModal = () => {
		setModalVisible(false);
		navigation.navigate("Login");
	};

	return (
		<View style={styles.container}>
			<KeyboardAwareScrollView style={{ flex: 1, width: "100%" }}>
				<Image style={styles.logo} source={require("../../../../assets/logo.png")} />
				<Text style={styles.texto}>Email</Text>
				<Text style={styles.input}>{email}</Text>
				<TouchableOpacity style={styles.button} onPress={() => onResetPasswordPress()}>
					<Text style={styles.buttonTitle}>Redefinir Senha</Text>
				</TouchableOpacity>
			</KeyboardAwareScrollView>
			<Modal visible={modalVisible} animationType="fade">
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<View style={styles.text}>{message ? <Text>{message}</Text> : null}</View>
						<TouchableOpacity style={styles.modalButton} onPress={() => closeModal()}>
							<Text style={styles.modalButtonText}>OK</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
}
