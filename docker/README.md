# 介绍
* 书籍名：[Docker Cookbook.pdf](http://isbn.directory/book/9781491919712)
* 书籍代码：https://github.com/how2dock/docbook

# 笔记

## 常用命令
* docker pull [imagename] 下载镜像
* docker run [imagename]
    >--name 设置容器的名称，在对容器操作的时候就可以使用名称，如：--name mysqlwp

    > -e 设置容器的环境变量，如：-e MYSQL_ROOT_PASSWORD=wordpressdocker

    >-d 设置容器后台运行

    >-p 设置容器和host的端口映射，如：-p 80：80

    >--link 将两个容器关联起来，如：--link [容器名]:[镜像名]

    >-v 设置容器文件映射,如：-v "$PWD":/cookbook:ro ([宿主目录]:[容器对应目录]:[权限:ro表示 read-only])

## 容器操作

* docker rm 删除容器
    > -v 删除容器和存储
* docker stop $(docker ps -q)

* 批量操作可以使用$(docker ps -aq)

* docker ps 查看正在运行的容器
* docker ps -a 查看所有的容器



* docker build -t wordpress/test . 
  >从dockerfile中构建镜像

# 管理

* docker inspect -f {{.Mounts}} [container-id] 查看容器的mounts的映射信息