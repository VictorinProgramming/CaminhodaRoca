import React, { useEffect, useState, useRef } from "react";
import { Text, View, TouchableOpacity, ScrollView, TextInput, RefreshControl, Image } from "react-native";
import { SearchBar } from "react-native-elements";
import * as Location from "expo-location";
import axios from "axios";
import { SERVER_URL, DISTANCE } from "@env";
import styles from "./style";
import { EvilIcons } from "@expo/vector-icons";

export default function MainScreen({ navigation }) {
	const mapRef = useRef(null);

	const [names, setNames] = useState([]);
	const [search, setSearch] = useState();

	const [selectedItem, setSelectedItem] = useState(null);
	const [selectedFilter, setSelectedFilter] = useState("place");

	const [data, setData] = useState([]);

	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");

	const [refreshing, setRefreshing] = useState(false);

	const [ecotourismPlacesNearby, setEcotourismPlacesNearby] = useState([]);

	const [imageUrl, setImageUrl] = useState("https://reactnative.dev/img/tiny_logo.png");

	const [searchText, setSearchText] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		getGeolocation();
	}, []);

	const handleSearch = async () => {
		// Função para lidar com a pesquisa de locais.
		try {
			if (!searchText) {
				// Se searchText estiver vazio, limpe os resultados da pesquisa
				setSearchResults([]);
			} else {
				const response = await axios.get(SERVER_URL + "api/new_ecotourism/search_ecotourism/" + searchText);

				// Atualize o estado dos resultados da pesquisa com os dados da resposta
				setSearchResults(response.data.ecotourismPlaces);
			}
		} catch (error) {
			console.error("Error fetching search results:", error);
		}
	};

	const getGeolocation = async () => {
		// Função para obter a geolocalização do dispositivo.
		setNames(data);

		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			return;
		}
		let location = await Location.getCurrentPositionAsync({});
		setLatitude(location.coords.latitude);
		setLongitude(location.coords.longitude);

		try {
			const response = await axios.post(
				SERVER_URL + `api/new_ecotourism/near_ecotourism/${location.coords.latitude}/${location.coords.longitude}/` + DISTANCE
			);
			console.log(response.data.ecotourismPlacesNearby);
			setEcotourismPlacesNearby(response.data.ecotourismPlacesNearby);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	// Função para lidar com o refresh da tela.
	const handleRefresh = () => {
		setRefreshing(true);
		getGeolocation();
		setRefreshing(false);
	};

	const filterPlacesByType = (places, filter) => {
		return places.filter((place) => place.tipo === filter);
	};

	return (
		<View style={styles.container}>
			<ScrollView style={styles.scrollView} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
			<View style={styles.inicio}>
				<View style={styles.searchBar}>
					<TextInput style={styles.textInput} placeholder="Procure um local" onChangeText={(text) => setSearchText(text)} />
					<TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
						<Text style={styles.searchButtonText}>Search</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.buttons}>
					<TouchableOpacity style={[styles.button, selectedFilter === "trail" ? styles.selectedButton : null]} onPress={() => setSelectedFilter("trail")}>
						{/* usar o icon "<FontAwesome name="map-signs" size={24} color="black" />" */}
						<Image style={styles.routs} source={require("../../../assets/trilha.jpg")} />
						<Text style={styles.buttonText}>Trilhas</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.button, selectedFilter === "place" ? styles.selectedButton : null]} onPress={() => setSelectedFilter("place")}>
						{/* usar o icon "<FontAwesome name="map-pin" size={24} color="black" />" */}
						<Image style={styles.routs} source={require("../../../assets/cachoeira.jpg")} />
						<Text style={styles.buttonText}>Locais</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.button, selectedFilter === "farm" ? styles.selectedButton : null]} onPress={() => setSelectedFilter("farm")}>
						{/* usar o icon "<MaterialIcons name="agriculture" size={24} color="black" />" */}
						<Image style={styles.routs} source={require("../../../assets/fazenda.jpg")} />
						<Text style={styles.buttonText}>Fazendas</Text>
					</TouchableOpacity>
				</View>
				</View>

				
				<View style={styles.content}>
					<Text style={styles.text}>Perto de você</Text>
					{searchResults.length > 0 && (
						<View style={styles.searchResults}>
							{searchResults.map((place, _id) => (
								<View key={place._id} style={styles.card}>
									<TouchableOpacity
										key={_id}
										onPress={() => {
											navigation.navigate("LocalEcotourism", { screen: "LocalEcotourism", params: { place } });
										}}
									>
										<Text style={styles.cardTitle}>{place.nome_propriedade}</Text>
										<Text style={styles.cardAddress}>{place}</Text>
										<Text style={styles.cardAddress}>{place.tipo}</Text>
										<Image source={imageUrl ? { uri: place.propriedadeImageURL + "?" } : null} style={styles.logo} />
										<Text style={styles.cardTitle}>Endereço / Comentários</Text>
									</TouchableOpacity>
								</View>
							))}
						</View>
					)}
				</View>
				

				{/* <View style={styles.local}>
					<Text style={styles.text}>Perto de você</Text>

					<View style={styles.locais}>
						<Text style={styles.titulo}>Salto do Itiquira</Text>

						<TouchableOpacity></TouchableOpacity>

						<TouchableOpacity style={styles.local} onPress={() => setModalVisible(true)}>
							<Image style={styles.foto} source={require("../../../assets/salto-do-itiquira.jpg")} />
							<Text style={styles.cardTitle}>Endereço Comentários</Text>
						</TouchableOpacity>
					</View>
				</View> */}

				<View style={styles.content}>
					{filterPlacesByType(ecotourismPlacesNearby, selectedFilter).map((place, _id) => (
						<View key={place._id} style={styles.card}>
							<TouchableOpacity
								key={_id}
								onPress={() => {
									navigation.navigate("Inspect", { screen: "LocalEcotourism", params: { place } });
								}}
							>
								<Text style={styles.cardTitle}>{place.nome_propriedade}</Text>
								<Text style={styles.cardAddress}>{place.endereco}</Text>
								<Text style={styles.cardAddress}>{place.tipo}</Text>
								<Image source={imageUrl ? { uri: place.propriedadeImageURL + "?" } : null} style={styles.logo} />
								<Text style={styles.cardTitle}>Endereço / Comentários</Text>
							</TouchableOpacity>
						</View>
					))}
				</View>
			</ScrollView>
		</View>
	);
}
