import React, { useEffect, useState } from "react";
import { Text, View, BackHandler, ScrollView, Image, TouchableOpacity, Modal, TextInput } from "react-native";
import styles from "./style";
import { useRoute } from "@react-navigation/native";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_URL } from "@env";

export default function LocalEcotourism({ navigation }) {
	const route = useRoute();
	const { place } = route.params;

	const [userId, setUserId] = useState(false);

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [newComment, setNewComment] = useState("");
	const [updatedPlace, setUpdatedPlace] = useState(place);

	const [selectedCommentIndex, setSelectedCommentIndex] = useState(null);
	const [optionsVisible, setOptionsVisible] = useState(false);

	useEffect(() => {
		// Obtenha o ID do usuário logado a partir do armazenamento async
		AsyncStorage.getItem("@_userLoggedId").then((id) => {
			setUserId(id);
		});
	}, []);

	useEffect(() => {
		const backAction = () => {
			navigation.navigate("MainScreen");
			return true;
		};
		const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
		return () => backHandler.remove();
	}, []);

	const toggleModal = () => {
		setIsModalVisible(!isModalVisible);
	};

	const firstFiveComments = place.comments.slice(0, 3); // Pega os primeiros 3 comentários

	const addComment = async () => {
		// Verifique se o novo comentário não está em branco
		if (newComment.trim() === "") {
			return;
		}

		// Crie um objeto para o novo comentário
		const newCommentObject = {
			text: newComment,
			comment_user_id: userId,
			active: "true",
		};

		try {
			// Pega o ID do ecoturismo selecionado
			const idEcotourism = updatedPlace._id;

			// Envie uma solicitação POST para adicionar o novo comentário
			await axios.post(SERVER_URL + `api/new_ecotourism/add_comment/${idEcotourism}`, newCommentObject);

			// Atualiza os comentários com o novo comentário
			const updatedComments = [...updatedPlace.comments, newCommentObject];

			// Fecha o modal e redefina o estado do novo comentário
			toggleModal();
			setNewComment("");
			setUpdatedPlace({ ...updatedPlace, comments: updatedComments });
			setOptionsVisible(false);
		} catch (error) {
			console.error("Error adding comment:", error);
		}
	};

	const disableComment = async (commentId) => {
		try {
			// Pega o ID do comentario selecionado
			const idEcotourism = updatedPlace._id;

			// Manda a requisição POST para disabilitar o comentário
			await axios.post(`${SERVER_URL}api/new_ecotourism/disable_comment/${idEcotourism}/${commentId}`);

			// Update o commentario status 'active' no 'updatedPlace'
			const updatedComments = updatedPlace.comments.map((comment) => {
				if (comment._id === commentId) {
					return { ...comment, active: false };
				}
				return comment;
			});

			setUpdatedPlace({ ...updatedPlace, comments: updatedComments });

			setOptionsVisible(!optionsVisible);
		} catch (error) {
			console.error("Error disabling comment:", error);
		}
	};

	return (
		<View style={styles.container}>
			<ScrollView>
				<View style={styles.card}>
					<Text style={styles.cardTitle}>{place.nome_propriedade}</Text>
					<TouchableOpacity style={styles.starIcon}>
						<Feather name="star" size={24} color="black" />
					</TouchableOpacity>

					<View style={styles.imageContainer}>
						{place.propriedadeImageURL.map((imageUrl, index) => (
							<Image key={index} source={{ uri: imageUrl }} style={styles.cardImage} />
						))}
					</View>

					<Text>
						Location: {place.endereco}, {place.bairro}, {place.municipio}, {place.sigla_uf}
					</Text>
				</View>
				<View style={styles.card}>
					<View style={styles.commentsContainer}>
						<TouchableOpacity onPress={toggleModal}>
							<Text style={styles.commentsTitle}>Comments</Text>
							<FontAwesome5 name="comment-alt" size={24} color="black" />
						</TouchableOpacity>

						{firstFiveComments.map((comment, index) => (
							<View key={index} style={styles.commentContainer}>
								{comment.active === "true" && (
									<TouchableOpacity
										onPress={() => setSelectedCommentIndex(index)} // Set the selected comment index
										style={{ flexDirection: "row", alignItems: "center" }}
									>
										<Text style={styles.commentUserId}>User ID: {comment.comment_user_id}</Text>
										<Text style={styles.commentText}>{comment.text}</Text>
									</TouchableOpacity>
								)}

								{selectedCommentIndex === index && comment.comment_user_id === userId && (
									<TouchableOpacity onPress={() => setOptionsVisible(!optionsVisible)}>
										<Feather name="edit" size={24} color="black" />
									</TouchableOpacity>
								)}
								{optionsVisible && selectedCommentIndex === index && comment.comment_user_id === userId && (
									<View style={styles.commentOptions}>
										<TouchableOpacity onPress={() => disableComment(comment._id)}>
											<Text style={styles.commentOptionText}>Excluir</Text>
										</TouchableOpacity>
										<TouchableOpacity onPress={() => console.log("Cancelar index:", index)}>
											<Text style={styles.commentOptionText}>Cancelar</Text>
										</TouchableOpacity>
									</View>
								)}
							</View>
						))}
					</View>

					<Modal visible={isModalVisible} animationType="slide">
						<View style={styles.modalContainer}>
							<Text style={styles.modalTitle}>Comments</Text>

							{place.comments
								.filter((comment) => comment.active === "true")
								.map((comment, index) => (
									<View key={index} style={styles.commentContainer}>
										<TouchableOpacity
											onPress={() => setSelectedCommentIndex(index)} // Set the selected comment index
											style={{ flexDirection: "row", alignItems: "center" }}
										>
											<Text style={styles.commentUserId}>User ID: {comment.comment_user_id}</Text>
											<Text style={styles.commentText}>{comment.text}</Text>
										</TouchableOpacity>
										{selectedCommentIndex === index && comment.comment_user_id === userId && (
											<TouchableOpacity onPress={() => setOptionsVisible(!optionsVisible)}>
												<Feather name="edit" size={24} color="black" />
											</TouchableOpacity>
										)}
										{optionsVisible && selectedCommentIndex === index && comment.comment_user_id === userId && (
											<View style={styles.commentOptions}>
												<TouchableOpacity onPress={() => disableComment(comment._id)}>
													<Text style={styles.commentOptionText}>Excluir</Text>
												</TouchableOpacity>
												<TouchableOpacity onPress={() => console.log("Cancelar index:", index)}>
													<Text style={styles.commentOptionText}>Cancelar</Text>
												</TouchableOpacity>
											</View>
										)}
									</View>
								))}

							<TextInput placeholder="Novo Comentário" value={newComment} onChangeText={(text) => setNewComment(text)} style={styles.commentInput} />

							<TouchableOpacity onPress={addComment}>
								<Text style={styles.addCommentButton}>Add Comment</Text>
							</TouchableOpacity>

							<TouchableOpacity onPress={toggleModal}>
								<Text style={styles.closeModalButton}>Close</Text>
							</TouchableOpacity>
						</View>
					</Modal>
				</View>
			</ScrollView>
		</View>
	);
}