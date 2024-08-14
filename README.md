### 先上效果

<img src='https://github.com/893653756/blood-relation/blob/master/img_02.png' alt='' />

### 使用

```js
import { initGraph } from "blood-relation";

// 节点 或者 组件 挂载之后
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

// 更新数据
graph.changeData({
  nodes: [],
  edges: [],
});

// 销毁 页面卸载之前调用
graph.destory();
```

## 节点主体配置

```js
// 默认配置
const nodeCfg = {
  width: 220, // 节点宽度
  itemCount: 9, // 出现滚动条的阈值
  itemHeight: 36, // 字段节点高度
  headerHeight: 40, // 节点头部高度
  footerHeight: 14, // 底部高度, 当有滚动条时生效
  borderWidth: 2, // 主体边框宽度
  color: "#4273f6", // 节点主色调
  radius: 4, // 圆角
};

// 全局配置
graph.setOptions({
  nodeCfg = {
    width: 250,
    ...
  };
})

// 节点私有配置
graph.setOptions({
  data: {
    nodes: [
      {
        id: "a",
        label: "表1",
        // 节点私有配置
        nodeCfg: {
          color: '#f00',
          ...
        },
        // 字段列表
        fields: [{ key: "id" }, { key: "title" }, { key: "description" }],
      },
    ],
  },
});
```

## 头部样式配置

```js
// 默认配置
const headerStyle = {
  color: "#fff",
  fontSize: 16,
  fontWeight: 500,
}

// 全局配置
graph.setOptions({
  headerStyle = {
    fontSize: 18,
    ...
  };
})

// 节点私有配置
graph.setOptions({
  data: {
    nodes: [
      {
        id: "a",
        label: "表1",
        // 节点私有配置
        headerStyle: {
          color: '#0f0',
          ...
        },
        // 字段列表
        fields: [{ key: "id" }, { key: "title" }, { key: "description" }],
      },
    ],
  },
});
```

## 属性样式配置

```js
// 默认配置
const itemStyle = {
  bgColor: ["#fff", "#fafafa"], // 背景色  数组(循环赋颜色) | 字符串
  color: "#000",
  fontSize: 14,
  fontWeight: 400,
};

// 全局配置
graph.setOptions({
  headerStyle = {
    bgColor: ['#ff0', '#ccc'],
    // bgColor: '#fff'
    ...
  };
})

// 节点私有配置
graph.setOptions({
  data: {
    nodes: [
      {
        id: "a",
        label: "表1",
        // 节点私有配置
        itemStyle: {
          color: '#0f0',
          ...
        },
        // 字段列表
        fields: [{ key: "id" }, { key: "title" }, { key: "description" }],
      },
    ],
  },
});

// 属性私有配置
graph.setOptions({
  data: {
    nodes: [
      {
        id: "a",
        label: "表1",
        // 字段列表
        fields: [
          {
            key: "id",
            // 属性私有配置
            itemStyle: {
              color: '#0f0',
              ...
          }
        }],
      },
    ],
  },
});
```

## 连线样式

```js
// 默认配置
export const edgeCfg = {
  lineWidth: 1, // 线宽
  color: "#5B8FF9", // 颜色
  lineDash: [0, 0], // 虚线配置   [0, 0] 表示实线
  // 连线 path函数
  path: (startPoint, endPoint) => {
    // startPoint.x 起点 x 坐标
    // startPoint.y 起点 y 坐标
    // endPoint.x 终点 x 坐标
    // endPoint.y 终点 y 坐标
    return [
      // 直线
      // ["M", startPoint.x, startPoint.y],
      // ["L", endPoint.x, endPoint.y],

      // 贝塞尔曲线
      ["M", startPoint.x, startPoint.y],
      [
        "C",
        // 控制点1
        endPoint.x / 3 + (2 / 3) * startPoint.x,
        startPoint.y,
        // 控制点2
        endPoint.x / 3 + (2 / 3) * startPoint.x,
        endPoint.y,
        // 终点
        endPoint.x,
        endPoint.y,
      ],
    ];
  },
};

// 全局配置
graph.setOptions({
  edgeCfg: {
    lineWidth: 2,
    ...
  }
});

// 私有配置
graph.setOptions({
  data: {
    edges: [
      {
        source: "a", // 原表
        sourceKey: "title", // 原表字段
        target: "b", // 目标表
        targetKey: "name", // 目标表字段
        // 私有配置
        edgeCfg: {
          color: 'red',
          ...
        }
      },
    ],
  },
});
```
