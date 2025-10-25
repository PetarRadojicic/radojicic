import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

interface SEOProps {
  title?: string
  description?: string
  type?: string
  url?: string
  image?: string
}

export function SEO({ title, description, type = 'website', url, image }: SEOProps) {
  const { i18n } = useTranslation()
  
  const defaultTitle = "Petar Radojicic - Frontend Developer & Creative Designer | Belgrade"
  const defaultDescription = "Experienced Frontend Developer specializing in React, TypeScript & Three.js. Based in Belgrade, Serbia. Creating elegant solutions to complex problems with over 3 years of experience."
  const defaultImage = "https://radojicic.co/img/me.webp"
  const baseUrl = "https://radojicic.co"
  
  const siteTitle = title || defaultTitle
  const siteDescription = description || defaultDescription
  const siteImage = image || defaultImage
  const siteUrl = url ? `${baseUrl}${url}` : baseUrl
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Petar Radojicic",
    "jobTitle": "Frontend Developer",
    "description": siteDescription,
    "url": baseUrl,
    "image": siteImage,
    "email": "petar@radojicic.co",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Belgrade",
      "addressCountry": "RS"
    },
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "ITHS (Information Technology High School)",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Belgrade",
          "addressCountry": "RS"
        }
      },
      {
        "@type": "EducationalOrganization",
        "name": "Singidunum University",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Belgrade",
          "addressCountry": "RS"
        }
      }
    ],
    "worksFor": [
      {
        "@type": "Organization",
        "name": "International consulting and development",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Belgrade",
          "addressCountry": "RS"
        }
      }
    ],
    "knowsAbout": [
      "React",
      "TypeScript",
      "Three.js",
      "React Native",
      "JavaScript",
      "Frontend Development",
      "Web Development",
      "Mobile Development"
    ],
    "sameAs": [
     "https://github.com/PetarRadojicic",
     "https://linkedin.com/in/petarradojicic"
    ]
  }
  
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Petar Radojicic Portfolio",
    "url": baseUrl,
    "description": defaultDescription,
    "inLanguage": [i18n.language, "en", "sr"],
    "author": {
      "@type": "Person",
      "name": "Petar Radojicic"
    }
  }
  
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About",
        "item": `${baseUrl}#about`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Projects",
        "item": `${baseUrl}#projects`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Experience",
        "item": `${baseUrl}#experience`
      }
    ]
  }

  return (
    <HelmetProvider>
      <Helmet>
        <html lang={i18n.language} />
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:type" content={type} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={siteImage} />
        <meta property="og:locale" content={i18n.language === 'sr' ? 'sr_RS' : 'en_US'} />
        
        <link rel="canonical" href={siteUrl} />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      </Helmet>
    </HelmetProvider>
  )
}

