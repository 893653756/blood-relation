/**
 * 自定义表节点行为
 */
import { registerBehavior } from "@antv/g6";
import { BEHAVIOR_SCROLL } from "./cfg";

registerBehavior(BEHAVIOR_SCROLL, {
  getEvents() {
    return {
      wheel: "scroll", // 滚动
    };
  },
  scroll(e) {
    e.preventDefault();
    // 获取当前鼠标在哪个节点里
    const { graph } = this;

    const nodes = graph.getNodes().filter((item) => {
      const model = item.getModel();
      // 获取节点包围盒
      const { minX, minY, maxX, maxY } = item.getBBox();
      // 转换 鼠标的坐标  30为节点头部高度
      const { x, y } = graph.getPointByClient(
        e.clientX,
        e.clientY - model.nodeCfg.headerHeight
      );
      return x < maxX && x > minX && y > minY && y < maxY;
    });
    // console.log(e, this, nodes)
    if (nodes) {
      nodes.forEach((item) => {
        const model = item.getModel();
        const { nodeCfg } = model;
        if (model.fields.length <= nodeCfg.itemCount) {
          return;
        }
        let deltaY = e.deltaY;
        // 火狐浏览器特殊处理
        if (navigator.userAgent.indexOf("Firefox") > -1) {
          deltaY = -e.wheelDelta * 40;
        }
        // 边界处理
        if (model.startIndex === 0 && deltaY < 0) {
          return;
        }
        if (
          model.startIndex === model.fields.length - nodeCfg.itemCount &&
          deltaY > 0
        ) {
          return;
        }
        // console.warn("deltaY", deltaY);
        // console.log('model.startIndex', model.startIndex)
        const idx = model.startIndex || 0;
        let startIndex = idx + deltaY * 0.01;

        if (startIndex <= 0) {
          startIndex = 0;
        }
        if (startIndex > model.fields.length - nodeCfg.itemCount) {
          startIndex = model.fields.length - nodeCfg.itemCount;
        }
        // console.log('startIndex', startIndex)
        graph.updateItem(item, { startIndex });
        // console.log('item', item)
        // 更新连线
        requestAnimationFrame(() => {
          const edges = item.getEdges();
          // console.log('edges', edges)
          edges.forEach((e) => graph.refreshItem(e));
        });
      });
    }
  },
});
