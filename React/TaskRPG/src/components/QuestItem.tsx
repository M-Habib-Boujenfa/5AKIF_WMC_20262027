import type { Quest } from "../types.ts";
import "../css/QuestItem.css"; // 👈 Import du fichier CSS

interface QuestItemProps {
    quest: Quest;
    onComplete: (id: number) => void;
}

const QuestItem = ({ quest, onComplete }: QuestItemProps) => {
    return (
        <div className="quest-card">
            {/* 👈 Transformé en carte stylisée */}
            <h2 className="quest-title">{`${quest.id}. ${quest.title}`}</h2>

            <p className="quest-reward">
                {`You will gain ${quest.value} gold for this quest`}
            </p>

            <button
                className="quest-btn" // 👈 Applique le style du bouton d'action
                disabled={quest.completed}
                type="button"
                onClick={() => onComplete(quest.id)}
            >
                Quest Completed
            </button>

            {
                quest.completed
                    ? <p className="status-complete">Complete</p> // 👈 Classe CSS verte au lieu du style inline
                    : <p className="status-pending">Not complete</p> // 👈 Classe CSS rouge au lieu du style inline
            }
        </div>
    );
};

export default QuestItem;
