import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Janvier', utilisateurs: 400, articles: 240, commentaires: 100 },
  { name: 'Février', utilisateurs: 300, articles: 139, commentaires: 80 },
  { name: 'Mars', utilisateurs: 200, articles: 980, commentaires: 130 },
  { name: 'Avril', utilisateurs: 278, articles: 390, commentaires: 200 },
  { name: 'Mai', utilisateurs: 189, articles: 480, commentaires: 170 },
];

const pieData = [
  { name: 'Administrateurs', value: 10 },
  { name: 'Éditeurs', value: 25 },
  { name: 'Utilisateurs', value: 65 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const StatsAvancees = () => {
  return (
    <>
      <div className="fr-grid-row fr-grid-row--middle fr-grid-row--between fr-mb-4w">
        <h2 className="fr-h3 fr-mr-auto">Statistiques Avancées</h2>
      </div>
      
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-12 fr-col-md-6">
          <h3 className="fr-h5">Évolution des utilisateurs et articles</h3>
          <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="utilisateurs" stroke="#8884d8" />
            <Line type="monotone" dataKey="articles" stroke="#82ca9d" />
          </LineChart>
        </div>

        <div className="fr-col-12 fr-col-md-6">
          <h3 className="fr-h5">Nombre de commentaires par mois</h3>
          <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="commentaires" fill="#ffc658" />
          </BarChart>
        </div>

        <div className="fr-col-12 fr-col-md-6">
          <h3 className="fr-h5">Répartition des rôles</h3>
          <PieChart width={400} height={300}>
            <Pie data={pieData} cx={200} cy={150} outerRadius={80} fill="#8884d8" dataKey="value" label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div className="fr-col-12 fr-col-md-6">
          <h3 className="fr-h5">Évolution du taux d'engagement</h3>
          <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="commentaires" stroke="#FF5733" />
          </LineChart>
        </div>
      </div>
    </>
  );
};

export default StatsAvancees;