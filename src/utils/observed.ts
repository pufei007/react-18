class Observed {
  static instance: Observed;

  list: any = {};

  constructor() {
    if (!Observed.instance) {
      Observed.instance = this;
    }
  }

  // 订阅
  on(event: string, fn: Function) {
    const _this = Observed.instance;
    (_this.list[event] || (_this.list[event] = [])).push(fn);
    return _this;
  }

  // 取消
  remove(event: string, fn?: Function) {
    const _this = Observed.instance;
    const fns = _this.list[event];

    if (!Array.isArray(fns) || !fns?.length) {
      return false;
    }

    if (!fn) {
      fns.length = 0;
    } else {
      for (let i = 0; i < fns.length; i++) {
        if (fns[i] === fn) {
          fns.splice(i, 1);
          break;
        }
      }
    }

    return _this;
  }

  // 发布
  emit(event: string, data?: any) {
    const _this = Observed.instance;
    const fns = [...(_this.list[event] || [])];

    if (!fns?.length) {
      return false;
    }

    fns.forEach((fs) => {
      fs(data);
    });

    return _this;
  }
}
export default new Observed();
