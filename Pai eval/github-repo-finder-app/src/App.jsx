import { use, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SearchBar from "./SearchBar";
import RepoCard from "./RepoCard";
import axios from "axios";

function App() {
  const [repos, setRepos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!searchQuery) return;

    const fetchRepos = async () => {
      setLoading(true);
      setError("");
      setRepos([]);

      try {
        const response = await axios.get(
          `https://api.github.com/users/${searchQuery}/repos`
        );

        const formattedRepos = response.data.map((repo) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          owner: repo.owner.login,
        }));
        setRepos(formattedRepos);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError("User not found");
        } else {
          setError("An error occurred while fetching repositories");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, [searchQuery]);

  return (
    <>
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">Github Repo Finder</h1>
        <SearchBar onSearch={(username) => setSearchQuery(username)} />
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
