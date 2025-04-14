import { useNavigate, Link } from "react-router";

const Categories = () => {

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
        <h2 className="fr-h3 fr-mr-auto">Gestion des Catégories</h2>
        <button className="fr-btn fr-btn--primary fr-ml-auto" onClick={handleCreate}>Ajouter une Catégorie</button>
    </div>
    
    <div className="fr-table fr-table--full fr-mt-2w">
        <table className="fr-table">
            <thead>
            <tr>
                <th style={{ width: '15%' }}>Nom</th>
                <th style={{ width: '55%' }}>Description</th>
                <th style={{ width: '26%' }}>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Politique</td>
                <td>Catégorie liée aux réformes gouvernementales et aux politiques publiques.</td>
                <td>
                <div className="fr-btns-group fr-btns-group--inline">
                    <button className="fr-btn fr-btn--secondary fr-btn--sm fr-mr-2w" onClick={handleEdit}>Modifier</button>
                    <button className="fr-btn fr-btn--tertiary fr-btn--sm">Supprimer</button>
                </div>
                </td>
            </tr>
            <tr>
                <td>Santé</td>
                <td>Catégorie couvrant les sujets liés à la santé et au bien-être.</td>
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

export default Categories;
  