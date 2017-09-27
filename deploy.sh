#!/bin/sh

# don't forget to chmod u+x deploy.sh

user=$(whoami)

git checkout master
git pull origin master
git checkout deploy
git fetch origin master
git reset --hard FETCH_HEAD
git clean -df
cd client
yarn build
cp -r build/* ../public
cd ..
git add public/*
git commit -m "automated deploy build by $user"
git push origin deploy --force


