import React, { useEffect } from "react";
import { Text, View, BackHandler } from "react-native";
import styles from "./style";

export default function AboutApp({ navigation }) {
	useEffect(() => {
		const backAction = () => {
			navigation.navigate("ConfigScreen");
			return true;
		};
		const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
		return () => backHandler.remove();
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.aboutTextBox}>	O Caminho da Roça tem como missão estabelecer uma conexão significativa entre os usuários,
			 a natureza e a comunidade rural, tudo isso por meio de um aplicativo de geolocalização.
			 {'\n'}{'\n'} Através de uma experiência única, o aplicativo tem a proposta de facilitar e guiar seus trajetos rurais com as rotas mais atualizadas,
			  proporcionando a você a oportunidade de explorar trilhas emocionantes, conhecer cachoeiras, encontrar pontos de ecoturismo 
			  e visitar fazendas de forma descomplicada, apoiando a comunidade local.
			  {'\n'}{'\n'} A iniciativa foca em fortalecer os laços locais, o respeito ao meio ambiente e contribuir para um estilo de vida saudável, tudo isso em um único local. 
			  Baixe agora e junte-se a nós nessa jornada para trilhar com consciência!</Text>
			<Text style={styles.siteTextBox}>tela de AboutApp</Text>
			<Text style={styles.versaoTextBox}>tela de AboutApp</Text>
		</View>
	);
}
