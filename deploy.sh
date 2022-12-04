#!/bin/bash

#####################
repo="https://git.grooo.vn/vietdang/vietdang-frontend-base.git"

pull_code() {
    if [ -d "./build" ]
    then
        echo "==============================="
        echo "Build folder exists."
        rm -rf ./build
        echo "==============================="
        echo "Removed build folder."
    else
        echo "Build folder doesn't exists."
    fi
    echo "=========== Pull code from git ==========="
    echo "=========== Branch main ==========="
    echo ".........................................."
    git pull origin main
    echo "=========== Pull code successfuly! ==========="
    echo "================================"
    echo "=========== Yarn installing... ==========="
    yarn
    echo "=========== Yarn install successfuly! ==========="
    echo "================================"
    echo "=========== Building... ==========="
    yarn build
    echo "=========== Building successfuly! ==========="
    rm -rf /var/www/html/* && scp -r ./build/* /var/www/html/
    echo "=========== Begin Copy firebase message! ==========="
    scp -r ./public/firebase-messaging-sw.js /var/www/html/
    echo "=========== End Copy firebase message! ==========="
    echo "=========== Deployed ==========="
    echo "=========== Ended! ==========="
}

pull_code