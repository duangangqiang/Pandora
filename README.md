#### note anything

##### 开发注意事项
1. 在vscode中开发的时候，请安装 Easy WXLESS 插件，此插件自动将同文件的less转为wxss，同时wxss将视为**只读**, 同时请参照该插件说明进行配置
```json
{
  "less.compile": {
    "compress": false,
    "sourceMap": false,
    "out": true,
  }
}
```
