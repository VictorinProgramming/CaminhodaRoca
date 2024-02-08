import React, { useState, useEffect } from "react";
import { Image, Text, TextInput, TouchableOpacity, View, ActivityIndicator, BackHandler } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SERVER_URL } from "@env";
import { firebase } from "../../../firebase/config";

export default function LoginScreen({ navigation }) {
	const [email, setEmail] = useState("ebenezerholz710@gmail.com");
	const [isLoading, setisLoading] = useState(false);
	const [senha, setSenha] = useState("Ebenezer1.");

	const onFooterLinkPress = () => {
		navigation.navigate("Registration");
	};

	useEffect(() => {
		const backAction = () => {
			navigation.navigate("LoginStack");
			return true;
		};
		const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
		return () => backHandler.remove();
	}, []);

	const credentials = {
		// credenciais necessarias para fazer o Login
		email: email,
		senha: senha,
	};

	const onLoginPress = async () => {
		await axios
			.post(SERVER_URL + "api/login", credentials)
			.then((res) => {
				AsyncStorage.setItem("@_userLoggedId", res.data.userId);
				AsyncStorage.setItem("@key_Email", credentials.email);
				AsyncStorage.setItem("@key_Password", credentials.senha);
			})
			.catch(() => {
				setisLoading(false);
				alert("Erro de conexão");
			});

		firebase
			.auth()
			.signInWithEmailAndPassword(email, senha)
			.then((res) => {
				setisLoading(false);
				navigation.navigate("HomeTab");
			})
			.catch((error) => {
				setisLoading(false);
				alert("Email e/ou senha incorreto(s)");
			});
	};

	return (
		<View style={styles.container}>
			{(() => {
				if (isLoading == false) {
					return (
						<KeyboardAwareScrollView style={{ flex: 1, width: "100%" }} keyboardShouldPersistTaps="always">
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
							<TextInput
								style={styles.input}
								placeholderTextColor="#aaaaaa"
								secureTextEntry
								placeholder="Senha"
								onChangeText={(text) => setSenha(text)}
								value={senha}
								underlineColorAndroid="transparent"
								autoCapitalize="none"
							/>
							<TouchableOpacity style={styles.button} onPress={() => onLoginPress()}>
								<Text style={styles.buttonTitle}>Entrar</Text>
							</TouchableOpacity>
							<View style={styles.footerView}>
								<Text style={styles.footerText}>
									Não possue uma conta?{" "}
									<Text onPress={onFooterLinkPress} style={styles.footerLink}>
										Criar Conta
									</Text>
								</Text>
								<TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
									<Text style={styles.footerLink}>Esqueceu a senha?</Text>
								</TouchableOpacity>
							</View>
						</KeyboardAwareScrollView>
					);
				} else {
					<View>
						<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
							<ActivityIndicator size="large" />
						</View>
					</View>;
				}
				return null;
			})()}
		</View>
	);
}
