import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import * as Location from "expo-location";
import MapView, { Polyline } from "react-native-maps";
import styles from "./style";

export default function NewTrail({ navigation }) {
	const [positions, setPositions] = useState([]);
	const [errorMsg, setErrorMsg] = useState(null);
	const [isTracking, setIsTracking] = useState(false);

	const [locationSubscription, setLocationSubscription] = useState(null);

	// Função para lidar com a atualização de localização
	const handleLocationUpdate = (location) => {
		const { latitude, longitude } = location.coords;
		const now = new Date();
		const timestamp = now.getTime();
		setPositions((prevPositions) => [...prevPositions, { longitude, latitude, timestamp }]);
		console.log("atualizado");
	};

	// Função para iniciar o rastreamento de localização
	const handleStartTracking = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			setErrorMsg("Permissão para acessar a localização foi negada");
			return;
		}

		const taskName = "com.caminhodaroca";
		const options = {
			accuracy: Location.Accuracy.Highest,
			timeInterval: 1000,
			distanceInterval: 1,
			showsBackgroundLocationIndicator: true,
		};

		setIsTracking(true);

		await Location.startLocationUpdatesAsync(taskName, options);
		console.log("iniciar");

		// Armazenar a inscrição de localização
		const subscriber = await Location.watchPositionAsync(options, handleLocationUpdate);
		setLocationSubscription(subscriber);
	};

	// Função para parar o rastreamento de localização
	const handleStopTracking = () => {
		const taskName = "com.caminhodaroca";

		// Cancelar a inscrição nas atualizações de localização
		if (locationSubscription) {
			locationSubscription.remove();
		}

		Location.stopLocationUpdatesAsync(taskName);
		setIsTracking(false);
		setLocationSubscription(null); // Limpar a inscrição
		console.log("parar");
		console.log(JSON.stringify(positions));
	};

	const coordinates = positions.map((position) => ({
		latitude: position.latitude,
		longitude: position.longitude,
	}));

	return (
		<View style={styles.container}>
			{/* Renderizar o mapa com um componente Polyline para desenhar a rota */}
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: -12.10172,
					longitude: -45.806434,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
			>
				<Polyline coordinates={coordinates} strokeWidth={4} strokeColor="red" />
			</MapView>
			<TouchableOpacity style={styles.button} onPress={handleStartTracking} disabled={isTracking}>
				<Text style={styles.buttonTitle}>Iniciar Rastreamento</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button} onPress={handleStopTracking} disabled={!isTracking}>
				<Text style={styles.buttonTitle}>Parar Rastreamento</Text>
			</TouchableOpacity>
		</View>
	);
}
