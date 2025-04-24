import Constants from "expo-constants";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import { useAuth } from "../../../context/AuthContext";
import CommentBar from "../../components/CommentBar";
import Comments from "../../components/Comments";
import FavorisButton from "../../components/FavorisButton";
import Title from "../../components/Title";
import { fetchCategoriesById } from "../../services/categoriesService";
import { createComment } from "../../services/commentsService";
import { fetchRessourceById } from "../../services/ressourcesService";

const API_URL_IMAGE = Constants.expoConfig?.extra?.API_URL_IMAGE;

export default function RessourceDetail() {
  const { id } = useLocalSearchParams();
  const [ressource, setRessource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const [showPdf, setShowPdf] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizResults, setQuizResults] = useState({});

  const { token, user } = useAuth();

  const handleCommentSubmit = (comment) => {
    createComment(ressource?._id, comment, user?._id, token || "");
  };

  useEffect(() => {
    const loadRessource = async () => {
      if (!id) {
        console.error("L'id de la ressource n'existe pas");
        return;
      }
      try {
        const data = await fetchRessourceById(String(id), token || "");
        const category = await fetchCategoriesById(
          data.categoryId,
          token || ""
        );
        setRessource(data);
        setCategory(category);
      } catch (error) {
        console.error("Erreur lors de la récupération de la ressource:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRessource();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000091" />
        <Text style={styles.loadingText}>Chargement de la ressource...</Text>
      </View>
    );
  }

  if (!ressource) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          Aucune ressource trouvée pour cet ID.
        </Text>
      </View>
    );
  }

  const handleSelectAnswer = (questionIndex, optionText) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionText,
    }));
  };

  const togglePdf = () => setShowPdf((prev) => !prev);

  const calculateProgress = () => {
    const totalQuestions = ressource.quiz?.length || 0;
    const answeredQuestions = Object.keys(userAnswers).length;
    return (answeredQuestions / totalQuestions) * 100;
  };

  const progress = calculateProgress();

  const handleValidateAnswers = () => {
    const updatedResults = {};

    ressource.quiz.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      // Trouver l'option correcte
      const correctOption = question.options.find((option) => option.isCorrect);

      if (userAnswer === correctOption?.text) {
        updatedResults[index] = true; // Réponse correcte
      } else {
        updatedResults[index] = false; // Réponse incorrecte
      }
    });

    setQuizResults(updatedResults);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.container}>
          <Title size={"medium"} style={styles.titleWidth}>
            {ressource.title}
          </Title>

          {ressource.quiz && ressource.quiz.length > 0 && (
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>
                {Math.round(progress)}% Complété
              </Text>
              <View style={styles.progressBarBackground}>
                <View style={[styles.progressBar, { width: `${progress}%` }]} />
              </View>
            </View>
          )}

          <Text
            style={[
              styles.categoryTag,
              { backgroundColor: category?.color || "#f0f0f0", color: "#fff" },
            ]}
          >
            {category?.name || "Catégorie inconnue"}
          </Text>

          <FavorisButton ressourceId={ressource._id} />

          {ressource.image && (
            <Image
              source={{ uri: `${API_URL_IMAGE}/${ressource.image}` }}
              style={styles.image}
            />
          )}

          <Text style={styles.text}>{ressource.content}</Text>

          <Text style={styles.author}>
            {ressource.createdBy?.name || "Utilisateur inconnu"}
          </Text>

          {ressource.file && (
            <View style={styles.pdfContainer}>
              <Text style={styles.sectionTitle}>Document :</Text>
              <TouchableOpacity style={styles.badge} onPress={togglePdf}>
                <Text style={styles.badgeText}>
                  {ressource.file.originalName}
                </Text>
              </TouchableOpacity>

              {showPdf && (
                <View style={{ height: 400, marginTop: 10 }}>
                  <WebView
                    originWhitelist={["*"]}
                    source={{
                      uri: `${API_URL_IMAGE}/${ressource.file.path.replace(
                        /\\/g,
                        "/"
                      )}`,
                    }}
                    style={{ flex: 1 }}
                    startInLoadingState
                    renderLoading={() => (
                      <ActivityIndicator size="large" color="#000091" />
                    )}
                  />
                </View>
              )}
            </View>
          )}

          {ressource.quiz && ressource.quiz.length > 0 && (
            <View style={styles.quizContainer}>
              <Text style={styles.sectionTitle}>Quiz</Text>

              {ressource.quiz.map((question, index) => (
                <View key={index} style={styles.questionContainer}>
                  <Text style={styles.questionText}>
                    {index + 1}. {question.text}
                  </Text>
                  {question.options.map((option, optIndex) => {
                    const isSelected = userAnswers[index] === option.text;
                    const hasResults = quizResults[index] !== undefined;
                    const isCorrect = quizResults[index] === true && isSelected;
                    const isIncorrect =
                      quizResults[index] === false && isSelected;

                    let optionStyle = styles.optionContainer;
                    if (isSelected) {
                      if (hasResults) {
                        optionStyle = isCorrect
                          ? styles.correctOption
                          : styles.incorrectOption;
                      } else {
                        optionStyle = styles.selectedOption;
                      }
                    }

                    return (
                      <TouchableOpacity
                        key={optIndex}
                        style={optionStyle}
                        onPress={() =>
                          !hasResults && handleSelectAnswer(index, option.text)
                        }
                        disabled={hasResults} // Désactive après validation
                      >
                        <Text style={styles.optionText}>
                          {isSelected ? "✓ " : "• "}
                          {option.text}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}

              <TouchableOpacity
                onPress={handleValidateAnswers}
                style={[
                  styles.submitButton,
                  progress < 100 && styles.disabledButton,
                ]}
                disabled={progress < 100}
              >
                <Text style={styles.submitButtonText}>
                  Valider les réponses
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {token && (
            <CommentBar
              ressourceId={ressource._id}
              onSubmit={handleCommentSubmit}
            />
          )}

          <Comments ressourceId={ressource._id} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  text: {
    fontSize: 18,
    lineHeight: 26,
    marginVertical: 15,
  },
  author: {
    fontSize: 16,
    fontStyle: "italic",
    backgroundColor: "#f0f0f0",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 10,
  },
  categoryTag: {
    fontSize: 16,
    fontStyle: "italic",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 15,
  },
  titleWidth: {
    width: "80%",
  },
  image: {
    width: "100%",
    height: 200,
    marginVertical: 20,
    borderRadius: 8,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#000091",
  },
  errorText: {
    fontSize: 16,
    color: "#D10000",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  pdfContainer: {
    marginTop: 10,
    marginBottom: 30,
  },
  badge: {
    backgroundColor: "#000091",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  badgeText: {
    color: "#fff",
    fontSize: 14,
  },
  quizContainer: {
    marginTop: 20,
    paddingBottom: 30,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  optionContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  optionText: {
    fontSize: 15,
  },
  selectedOption: {
    backgroundColor: "#d1e7ff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#88bbff",
  },
  correctOption: {
    backgroundColor: "#ccffcc",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#88dd88",
  },
  incorrectOption: {
    backgroundColor: "#ffcccc",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#dd8888",
  },
  progressContainer: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  progressText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  progressBarBackground: {
    width: "100%",
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    marginTop: 5,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#000091",
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: "#000091",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "#ccccdd",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
