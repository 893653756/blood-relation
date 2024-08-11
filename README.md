### 使用

```js
import { initGraph } from "blood-relation";

const graph = initGraph(dom);

graph.setOptions({
  data: {
    nodes: [
      {
        id: "a",
        label: "表1",
        // 字段列表
        fields: [{ key: "id" }, { key: "title" }, { key: "description" }],
      },
      {
        id: "b",
        label: "表2",
        // 字段列表
        fields: [{ key: "name" }, { key: "birthday" }, { key: "sex" }],
      },
    ],
    edges: [
      {
        source: "a", // 原表
        sourceKey: "title", // 原表字段
        target: "b", // 目标表
        targetKey: "name", // 目标表字段
      },
    ],
  },
});
```

## 详细使用文档 后面补充
<img src='https://github.com/893653756/blood-relation/tree/master/public/images/img_01.png' height=200 alt='' />