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

| 名称                               | 说明                                          |
| :--------------------------------- | :-------------------------------------------- |
| [baike](./src/monkey/baike/)       | 支持视频播放器的快捷操作等功能。              |
| [zhihu](./src/monkey/zhihu/)       | 支持自动隐藏登录弹窗等功能。                  |
| [csdn](./src/monkey/csdn/)         | 支持未登录复制等功能。                        |
| [bilibili](./src/monkey/bilibili/) | 支持视频下载等功能。                          |
| [dlink](./src/monkey/dlink/)       | 支持知乎、CSDN 和掘金等网站内部链接直接跳转。 |

## License

MIT
