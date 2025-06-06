# Blog Images

This directory contains images used in blog posts.

## How to Add Images to Your Blog Posts

### 1. Add Image Files
Place your image files in this directory (`public/blog/images/`).

Supported formats:
- JPG/JPEG
- PNG
- WebP
- SVG

### 2. Reference Images in Markdown
In your markdown files, reference images using one of these methods:

#### Method 1: Relative Path (Recommended)
```markdown
![Alt text](image-filename.jpg)
```

#### Method 2: Absolute Path
```markdown
![Alt text](/blog/images/image-filename.jpg)
```

### 3. Image with Caption
The alt text will automatically be displayed as a caption below the image:

```markdown
![This is the caption that will appear below the image](workspace-setup.jpg)
```

### 4. Best Practices

- **Use descriptive filenames**: `workspace-setup.jpg` instead of `img1.jpg`
- **Optimize image sizes**: Keep images under 1MB for better performance
- **Use appropriate formats**: 
  - JPG for photos
  - PNG for screenshots with text
  - WebP for best compression
- **Include alt text**: Always provide meaningful alt text for accessibility

### 5. Example Usage

```markdown
---
title: "My Blog Post"
description: "A blog post with images"
date: "2025-01-15"
author: "Yash"
tags: ["example"]
---

# My Blog Post

Here's a screenshot of my development setup:

![My development workspace with dual monitors](workspace-setup.jpg)

And here's a diagram showing the architecture:

![System architecture diagram](architecture-diagram.png)
```

## Image Processing
Images are automatically optimized using Next.js Image component, which provides:
- Automatic format optimization
- Responsive images
- Lazy loading
- Proper sizing

Place your images in this directory and reference them in your markdown files! 