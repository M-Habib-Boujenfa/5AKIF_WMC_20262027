import { useEffect, useState } from "react";
import Header from "./components/Header.tsx";
import QuestList from "./components/QuestList.tsx";
import type { Quest, User } from "./types.ts";
import "./css/App.css";
import axios from "axios";

import QuestForm from "./components/QuestForm.tsx";

function App() {
  const [user, setUser] = useState<User>(
    {
      name: "Hero",
      level: 3,
      or: 0,
    },
  );

  const [quests, setQuests] = useState<Quest[]>(
    [
      {
        id: 1,
        title: "Begin React project",
        value: 10,
        completed: false,
      },
      {
        id: 2,
        title: "learn how to use useState",
        value: 20,
        completed: false,
      },
      {
        id: 3,
        title: "try to add a form for the quest",
        value: 30,
        completed: false,
      },
      {
        id: 4,
        title: "Banging my head against the wall",
        value: 40,
        completed: false,
      },
    ],
  );

  useEffect(() => {
    axios.get("https://randomuser.me/api/")
      .then((response) => {
        const firstName = response.data.results[0].name.first;
        const lastName = response.data.results[0].name.last;
        setUser((prevUser) => ({
          ...prevUser,
          name: `Hero ${firstName} ${lastName}`,
        }));
      });
  }, []);

  const handleCompleteQuest = (id: number) => {
    const clikedQuest: Quest = quests.find((quest) => quest.id == id);
    const questGoldValue = clikedQuest?.value ?? 0;
    setUser({ ...user, or: user.or + questGoldValue });

    setQuests(
      quests.map((quest) =>
        quest.id == id ? { ...quest, completed: true } : { ...quest }
      ),
    );
  };

  const handleAddQuest = (title: string, gold: number) => {
    const newQuest: Quest = {
      id: quests.length > 0 ? quests[quests.length - 1].id + 1 : 1,
      title: title,
      value: gold,
      completed: false,
    };
    setQuests([...quests, newQuest]);
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
