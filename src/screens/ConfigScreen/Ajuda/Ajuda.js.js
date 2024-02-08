import React, { useEffect } from "react";
import { Text, View, BackHandler } from "react-native";
import styles from "./style";

export default function Ajuda({ navigation }) {
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
			<Text style={styles.helptextbox}>tela de AJUDA</Text>
		</View>
	);
}
