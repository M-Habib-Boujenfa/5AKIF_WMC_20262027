import { useState } from "react";
import "../css/QuestForm.css"; // 👈 Import du fichier CSS

interface QuestFormProps {
    onAddQuest: (title: string, value: number) => void;
}

const QuestForm = ({ onAddQuest }: QuestFormProps) => {
    const [title, setTitle] = useState("");
    const [gold, setGold] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // bloque rechargement page
        if (!title.trim()) return; // vérif si title vide
        onAddQuest(title, gold);
        setTitle("");
        setGold(0);
    };

    return (
        <form
            onSubmit={handleSubmit}
            id="questForm"
            className="quest-form" // 👈 Applique le style global du formulaire (et stylise automatiquement les input/label à l'intérieur)
        >
            <label htmlFor="title">Title of the quest</label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="React Project"
            />

            <label htmlFor="gold">
                How many gold is this quest worth ?
            </label>
            <input
                type="number"
                id="gold"
                value={gold}
                onChange={(e) => setGold(Number(e.target.value))}
            />

            <button type="submit" className="submit-btn">Add the quest</button>
            {" "}
            {/* 👈 Applique le style du bouton de soumission */}
        </form>
    );
};

export default QuestForm;
