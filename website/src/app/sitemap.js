// Mock function representing your actual data fetching logic
// Replace these with your actual fetch requests (e.g., fetch('https://api...'))
async function getDynamicBlogs() {
  // Example: fetch all active blog slugs
  // const res = await fetch('https://yourdomain.com')
  // return res.json()
  return [
    { slug: 'how-to-build-a-nextjs-site', updatedAt: new Date() },
    { slug: 'seo-best-practices', updatedAt: new Date() },
  ]
}

async function getDynamicProducts() {
  // Example: fetch all product slugs
  // const res = await fetch('https://yourdomain.com')
  // return res.json()
  return [
    { id: 'running-shoes', updatedAt: new Date() },
    { id: 'water-bottle', updatedAt: new Date() },
  ]
}

export default async function sitemap() {
  const baseUrl = 'https://wishfaah.com.pk'

  // 1. Map Hardcoded Static Routes
  const staticRoutes = ['', '/about', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }))

  // 2. Fetch and Map Dynamic Blog Routes
  const blogsData = await getDynamicBlogs()
  const blogRoutes = blogsData.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.updatedAt),
    changeFrequency: 'daily',
    priority: 0.7,
  }))

  // 3. Fetch and Map Dynamic Product Routes
  const productsData = await getDynamicProducts()
  const productRoutes = productsData.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'daily',
    priority: 0.9,
  }))

  // 4. Combine all routes into a single sitemap array
  return [...staticRoutes, ...blogRoutes, ...productRoutes]
}
