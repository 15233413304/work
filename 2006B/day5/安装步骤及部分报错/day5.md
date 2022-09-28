### 全局安装脚手架

```shell
npm install -g @vue/cli 或 yarn global add @vue/cli
```

## 创建一个项目

```shell
vue create demo
```

步骤：

### 对应图片1

![1](/Users/xhr/Desktop/2006B/day5/img/1.png)

### 对应图片2![2](/Users/xhr/Desktop/2006B/day5/img/2.png)

### 对应图片3![3](/Users/xhr/Desktop/2006B/day5/img/3.png)

### 对应图片4![4](/Users/xhr/Desktop/2006B/day5/img/4.png)

### 对应图片5![5](/Users/xhr/Desktop/2006B/day5/img/5.png)

### 对应图片6![6](/Users/xhr/Desktop/2006B/day5/img/6.png)

### 对应图片7![7](/Users/xhr/Desktop/2006B/day5/img/7.png)

### 对应图片8![8](/Users/xhr/Desktop/2006B/day5/img/8.png)

启动项目

````shell
cd demo
然后
npm run serve
````

报错处理：

### 对应图片9

![9](/Users/xhr/Desktop/安装步骤/img/9.png)

到该目录下删掉vue.ps1或者通过管理员运行 powershell 输入set-ExecutionPolicy RemoteSigned命令，选择A 然后回车

### 对应图片10

![10](/Users/xhr/Desktop/安装步骤/img/10.png)Ctrl+C (Mac是control+C) 终止运行，然后npm config set registry https://registry.npm.taobao.org 设置淘宝镜像源

### 对应图片11

![11](/Users/xhr/Desktop/安装步骤/img/11.png)

找到nodejs安装目录下的npm和npm.cmd在vscode中打开这两个文件 将prefix改成prefix --location=global并保存
