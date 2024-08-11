/**
 * 自定义节点
 */
import { registerNode } from "@antv/g6";
import { NODE_TYPE, scrollWidth } from "./cfg";

registerNode(NODE_TYPE, {
  draw(cfg, group) {
    const { fields = [], startIndex = 0, nodeCfg, headerStyle } = cfg;
    // 是否超出限制, 出现滚动条
    const hansScroll = fields.length > nodeCfg.itemCount;
    // 主体高度
    const bodyHeight = hansScroll
      ? nodeCfg.itemCount * nodeCfg.itemHeight
      : fields.length * nodeCfg.itemHeight;
    // 节点高度
    const nodeHeight =
      nodeCfg.headerHeight +
      bodyHeight +
      (hansScroll ? nodeCfg.footerHeight : nodeCfg.borderWidth);
    // 定义表主框架
    const keyShape = group.addShape("rect", {
      attrs: {
        x: 0,
        y: 0,
        width: nodeCfg.width,
        height: nodeHeight,
        fill: nodeCfg.color,
        // fillOpacity: 0.3,
        cursor: "move",
        radius: nodeCfg.radius,
      },
    });
    // 头部
    group.addShape("rect", {
      attrs: {
        height: nodeCfg.headerHeight,
        width: nodeCfg.width,
        radius: [nodeCfg.radius, nodeCfg.radius, 0, 0],
        cursor: "move",
      },
      draggable: true,
    });
    // 头部标题
    group.addShape("text", {
      attrs: {
        x: 12,
        y: nodeCfg.headerHeight / 2,
        fill: headerStyle.color,
        text: cfg.label,
        fontSize: headerStyle.fontSize,
        cursor: "move",
        fontWeight: headerStyle.fontWeight,
        textBaseline: "middle",
        textAlign: "left",
      },
      draggable: true,
    });
    // 添加底部
    if (hansScroll) {
      group.addShape("rect", {
        attrs: {
          x: 0,
          y: nodeCfg.headerHeight + bodyHeight,
          width: nodeCfg.width,
          height: nodeCfg.footerHeight,
          radius: [0, 0, nodeCfg.radius, nodeCfg.radius],
        },
      });
    }
    // 超过数量限制时
    const showFields = fields.slice(
      Math.floor(startIndex),
      Math.floor(startIndex + nodeCfg.itemCount)
    );
    const offsetY = (startIndex % 1) * nodeCfg.itemCount + nodeCfg.headerHeight;
    // 列表框
    const listContainer = group.addGroup({});
    const _radius = hansScroll ? 0 : nodeCfg.radius;
    listContainer.setClip({
      type: "rect",
      attrs: {
        x: 0,
        y: nodeCfg.headerHeight,
        width: nodeCfg.width,
        height: bodyHeight,
        radius: [0, 0, _radius, _radius],
      },
    });
    listContainer.addShape("rect", {
      attrs: {
        fill: "#ffffff",
        x: nodeCfg.borderWidth,
        y: nodeCfg.headerHeight,
        width: nodeCfg.width - nodeCfg.borderWidth * 2,
        height: bodyHeight,
        radius: [0, 0, _radius, _radius],
      },
      draggable: true,
    });
    // // 绘制属性
    showFields.forEach((item, i) => {
      if (i === 0) {
        // console.log(
        //   "i * nodeCfg.itemHeight + offsetY",
        //   i * nodeCfg.itemHeight + offsetY,
        //   offsetY
        // );
      }
      const { itemStyle } = item;
      let len = itemStyle.bgColor.length;

      const _bgColor = Array.isArray(itemStyle.bgColor)
        ? itemStyle.bgColor[i % len]
        : itemStyle.bgColor;
        
      listContainer.addShape("rect", {
        attrs: {
          x: nodeCfg.borderWidth,
          y: i * nodeCfg.itemHeight + offsetY,
          width: nodeCfg.width - nodeCfg.borderWidth * 2,
          height: nodeCfg.itemHeight,
          cursor: "pointer",
          fill: _bgColor,
        },
        name: `item-${cfg.id}-${item.key}`,
        meta: item,
        draggable: true,
      });
      // 字段信息
      listContainer.addShape("text", {
        attrs: {
          x: 12,
          y: i * nodeCfg.itemHeight + nodeCfg.itemHeight / 2 + offsetY,
          text: item.key,
          fontSize: itemStyle.fontSize,
          fill: itemStyle.color,
          fontWeight: itemStyle.fontWeight,
          cursor: "pointer",
          textBaseline: "middle",
          textAlign: "left",
        },
        meta: item,
      });
    });
    // 绘制滚动条
    if (hansScroll) {
      const barStyle = {
        width: scrollWidth,
        padding: 1,
        boxStyle: {
          stroke: "#282c34",
          opacity: 0.2,
        },
        innerStyle: {
          fill: "#282c34",
          opacity: 0.1,
        },
      };
      // 滚动轨道
      listContainer.addShape("rect", {
        attrs: {
          x: nodeCfg.width - barStyle.width - nodeCfg.borderWidth,
          y: nodeCfg.headerHeight,
          width: barStyle.width,
          height: bodyHeight,
          ...barStyle.boxStyle,
          radius: 4,
        },
      });
      // 滚动滑块高度
      const sliderHeight =
        (bodyHeight * bodyHeight) / (fields.length * nodeCfg.itemHeight);
      //   console.log("sliderHeight", sliderHeight);
      // 滚动条移动距离
      const moveY =
        (bodyHeight * (startIndex * nodeCfg.itemHeight)) /
        (fields.length * nodeCfg.itemHeight);
      listContainer.addShape("rect", {
        attrs: {
          x: nodeCfg.width - barStyle.padding - barStyle.width,
          y: nodeCfg.headerHeight + moveY,
          width: barStyle.width - barStyle.padding * 2,
          height: sliderHeight,
          ...barStyle.innerStyle,
          radius: 4,
        },
      });
    }
    return keyShape;
  },
  getAnchorPoints() {
    return [
      [0, 0],
      [1, 0],
    ];
  },
});
