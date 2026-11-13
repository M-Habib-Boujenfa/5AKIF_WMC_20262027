import type { Quest } from "../types.ts";
interface QuestItemProps {
    quest: Quest;
}

const QuestItem = ({ quest }: QuestItemProps) => {
    return (
        <>
            <h2>{`${quest.id} ${quest.title}`}</h2>
            <p>{`You will gain ${quest.value} xp for this quest`}</p>
        </>
    );
};

export default QuestItem;
