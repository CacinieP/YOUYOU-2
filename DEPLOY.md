# 🚀 部署指南

## 部署到 GitHub Pages

### 1. 创建 GitHub 仓库

在 GitHub 上创建一个名为 `YOUYOU-2` 的新仓库。

### 2. 初始化本地仓库并推送

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: YOUYOU 宿舍生存工具包"

# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/YOUYOU-2.git

# 推送到 main 分支
git branch -M main
git push -u origin main
```

### 3. 配置 GitHub Pages

1. 进入仓库的 **Settings** → **Pages**
2. 在 **Source** 部分选择 **GitHub Actions**
3. 保存设置

### 4. 触发自动部署

推送代码到 `main` 分支后，GitHub Actions 会自动：
- 安装依赖
- 构建项目
- 部署到 GitHub Pages

查看部署状态：
- 进入仓库的 **Actions** 标签
- 查看工作流运行状态

### 5. 访问网站

部署成功后，访问：
```
https://YOUR_USERNAME.github.io/YOUYOU-2/
```

## 本地构建测试

在推送前，可以先本地测试构建：

```bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 更新部署

每次修改代码后，只需：

```bash
git add .
git commit -m "描述你的修改"
git push
```

GitHub Actions 会自动重新部署。

## 故障排查

### 部署失败
- 检查 Actions 标签中的错误日志
- 确保 package.json 中的依赖版本正确
- 确认 Node.js 版本兼容（推荐 18+）

### 页面空白
- 检查浏览器控制台错误
- 确认 vite.config.ts 中的 base 路径正确
- 确认 App.tsx 中的 basename 与仓库名一致

### 路由 404
- GitHub Pages 不支持客户端路由的直接访问
- 用户需要从首页开始导航
- 或添加 404.html 重定向配置

## 自定义域名（可选）

如果你有自己的域名：

1. 在仓库根目录创建 `public/CNAME` 文件
2. 写入你的域名，例如：`youyou.example.com`
3. 在域名提供商处配置 DNS：
   - 添加 CNAME 记录指向 `YOUR_USERNAME.github.io`
4. 推送代码，等待 DNS 生效

## 环境变量

如果需要使用环境变量（如 API Keys）：

1. 在仓库 Settings → Secrets and variables → Actions
2. 添加 secrets
3. 在 `.github/workflows/deploy.yml` 中引用

## 性能优化建议

- ✅ 已启用代码分割（Vite 默认）
- ✅ 已启用 Tree Shaking
- ✅ 使用 LocalStorage 实现离线功能
- 🔄 可考虑添加 PWA 支持
- 🔄 可考虑添加图片压缩

## 监控和分析

推荐添加：
- Google Analytics（用户行为分析）
- Sentry（错误监控）
- Lighthouse CI（性能监控）
