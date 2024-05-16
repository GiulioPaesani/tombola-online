FROM node:18.13

WORKDIR /app

COPY . .

RUN npm install -g pnpm

RUN pnpm install

RUN pnpm build

CMD ["pnpm", "start"]

EXPOSE 5000