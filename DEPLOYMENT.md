# GitHub Pages Deployment Guide

## Step-by-Step Instructions

### 1. Create GitHub Repository
1. Go to [github.com](https://github.com) and sign in
2. Click "+" in the top right, select "New repository"
3. Repository name: `fawared-site` (or your-username.github.io for custom domain)
4. Set as Public
5. Do NOT initialize with README, license, or .gitignore
6. Click "Create repository"

### 2. Upload Files

#### Method A: Using GitHub Web Interface (Easiest)
1. Click "uploading an existing file" link
2. Drag and drop ALL files and folders from the fawared-site directory
3. Make sure to include:
   - index.html
   - styles.css
   - script.js
   - images/ folder
   - products/ folder
4. Write a commit message: "Initial commit - Fawared website"
5. Click "Commit changes"

#### Method B: Using Git Command Line
```bash
# Clone the repository
git clone https://github.com/your-username/fawared-site.git
cd fawared-site

# Copy all files from the project directory
# (or work directly in this folder)

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - Fawared website"

# Push to GitHub
git push origin main
```

#### Method C: Using GitHub Desktop
1. Clone the repository to your local machine
2. Copy all project files into the cloned folder
3. Go to GitHub Desktop
4. Enter commit summary: "Initial commit - Fawared website"
5. Click "Commit to main"
6. Click "Push origin"

### 3. Enable GitHub Pages

#### For Regular Repository (fawared-site)
1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "GitHub Pages" section
4. Under "Build and deployment", select "Deploy from a branch"
5. Source: "Deploy from a branch"
6. Branch: `main` and folder: `/ (root)`
7. Click "Save"

#### For User/Organization Repository (username.github.io)
1. GitHub Pages is automatically enabled
2. No additional configuration needed
3. Site will be live at `https://username.github.io`

### 4. Access Your Website

#### Regular Repository
- URL: `https://your-username.github.io/fawared-site`
- Wait 2-10 minutes for initial deployment

#### User Repository  
- URL: `https://your-username.github.io`
- Wait 2-10 minutes for initial deployment

### 5. Custom Domain (Optional)

#### Add CNAME File
1. Create `CNAME` file in the root directory
2. Add your domain: `your-domain.com`
3. Commit and push the file

#### Configure DNS
1. Go to your domain registrar
2. Add these DNS records:
   ```
   Type: CNAME
   Name: @ (or your subdomain)
   Value: your-username.github.io
   
   Type: CNAME  
   Name: www
   Value: your-username.github.io
   ```

#### Update GitHub Pages Settings
1. Go to repository Settings > Pages
2. Under "Custom domain", enter your domain
3. Check "Enforce HTTPS"
4. Save

### 6. Troubleshooting

#### Common Issues

**404 Error**
- Check file names are correct (case-sensitive)
- Ensure index.html is in root directory
- Verify GitHub Pages is enabled correctly

**Styles Not Loading**
- Check CSS file path in index.html
- Ensure files are uploaded correctly
- Clear browser cache

**Images Not Showing**
- Verify image paths and names
- Check images folder structure
- Ensure images are uploaded

**JavaScript Not Working**
- Check console for errors (F12 > Console)
- Verify script.js path
- Check for syntax errors

#### Debug Steps
1. Check GitHub Pages deployment status in Settings
2. Look at the "Pages" tab for build logs
3. Use browser developer tools (F12)
4. Check network tab for failed requests

### 7. Updating the Website

#### Simple Updates
1. Edit files locally
2. Commit and push changes
3. GitHub Pages updates automatically

#### Workflow
```bash
# Make changes to files
git add .
git commit -m "Update product information"
git push origin main
```

### 8. Advanced Features

#### Enforce HTTPS
1. Go to Settings > Pages
2. Check "Enforce HTTPS"
3. Save settings

#### Custom 404 Page
1. Create `404.html` in root directory
2. Add custom error page content

#### Analytics
1. Add Google Analytics code to index.html
2. Or use GitHub Pages built-in analytics

### 9. Best Practices

#### Security
- Keep repository public for GitHub Pages
- Don't commit sensitive information
- Use HTTPS for all resources

#### Performance
- Optimize images before uploading
- Minimize CSS and JavaScript
- Use appropriate file formats

#### SEO
- Update meta tags in index.html
- Add descriptive alt text to images
- Use semantic HTML structure

### 10. Maintenance

#### Regular Tasks
- Update product information
- Add new product images
- Check for broken links
- Monitor site performance

#### Backup
- Repository is automatically backed up by GitHub
- Consider local backups of original images
- Keep a copy of products.json

---

## Quick Start Summary

1. Create repository on GitHub
2. Upload all files
3. Enable GitHub Pages in Settings
4. Wait 2-10 minutes
5. Visit your live website

That's it! Your Fawared website is now live on GitHub Pages.
