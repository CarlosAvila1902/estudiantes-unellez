import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        // Colección para la página principal (Markdown)
        content: defineCollection({
            type: 'page',
            source: '*.md'
        }),
        // Colección para los estudiantes (JSON)
        estudiantes: defineCollection({
            type: 'data',
            source: 'estudiantes/*.json',
            schema: z.object({
                name: z.string(),
                aboutMe: z.string(),
                softSkills: z.array(z.string()),
                techSkills: z.array(z.string()),
                experience: z.array(z.object({
                    organization: z.string(),
                    role: z.string(),
                    since: z.number(),
                    description: z.string()
                })).optional(),
                projects: z.array(z.object({
                    title: z.string(),
                    rol: z.string().optional(),
                    description: z.string().optional()
                })).optional(),
                contact: z.array(z.object({
                    name: z.string(),
                    url: z.string(),
                    icon: z.string()
                })).optional()
            })
        })
    }
})