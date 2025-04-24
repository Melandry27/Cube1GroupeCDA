import Constants from "expo-constants";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Stack } from "expo-router/stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useAuth } from "../../../../context/AuthContext";
import { fetchCategories } from "../../../services/categoriesService";
import {
  fetchRessourceById,
  updateRessource,
} from "../../../services/ressourcesService";

export const unstable_settings = {
  initialRouteName: "updateRessource",
};

export const ScreenOptions = () => (
  <Stack.Screen
    name="updateRessource"
    options={{
      title: "Modifier une ressource",
      presentation: "modal",
    }}
  />
);

const API_URL_IMAGE = Constants.expoConfig?.extra?.API_URL_IMAGE;

const UpdateRessource = () => {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
    file: null,
    categoryId: "",
    categories: [],
    quiz: {
      questions: [],
    },
  });

  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const categories = await fetchCategories(token || "");

        const ressourceData = await fetchRessourceById(String(id), token || "");

        const formattedQuiz = {
          questions: ressourceData.quiz
            ? ressourceData.quiz.map((q) => ({
                text: q.text,
                options: q.options.map((opt) => ({
                  text: opt.text,
                  isCorrect: opt.isCorrect,
                })),
              }))
            : [],
        };

        setFormData({
          title: ressourceData.title || "",
          content: ressourceData.content || "",
          image: ressourceData.image || null,
          file: ressourceData.file || null,
          categoryId: ressourceData.categoryId || "",
          categories: categories || [],
          quiz: formattedQuiz,
        });
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        Alert.alert(
          "Erreur",
          "Impossible de charger les données de la ressource"
        );
      } finally {
        setLoading(false);
      }
    };

    if (token && id) {
      loadData();
    }
  }, [token, id]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await updateRessource(
        String(id),
        {
          title: formData.title,
          content: formData.content,
          categoryId: formData.categoryId,
          quiz: formData.quiz,
        },
        token || ""
      );

      Alert.alert("Succès", "La ressource a été mise à jour avec succès.");
      router.push('(main)');
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Erreur", error.message);
      } else {
        Alert.alert(
          "Erreur inconnue",
          "Une erreur est survenue lors de la mise à jour."
        );
      }
    }
  };

  const updateQuestionText = (qIndex: number, text: string) => {
    const newQuestions = [...formData.quiz.questions];
    newQuestions[qIndex].text = text;
    setFormData((prev) => ({ ...prev, quiz: { questions: newQuestions } }));
  };

  const updateOptionText = (qIndex: number, oIndex: number, text: string) => {
    const newQuestions = [...formData.quiz.questions];
    newQuestions[qIndex].options[oIndex].text = text;
    setFormData((prev) => ({ ...prev, quiz: { questions: newQuestions } }));
  };

  const toggleCorrect = (qIndex: number, oIndex: number) => {
    const newQuestions = [...formData.quiz.questions];
    newQuestions[qIndex].options = newQuestions[qIndex].options.map(
      (option, idx) => ({
        ...option,
        isCorrect: idx === oIndex, // une seule bonne réponse par question
      })
    );
    setFormData((prev) => ({ ...prev, quiz: { questions: newQuestions } }));
  };

  const addOption = (qIndex: number) => {
    const newQuestions = [...formData.quiz.questions];
    if (newQuestions[qIndex].options.length < 4) {
      newQuestions[qIndex].options.push({ text: "", isCorrect: false });
      setFormData((prev) => ({ ...prev, quiz: { questions: newQuestions } }));
    }
  };

  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      quiz: {
        questions: [
          ...prev.quiz.questions,
          {
            text: "",
            options: [
              { text: "", isCorrect: false },
              { text: "", isCorrect: false },
            ],
          },
        ],
      },
    }));
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000091" />
        <Text style={styles.loadingText}>Chargement des données...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Modifier la ressource</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Titre *</Text>
          <TextInput
            style={styles.input}
            value={formData.title}
            onChangeText={(value) => handleChange("title", value)}
            placeholder="Entrez le titre"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Contenu *</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            value={formData.content}
            onChangeText={(value) => handleChange("content", value)}
            placeholder="Entrez la description"
            placeholderTextColor="#666"
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Catégorie</Text>
          <RNPickerSelect
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, categoryId: value }))
            }
            value={formData.categoryId}
            placeholder={{ label: "Sélectionner une catégorie", value: "" }}
            items={(formData.categories || []).map((category) => ({
              label: category.name,
              value: category._id,
            }))}
            style={{
              inputIOS: styles.pickerInput,
              inputAndroid: styles.pickerInput,
              iconContainer: { top: 10, right: 12 },
            }}
            useNativeAndroidPickerStyle={false}
            Icon={() => (
              <View style={{ marginRight: 10 }}>
                <Text style={{ fontSize: 18, color: "#666" }}>▼</Text>
              </View>
            )}
          />
        </View>

        {formData.image && (
          <View style={styles.field}>
            <Text style={styles.label}>Image actuelle</Text>
            <Image
              source={{ uri: `${API_URL_IMAGE}/${formData.image}` }}
              style={styles.previewImage}
            />
            <Text style={styles.infoText}>
              L'image ne peut pas être modifiée ici
            </Text>
          </View>
        )}

        {formData.file && (
          <View style={styles.field}>
            <Text style={styles.label}>Fichier PDF actuel</Text>
            <View style={styles.fileContainer}>
              <Text style={styles.fileText}>
                {formData.file.originalName || "Document PDF"}
              </Text>
            </View>
            <Text style={styles.infoText}>
              Le fichier PDF ne peut pas être modifié ici
            </Text>
          </View>
        )}

        <View style={styles.field}>
          <Text style={styles.label}>Quiz (jusqu'à 4 questions)</Text>
          {formData.quiz.questions.map((question, qIndex) => (
            <View key={qIndex} style={{ marginBottom: 20 }}>
              <TextInput
                style={styles.input}
                placeholder={`Question ${qIndex + 1}`}
                value={question.text}
                onChangeText={(text) => updateQuestionText(qIndex, text)}
              />
              {question.options.map((option, oIndex) => (
                <View
                  key={oIndex}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 8,
                  }}
                >
                  <TextInput
                    style={[styles.input, { flex: 1, marginRight: 8 }]}
                    placeholder={`Option ${oIndex + 1}`}
                    value={option.text}
                    onChangeText={(text) =>
                      updateOptionText(qIndex, oIndex, text)
                    }
                  />
                  <TouchableOpacity
                    onPress={() => toggleCorrect(qIndex, oIndex)}
                    style={{
                      backgroundColor: option.isCorrect ? "#4CAF50" : "#ccc",
                      padding: 8,
                      borderRadius: 4,
                    }}
                  >
                    <Text style={{ color: "#fff" }}>✔</Text>
                  </TouchableOpacity>
                </View>
              ))}
              {question.options.length < 4 && (
                <TouchableOpacity onPress={() => addOption(qIndex)}>
                  <Text style={{ color: "#000091", marginTop: 8 }}>
                    + Ajouter une option
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
          {formData.quiz.questions.length < 4 && (
            <TouchableOpacity onPress={addQuestion}>
              <Text style={{ color: "#000091" }}>+ Ajouter une question</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Mettre à jour la ressource</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F5F5FE",
    flexGrow: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5FE",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#000091",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    color: "#161616",
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000091",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#CECECE",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#161616",
  },
  textarea: {
    height: 120,
    textAlignVertical: "top",
  },
  previewImage: {
    marginTop: 10,
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  infoText: {
    marginTop: 8,
    color: "#666",
    fontStyle: "italic",
  },
  fileContainer: {
    backgroundColor: "#E0E0E0",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  fileText: {
    color: "#000",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#000091",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  pickerInput: {
    backgroundColor: "#fff",
    borderColor: "#CECECE",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#161616",
  },
});

export default UpdateRessource;
