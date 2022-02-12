# Chrome Extension Aimless

针对 Chrome 浏览器编写的一些插件和油猴脚本。

## Usage

项目中的油猴脚本被放置在 [release/monkey](./release/monkey) 目录下，可以直接将对应的脚本复制到 Tampermonkey 中。

## Dev Scripts

```bash
# 开发插件
npm run build:dev [-- --name <extension_name>]

# 打包插件
npm run build [-- --name <extension_name>]

# 开发脚本
npm run bundle:dev [-- --name <script_name>]

# 打包脚本
npm run bundle [-- --name <script_name>]

# 测试
npm run test
```

## Tampermonkey Scripts

| 名称                         | 说明                           |
| :--------------------------- | :----------------------------- |
| [baike](./src/monkey/baike/) | 支持视频播放器的快捷操作。     |
| [zhihu](./src/monkey/zhihu/) | 针对阅读方面提供的一系列优化。 |

## License

MIT
