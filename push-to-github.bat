@echo off
echo 推送到GitHub仓库
echo.
echo 请先在GitHub上创建一个名为 solar-system-3d 的仓库
echo 仓库地址格式: https://github.com/YOUR_USERNAME/solar-system-3d
echo.
set /p repo_url="请输入你的GitHub仓库地址: "

git remote add origin %repo_url%
git branch -M main
git push -u origin main

echo.
echo 推送完成！
pause