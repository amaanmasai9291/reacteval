export default function RepoCard({ repo }) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-bold">{repo.name}</h2>
      <p className="text-gray-600">{repo.description || "No description "} </p>
      <div>
        <span>⭐{repo.stars}</span>
        <span>🍴{repo.forks}</span>
      </div>
    </div>
  );
}
