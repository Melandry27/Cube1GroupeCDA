import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { Stack } from "expo-router/stack";
import React, { useEffect, useState } from "react";
import {
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
import { useAuth } from "../../../context/AuthContext";
import { fetchCategories } from "../../services/categoriesService";
import { createRessource } from "../../services/ressourcesService";

export const unstable_settings = {
  initialRouteName: "createRessource",
};

export const ScreenOptions = () => (
  <Stack.Screen
    name="createRessource"
    options={{
      title: "Créer une ressource",
      presentation: "modal",
    }}
  />
);

const CreateRessource = () => {
  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    image: ImagePicker.ImagePickerAsset | null;
    file: DocumentPicker.DocumentPickerResult | null;
    categoryId: string;
    categories: { _id: string; name: string }[];
    quiz: {
      questions: {
        text: string;
        options: { text: string; isCorrect: boolean }[];
      }[];
    };
  }>({
    title: "",
    content: "",
    image: null,
    file: null,
    categoryId: "",
    categories: [],
    quiz: {
      questions: [
        {
          text: "",
          options: [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
          ],
        },
      ],
    },
  });

  const router = useRouter();
  const { user, token } = useAuth();

  useEffect(() => {
    const _fetchCategories = async () => {
      try {
        const categories = await fetchCategories(token || "");
        setFormData((prev) => ({
          ...prev,
          categories,
          categoryId: categories.length > 0 ? categories[0]._id : "",
        }));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (token) {
      _fetchCategories();
    }
  }, [token]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagePick = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission requise", "Autorisez l'accès à la galerie.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setFormData((prev) => ({ ...prev, image: result.assets[0] }));
    }
  };

  const handleSubmit = async () => {
    try {
      if (!formData.title.trim() || !formData.content.trim()) {
        Alert.alert("Champs requis", "Veuillez remplir tous les champs.");
        return;
      }

      await createRessource(
        {
          title: formData.title,
          content: formData.content,
          type: "In Progress",
          createdBy: user?._id,
          categoryId: formData.categoryId,
          image: formData.image,
          file: formData.file,
          quiz: formData.quiz,
        },
        token || ""
      );

      Alert.alert("Succès", "La ressource a été créée.");
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Erreur", error.message);
      } else {
        Alert.alert("Erreur inconnue", "Une erreur est survenue.");
      }
    }
  };

  const handleFilePick = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      setFormData((prev) => ({ ...prev, file: result }));
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

  const updateQuestionText = (qIndex: number, text: string) => {
    const questions = [...formData.quiz.questions];
    questions[qIndex].text = text;
    setFormData((prev) => ({ ...prev, quiz: { questions } }));
  };

  const updateOptionText = (qIndex: number, oIndex: number, text: string) => {
    const questions = [...formData.quiz.questions];
    questions[qIndex].options[oIndex].text = text;
    setFormData((prev) => ({ ...prev, quiz: { questions } }));
  };

  const toggleCorrect = (qIndex: number, oIndex: number) => {
    const questions = [...formData.quiz.questions];
    questions[qIndex].options = questions[qIndex].options.map(
      (option, idx) => ({
        ...option,
        isCorrect: idx === oIndex, // une seule bonne réponse par question
      })
    );
    setFormData((prev) => ({ ...prev, quiz: { questions } }));
  };

  const addOption = (qIndex: number) => {
    const questions = [...formData.quiz.questions];
    if (questions[qIndex].options.length < 4) {
      questions[qIndex].options.push({ text: "", isCorrect: false });
      setFormData((prev) => ({ ...prev, quiz: { questions } }));
    }
  };

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
        <Text style={styles.title}>Créer une nouvelle ressource</Text>

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
            value={formData.categoryId} // string uniquement
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

        <View style={styles.field}>
          <Text style={styles.label}>Image</Text>
          <TouchableOpacity
            style={styles.imageButton}
            onPress={handleImagePick}
          >
            <Text style={styles.imageButtonText}>Choisir une image</Text>
          </TouchableOpacity>
          {formData.image && (
            <Image
              source={{ uri: formData.image.uri }}
              style={styles.previewImage}
            />
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Fichier PDF</Text>
          <TouchableOpacity style={styles.imageButton} onPress={handleFilePick}>
            <Text style={styles.imageButtonText}>Choisir un fichier PDF</Text>
          </TouchableOpacity>
          {formData.file && (
            <Text style={{ marginTop: 10 }}>{formData.file?.name}</Text>
          )}
        </View>

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
          <Text style={styles.buttonText}>Créer la ressource</Text>
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
  imageButton: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  imageButtonText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
  },
  previewImage: {
    marginTop: 10,
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#000091",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
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
  pickerPlaceholder: {
    color: "#666",
  },
  pickerView: {
    backgroundColor: "#fff",
    borderColor: "#CECECE",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#161616",
  },
  pickerText: {
    color: "#161616",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default CreateRessource;
