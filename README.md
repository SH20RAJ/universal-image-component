# Universal Image Component 📸

`universal-img-component` is a versatile React component that simplifies handling images in various modes, including Base64, CDN, text-based images, and Next.js optimization. Perfect for any project needing dynamic image handling!

![npm](https://img.shields.io/npm/v/universal-img-component)
[![Visitors](https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2FSH20RAJ%2Funiversal-image-component&labelColor=%23ba68c8&countColor=%232ccce4&style=flat&labelStyle=none)](https://visitorbadge.io/status?path=https%3A%2F%2Fgithub.com%2FSH20RAJ%2Funiversal-image-component)
[![GitHub issues](https://img.shields.io/github/issues/SH20RAJ/universal-image-component)](https://github.com/SH20RAJ/universal-image-component/issues)
[![GitHub discussions](https://img.shields.io/github/discussions/SH20RAJ/universal-image-component)](https://github.com/SH20RAJ/universal-image-component/discussions)
[![GitHub stars](https://img.shields.io/github/stars/SH20RAJ/universal-image-component)](https://github.com/SH20RAJ/universal-image-component/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/SH20RAJ/universal-image-component)](https://github.com/SH20RAJ/universal-image-component/network)
[![GitHub license](https://img.shields.io/github/license/SH20RAJ/universal-image-component)]()

## Features ✨

- **Normal Mode**: Display images using standard URLs.
- **Base64 Mode**: Convert images to Base64 format.
- **CDN Mode**: Optimize images using a CDN service.
- **Text Mode**: Create text-based images with Statically’s Open Graph service.
- **TextBase Mode**: Convert text-based image URLs to Base64.
- **Next Mode**: Use Next.js `Image` component for optimization (in a Next.js environment).

## Installation 🚀

To get started, install the package via npm or yarn:

```bash
npm install universal-img-component
# or
yarn add universal-img-component
```

## Usage 📚

### Importing the Component

Import the `Img` component:

```jsx
import Img from 'universal-img-component';
```

### Normal Mode 🖼️

Displays an image using the standard URL:

```jsx
<Img src="https://via.placeholder.com/150" alt="placeholder" mode="normal" width="150" height="150" />
```

### Base64 Mode 🔄

Converts the image to Base64 format:

```jsx
<Img src="https://via.placeholder.com/150" alt="placeholder" mode="base64" width="150" height="150" />
```

### CDN Mode 🌐

Uses a CDN to serve and optimize the image:

```jsx
<Img
  src="https://via.placeholder.com/150"
  alt="placeholder"
  mode="cdn"
  width="300"
  height="300"
  format="webp"
  fit="cover"
/>
```

### Text Mode 📝

Generates an image with text using Statically’s Open Graph service:

```jsx
<Img
  src=""
  mode="text"
  text="Hello World"
  theme="dark"
  fontsize="24px"
  width="800"
  height="400"
  alt="Open Graph Image"
/>
```

### TextBase Mode 🖋️

Generates a text-based image URL and converts it to Base64 format:

```jsx
<Img
  src=""
  mode="textbase"
  text="Hello World"
  theme="dark"
  fontsize="80px"
  width="800"
  height="400"
  alt="Base64 Open Graph Image"
/>
```

### Next Mode 🚀

Uses Next.js `Image` component for optimized handling:

```jsx
<Img src="https://via.placeholder.com/150" alt="placeholder" mode="next" width={150} height={150} />
```

## Props 🛠️

- `src` (string): The source URL or text for the image.
- `mode` (string): Mode to use. Options: `"normal"`, `"base64"`, `"cdn"`, `"text"`, `"textbase"`, `"next"`. Default is `"normal"`.
- `width` (string|number): Width of the image. Applies to all modes.
- `height` (string|number): Height of the image. Applies to all modes.
- `format` (string): Format of the image in CDN mode (e.g., `"webp"`, `"jpg"`, `"png"`).
- `fit` (string): Fit mode in CDN mode (e.g., `"cover"`, `"contain"`, `"fill"`, `"inside"`, `"outside"`).
- `text` (string): Text for text modes (`"text"` and `"textbase"`).
- `theme` (string): Theme for text-based images (e.g., `"dark"`). Applies to text modes.
- `fontsize` (string): Font size for text-based images (e.g., `"24px"`). Applies to text modes.

## License 📜

This package is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contact 📫

For any questions or feedback, feel free to open an issue or join the discussion on [GitHub Issues](https://github.com/SH20RAJ/universal-image-component/issues) and [GitHub Discussions](https://github.com/SH20RAJ/universal-image-component/discussions). You can also reach out via email at [sh20raj@gmail.com](mailto:sh20raj@gmail.com).

