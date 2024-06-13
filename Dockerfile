FROM node:20

WORKDIR /usr/

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install

COPY . .

ENV PORT=3000

ENV MODEL_URL=https://storage.googleapis.com/bucket-suarga-app/model/modelNW.json

ENV DATABASE_URL=mysql://u253111259_only_suarga:SuargaApp2024@irisfutureforge.com:3306/u253111259_test_suarga?connection_limit=200&pool_timeout=0

CMD [ "npm", "start" ]