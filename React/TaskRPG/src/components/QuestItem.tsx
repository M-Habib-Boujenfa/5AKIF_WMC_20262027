import type { Quest } from "../types.ts";
interface QuestItemProps {
    quest: Quest;
    onComplete: (id: number) => void;
}

const QuestItem = ({ quest, onComplete }: QuestItemProps) => {
    return (
        <>
            <h2>{`${quest.id} ${quest.title}`}</h2>
            <p>{`You will gain ${quest.value} gold for this quest`}</p>
            <button
                disabled={quest.completed}
                type="button"
                onClick={() => onComplete(quest.id)}
            >
                Quest Completed
            </button>
            {quest.completed
                ? <p style={{ color: "green" }}>Complete</p>
                : <p style={{ color: "red" }}>Not complete</p>}
        </>
    );
};

export default QuestItem;
