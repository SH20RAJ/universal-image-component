// app/components/Img.js

import { Buffer } from "buffer";

const Img = async ({
  src,
  mode = "normal",
  width,
  height,
  format,
  fit,
  text,
  theme,
  fontsize,
  ...props
}) => {
  let finalSrc = src;

  if (mode === "base64") {
    try {
      const response = await fetch(src);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString("base64");
      const mimeType = response.headers.get("content-type");
      finalSrc = `data:${mimeType};base64,${base64}`;
    } catch (error) {
      console.error("Error converting image to base64:", error);
      finalSrc = src; // Fallback to the original URL in case of error
    }
  } else if (mode === "cdn") {
    const encodedUrl = encodeURIComponent(src);
    let cdnUrl = `https://imagecdn.app/v2/image/${encodedUrl}`;
    const queryParams = [];
    if (width) queryParams.push(`width=${width}`);
    if (height) queryParams.push(`height=${height}`);
    if (format) queryParams.push(`format=${format}`);
    if (fit) queryParams.push(`fit=${fit}`);
    if (queryParams.length) cdnUrl += `?${queryParams.join("&")}`;
    finalSrc = cdnUrl;
  } else if (mode === "text") {
    if (!text) {
      throw new Error("Text must be provided for text mode");
    }
    const encodedText = encodeURIComponent(text);
    const params = [];
    if (theme) params.push(`theme=${theme}`);
    if (fontsize) params.push(`fontsize=${fontsize}`);
    const queryString = params.length ? `/${params.join(",")}` : "";
    finalSrc = `https://cdn.statically.io/og${queryString}/${encodedText}.jpg`;
  } else if (mode === "textbase") {
    if (!text) {
      throw new Error("Text must be provided for textbase mode");
    }
    const encodedText = encodeURIComponent(text);
    const params = [];
    if (theme) params.push(`theme=${theme}`);
    if (fontsize) params.push(`fontsize=${fontsize}`);
    const queryString = params.length ? `/${params.join(",")}` : "";
    const url = `https://cdn.statically.io/og${queryString}/${encodedText}.jpg`;

    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString("base64");
      const mimeType = response.headers.get("content-type");
      finalSrc = `data:${mimeType};base64,${base64}`;
    } catch (error) {
      console.error("Error converting textbase image to base64:", error);
      finalSrc = url; // Fallback to the original URL in case of error
    }
  } else if (mode === "next") {
    // Dynamically import `next/image` only if running in a Next.js environment
    try {
      const { default: Image } = await import("next/image");
      return (
        <Image
          src={src}
          width={width}
          height={height}
          {...props} // Apply all other props like alt, className, etc.
        />
      );
    } catch (error) {
      console.error("Error loading next/image:", error);
      // Fallback to a normal <img> if `next/image` cannot be loaded
      return (
        <img
          src={finalSrc}
          width={width || "auto"}
          height={height || "auto"}
          {...props} // Apply all other props like alt, className, etc.
        />
      );
    }
  } else if (mode === "cloudinary") {
    const encodedUrl = encodeURIComponent(src);
    let cdnUrl = `https://res.cloudinary.com/practicaldev/image/fetch/s--8uhQJctp--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/${encodedUrl}`;
    const queryParams = [];
    if (width) queryParams.push(`width=${width}`);
    if (height) queryParams.push(`height=${height}`);
    if (format) queryParams.push(`format=${format}`);
    if (fit) queryParams.push(`fit=${fit}`);
    if (queryParams.length) cdnUrl += `?${queryParams.join("&")}`;
    finalSrc = cdnUrl;
  }

  return (
    <img
      src={finalSrc}
      width={width || "auto"}
      height={height || "auto"}
      {...props} // Apply all other props like alt, className, etc.
    />
  );
};

export default Img;
