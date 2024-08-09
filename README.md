## 项目简介
本项目是一个书籍整合推荐小程序。项目主要是由Taro+React+Redux+Taro UI搭建，通过一个简单的实践项目来帮助理解Redux和React的结合使用。

## 运行项目
本项目需要在以下环境中编译：react > v18.0.0、react-toolkit、taro v4.0.4、nodejs > v16.0.0、微信开发者工具

首先需要安装必要的环境：
```
# 安装 nvm，已经安装请忽略
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# 安装 nodejs
nvm install

# 切换 node 版本
nvm use node版本号

# 检查 node 版本
node --version

## 安装 taro
npm install -g @tarojs/cli@1.2.20

## 安装 taro ui
npm install taro-ui@3.0.0-alpha.3
```

启动小程序：
```
# 安装依赖
npm install 或者 yarn

# 编译小程序
npm run dev:weapp
```

启动 mock 服务 (新建一个终端，在项目根目录下执行)：
```
cd simplest-mock-server
npm install
gulp mock
```

之后在微信开发者工具中导入项目，即可预览。

## 引入 Redux Toolkit
用于简化Redux手动编写逻辑，但是我们仍然需要使用React-Redux，用于实现React组件与React Store之间的交互，采用useDispatch和useSelector，关于redux相关的文件夹如下所示：
```
├── store
│   └── counter
│         └── counterSlice.js
│   └── home
│         └── homeSlice.js
│   └── index.js
```

将同一份数据不同的action slice整合在一个store文件夹中，不同操作类型的slice文件规整到不同的slice文件夹中。其中在index.js中通过configureStore将不同的slice reducers组合到根reducer函数中，它将处理看起来像，然后使用根reducer创建了Redux store并自动添加了 “thunk” middleware来检查常见错误。