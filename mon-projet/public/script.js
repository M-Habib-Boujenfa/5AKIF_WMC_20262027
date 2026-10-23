const form = document.getElementById("articleForm");
const articlesList = document.getElementById("articlesList");

// Fonction pour récupérer et afficher les articles
async function fetchArticles() {
  try {
    const response = await fetch("/api/articles");
    const data = await response.json();
    const articles = Array.isArray(data) ? data : (data.articles || []);

    if (articles.length === 0) {
      articlesList.innerHTML = "<p>Aucun article pour le moment.</p>";
      return;
    }

    articlesList.innerHTML = articles
      .map(
        (art) => `
        <div class="article-card" style="border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; border-radius: 5px; background: #fff;">
          <h3>${art.title}</h3>
          <p><strong>Prix :</strong> ${(art.price / 100).toFixed(2)} €</p>
          <p>${art.description || "Pas de description"}</p>
        </div>
      `
      )
      .join("");
  } catch (error) {
    console.error("Erreur lors du chargement des articles:", error);
    articlesList.innerHTML = "<p>Erreur de chargement des articles.</p>";
  }
}

// Gérer la soumission du formulaire pour ajouter un article
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const price = Number(document.getElementById("price").value);
  const description = document.getElementById("description").value;

  try {
    const response = await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, price, description }),
    });

    if (response.ok) {
      form.reset();
      await fetchArticles(); // Recharge la liste instantanément
    } else {
      alert("Erreur lors de l'ajout de l'article.");
    }
  } catch (error) {
    console.error("Erreur réseau:", error);
  }
});

// Charger les articles au démarrage de la page
fetchArticles();