import { Graph } from "@antv/g6";
import {
  NODE_TYPE,
  EDGE_TYPE,
  BEHAVIOR_SCROLL,
  nodeCfg,
  edgeCfg,
  headerStyle,
  itemStyle,
} from "./cfg";
import { debounce } from "./utils";
import "./customerNode";
import "./customerEdge";
import "./customerBehavior";
import merge from "merge";
/**
 * 初始化画布
 * @param {String | Object} dom -- id | dom节点
 */
export function initGraph(dom) {
  if (typeof dom === "string") {
    dom = document.getElementById(dom);
  }
  const { clientWidth, clientHeight } = dom;
  const graph = new Graph({
    container: dom,
    width: clientWidth,
    height: clientHeight,
    // fitView: true,
    fitCenter: true,
    animateCfg: true,
    modes: {
      default: ["drag-node", "drag-canvas", "zoom-canvas"],
    },
    defaultNode: {
      type: NODE_TYPE,
    },
    defaultEdge: {
      type: EDGE_TYPE,
    },
    layout: {
      type: "dagre",
      rankdir: "LR",
      nodesepFunc: () => 50,
      ranksepFunc: () => 150,
    },
    animate: true,
  });
  bindEvent(graph);
  const fun = debounce(() => {
    if (dom) {
      const { clientWidth, clientHeight } = dom;
      graph.changeSize(clientWidth, clientHeight);
      graph.fitCenter();
    }
  }, 250);
  window.addEventListener("resize", fun);
  return {
    setOptions: getSetOptions(graph),
    changeData: changeData(graph),
    destory() {
      window.removeEventListener("resize", fun);
      graph.destroy();
    },
  };
}

function clearEdgeState(graph, type) {
  const edges = graph.getEdges();
  edges.forEach((edge) => {
    const hasActived = edge.hasState(type);
    if (hasActived) {
      graph.setItemState(edge, type, false);
    }
  });
}

/**
 * 绑定事件
 */
function bindEvent(graph) {
  graph.on("canvas:click", () => {
    clearEdgeState(graph, "running");
  });
  graph.on("node:mouseenter", () => {
    const mode = graph.getCurrentMode();
    if (mode === "default") {
      graph.removeBehaviors("zoom-canvas", "default");
      graph.addBehaviors(BEHAVIOR_SCROLL, "default");
    }
  });
  graph.on("node:mouseleave", () => {
    const mode = graph.getCurrentMode();
    if (mode === "default") {
      graph.removeBehaviors(BEHAVIOR_SCROLL, "default");
      graph.addBehaviors("zoom-canvas", "default");
    }
  });
  graph.on("node:click", ({ item, target }) => {
    // const { item, target } = node;
    graph.setAutoPaint(false);
    const meta = target.get("meta");
    clearEdgeState(graph, "running");
    if (meta) {
      let edgeList = [];
      const model = item.getModel();
      // let root = item;
      let list = [
        {
          item: item,
          nodeId: model.id,
          field: meta.key,
        },
      ];
      // 来源
      while (list.length > 0) {
        const node = list.shift();
        const inEdges = node.item.getInEdges();
        inEdges.forEach((edge) => {
          const model = edge.getModel();
          if (node.field === model.targetKey) {
            edgeList.push(edge);
            list.push({
              item: edge.getSource(),
              nodeId: model.source,
              field: model.sourceKey,
            });
          }
        });
      }
      // 目标
      list = [
        {
          item: item,
          nodeId: model.id,
          field: meta.key,
        },
      ];
      while (list.length > 0) {
        const node = list.shift();
        const outEdges = node.item.getOutEdges();
        outEdges.forEach((edge) => {
          const model = edge.getModel();
          if (node.field === model.sourceKey) {
            edgeList.push(edge);
            list.push({
              item: edge.getTarget(),
              nodeId: model.target,
              field: model.targetKey,
            });
          }
        });
      }
      edgeList.forEach((edge) => {
        graph.setItemState(edge, "running", true);
      });
    }
    graph.paint();
    graph.setAutoPaint(true);
  });
}

function getSetOptions(graph) {
  return (options) => {
    // 设置公共 nodeCfg
    graph.commonNodeCfg = getMergeCfg(nodeCfg, options.nodeCfg);
    graph.commonHeaderTextStyle = getMergeCfg(headerStyle, options.headerStyle);
    graph.commonItemStyle = getMergeCfg(itemStyle, options.itemStyle);
    graph.commonEdgeCfg = getMergeCfg(edgeCfg, options.edgeCfg);
    renderGraph(graph, options.data);
  };
}

function renderGraph(graph, data) {
  let { nodes, edges } = data;
  nodes = nodes.map((item) => {
    return {
      ...item,
      nodeCfg: getMergeCfg(graph.commonNodeCfg, item.nodeCfg),
      headerStyle: getMergeCfg(graph.commonHeaderTextStyle, item.headerStyle),
      fields: item.fields.map((f) => {
        return {
          ...f,
          itemStyle: getMergeCfg(
            graph.commonItemStyle,
            item.itemStyle,
            f.itemStyle
          ),
        };
      }),
    };
  });
  edges = edges.map((item) => {
    return {
      ...item,
      edgeCfg: getMergeCfg(graph.commonEdgeCfg, item.edgeCfg),
    };
  });
  graph.data({ nodes, edges });
  graph.render();
}

function changeData(graph) {
  return (data) => renderGraph(graph, data);
}

function getMergeCfg(obj1, obj2, obj3) {
  let obj = {};
  merge.recursive(obj, obj1 || {}, obj2 || {}, obj3 || {});
  return obj;
}
