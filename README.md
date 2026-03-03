# Jin Yutong's Tech Blog

这是我的个人技术博客，使用纯 HTML/CSS/JS 构建，可直接部署到 GitHub Pages。

**关于我**: Ex NYC Marketer | 大厂推荐算法 | 电信算法工程师 | OpenClaw Skill 开发者

## 🚀 部署到 GitHub Pages

### 1. 创建 GitHub 仓库

1. 登录 GitHub，创建一个新仓库，命名为 `jinyutong.github.io`
   （将 `jinyutong` 替换为你的 GitHub 用户名）

2. 保持仓库为 **Public**（免费版 GitHub Pages 需要公开仓库）

### 2. 上传代码

```bash
# 初始化 git 仓库
cd github-blog
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial blog setup"

# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/jinyutong/jinyutong.github.io.git

# 推送到 main 分支
git push -u origin main
```

### 3. 启用 GitHub Pages

1. 打开仓库的 **Settings** 页面
2. 左侧菜单点击 **Pages**
3. **Source** 选择 "Deploy from a branch"
4. **Branch** 选择 "main"，文件夹选择 "/ (root)"
5. 点击 **Save**

等待几分钟后，访问 `https://jinyutong.github.io` 即可看到你的博客！

## 📝 添加新文章

1. 在 `posts/` 目录下创建新的 HTML 文件
2. 复制 `posts/ml-platform.html` 或 `posts/skill-writing.html` 的结构
3. 修改内容为你想要分享的内容
4. 在 `index.html` 的 `.posts-grid` 中添加新文章卡片

## 🎨 自定义

### 修改个人信息

编辑以下文件中的个人信息：
- `index.html` - 首页标题和简介
- `about.html` - 关于页面
- 所有文件中的 GitHub 链接和邮箱

### 修改主题颜色

编辑 `css/style.css` 中的 CSS 变量：

```css
:root {
    --accent-primary: #6366f1;    /* 主色调 */
    --accent-secondary: #8b5cf6;  /* 次要色调 */
    /* 其他颜色变量... */
}
```

### 添加自定义域名（可选）

1. 在仓库根目录创建 `CNAME` 文件
2. 文件内容为你的自定义域名，如：
   ```
   blog.jinruicheng.com
   ```
3. 在你的域名 DNS 设置中添加 CNAME 记录指向 `jinruicheng.github.io`

## 📁 项目结构

```
github-blog/
├── index.html          # 首页
├── about.html          # 关于页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   └── main.js         # 交互脚本
├── posts/
│   ├── ml-platform.html      # ML Platform 文章
│   └── skill-writing.html    # Skill 写作文章
└── README.md           # 本文件
```

## ✨ 特性

- 🌙 深色/浅色主题切换（自动保存偏好）
- 📱 完全响应式设计，支持移动端
- ⚡ 纯静态网站，加载速度极快
- 🔍 SEO 友好的语义化 HTML
- 💻 代码高亮和复制功能
- 🎨 现代化的渐变设计

## 🔧 技术栈

- HTML5
- CSS3 (CSS Variables, Flexbox, Grid)
- Vanilla JavaScript (ES6+)
- Google Fonts (Inter + JetBrains Mono)

## 📄 许可

MIT License - 可自由使用和修改

---

**祝写作愉快！** 🎉
