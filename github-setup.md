# GitHub 推送指南

## 方法1：使用GitHub CLI（推荐）

### 步骤1：登录GitHub
打开命令行，运行：
```bash
gh auth login
```
选择：
- GitHub.com
- HTTPS
- 使用浏览器认证

### 步骤2：创建并推送
```bash
cd C:/Users/Dake/Documents/GitHub/Project_test/solar
gh repo create solar-system-3d --public --source=. --remote=origin --push
```

---

## 方法2：使用个人访问令牌

### 步骤1：创建个人访问令牌
1. 访问 https://github.com/settings/tokens/new
2. 设置名称：solar-system-3d
3. 选择权限：repo（全部）
4. 点击"Generate token"
5. 复制令牌（只显示一次！）

### 步骤2：设置远程仓库
```bash
# 替换YOUR_USERNAME和YOUR_TOKEN
git remote add origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/solar-system-3d.git
git push -u origin main
```

---

## 方法3：使用SSH密钥

### 步骤1：生成SSH密钥（如果没有）
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

### 步骤2：添加到GitHub
1. 复制公钥：
```bash
cat ~/.ssh/id_ed25519.pub
```
2. 访问 https://github.com/settings/keys
3. 点击"New SSH key"
4. 粘贴公钥

### 步骤3：推送
```bash
git remote add origin git@github.com:YOUR_USERNAME/solar-system-3d.git
git push -u origin main
```

---

## 快速推送（如果你已有GitHub账号）

在GitHub网站上：
1. 访问 https://github.com/new
2. Repository name: `solar-system-3d`
3. Public
4. **不要**初始化任何文件
5. Create repository

然后运行：
```bash
# 将YOUR_USERNAME替换为你的GitHub用户名
git remote add origin https://github.com/YOUR_USERNAME/solar-system-3d.git
git push -u origin main
```

如果提示输入密码，使用你的GitHub个人访问令牌（不是账号密码）。