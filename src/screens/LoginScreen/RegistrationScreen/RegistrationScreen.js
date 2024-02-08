import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import axios from "axios";
import { SERVER_URL } from "@env";
import { firebase } from "../../../firebase/config";

export default function RegistrationScreen({ navigation }) {
	const [confirmSenha, setConfirmSenha] = useState("Ebenezer1.");
	const [email, setEmail] = useState("ebenezerholz710@gmail.com");
	const [name, setNome] = useState("Ebenezer");
	const [cpf, setCpf] = useState("04986764128");
	const [telefone, setTelefone] = useState("61998311668");
	const [dataNascimento, setDataNascimento] = useState("27/01/1999");
	const [userImageURL, setUserImageURL] = useState("");
	const [senha, setSenha] = useState("Ebenezer1.");
	const [validation, setValidation] = useState(1);

	const onFooterLinkPress = () => {
		navigation.navigate("LoginScreen");
	};

	const formatarDataNascimento = (text) => {
		if (text.length === 2 || text.length === 5) {
			// Adiciona uma barra ("/") automaticamente após o dia e o mês
			text += "/";
		}
		setDataNascimento(text);
	};

	const onRegisterPress = async () => {
		if (validation == 1) {
			//validaçao dos campos Nome, Email, Senha e Confirmar Senha
			if (name.trim().length < 3) {
				alert("Por favor, preencha um nome válido.");
				return;
			}

			if (senha !== confirmSenha) {
				alert("Senhas diferentes.");
				return;
			}

			if (email.trim().toLocaleLowerCase() === "@gmail.com" || email.trim().toLocaleLowerCase() === "@outlook.com") {
				alert("E-mail invalido");
				return;
			}

			if (
				email.length < 10 ||
				email.search("@") == -1 ||
				email.search(" ") > -1 ||
				email.lastIndexOf(".") == email.length - 1 ||
				email.search(/[.]/g) == -1
			) {
				alert("E-mail invalido");
				return;
			}

			setValidation(2);
		}

		if (validation == 2) {
			if (cpf == "") {
				alert("Informe CPF");
				return;
			}
			// Elimina CPFs invalidos conhecidos
			if (
				cpf.length != 11 ||
				cpf == "00000000000" ||
				cpf == "11111111111" ||
				cpf == "22222222222" ||
				cpf == "33333333333" ||
				cpf == "44444444444" ||
				cpf == "55555555555" ||
				cpf == "66666666666" ||
				cpf == "77777777777" ||
				cpf == "88888888888" ||
				cpf == "99999999999"
			) {
				alert("CPF inválido");
				return;
			}
			// Valida 1o digito
			add = 0;
			for (i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
			rev = 11 - (add % 11);
			if (rev == 10 || rev == 11) rev = 0;
			if (rev != parseInt(cpf.charAt(9))) {
				alert("Primeiro dígito inválido");
				return;
			}
			// Valida 2o digito
			add = 0;
			for (i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
			rev = 11 - (add % 11);
			if (rev == 10 || rev == 11) rev = 0;
			if (rev != parseInt(cpf.charAt(10))) {
				alert("Segundo dígito inválido");
				return;
			}

			//Número de telefone
			//verifica se tem a qtde de numero correto
			if (telefone.length !== 11) {
				alert("Número de telefone incompleto");
				return;
			}
			if (telefone.length == 11 && parseInt(telefone.substring(2, 3)) != 9) {
				alert("Insira um número de celular");
				return false;
			}
			//verifica se não é nenhum numero digitado errado (propositalmente)
			for (var n = 0; n < 10; n++) {
				if (telefone == new Array(11).join(n) || telefone == new Array(12).join(n)) {
					alert("Número inválido");
					return;
				}
			}
			//DDDs validos
			var codigosDDD = [
				11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 64,
				63, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
			];
			//verifica se o DDD é valido
			if (codigosDDD.indexOf(parseInt(telefone.substring(0, 2))) == -1) {
				alert("DDD inválido");
				return false;
			}

			//verifica data de nascimento
			const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
			if (!dateRegex.test(dataNascimento)) {
				alert("Formato de data de nascimento inválido (DD/MM/AAAA)");
				return;
			}

			const [day, month, year] = dataNascimento.split("/");
			const parseDay = parseInt(day);
			const parseMonth = parseInt(month);
			const parseYear = parseInt(year);

			if (parseMonth > 12 || parseDay <= 0) {
				alert("Formato de data de nascimento inválido (DD/MM/AAAA)");
				return;
			}

			const diasMaximos = new Date(parseYear, parseMonth, 0).getDate();

			if (parseDay > 31 || parseDay <= 0 || parseDay > diasMaximos) {
				alert("Formato de data de nascimento inválido (DD/MM/AAAA)");
				return;
			}
			if (parseYear < 1900 || parseDay >= 2018) {
				alert("Data de nascimento inválido ");
				return;
			}

			setValidation(3);
		}
		if (validation == 3) {
			//Cadastro dos dados inseridos.

			firebase
				.auth()
				.createUserWithEmailAndPassword(email, senha)
				.then(() => {})
				.catch((error) => {
					alert(error);
				});

			// colocar com o vercel
			await axios
				.post(SERVER_URL + "api/users", {
					nome: name,
					email: email,
					cpf: cpf,
					telefone: telefone,
					data_nascimento: dataNascimento,
				})
				.then((res) => {
					console.log("User created successfully");
					navigation.navigate("LoginScreen");
				})
				.catch((error) => {
					console.error("Error creating user:", error);
				});
		}
	};

	return (
		<View style={styles.container}>
			<KeyboardAwareScrollView style={{ flex: 1, width: "100%" }} keyboardShouldPersistTaps="always">
				<View>
					{validation == 1 && (
						<View>
							<Text style={styles.label}>Nome</Text>
							<TextInput
								style={styles.input}
								placeholder="Nome Completo *"
								placeholderTextColor="#aaaaaa"
								onChangeText={(text) => setNome(text)}
								value={name}
								underlineColorAndroid="transparent"
								required={true}
							/>
							<Text style={styles.label}>Email</Text>
							<TextInput
								style={styles.input}
								placeholder="E-mail"
								placeholderTextColor="#aaaaaa"
								onChangeText={(text) => setEmail(text)}
								value={email}
								underlineColorAndroid="transparent"
							/>
							<Text style={styles.label}>Senha</Text>
							<TextInput
								style={styles.input}
								placeholderTextColor="#aaaaaa"
								secureTextEntry
								placeholder="Senha"
								onChangeText={(text) => setSenha(text)}
								value={senha}
								underlineColorAndroid="transparent"
							/>
							<Text style={styles.label}>Confirmar senha</Text>
							<TextInput
								style={styles.input}
								placeholderTextColor="#aaaaaa"
								secureTextEntry
								placeholder="Confirmar Senha"
								onChangeText={(text) => setConfirmSenha(text)}
								value={confirmSenha}
								underlineColorAndroid="transparent"
							/>
							<TouchableOpacity style={styles.button} onPress={() => onRegisterPress()}>
								<Text style={styles.buttonTitle}>Proxima Etapa</Text>
							</TouchableOpacity>
						</View>
					)}
					{validation == 2 && (
						<View>
							<Text style={styles.label}>CPF</Text>
							<TextInput
								style={styles.input}
								placeholderTextColor="#aaaaaa"
								placeholder="CPF"
								onChangeText={(text) => setCpf(text)}
								value={cpf}
								underlineColorAndroid="transparent"
								keyboardType="phone-pad"
								required={true}
							/>
							<Text style={styles.label}>Telefone</Text>
							<TextInput
								style={styles.input}
								placeholderTextColor="#aaaaaa"
								placeholder="Numero de Celular"
								onChangeText={(text) => setTelefone(text)}
								value={telefone}
								underlineColorAndroid="transparent"
								keyboardType="phone-pad"
								req
								uired={true}
							/>
							<Text style={styles.label}>Data de Nascimento</Text>
							<TextInput
								style={styles.input}
								placeholderTextColor="#aaaaaa"
								placeholder="Data de Nascimento (DD/MM/AAAA)"
								onChangeText={(text) => formatarDataNascimento(text)}
								value={dataNascimento}
								keyboardType="numeric"
								maxLength={10}
								required={true}
							/>
							<TouchableOpacity style={styles.button} onPress={() => onRegisterPress()}>
								<Text style={styles.buttonTitle}>Proxima Etapa</Text>
							</TouchableOpacity>
						</View>
					)}
					{validation == 3 && (
						<View>
							<TouchableOpacity style={styles.button} onPress={() => onRegisterPress()}>
								<Text style={styles.buttonTitle}>Cadastrar </Text>
							</TouchableOpacity>
						</View>
					)}
				</View>

				<View style={styles.footerView}>
					<Text style={styles.footerText}>
						Já possui uma conta?{" "}
						<Text onPress={onFooterLinkPress} style={styles.footerLink}>
							Log in
						</Text>
					</Text>
				</View>
			</KeyboardAwareScrollView>
		</View>
	);
}

// "Birds sing after a storm. Why shouldn't people feel as free to delight in whatever sunlight remains to them?"—Rose Kennedy
