FROM node:22

WORKDIR /project

COPY package*.json ./
RUN npm install

COPY . .

# Создаем папку code и копируем туда всё необходимое
RUN mkdir -p code && \
    cp -r index.html src package*.json code/ && \
    cp -r node_modules code/ 2>/dev/null || :

WORKDIR /project/code

CMD ["npm", "run", "dev"]
