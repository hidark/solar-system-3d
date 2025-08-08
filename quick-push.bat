@echo off
echo =====================================
echo   太阳系3D模拟系统 - GitHub推送工具
echo =====================================
echo.
echo 请先在GitHub上创建一个新仓库:
echo 1. 访问 https://github.com/new
echo 2. Repository name: solar-system-3d
echo 3. 选择 Public
echo 4. 不要初始化README、.gitignore或License
echo 5. 点击 Create repository
echo.
echo =====================================
echo.
set /p username="请输入你的GitHub用户名: "

echo.
echo 正在配置远程仓库...
git remote remove origin 2>nul
git remote add origin https://github.com/%username%/solar-system-3d.git

echo 正在推送到GitHub...
git branch -M main
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ 推送成功！
    echo.
    echo 你的项目已发布到:
    echo https://github.com/%username%/solar-system-3d
    echo.
) else (
    echo.
    echo ❌ 推送失败！
    echo.
    echo 可能的原因：
    echo 1. 仓库还未创建
    echo 2. 需要输入GitHub密码或令牌
    echo 3. 网络连接问题
    echo.
    echo 如果需要令牌：
    echo 1. 访问 https://github.com/settings/tokens/new
    echo 2. 生成新令牌（勾选repo权限）
    echo 3. 在密码提示时粘贴令牌（不是密码）
    echo.
)

pause