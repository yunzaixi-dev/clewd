# 使用我们的基础镜像
FROM yunzaixi4/clewd-base:latest

# 设置工作目录
WORKDIR /app

# 复制项目文件
COPY . .

# 权限设置
RUN chown -R node:node lib/bin/* && \
    chmod u+x lib/bin/* && \
    chmod -R 777 /app && \
    chmod +x zs.sh

# 使用node用户
USER node

# 显示文件列表（调试用）
RUN ls -la

# 暴露端口
EXPOSE 8444

# 启动应用
CMD ["./zs.sh"]
