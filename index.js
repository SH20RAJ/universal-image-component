import { Buffer } from "buffer"; // Import Buffer for base64 encoding

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
  let finalSrc = src; // Initialize finalSrc with the original source URL

  if (mode === "base64") {
    // Mode to convert the image to base64
    try {
      const response = await fetch(src); // Fetch the image data
      const arrayBuffer = await response.arrayBuffer(); // Convert the response to an array buffer
      const buffer = Buffer.from(arrayBuffer); // Create a buffer from the array buffer
      const base64 = buffer.toString("base64"); // Convert the buffer to a base64 string
      const mimeType = response.headers.get("content-type"); // Get the MIME type of the image
      finalSrc = `data:${mimeType};base64,${base64}`; // Create a data URL with the base64 string
    } catch (error) {
      console.error("Error converting image to base64:", error); // Log any errors
      finalSrc = src; // Fallback to the original URL in case of error
    }
  } else if (mode === "imagecdn") {
    // Mode to use a CDN for the image
    const encodedUrl = encodeURIComponent(src); // Encode the source URL
    let cdnUrl = `https://imagecdn.app/v2/image/${encodedUrl}`; // Construct the CDN URL
    const queryParams = []; // Initialize an array for query parameters
    if (width) queryParams.push(`width=${width}`); // Add width parameter if provided
    if (height) queryParams.push(`height=${height}`); // Add height parameter if provided
    if (format) queryParams.push(`format=${format}`); // Add format parameter if provided
    if (fit) queryParams.push(`fit=${fit}`); // Add fit parameter if provided
    if (queryParams.length) cdnUrl += `?${queryParams.join("&")}`; // Append query parameters to the CDN URL
    finalSrc = cdnUrl; // Set finalSrc to the CDN URL
  } else if (mode === "text") {
    // Mode to create a text-based image using Statically
    if (!text) {
      throw new Error("Text must be provided for text mode"); // Throw an error if text is not provided
    }
    const encodedText = encodeURIComponent(text); // Encode the text
    const params = []; // Initialize an array for parameters
    if (theme) params.push(`theme=${theme}`); // Add theme parameter if provided
    if (fontsize) params.push(`fontsize=${fontsize}`); // Add fontsize parameter if provided
    const queryString = params.length ? `/${params.join(",")}` : ""; // Construct the query string
    finalSrc = `https://cdn.statically.io/og${queryString}/${encodedText}.jpg`; // Construct the final URL
  } else if (mode === "textbase") {
    // Mode to create a text-based image and convert it to base64
    if (!text) {
      throw new Error("Text must be provided for textbase mode"); // Throw an error if text is not provided
    }
    const encodedText = encodeURIComponent(text); // Encode the text
    const params = []; // Initialize an array for parameters
    if (theme) params.push(`theme=${theme}`); // Add theme parameter if provided
    if (fontsize) params.push(`fontsize=${fontsize}`); // Add fontsize parameter if provided
    const queryString = params.length ? `/${params.join(",")}` : ""; // Construct the query string
    const url = `https://cdn.statically.io/og${queryString}/${encodedText}.jpg`; // Construct the URL

    try {
      const response = await fetch(url); // Fetch the image data
      const arrayBuffer = await response.arrayBuffer(); // Convert the response to an array buffer
      const buffer = Buffer.from(arrayBuffer); // Create a buffer from the array buffer
      const base64 = buffer.toString("base64"); // Convert the buffer to a base64 string
      const mimeType = response.headers.get("content-type"); // Get the MIME type of the image
      finalSrc = `data:${mimeType};base64,${base64}`; // Create a data URL with the base64 string
    } catch (error) {
      console.error("Error converting textbase image to base64:", error); // Log any errors
      finalSrc = url; // Fallback to the original URL in case of error
    }
  } else if (mode === "next") {
    // Mode to use Next.js Image component
    try {
      const { default: Image } = await import("next/image"); // Dynamically import the Next.js Image component
      return (
        <Image
          src={src}
          width={width}
          height={height}
          {...props} // Apply all other props like alt, className, etc.
        />
      );
    } catch (error) {
      console.error("Error loading next/image:", error); // Log any errors
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
  } else if (mode === 'cloudinary') {
    // Mode to use Cloudinary for the image
    const cloudinaryUrl = new URL(src); // Create a URL object from the source URL
    const transformations = []; // Initialize an array for transformations

    if (width) transformations.push(`w_${width}`); // Add width transformation if provided
    if (height) transformations.push(`h_${height}`); // Add height transformation if provided
    if (format) transformations.push(`f_${format}`); // Add format transformation if provided
    if (fit) transformations.push(`c_${fit}`); // Add fit transformation if provided

    const transformationString = transformations.join(','); // Construct the transformation string
    finalSrc = `https://res.cloudinary.com/practicaldev/image/fetch/${transformationString}/${cloudinaryUrl}`; // Construct the final Cloudinary URL

    if (cloudinaryUrl.search) {
      finalSrc += cloudinaryUrl.search; // Append any search parameters from the original URL
    }
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
