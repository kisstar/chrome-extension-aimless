# Chrome Extension Aimless

针对 Chrome 浏览器编写的一些插件和油猴脚本。

## Dev Scripts

```bash
# 开发
npm run start [-- --name <extension_name>]

# 打包插件
npm run build [-- --name <extension_name>]

# 打包脚本
npm run bundle [-- --name <script_name>]

# 测试
npm run test
```

## Tampermonkey Scripts

| 名称                         | 匹配                               | 说明                       |
| :--------------------------- | :--------------------------------- | :------------------------- |
| [baike](./src/monkey/baike/) | `https://baike.baidu.com/item/*/*` | 支持视频播放器的快捷操作。 |

## License

MIT
