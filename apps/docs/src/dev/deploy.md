# 发布

对于插件和油猴脚本打包后都会被放置到根目录下的 .output 文件夹中。默认文档在打包时会清理该文件夹，所以打包发布时需要注意顺序：

```bash
npm run build:core
npm run build:doc
npm run build:ms
```

然后通过 `gh-pages` 包将打包后的文档发布到 GitHub Pages 上：

```bash
npx gh-pages -d .output
```

发布流程通过 deploy 脚本命令串联，所以需要发布时可以直接执行该命令：

```bash
npm run deploy
```

发布后，可以通过 <https://kisstar.github.io/chrome-extension-aimless/> 访问文档。
