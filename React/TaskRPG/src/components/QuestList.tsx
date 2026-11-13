import type { Quest } from "../types.ts";
import QuestItem from "./QuestItem.tsx";
interface QuestListProps {
    quests: Quest[];
}

function QuestList({ quests }: QuestListProps) {
    return (
        <>
            {quests.map((quest) => <QuestItem key={quest.id} quest={quest} />)}
        </>
    );
}

export default QuestList;
