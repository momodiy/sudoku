# 数独
typescript开发的数独游戏，支持移动端。

## 技术栈

typescript + ts-loader + less + ES6/7 + gulp + webpack + webpack-stream + babel-loader + yarn + sweetalert

## 目录介绍
- app 手机应用程序（仅包含成Android版本）
- src 主要编辑文件
    - js 用于存放typescript逻辑代码以及生成的javascript代码
        - core 核心逻辑代码
        - ui 样式部分逻辑代码
        - index.ts 逻辑代码入口
    - less less样式表文件
    - node_modules 安装的node包
    - gulfiles.js gulp配置文件
    - package.json 项目模块、配置信息定义
    - package-lock.json 记录当前状态下实际安装的各个npm package的具体来源和版本号
    - tsconfig.json typescript编译配置文件
    - webpack.config.js webpackage配置文件
    - yarn.lock  锁定了安装包的精确版本以及所有依赖项
    - yarn-error.log yarn安装异常的日志记录文件
- dist 编辑生成的文件
    - css 通过gulp将less转换成的css文件
        - main.css 最终编译生成的css文件
    - js 通过gulp将src目录下所有的js文件打包生成的js压缩文件
        - index.js 最终编译生成的js压缩文件
        - index.js.map js文件压缩后，文件的变量名替换对应、变量所在位置等元信息数据文件
- .gitignore git忽略上传的文件
- LICENSE 版权信息

## 启动项目
### 1.克隆项目
    $ git clone https://github.com/momodiy/Gobang
### 2.安装依赖
    $ cd src
    $ npm i -g
### 3.编译
    $ gulp
### 4.开始游戏
    运行dist目录下的index.html文件即可运行游戏。
    
## 在线演示

在线演示[*点这里*](https://momodiy.github.io/demo/sudoku/)

注：PC端打开时模拟手机查看可获得更佳体验。

## License
MIT License
Copyright (c) 2018 Steven Lee