# manufacturing-recruit-map

面向制造中心招聘的造车岗位学习地图，适合部署到 Vercel。

## 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftamakooooo%2Fai-site&project-name=manufacturing-recruit-map&repository-name=ai-site-manufacturing-recruit-map&root-directory=manufacturing-recruit-map)

如果你直接点上面的按钮，Vercel 会导入这个 GitHub 仓库，并默认把 `manufacturing-recruit-map` 作为 Root Directory。

## 手动部署

1. 打开 Vercel New Project 页面并导入仓库 `tamakooooo/ai-site`
2. 在导入配置里把 `Root Directory` 设为 `manufacturing-recruit-map`
3. `Framework Preset` 选 `Other`
4. `Build Command` 留空
5. `Output Directory` 留空
6. 点击 `Deploy`

## CLI 部署

如果你更想本地发版，可以在仓库根目录运行：

```bash
vercel --cwd manufacturing-recruit-map
```

## 目录

- `index.html`: 页面入口
- `styles.css`: 样式
- `app.js`: 交互逻辑
- `jobs-data.js`: 岗位数据
