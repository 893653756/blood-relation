import "./style.css";

import { initGraph } from "./dist/blood-relation";

const graph = initGraph("app");

graph.setOptions({
  data: {
    nodes: [
      {
        id: "a",
        label: "表1",
        fields: [{ key: "id" }, { key: "title" }, { key: "description" }],
      },
      {
        id: "b",
        label: "表2",
        fields: [{ key: "name" }, { key: "birthday" }, { key: "sex" }],
      },
    ],
    edges: [
      {
        source: "a",
        sourceKey: "title",
        target: "b",
        targetKey: "name",
      },
    ],
  },
});
