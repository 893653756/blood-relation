/**
 * 自定义表属性连线
 */
import { registerEdge, Arrow } from "@antv/g6";
import { EDGE_TYPE, nodeCfg } from "./cfg";

function getOffsetY(cfg, node, keyName) {
  const { nodeCfg } = node;
  // 查找是源节点的第几个属性
  const index = node.fields.findIndex((v) => v.key === cfg[keyName]);
  const startIndex = node.startIndex || 0;
  // 偏移量
  let offsetY = nodeCfg.headerHeight / 2;
  if (index > startIndex - 1) {
    offsetY =
      nodeCfg.headerHeight + (index - startIndex + 0.5) * nodeCfg.itemHeight;
    offsetY = Math.min(
      offsetY,
      nodeCfg.headerHeight +
        nodeCfg.itemCount * nodeCfg.itemHeight +
        nodeCfg.footerHeight / 2
    );
  }
  return offsetY;
}

registerEdge(EDGE_TYPE, {
  draw(cfg, group) {
    const { edgeCfg } = cfg;
    // console.log("edgeCfg", edgeCfg);
    const edge = group.cfg.item;
    // 获取源节点
    const sourceNode = edge.getSource().getModel();
    const sourceY = getOffsetY(cfg, sourceNode, "sourceKey");
    // 获取目标节点
    const targetNode = edge.getTarget().getModel();
    const targetY = getOffsetY(cfg, targetNode, "targetKey");
    // console.log('sourceY', sourceY)
    const startPoint = {
      ...cfg.startPoint,
    };
    const endPoint = {
      ...cfg.endPoint,
    };
    startPoint.y = startPoint.y + sourceY;
    endPoint.y = endPoint.y + targetY;
    // console.log(startPoint.x, startPoint.y)
    let keyShape;
    if (sourceNode.id !== targetNode.id) {
      keyShape = group.addShape("path", {
        attrs: {
          stroke: edgeCfg.color,
          cursor: "pointer",
          path: edgeCfg.path(startPoint, endPoint),
          endArrow: {
            path: Arrow.triangle(6, 8, 0),
            d: 0,
            fill: edgeCfg.color,
            stroke: edgeCfg.color,
            lineDash: [0, 0],
          },
          lineDash: edgeCfg.lineDash,
          lineWidth: edgeCfg.lineWidth,
          lineAppendWidth: 8,
        },
        originLineDash: edgeCfg.lineDash,
        name: "path-shape",
      });
    }
    return keyShape;
  },
  setState(name, value, item) {
    const shape = item.get("keyShape");
    // console.log(shape);
    const lineDash = shape.get("originLineDash");
    if (name === "running") {
      if (value) {
        let index = 0;
        shape.animate(
          () => {
            index++;
            if (index > 9) {
              index = 0;
            }
            const res = {
              lineDash: [4, 2, 1, 2],
              lineDashOffset: -index,
            };
            return res;
          },
          {
            repeat: true,
            duration: 3000,
          }
        );
      } else {
        // shape.stopAnimate();
        shape.pauseAnimate();
        shape.attr("lineDash", lineDash);
      }
    }
  },
});
