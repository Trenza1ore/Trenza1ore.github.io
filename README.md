# Hugo Huang - Personal Website

Welcome to my personal website! This is a modern, colorful portfolio built with Hugo showcasing my work in AI research and reinforcement learning.

## 🚀 Features

- **Modern Design**: Clean, colorful, and playful design with smooth animations
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Fast**: Built with Hugo for lightning-fast performance
- **Blog Ready**: Integrated blog system for sharing thoughts and research
- **SEO Optimized**: Proper meta tags and structured data

## 🎨 Design Highlights

- **Colorful Gradients**: Beautiful gradient backgrounds and text effects
- **Floating Animations**: Playful animated shapes in the hero section
- **Smooth Transitions**: Hover effects and scroll animations
- **Modern Typography**: Clean, readable fonts with proper hierarchy

## 📁 Project Structure

```
.
├── content/           # Blog posts and content
├── themes/           # Custom Hugo theme
│   └── hugo-theme/
│       ├── layouts/  # HTML templates
│       ├── static/   # CSS, JS, and assets
│       └── ...
├── hugo.toml         # Hugo configuration
└── README.md         # This file
```

## 🛠️ Development

### Prerequisites

- [Hugo](https://gohugo.io/installation/) (Extended version recommended)
- Git

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/Trenza1ore/trenza1ore.github.io.git
   cd trenza1ore.github.io
   ```

2. Start the development server:
   ```bash
   hugo server --buildDrafts --buildFuture
   ```

3. Open your browser and visit `http://localhost:1313`

### Building for Production

```bash
hugo --minify
```

The built site will be in the `public/` directory.

## 📝 Adding Content

### New Blog Post

```bash
hugo new content blog/my-new-post.md
```

### Blog Post Front Matter

```yaml
---
title: "Your Post Title"
date: 2024-01-15
draft: false
tags: ["tag1", "tag2"]
---
```

## 🎯 Customization

### Colors and Theme

The color scheme is defined in `themes/hugo-theme/static/css/style.css` using CSS custom properties:

```css
:root {
    --primary: #6366f1;
    --secondary: #ec4899;
    --accent: #f59e0b;
    /* ... more colors */
}
```

### Configuration

Edit `hugo.toml` to update:
- Site title and description
- Social media links
- Navigation menu
- Base URL

## 🚀 Deployment

This site is configured for GitHub Pages deployment. The site will be automatically built and deployed when you push to the main branch.

### Manual Deployment

1. Build the site:
   ```bash
   hugo --minify
   ```

2. Push the `public/` directory to your GitHub Pages branch

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Website**: https://trenza1ore.github.io
- **GitHub**: https://github.com/Trenza1ore
- **LinkedIn**: https://uk.linkedin.com/in/hugohuang123
- **Google Scholar**: https://scholar.google.com/citations?user=1TIEH0EAAAAJ

---

Built with ❤️ using [Hugo](https://gohugo.io/) 