FROM node:8-alpine

# Backend node_modules

WORKDIR /backend-node_modules

COPY backend/package.json ./

RUN yarn install && yarn cache clean

# Frontend node_modules

WORKDIR /frontend-node_modules

COPY frontend/package.json ./

RUN yarn install && yarn cache clean

# Copy files

WORKDIR /service-mgmt

COPY /backend /service-mgmt/backend
COPY /frontend /service-mgmt/frontend

RUN rm -f /service-mgmt/backend/package.json /service-mgmt/backend/yarn.lock /service-mgmt/frontend/package.json /service-mgmt/frontend/yarn.lock \
    && ln -s /backend-node_modules/package.json /service-mgmt/backend/package.json \
    && ln -s /backend-node_modules/yarn.lock /service-mgmt/backend/yarn.lock \
    && ln -s /backend-node_modules/node_modules /service-mgmt/backend/node_modules \
    && ln -s /frontend-node_modules/package.json /service-mgmt/frontend/package.json \
    && ln -s /frontend-node_modules/yarn.lock /service-mgmt/frontend/yarn.lock \
    && ln -s /frontend-node_modules/node_modules /service-mgmt/frontend/node_modules

# Build frontend

WORKDIR /service-mgmt/frontend

RUN yarn build \
    && rm -rf /service-mgmt/backend/public \
    && ln -s /service-mgmt/frontend/build /service-mgmt/backend/public

# Start backend server

WORKDIR /service-mgmt/backend

CMD yarn start
