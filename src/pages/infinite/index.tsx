import React, { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import "./index.less";

const index = ({ itemHeight = 20, itemCount = 10 }: any) => {
  const virtualizedRef = useRef<HTMLDivElement>(null);
  const data = new Array(10000).fill("").map((_, index) => index + 1);
  const containerHeight = 10000 * itemHeight; // 所有数据站位高度
  const contentHeight = itemHeight * itemCount; // 展示区域内容总高度

  const [scrollTop, setScrollTop] = useState(0); // 滚动位置
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);
  const [showList, setShowList] = useState<any[]>(
    data.splice(startIndex, endIndex)
  );

  // 继续需要渲染的 item 索引有哪些
  // let startIndex = Math.floor(scrollTop / itemHeight);
  // let endIndex = Math.floor(scrollTop + containerHeight / itemHeight);

  // 上下额外多渲染几个 item，解决滚动时来不及加载元素出现短暂的空白区域的问题
  const paddingCount = 2;
  // startIndex = Math.max(startIndex - paddingCount, 0); // 处理越界情况
  // endIndex = Math.min(endIndex + paddingCount, itemCount - 1);

  // const top = itemHeight * startIndex; // 第一个渲染的 item 到顶部距离 // 需要渲染的 items

  // const items = [];
  // for (let i = startIndex; i <= endIndex; i++) {
  //   items.push(<Component key={i} index={i} style={{ height: itemHeight }} />);
  // }

  // useEffect(() => {
  //   const data = dataSource.slice(startIndex, startIndex + visibleCount);
  //   setShowData(data);
  // }, [startIndex, visibleCount, dataSource]);
  const onScrollChange = (e: React.WheelEvent) => {
    const top = (e.target as HTMLElement).scrollTop;
    console.log("top", top);
    const startIdx = Math.floor(top / itemHeight);
    const endIdx = Math.floor((top + contentHeight) / itemHeight);
    console.log("startIdx", startIdx);
    console.log("endIdx", endIdx);
    setScrollTop(top);
    setStartIndex(Math.max(startIdx - paddingCount, 0));
    setEndIndex(Math.min(endIdx + paddingCount, itemCount - 1));
    setShowList(data.splice(startIdx ? startIdx + 1 : 0, 12));
  };

  useEffect(() => {
    if (virtualizedRef?.current) {
      // @ts-ignore
      virtualizedRef?.current.addEventListener("scroll", onScrollChange);
    }

    return () => {
      if (virtualizedRef?.current) {
        // @ts-ignore
        virtualizedRef?.current.removeEventListener("scroll", onScrollChange);
      }
    };
  }, []);

  console.log("showList", showList);

  return (
    <div
      className="main"
      style={{ height: contentHeight }}
      ref={virtualizedRef}
    >
      <div className="scroll-box" style={{ height: containerHeight }}>
        <ul style={{ transform: `translateY(${scrollTop}px)` }}>
          {showList.map((item: any, index) => (
            <li key={index} className="item" style={{ height: itemHeight }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default index;
