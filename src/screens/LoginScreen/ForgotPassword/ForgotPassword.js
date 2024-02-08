import React, { useState, useEffect } from "react";
import { Image, Text, TextInput, TouchableOpacity, View, Modal, Pressable } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { firebase } from "../../../firebase/config";

export default function ForgotPassword({ navigation }) {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [modalVisible, setModalVisible] = useState(false);

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
				<TextInput
					style={styles.input}
					placeholder="E-mail"
					placeholderTextColor="#aaaaaa"
					onChangeText={(text) => setEmail(text)}
					value={email}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
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
