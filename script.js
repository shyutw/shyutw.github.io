// ⚠️ 請將這裡的 "YOUR_GITHUB_USERNAME" 換成你真實的 GitHub 帳號名稱
const username = 'YOUR_GITHUB_USERNAME';

// 呼叫 GitHub API，並依照更新時間排序
const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;

fetch(apiUrl)
    .then(response => response.json())
    .then(repos => {
        const container = document.getElementById('repo-container');
        container.innerHTML = ''; // 清空「載入中」文字

        repos.forEach(repo => {
            // 排除掉 forks
            if (!repo.fork) { 
                const desc = repo.description || '這個專案還沒有寫說明。';
                const language = repo.language || 'Markdown/Other';
                
                // 建立卡片 HTML
                const card = document.createElement('div');
                card.className = 'repo-card';
                card.innerHTML = `
                    <div class="repo-name">
                        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                    </div>
                    <div class="repo-desc">${desc}</div>
                    <div class="repo-meta">
                        <span><span class="language-dot"></span>${language}</span>
                        <span>⭐ ${repo.stargazers_count}</span>
                        <span>🍴 ${repo.forks_count}</span>
                    </div>
                `;
                container.appendChild(card);
            }
        });
    })
    .catch(error => {
        console.error('讀取發生錯誤:', error);
        document.getElementById('repo-container').innerHTML = '<p>讀取專案失敗，請稍後再試。</p>';
    });
