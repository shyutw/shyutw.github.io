const CONFIG = {
    USERNAME: 'shyutw', // ⬅️ 請記得填寫
    REPO_COUNT: 6
};

async function fetchRepos() {
    const list = document.getElementById('repo-list');
    try {
        const res = await fetch(`https://api.github.com/users/${CONFIG.USERNAME}/repos?sort=updated&per_page=${CONFIG.REPO_COUNT}`);
        if (!res.ok) throw new Error();
        const data = await res.json();

        list.innerHTML = data.map(repo => `
            <article class="repo-card">
                <div>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                    <p>${repo.description || '探索這個專案的精彩內容，雖然作者還沒寫描述，但代碼絕對值得一看。'}</p>
                </div>
                <div class="meta">
                    <span><span class="lang-dot"></span>${repo.language || 'Markdown'}</span>
                    <span>⭐ ${repo.stargazers_count}</span>
                    <span>🍴 ${repo.forks_count}</span>
                </div>
            </article>
        `).join('');
    } catch {
        list.innerHTML = '<p>無法載入專案，請檢查帳號名稱。</p>';
    }
}
fetchRepos();
