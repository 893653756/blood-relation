/**
 * 节点文字显示字段
 */
export const textField = "key";
/**
 * 节点类型
 */
export const NODE_TYPE = Symbol("node");

export const nodeCfg = {
  width: 220, // 节点宽度
  itemCount: 12, // 出现滚动条的阈值
  itemHeight: 36, // 字段节点高度
  headerHeight: 40, // 节点头部高度
  footerHeight: 28, // 底部高度, 当有分页时生效
  borderWidth: 2,
  color: "#4273f6", // 节点主色调
  radius: 4, // 圆角
  isPagination: false, // 是否分页 (当字段较多时，可以开启)
  pageSize: 10, // 分页条数
  page: 1,
};

/**
 * 头部文字样式
 */

export const headerStyle = {
  color: "#fff",
  fontSize: 16,
  fontWeight: 500,
};

/**
 * 属性样式设置
 */
export const itemStyle = {
  bgColor: ["#fff", "#fafafa"],
  color: "#000",
  fontSize: 14,
  fontWeight: 400,
};

/**
 * 连线类型
 */
export const EDGE_TYPE = Symbol("edge");

/**
 * 连线样式
 */
export const edgeCfg = {
  lineWidth: 1,
  color: "#5B8FF9",
  lineDash: [0, 0],
  path: (startPoint, endPoint) => {
    return [
      // 直线
      // ["M", startPoint.x, startPoint.y],
      // ["L", endPoint.x, endPoint.y],

      // 贝塞尔曲线
      ["M", startPoint.x, startPoint.y],
      [
        "C",
        endPoint.x / 3 + (2 / 3) * startPoint.x,
        startPoint.y,
        endPoint.x / 3 + (2 / 3) * startPoint.x,
        endPoint.y,
        endPoint.x,
        endPoint.y,
      ],
    ];
  },
};

/**
 * 滚动行为
 */
export const BEHAVIOR_SCROLL = Symbol("scroll");

export const scrollWidth = 8;
