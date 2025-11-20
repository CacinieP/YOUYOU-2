# ⚡ 快速开始

## 一键部署到 GitHub Pages

### 步骤 1: 创建仓库

1. 访问 [GitHub](https://github.com/new)
2. 仓库名称填写：`YOUYOU-2`
3. 选择 **Public**（公开仓库才能使用免费的 GitHub Pages）
4. **不要**勾选 "Add a README file"
5. 点击 **Create repository**

### 步骤 2: 推送代码

在项目目录打开终端，执行以下命令：

```bash
# 初始化 Git（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "🎉 Initial commit"

# 添加远程仓库（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/YOUYOU-2.git

# 推送
git branch -M main
git push -u origin main
```

### 步骤 3: 启用 GitHub Pages

1. 进入你的仓库页面
2. 点击 **Settings**（设置）
3. 左侧菜单找到 **Pages**
4. 在 **Source** 下拉菜单选择 **GitHub Actions**
5. 等待几分钟，部署完成！

### 步骤 4: 访问网站

打开浏览器访问：
```
https://YOUR_USERNAME.github.io/YOUYOU-2/
```

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 在浏览器打开 http://localhost:5173
```

## 常见问题

### Q: 推送代码时要求输入用户名密码？
A: GitHub 已不支持密码认证，需要使用 Personal Access Token：
1. 访问 GitHub Settings → Developer settings → Personal access tokens
2. 生成新 token，勾选 `repo` 权限
3. 使用 token 作为密码

或者使用 SSH：
```bash
git remote set-url origin git@github.com:YOUR_USERNAME/YOUYOU-2.git
```

### Q: 部署后页面空白？
A: 检查以下几点：
1. 确认 `vite.config.ts` 中的 `base` 是 `/YOUYOU-2/`
2. 确认 `src/App.tsx` 中的 `basename` 是 `/YOUYOU-2`
3. 查看浏览器控制台是否有错误

### Q: 如何更新网站？
A: 修改代码后：
```bash
git add .
git commit -m "描述你的修改"
git push
```
GitHub Actions 会自动重新部署。

### Q: 部署需要多久？
A: 通常 2-5 分钟。可以在仓库的 **Actions** 标签查看进度。

## 下一步

- 📖 阅读 [DEPLOY.md](./DEPLOY.md) 了解详细部署配置
- 🎨 自定义样式和功能
- 🔧 添加更多舍友管理功能
- 📱 优化移动端体验

## 需要帮助？

- 查看 [GitHub Actions 日志](https://github.com/YOUR_USERNAME/YOUYOU-2/actions)
- 提交 [Issue](https://github.com/YOUR_USERNAME/YOUYOU-2/issues)
