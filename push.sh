#!/bin/bash
# 请将YOUR_USERNAME替换为你的GitHub用户名

git remote remove origin 2>/dev/null
git remote add origin https://github.com/YOUR_USERNAME/solar-system-3d.git
git branch -M main
git push -u origin main

echo "推送完成！"
echo "项目地址：https://github.com/YOUR_USERNAME/solar-system-3d"