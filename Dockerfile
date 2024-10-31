FROM node:22.11.0-slim
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
COPY package*.json .
RUN pnpm install
COPY . .
EXPOSE 3000
CMD ["pnpm", "run", "dev"]