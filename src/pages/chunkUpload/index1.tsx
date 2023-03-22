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

  async function handleUpload() {
    if (!file) return;

    setUploading(true);
    setProgress(0);

    const chunkInfos: any = await getChunkInfos(file);

    for (const chunkInfo of chunkInfos) {
      await uploadChunk(chunkInfo);
    }

    await mergeChunks(file.name, chunkInfos.length);

    setUploading(false);
  }

  async function getChunkInfos(file: File): Promise<ChunkInfo[]> {
    const chunkInfos: ChunkInfo[] = [];
    let start = 0;
    while (start < file.size) {
      const chunkSize = Math.min(MAX_CHUNK_SIZE, file.size - start);
      const chunk = file.slice(start, start + chunkSize);
      const md5 = await calculateMd5(chunk);
      chunkInfos.push({ index: chunkInfos.length, size: chunkSize, md5 });
      start += chunkSize;
    }
    return chunkInfos;
  }

  async function calculateMd5(chunk: Blob): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(chunk);
      reader.onload = () => {
        const buffer = reader.result as ArrayBuffer;
        const md5 = window.crypto.subtle.digest("MD5", buffer);
        resolve(
          Array.from(new Uint8Array(md5 as any))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("")
        );
      };
    });
  }

  async function uploadChunk(chunkInfo: ChunkInfo) {
    const chunk = file?.slice(
      chunkInfo.index * MAX_CHUNK_SIZE,
      (chunkInfo.index + 1) * MAX_CHUNK_SIZE
    );
    if (!chunk) return;

    const formData = new FormData();
    formData.append("file", chunk);
    formData.append("filename", file?.name);
    formData.append("chunkIndex", String(chunkInfo.index));
    formData.append("chunks", String(chunkInfos?.length));
    formData.append("md5", chunkInfo.md5);

    try {
      await axios.post<UploadResponse>(UPLOAD_URL, formData);
      setProgress(((chunkInfo.index + 1) / chunkInfos?.length) * 100);
    } catch (error) {
      console.error(error);
    }
  }

  async function mergeChunks(filename: string, chunks: number) {
    try {
      await axios.post<MergeResponse>(MERGE_URL, { filename, chunks });
      console.log(`File "${filename}" uploaded successfully.`);
    } catch (error) {
      console.error(error);
    }
  }

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
