import type { Quest } from "../types.ts";
import QuestItem from "./QuestItem.tsx";
interface QuestListProps {
    quests: Quest[];
    onComplete: (id: number) => void;
}

function QuestList({ quests, onComplete }: QuestListProps) {
    return (
        <>
            {quests.map((quest) => (
                <QuestItem
                    key={quest.id}
                    quest={quest}
                    onComplete={onComplete}
                />
            ))}
        </>
    );
}

export default QuestList;
