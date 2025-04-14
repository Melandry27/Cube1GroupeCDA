import { useNavigate, Link } from "react-router";

const Ressources = () => {

  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("create");
  };

  const handleEdit = () => {
    navigate("edit/${id}");
  };

  return (
    <>
      <div className="fr-grid-row fr-grid-row--middle fr-grid-row--between fr-mb-4w">
        <h2 className="fr-h3 fr-mr-auto">Gestion des Ressources</h2>
        <button className="fr-btn fr-btn--primary fr-ml-auto" onClick={handleCreate}>Ajouter une Ressource</button>
      </div>
      
      <div className="fr-table fr-table--full fr-mt-2w">
        <table className="fr-table">
            <thead>
            <tr>
                <th>Titre</th>
                <th>Auteur</th>
                <th>Dernier commentaire</th>
                <th>Catégorie</th>
                <th>Statut</th>
                <th>Date de publication</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Réforme de la Santé</td>
                <td>Jean Dupont</td>
                <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sequi deleniti impedit non voluptatem, quibusdam quas nam corporis ex qui vero dolorem soluta nobis illo debitis! Neque, veritatis. Vel, eos. </td>
                <td>Politique</td>
                <td>Publié</td>
                <td>01/04/2024</td>
                <td>
                  <div className="fr-btns-group fr-btns-group--inline">
                    <button className="fr-btn fr-btn--secondary fr-btn--sm fr-mr-2w" onClick={handleEdit}>Modifier</button>
                    <button className="fr-btn fr-btn--tertiary fr-btn--sm">Supprimer</button>
                  </div>
                </td>
            </tr>
            <tr>
                <td>Vaccination 2024</td>
                <td>Marie Curie</td>
                <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sequi deleniti impedit non voluptatem, quibusdam quas nam corporis ex qui vero dolorem soluta nobis illo debitis! Neque, veritatis. Vel, eos. </td>
                <td>Santé</td>
                <td>En attente</td>
                <td>30/03/2024</td>
                <td>
                  <div className="fr-btns-group fr-btns-group--inline">
                    <button className="fr-btn fr-btn--secondary fr-btn--sm fr-mr-2w" onClick={handleEdit}>Modifier</button>
                    <button className="fr-btn fr-btn--tertiary fr-btn--sm">Supprimer</button>
                  </div>
                </td>
            </tr>
            </tbody>
        </table>
      </div>
    </>
  );
};

export default Ressources;
