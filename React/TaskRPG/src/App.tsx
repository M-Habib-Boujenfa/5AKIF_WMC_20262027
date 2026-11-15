import { useState } from "react";
import "./App.css";
import Header from "./components/Header.tsx";
import QuestList from "./components/QuestList.tsx";
import type { Quest } from "./types.ts";
import type { User } from "./types.ts";

function App() {
  const [user, setUser] = useState<User>(
    {
      name: "Hero",
      level: 3,
      or: 10,
    },
  );

  const [quests, setQuests] = useState<Quest[]>(
    [
      {
        id: 1,
        title: "quest 1",
        value: 10,
        completed: false,
      },
      {
        id: 2,
        title: "quest 2",
        value: 20,
        completed: false,
      },
      {
        id: 3,
        title: "quest 3",
        value: 30,
        completed: false,
      },
    ],
  );

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

  return (
    <>
      <Header user={user} />
      <QuestList quests={quests} onComplete={handleCompleteQuest} />
    </>
  );
}

export default App;
