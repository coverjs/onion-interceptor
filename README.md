# vite-ts-lib-starter

vite-ts-lib-starter 是一个基于 Vite 构建的 TypeScript 类库项目的起始模板。

特点：

- 使用 Vite 进行快速的开发和构建。
- 使用 Vitest 进行测试，提供可靠的单元测试和集成测试支持。
- 使用 Vitepress 构建文档，提供清晰、易于浏览的文档网站。

## 使用

```shell
$ git clone https://github.com/EricWXY/vite-ts-lib-starter.git
```

## 项目结构

```axapta
├── src/              # 源代码目录
│   ├── index.ts      # 入口文件
├── tests/            # 测试目录
│   ├── index.test.ts # 测试文件
├── docs/             # 文档目录
│   ├── .vitepress/   # Vitepress 配置目录
│   ├── index.md     # 文档首页
├── example/          # 示例目录
│   ├── index.html    # 示例入口
└── README.md         # 项目 README 文件
```

## npm 命令

启动示例服务
```shell
# 启动示例服务
$ npm run dev

# 运行自动化测试
$ npm run test
$ npm run test:watch

# 语法检查
$ npm run lint

# 打包
$ npm run build

# 运行文档
$ npm run docs:dev

# 打包文档
$ npm run docs:build

# git commit
$ npm run commit

# 发布 npm
$ npm run pub
```

## 许可证

vite-ts-lib-starter 是根据 MIT 许可证发布的。


## 联系方式

我的邮箱是 `ericwxy@foxmail.com` 多多交流哦。
