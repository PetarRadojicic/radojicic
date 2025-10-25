/**
 * SEO Component
 * 
 * Manages all SEO-related meta tags and structured data for the portfolio.
 * Uses React Helmet for dynamic head management.
 * 
 * Features:
 * - Dynamic meta tags (title, description, OG tags)
 * - Schema.org structured data (Person, WebSite, BreadcrumbList)
 * - Multi-language support with appropriate locale tags
 * - Canonical URL management
 * - Open Graph protocol implementation
 * 
 * Structured Data Types:
 * 1. Person Schema: Professional profile information
 * 2. WebSite Schema: Site metadata and language support
 * 3. BreadcrumbList Schema: Navigation hierarchy
 */

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
  
  // Default SEO values
  const defaultTitle = "Petar Radojicic - Frontend Developer & Creative Designer | Belgrade"
  const defaultDescription = "Experienced Frontend Developer specializing in React, TypeScript & Three.js. Based in Belgrade, Serbia. Creating elegant solutions to complex problems with over 3 years of experience."
  const defaultImage = "https://radojicic.co/img/me.webp"
  const baseUrl = "https://radojicic.co"
  
  // Use provided values or fall back to defaults
  const siteTitle = title || defaultTitle
  const siteDescription = description || defaultDescription
  const siteImage = image || defaultImage
  const siteUrl = url ? `${baseUrl}${url}` : baseUrl
  
  /**
   * Schema.org Person structured data
   * Provides rich information about the portfolio owner for search engines
   */
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
  
  /**
   * Schema.org WebSite structured data
   * Defines the website's basic metadata and language support
   */
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
  
  /**
   * Schema.org BreadcrumbList structured data
   * Defines the site structure and navigation hierarchy
   */
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
        {/* Set document language */}
        <html lang={i18n.language} />
        
        {/* Basic meta tags */}
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        
        {/* Open Graph meta tags for social media sharing */}
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:type" content={type} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={siteImage} />
        <meta property="og:locale" content={i18n.language === 'sr' ? 'sr_RS' : 'en_US'} />
        
        {/* Canonical URL to prevent duplicate content issues */}
        <link rel="canonical" href={siteUrl} />
        
        {/* Person structured data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        {/* Website structured data */}
        <script type="application/ld+json">
          {JSON.stringify(websiteStructuredData)}
        </script>
        
        {/* Breadcrumb structured data */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      </Helmet>
    </HelmetProvider>
  )
}

