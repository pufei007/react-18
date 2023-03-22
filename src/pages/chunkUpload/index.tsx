import React, { useState } from "react";
import axios from "axios";

const UPLOAD_URL = "http://localhost:3000/upload";
const MERGE_URL = "http://localhost:3000/merge";

const MAX_CHUNK_SIZE = 1024 * 1024 * 10; // 10MB

interface ChunkInfo {
  index: number;
  size: number;
  md5: string;
}

interface UploadResponse {
  message: string;
}

interface MergeResponse {
  message: string;
}

function App() {
  const [file, setFile] = useState<File | any>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  let chunkInfos: any;

  // 请求基准地址
  axios.defaults.baseURL = "http://localhost:3000";
  // 选中的文件
  // var file = null;
  // 选择文件
  // document.getElementById("fileInput").onchange = function ({
  //   target: { files },
  // }) {
  //   file = files[0];
  // };
  // 开始上传
  const handleUpload = () => {
    if (!file) return;
    // 创建切片
    // let size = 1024 * 1024 * 10; //10MB 切片大小
    let size = 1024 * 50; //50KB 切片大小
    let fileChunks = [];
    let index = 0; //切片序号
    for (let cur = 0; cur < file.size; cur += size) {
      fileChunks.push({
        hash: index++,
        chunk: file.slice(cur, cur + size),
      });
    }
    // 控制并发和断点续传
    const uploadFileChunks = async function (list: any) {
      if (list.length === 0) {
        //所有任务完成,合并切片
        await axios({
          method: "get",
          url: "/merge",
          params: {
            filename: file.name,
          },
        });
        console.log("上传完成");
        return;
      }
      let pool: any[] = []; //并发池
      let max = 3; //最大并发量
      let finish = 0; //完成的数量
      let failList: any[] = []; //失败的列表
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        let formData = new FormData();
        formData.append("filename", file.name);
        formData.append("hash", item.hash);
        formData.append("chunk", item.chunk);
        // 上传切片
        let task = axios({
          method: "post",
          url: "/upload",
          data: formData,
        });
        task
          .then((data) => {
            //请求结束后将该Promise任务从并发池中移除
            let index = pool.findIndex((t) => t === task);
            pool.splice(index);
          })
          .catch(() => {
            failList.push(item);
          })
          .finally(() => {
            finish++;
            //所有请求都请求完成
            if (finish === list.length) {
              uploadFileChunks(failList);
            }
          });
        pool.push(task);
        if (pool.length === max) {
          //每当并发池跑完一个任务，就再塞入一个任务
          await Promise.race(pool);
        }
      }
    };
    uploadFileChunks(fileChunks);
  };

  // async function handleUpload() {
  //   if (!file) return;

  //   setUploading(true);
  //   setProgress(0);

  //   const chunkInfos: any = await getChunkInfos(file);

  //   for (const chunkInfo of chunkInfos) {
  //     await uploadChunk(chunkInfo);
  //   }

  //   await mergeChunks(file.name, chunkInfos.length);

  //   setUploading(false);
  // }

  // async function getChunkInfos(file: File): Promise<ChunkInfo[]> {
  //   const chunkInfos: ChunkInfo[] = [];
  //   let start = 0;
  //   while (start < file.size) {
  //     const chunkSize = Math.min(MAX_CHUNK_SIZE, file.size - start);
  //     const chunk = file.slice(start, start + chunkSize);
  //     const md5 = await calculateMd5(chunk);
  //     chunkInfos.push({ index: chunkInfos.length, size: chunkSize, md5 });
  //     start += chunkSize;
  //   }
  //   return chunkInfos;
  // }

  // async function calculateMd5(chunk: Blob): Promise<string> {
  //   return new Promise((resolve) => {
  //     const reader = new FileReader();
  //     reader.readAsArrayBuffer(chunk);
  //     reader.onload = () => {
  //       const buffer = reader.result as ArrayBuffer;
  //       const md5 = window.crypto.subtle.digest("MD5", buffer);
  //       resolve(
  //         Array.from(new Uint8Array(md5 as any))
  //           .map((b) => b.toString(16).padStart(2, "0"))
  //           .join("")
  //       );
  //     };
  //   });
  // }

  // async function uploadChunk(chunkInfo: ChunkInfo) {
  //   const chunk = file?.slice(
  //     chunkInfo.index * MAX_CHUNK_SIZE,
  //     (chunkInfo.index + 1) * MAX_CHUNK_SIZE
  //   );
  //   if (!chunk) return;

  //   const formData = new FormData();
  //   formData.append("file", chunk);
  //   formData.append("filename", file?.name);
  //   formData.append("chunkIndex", String(chunkInfo.index));
  //   formData.append("chunks", String(chunkInfos?.length));
  //   formData.append("md5", chunkInfo.md5);

  //   try {
  //     await axios.post<UploadResponse>(UPLOAD_URL, formData);
  //     setProgress(((chunkInfo.index + 1) / chunkInfos?.length) * 100);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // async function mergeChunks(filename: string, chunks: number) {
  //   try {
  //     await axios.post<MergeResponse>(MERGE_URL, { filename, chunks });
  //     console.log(`File "${filename}" uploaded successfully.`);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target?.files?.[0])} />
      <button onClick={handleUpload} disabled={!file || uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {progress > 0 && progress < 100 && <div>{Math.round(progress)}%</div>}
      {progress === 100 && <div>Upload completed!</div>}
    </div>
  );
}

export default App;
