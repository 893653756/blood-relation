export function debounce(fn, wait) {
  let timeout = null;
  return function () {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(fn, wait);
  };
}

export function getPageFields(list, nodeCfg) {
  const { page = 1, pageSize } = nodeCfg;
  return list.slice((page - 1) * pageSize, page * pageSize);
}
