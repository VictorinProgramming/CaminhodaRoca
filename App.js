import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decode, encode } from "base-64";
import axios from "axios";
import { SERVER_URL } from "@env";
import {
	ChangePassword,
	EditPerfilImage,
	Ajuda,
	MainScreen,
	Perfil,
	ConfigScreen,
	LoginScreen,
	ForgotPassword,
	RegistrationScreen,
	Maps,
	AboutApp,
	EditRole,
	NewEcotourism,
	NewTrail,
	NewFarm,
	Edit,
	LocalEcotourism,
} from "./src/screens/";

import { LogBox } from "react-native";

if (!global.btoa) {
	global.btoa = encode;
}
if (!global.atob) {
	global.atob = decode;
}

// Tela de carregamento
const LoadingScreen = () => {
	return <View></View>;
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	// Verificar se os campos chamados @key_Password e @key_Email estão vazios ou não, indicando que o login ainda é válido
	const LoginStorage = async () => {
		if ((await AsyncStorage.getItem("@key_Password")) !== "" && (await AsyncStorage.getItem("@key_Email")) !== "") {
			// Faz o logIn baseado nos dados salvos do AsyncStorage
			await axios
				.post(SERVER_URL + "api/login", { email: await AsyncStorage.getItem("@key_Email"), senha: await AsyncStorage.getItem("@key_Password") })
				.then((res) => {
					// Cria a variavel @_userLoggedId acessavel globalmente.
					AsyncStorage.setItem("@_userLoggedId", res.data.userId);
					setUser(true);
					setLoading(false);
				})
				.catch(() => {
					setLoading(false);
					alert("Email e/ou senha incorreto(s)");
				});

			//Para sempre iniciar na tela de login descomente a linha abaixo e comente o POST acima
			// setUser(true);
		} else {
			setLoading(false);
		}
	};

	LogBox.ignoreLogs(['fontFamily "MaterialIcons" is not a system font']);

	useEffect(() => {
		// Executar a função LoginStorage sempre que o aplicativo for aberto
		LoginStorage();
	}, []);

	if (loading) {
		return <LoadingScreen />;
	}

	// Pilha de navegação para todas as telas de configuração
	function ConfigStack({ navigation }) {
		return (
			<Stack.Navigator>
				<Stack.Screen
					name="ConfigScreen"
					component={ConfigScreen}
					options={{
						headerLeft: () => (
							<TouchableOpacity style={{ marginLeft: 20 }} onPress={() => navigation.navigate("Perfil")}>
								<AntDesign name="arrowleft" size={24} color="black" />
							</TouchableOpacity>
						),
						headerStyle: { backgroundColor: "#486607" },
						headerTitleStyle: { color: "white" },
					}}
				/>
				<Stack.Screen
					name="Ajuda"
					component={Ajuda}
					options={{
						// headerLeft: ,
						headerStyle: { backgroundColor: "#486607" },
						headerTitleStyle: { color: "white" },
					}}
				/>
				<Stack.Screen
					name="ChangePassword"
					component={ChangePassword}
					options={{
						// headerLeft: ,
						headerStyle: { backgroundColor: "#486607" },
						headerTitleStyle: { color: "white" },
					}}
				/>
				<Stack.Screen
					name="EditPerfilImage"
					component={EditPerfilImage}
					options={{
						// headerLeft: ,
						headerStyle: { backgroundColor: "#486607" },
						headerTitleStyle: { color: "white" },
					}}
				/>
				<Stack.Screen
					name="AboutApp"
					component={AboutApp}
					options={{
						// headerLeft: ,
						headerStyle: { backgroundColor: "#486607" },
						headerTitleStyle: { color: "white" },
					}}
				/>
				<Stack.Screen
					name="EditRole"
					component={EditRole}
					options={{
						// headerLeft: ,
						headerStyle: { backgroundColor: "#486607" },
						headerTitleStyle: { color: "white" },
					}}
				/>
			</Stack.Navigator>
		);
	}

	// Pilha de navegação para todas as telas de login
	function LoginStack({ navigation }) {
		return (
			<Stack.Navigator>
				<Stack.Screen
					name="LoginScreen"
					component={LoginScreen}
					options={{
						tabBarIcon: ({ color, size }) => <AntDesign name="isv" size={24} color="black" />,
						headerLeft: false,
						headerStyle: { backgroundColor: "#486607" },
						headerTitleStyle: { color: "white" },
					}}
				/>
				<Stack.Screen
					name="Registration"
					component={RegistrationScreen}
					options={{
						tabBarIcon: ({ color, size }) => <AntDesign name="isv" size={24} color="black" />,
						headerLeft: false,
						headerStyle: { backgroundColor: "#486607" },
						headerTitleStyle: { color: "white" },
					}}
				/>
				<Stack.Screen 
				name="ForgotPassword" 
				component={ForgotPassword} 
				options={{
					tabBarIcon: ({ color, size }) => <AntDesign name="isv" size={24} color="black" />,
					headerLeft: false,
					headerStyle: { backgroundColor: "#486607" },
					headerTitleStyle: { color: "white" },
				}}
				/>
			</Stack.Navigator>
		);
	}

	function NewEcotourismStack({ navigation }) {
		return (
			<Stack.Navigator>
				<Stack.Screen
					name="NewEcotourism"
					component={NewEcotourism}
					options={{
						headerLeft: () => (
							<TouchableOpacity style={{ marginLeft: 20 }} onPress={() => navigation.navigate("Perfil")}>
								<AntDesign name="arrowleft" size={24} color="black" />
							</TouchableOpacity>
						),
					}}
				/>
			</Stack.Navigator>
		);
	}

	function Inspect({ navigation }) {
		return (
			<Stack.Navigator>
				<Stack.Screen
					name="LocalEcotourism"
					component={LocalEcotourism}
					options={{
						tabBarStyle: { display: "none" },
						tabBarButton: () => null,
						headerLeft: () => (
							<TouchableOpacity style={{ marginLeft: 20 }} onPress={() => navigation.navigate("MainScreen")}>
								<AntDesign name="arrowleft" size={24} color="black" />
							</TouchableOpacity>
						),
						headerStyle: { backgroundColor: "#486607" },
						headerTitleStyle: { color: "white" },
					}}
				/>
			</Stack.Navigator>
		);
	}

	// Stack Screem for all the screens
	function HomeTab({ navigation }) {
		return (
			<Tab.Navigator>
				<Tab.Screen
					name="MainScreen"
					component={MainScreen}
					options={{
						tabBarIcon: ({ color, size }) => <AntDesign name="home" size={24} color="black" />,
						//headerLeft: false,
						headerStyle: { backgroundColor: "#486607" },
						headerTitleStyle: { color: "white" },
					}}
				/>
				<Tab.Screen
					name="Maps"
					component={Maps}
					options={{
						tabBarIcon: ({ color, size }) => <Ionicons name="map-outline" size={24} color="black" />,
						//headerLeft: false,
						headerStyle: { backgroundColor: "#486607" },
						headerTitleStyle: { color: "white" },
					}}
				/>
				<Tab.Screen
					name="Perfil"
					component={Perfil}
					options={{
						tabBarIcon: ({ color, size }) => <AntDesign name="user" size={24} color="black" />,
						
						headerStyle: { backgroundColor: "#486607" },
						headerTitleStyle: { color: "white" },
					}}
				/>
				<Stack.Screen
					name="ConfigStack"
					component={ConfigStack}
					options={{
						tabBarButton: () => null,
						headerShown: false,
						tabBarStyle: { display: "none" },
					}}
				/>
				<Stack.Screen
					name="NewEcotourism"
					component={NewEcotourism}
					options={{
						tabBarStyle: { display: "none" },
						tabBarButton: () => null,
						headerLeft: () => (
							<TouchableOpacity style={{ marginLeft: 20 }} onPress={() => navigation.navigate("Perfil")}>
								<AntDesign name="arrowleft" size={24} color="black" />
							</TouchableOpacity>
						),
						headerStyle: ({backgroundColor: '#486607'}),
						headerTitleStyle: ({color: 'white'}),
					}}
				/>
				<Stack.Screen
					name="NewTrail"
					component={NewTrail}
					options={{
						tabBarStyle: { display: "none" },
						tabBarButton: () => null,
						headerLeft: () => (
							<TouchableOpacity style={{ marginLeft: 20 }} onPress={() => navigation.navigate("Perfil")}>
								<AntDesign name="arrowleft" size={24} color="black" />
							</TouchableOpacity>
						),
					}}
				/>
				<Stack.Screen
					name="NewFarm"
					component={NewFarm}
					options={{
						tabBarStyle: { display: "none" },
						tabBarButton: () => null,
						headerLeft: () => (
							<TouchableOpacity style={{ marginLeft: 20 }} onPress={() => navigation.navigate("Perfil")}>
								<AntDesign name="arrowleft" size={24} color="black" />
							</TouchableOpacity>
						),
					}}
				/>
				<Stack.Screen
					name="Edit"
					component={Edit}
					options={{
						tabBarStyle: { display: "none" },
						tabBarButton: () => null,
						headerLeft: () => (
							<TouchableOpacity style={{ marginLeft: 20 }} onPress={() => navigation.navigate("Perfil")}>
								<AntDesign name="arrowleft" size={24} color="black" />
							</TouchableOpacity>
						),
						headerStyle: ({backgroundColor: '#486607'}),
						headerTitleStyle: ({color: 'white'}),
					}}
				/>
				<Stack.Screen
					name="Inspect"
					component={Inspect}
					options={{
						tabBarButton: () => null,
						headerShown: false,
						tabBarStyle: { display: "none" },
					}}
				/>
			</Tab.Navigator>
		);
	}

	return (
		<NavigationContainer>
			<Stack.Navigator>
				{/* A validação se o usuário é válido, se válido, mostra a StackScreen HomeTab */}
				{user ? (
					<Stack.Screen name="HomeTab" component={HomeTab} options={{ headerShown: false }} />
				) : (
					<>
						{/* if the user is not valid it displays the LoginStack and then HomeTab */}
						<Stack.Screen name="LoginStack" component={LoginStack} options={{ headerShown: false }}></Stack.Screen>
						<Stack.Screen name="HomeTab" component={HomeTab} options={{ headerShown: false }} />
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}

