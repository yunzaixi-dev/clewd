#!/bin/bash

# 检查 xconfig.js 是否存在
if [ -f "xconfig.js" ]; then
    # 复制 xconfig.js 到 config.js
    cp xconfig.js config.js
    echo "已成功将 xconfig.js 复制到 config.js"
else
    echo "警告：当前目录中未找到 xconfig.js 文件，将使用现有的 config.js（如果存在）"
fi

# 启动应用程序
echo "正在启动 clewd.js..."
exec node clewd.js
