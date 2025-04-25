import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra?.API_URL;

export const fetchRessourceById = async (id: string, token: string) => {
  try {
    const response = await fetch(`${API_URL}/ressources/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch ressource");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching ressource:", error);
    throw error;
  }
};

export const fetchAllRessources = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/ressources/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in fetchAllRessources:", error);
    throw error;
  }
};

export const createRessource = async (data: any, token: string) => {
  try {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("type", data.type);
    formData.append("createdBy", data.createdBy);
    formData.append("categoryId", data.categoryId);
    formData.append("quiz", JSON.stringify(data.quiz));

    if (data.image) {
      formData.append("image", {
        uri: data.image.uri,
        name: data.image.fileName || "image.jpg",
        type: data.image.type || "image/jpeg",
      } as any);
    }

    if (data.file) {
      formData.append("file", {
        uri: data.file.uri,
        name: data.file.name || "document.pdf",
        type: "application/pdf",
      } as any);
    }

    const response = await fetch(`${API_URL}/ressources`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const contentType = response.headers.get("Content-Type");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
    }

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      throw new Error("Unexpected response format: Not JSON");
    }
  } catch (error) {
    console.error("Error in createRessource:", error);
    throw error;
  }
};

export const getUserResourcesCount = async (
  userId: string,
  token: string
): Promise<number> => {
  try {
    const allResources = await fetchAllRessources(token);
    const userResources = allResources.filter(
      (resource) => resource.createdBy?._id === userId
    );
    return userResources.length;
  } catch (error) {
    console.error("Error in getUserResourcesCount:", error);
    throw error;
  }
};

export const fetchRessourcesByUser = async (userId: string) => {
  try {
    const response = await fetch(`${API_URL}/ressources?createdBy=${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in fetchRessourcesByUser:", error);
    throw error;
  }
};

export const updateRessource = async (
  id: string,
  data: {
    title: string;
    content: string;
    categoryId: string;
    quiz: { questions: any[] };
  },
  token: string
) => {
  try {
    const response = await fetch(`${API_URL}/ressources/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in updateRessource:", error);
    throw error;
  }
};
