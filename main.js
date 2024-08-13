import "./style.css";

import { initGraph } from "./dist/index";

const graph = initGraph("app");

graph.setOptions({
  nodeCfg: {
    itemCount: 6, // 出现滚动条的阈值
  },
  data: {
    nodes: [
      {
        id: "info",
        label: "info",
        nodeCfg: {
          color: "#4CAF50",
        },
        headerTextStyle: {
          color: "#f00",
          fontSize: 20,
          fontWeight: 600,
        },
        fields: [
          {
            key: "id",
            type: "number(6)",
          },
          {
            key: "key",
            type: "varchar(255)",
          },
          {
            key: "gender",
            type: "enum(M, F)",
          },
          {
            key: "birthday",
            type: "date",
          },
          {
            key: "hometown",
            type: "varchar(255)",
          },
          {
            key: "country",
            type: "varchar(255)",
          },
          {
            key: "xxxxx",
            type: "varchar(255)",
          },
        ],
      },
      {
        id: "job",
        label: "Job",
        nodeCfg: {
          width: 180, // 节点宽度
          itemCount: 9, // 出现滚动条的阈值
          itemHeight: 30, // 字段节点高度
          headerHeight: 40, // 节点头部高度
          footerHeight: 14, // 底部高度, 当有滚动条时生效
          borderWidth: 2,
          color: "#4273f6", // 节点主色调
          radius: 4, // 圆角
        },
        itemStyle: {
          bgColor: ["#fff", "#fafafa"],
          color: "#0f0",
          fontSize: 14,
          fontWeight: 400,
        },
        fields: [
          {
            key: "id",
            type: "number(3)",
            itemStyle: {
              bgColor: "rgba(255,0,0,0.4)",
              color: "#f0f",
            },
          },
          {
            key: "title",
            type: "varchar(255)",
            itemStyle: {
              lineWidth: 1,
            },
          },
          {
            key: "level",
            type: "number(3)",
          },
        ],
      },
      {
        id: "dept",
        label: "dept",
        nodeCfg: {
          color: "pink", // 节点主色调
          radius: 4, // 圆角
        },
        headerStyle: {
          color: "#000",
        },
        fields: [
          {
            key: "id",
            type: "number(6)",
          },
          {
            key: "title",
            type: "varchar(255)",
          },
          {
            key: "desc",
            type: "text",
          },
          {
            key: "parent",
            type: "number(6)",
          },
          {
            key: "manager",
            type: "number(6)",
          },
        ],
      },
    ],
    edges: [
      {
        source: "info",
        sourceKey: "key",
        target: "job",
        targetKey: "id",
        edgeCfg: {
          lineWidth: 1,
          color: "#f00",
          lineDash: [4, 2],
        },
      },
      {
        source: "info",
        sourceKey: "jobId",
        target: "job",
        targetKey: "title",
      },
      {
        source: "job",
        sourceKey: "title",
        target: "dept",
        targetKey: "id",
        edgeCfg: {
          path: (startPoint, endPoint) => {
            return [
              // 直线
              ["M", startPoint.x, startPoint.y],
              ["L", endPoint.x, endPoint.y],
            ];
          },
        },
      },
    ],
  },
});
