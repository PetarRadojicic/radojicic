import React, { useMemo, useState } from "react"
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa"

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  githubUrl?: string
  playStoreUrl?: string
  siteUrl?: string
}

const projects: Project[] = [
  {
    id: "1",
    title: "Money QR",
    description:
      "A modern React Native personal finance tracking app with QR receipt scanning capabilities, built with Expo and TypeScript.",
    image: "/money-qr.png",
    tags: ["React Native", "Expo", "TypeScript"],
    githubUrl: "https://github.com/PetarRadojicic/money-qr",
    playStoreUrl: "https://play.google.com",
  },
  {
    id: "2",
    title: "Radojicic (This Website)",
    description: "A modern React portfolio website built with Vite and TypeScript.",
    image: "/radojicic.png",
    tags: ["React", "TypeScript", "Vite"],
    githubUrl: "https://github.com/PetarRadojicic/radojicic",
  },
  {
    id: "3",
    title: "Pet QR",
    description:
      "This web app is to let pet owners create and manage QR-tagged pet profiles for lost-and-found, share contact details, and purchase related PetQR products via Shopify.",
    image: "/pet-qr.png",
    tags: ["React", "TypeScript", "Next.js"],
    siteUrl: "https://petqr.rs/",
  },
]

const Projects: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>("All")

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    projects.forEach((p) => p.tags.forEach((t) => tags.add(t)))
    return ["All", ...Array.from(tags).sort()]
  }, [])

  const filteredProjects = useMemo(() => {
    if (selectedTag === "All") return projects
    return projects.filter((p) => p.tags.includes(selectedTag))
  }, [selectedTag])

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-balance">My Projects</h1>
        <p className="text-lg text-muted-foreground text-pretty">
          Explore my collection of mobile and web applications
        </p>
      </div>

      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
              selectedTag === tag
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap justify-center gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="
                rounded-lg border bg-white shadow-sm group overflow-hidden transition-all hover:shadow-lg
                flex flex-col
                basis-full
                sm:basis-[calc(50%-0.75rem)]     /* 2 per row on tablet; gap-6 = 1.5rem → subtract 0.75rem each */
                lg:basis-[calc(33.333%-1rem)]    /* 3 per row on large; two gaps → 2*1.5/3 = 1rem */
                min-w-[280px] max-w-[420px]
              "
            >
              <div className="relative aspect-video overflow-hidden bg-gray-100">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-semibold leading-none tracking-tight mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{project.description}</p>

                <div className="mt-auto flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold bg-gray-100 text-gray-900"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center rounded-md border border-gray-300 bg-transparent hover:bg-gray-100 px-3 py-2 text-sm font-medium transition-colors"
                      >
                        <FaGithub className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    )}
                    {project.playStoreUrl && (
                      <a
                        href={project.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center rounded-md bg-black text-white hover:bg-gray-800 px-3 py-2 text-sm font-medium transition-colors"
                      >
                        <FaExternalLinkAlt className="mr-2 h-4 w-4" />
                        Play Store
                      </a>
                    )}
                    {project.siteUrl && (
                      <a
                        href={project.siteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center rounded-md bg-black text-white hover:bg-gray-800 px-3 py-2 text-sm font-medium transition-colors"
                      >
                        <FaExternalLinkAlt className="mr-2 h-4 w-4" />
                        Visit Site
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-muted-foreground">No projects found with the selected tag.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
