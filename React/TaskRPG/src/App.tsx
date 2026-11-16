import { useEffect, useState } from "react";
import axios from "axios";
import "./css/App.css";
import Header from "./components/Header.tsx";
import QuestList from "./components/QuestList.tsx";
import QuestForm from "./components/QuestForm.tsx";
import type { Quest, User } from "./types.ts";

function App() {
  const [user, setUser] = useState<User>({
    name: "Chargement...",
    level: 3,
    gold: 0,
  });

  const [quests, setQuests] = useState<Quest[]>([]);

  // 1. Initialisation des données au démarrage + API nom aléatoire si besoin
  useEffect(() => {
    const fetchAppData = async () => {
      try {
        const userResponse = await axios.get("http://localhost:3000/api/user");
        let currentUser = userResponse.data;

        // Si le nom par défaut est "Hero", on génère un nom stylé via l'API externe
        if (currentUser.name === "Hero" || !currentUser.name) {
          const randomUserRes = await axios.get("https://randomuser.me/api/");
          const firstName = randomUserRes.data.results[0].name.first;
          const lastName = randomUserRes.data.results[0].name.last;
          const newHeroName = `Hero ${firstName} ${lastName}`;

          await axios.patch("http://localhost:3000/api/user/name", {
            name: newHeroName,
          });
          currentUser = { ...currentUser, name: newHeroName };
        }

        setUser(currentUser);

        const questsResponse = await axios.get(
          "http://localhost:3000/api/quests",
        );
        setQuests(questsResponse.data);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };

    fetchAppData();
  }, []);

  // 2. Valider une quête
  const handleCompleteQuest = async (id: number) => {
    const clickedQuest = quests.find((quest) => quest.id === id);
    if (!clickedQuest || clickedQuest.completed) return;

    const newGold = user.gold + clickedQuest.value;

    try {
      await axios.patch("http://localhost:3000/api/user/gold", {
        gold: newGold,
      });
      await axios.patch(`http://localhost:3000/api/quests/${id}/complete`);

      setUser((prevUser: User) => ({ ...prevUser, gold: newGold }));
      setQuests(
        quests.map((quest) =>
          quest.id === id ? ({ ...quest, completed: true }) : quest
        ),
      );
    } catch (error) {
      console.error("Erreur lors de la validation de la quête :", error);
    }
  };

  // 3. Ajouter une quête
  const handleAddQuest = async (title: string, gold: number) => {
    try {
      const response = await axios.post("http://localhost:3000/api/quests", {
        title,
        value: gold,
      });

      const newQuest: Quest = response.data;
      setQuests([...quests, newQuest]);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la quête :", error);
    }
  };

  return (
    <>
      <Header user={user} />
      <QuestList quests={quests} onComplete={handleCompleteQuest} />
      <QuestForm onAddQuest={handleAddQuest} />
    </>
  );
}

export default App;
