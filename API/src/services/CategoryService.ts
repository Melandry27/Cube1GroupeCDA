import * as CategoryDatabase from "../database/CategoryDatabase";
import { CategoryInput, ICategory } from "../models/Category";

export const create = async (
  categoryData: CategoryInput
): Promise<ICategory> => {
  return CategoryDatabase.create(categoryData);
};

export const getAll = async (): Promise<ICategory[]> => {
  return CategoryDatabase.findAll();
};

export const getById = async (id: string): Promise<ICategory | null> => {
  return CategoryDatabase.findById(id);
};

export const update = async (
  id: string,
  updateData: Partial<ICategory>
): Promise<ICategory | null> => {
  return CategoryDatabase.update(id, updateData);
};

export const remove = async (id: string): Promise<ICategory | null> => {
  return CategoryDatabase.remove(id);
};

export const getCategoryByIdOrCreateOne = async (
  categoryId: string
): Promise<ICategory> => {
  const category = await CategoryDatabase.findById(categoryId);

  if (category) {
    return category;
  } else {
    let defaultCategoryData = await CategoryDatabase.getBySlug("default");
    if (!defaultCategoryData) {
      const defaultCategory = {
        name: "Default",
        slug: "default",
        description: "Default category",
        color: "#777",
      };

      defaultCategoryData = await CategoryDatabase.create(defaultCategory);
    }

    return defaultCategoryData;
  }
};

export const generate10Categories = async (): Promise<ICategory[]> => {
  const categories = [
    {
      name: "Technologie",
      slug: "technology",
      description:
        "Dernières innovations et tendances en matière de technologie.",
      color: "#FFD966", // Jaune doux
    },
    {
      name: "Santé et Bien-être",
      slug: "health-wellness",
      description:
        "Articles et conseils sur la santé, la nutrition et le bien-être.",
      color: "#B6D7A8", // Vert clair
    },
    {
      name: "Voyages",
      slug: "travel",
      description:
        "Destinations de rêve, conseils de voyage et récits d'aventures.",
      color: "#9FC5E8", // Bleu pastel
    },
    {
      name: "Mode",
      slug: "fashion",
      description: "Les dernières tendances mode et conseils style.",
      color: "#F4CCCC", // Rose très clair
    },
    {
      name: "Cuisine",
      slug: "cooking",
      description:
        "Recettes, techniques culinaires et découvertes gastronomiques.",
      color: "#FCE5CD", // Pêche clair
    },
    {
      name: "Éducation",
      slug: "education",
      description:
        "Ressources pédagogiques, formations et articles pour les étudiants.",
      color: "#D9D2E9", // Lavande pâle
    },
    {
      name: "Sports",
      slug: "sports",
      description:
        "Actualités sportives, conseils d'entraînement et performances des athlètes.",
      color: "#CFE2F3", // Bleu ciel très clair
    },
    {
      name: "Arts et Culture",
      slug: "arts-culture",
      description:
        "Exploration de l'art, de la culture et des événements créatifs.",
      color: "#EAD1DC", // Rose lilas
    },
    {
      name: "Finance Personnelle",
      slug: "personal-finance",
      description:
        "Conseils pour gérer vos finances, investir et économiser efficacement.",
      color: "#D9EAD3", // Vert amande
    },
    {
      name: "Développement Personnel",
      slug: "personal-development",
      description:
        "Articles et ressources pour améliorer vos compétences et atteindre vos objectifs.",
      color: "#FFF2CC", // Beige jaune clair
    },
  ];

  return Promise.all(
    categories.map((category) => CategoryDatabase.create(category))
  );
};
