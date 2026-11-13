import "./App.css";
import Header from "./components/Header.tsx";
import QuestList from "./components/QuestList.tsx";
import type { Quest } from "./types.ts";
import type { User } from "./types.ts";

function App() {
  const user: User = {
    name: "Hero",
    level: 3,
    or: 10,
  };

  const quests: Quest[] = [
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
  ];
  return (
    <>
      <Header user={user} />
      <QuestList quests={quests} />
    </>
  );
}

export default App;
