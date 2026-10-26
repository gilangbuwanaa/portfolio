import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectsSection from '../components/sections/ProjectsSection.vue'
import { projects, projectPlaceholderImage } from '../data/projects'

describe('ProjectsSection', () => {
  it('shows the empty state when the project data is empty', () => {
    const wrapper = mount(ProjectsSection, { props: { projects: [] } })

    expect(wrapper.get('h2').text()).toBe('Selected projects')
    expect(wrapper.text()).toContain('Selected projects will appear here')
    expect(wrapper.findAll('article')).toHaveLength(0)
  })

  it('renders supplied project details with the shared preview placeholder', () => {
    const wrapper = mount(ProjectsSection, {
      props: {
        projects: [
          {
            id: 'sample-entry',
            name: 'Sample project',
            description: 'A supplied project description.',
            technologies: ['Vue', 'Vite'],
          },
        ],
      },
    })

    expect(wrapper.get('h3').text()).toBe('Sample project')
    expect(wrapper.text()).toContain('A supplied project description.')
    expect(wrapper.text()).toContain('Vue')
    expect(wrapper.get('img').attributes('src')).toBe(projectPlaceholderImage)
    expect(wrapper.get('img').attributes('alt')).toBe('Temporary preview placeholder for Sample project')
    expect(wrapper.findAll('a')).toHaveLength(0)
  })

  it('contains exactly the three selected records in the requested order', () => {
    expect(projects.map((project) => project.name)).toEqual(['Elfume', 'Helpdesk ULBI', 'Diskominfo'])
    expect(projects).toHaveLength(3)
    expect(projects.map(({ date, platform, image }) => [date, platform, image])).toEqual([
      ['Feb 2025', 'Android', '/images/projects/elfume-porto.png'],
      ['Jun 2024', 'Web', '/images/projects/helpdesk-ulbi.png'],
      ['Oct 2025', 'Web', '/images/projects/diskominfo-comprof.png'],
    ])
    expect(projects.map(({ shortDescription, description }) => [shortDescription, description])).toEqual([
      [
        'Mobile E-Commerce App',
        'Engineered a mobile perfume e-commerce application using Flutter (Kotlin) for cross-platform frontend, integrated with a high-performance Go Fiber backend and MongoDB database.',
      ],
      [
        'Web-based Helpdesk application',
        'Built the fullstack architecture for an academic Helpdesk web application, supporting daily communications and ticket resolution for students, lecturers, and faculty staff.',
      ],
      [
        'Company Profile Diskominfo Kab. Purwakarta',
        'Spearheaded the end-to-end design and development of an official company profile website, from initial Figma UI/UX wireframing to responsive React.js frontend implementation backed by Laravel & MySQL.',
      ],
    ])

    for (const project of projects) {
      expect(project.id).toBeTruthy()
      expect(project.shortDescription).toBeTruthy()
      expect(project.description).toBeTruthy()
      expect(project.imageAlt).toBeTruthy()
    }

    expect(projects[1].technologies).toBeUndefined()
    expect(projects[0].technologies).toEqual(['Flutter', 'Kotlin', 'Go Fiber', 'MongoDB'])
    expect(projects[2].technologies).toEqual(['Figma', 'React.js', 'Laravel', 'MySQL'])
  })

  it('renders all selected records with their local screenshots and no unsupported links', () => {
    const wrapper = mount(ProjectsSection)

    expect(wrapper.findAll('article')).toHaveLength(3)
    expect(wrapper.findAll('h3').map((heading) => heading.text())).toEqual([
      'Elfume',
      'Helpdesk ULBI',
      'Diskominfo',
    ])
    expect(wrapper.text()).toContain('Mobile E-Commerce App')
    expect(wrapper.text()).toContain('Web-based Helpdesk application')
    expect(wrapper.text()).toContain('Company Profile Diskominfo Kab. Purwakarta')
    expect(wrapper.text()).toContain('Feb 2025')
    expect(wrapper.text()).toContain('Jun 2024')
    expect(wrapper.text()).toContain('Oct 2025')
    expect(wrapper.text()).toContain('Android')
    expect(wrapper.text()).toContain('Helpdesk ULBI')
    expect(wrapper.text()).toContain('Figma')
    for (const project of projects) {
      expect(wrapper.text()).toContain(project.description)
      expect(wrapper.text()).toContain(project.platform)
      expect(wrapper.text()).toContain(project.shortDescription)
    }
    expect(wrapper.findAll('img').map((image) => image.attributes('src'))).toEqual(projects.map(({ image }) => image))
    expect(wrapper.findAll('img').map((image) => image.attributes('alt'))).toEqual(projects.map(({ imageAlt }) => imageAlt))
    expect(wrapper.findAll('a')).toHaveLength(0)
    expect(wrapper.text()).not.toMatch(/Idbiz|Bukuin|GoDeez/)
    expect(wrapper.findAll('article')[1].find('ul[aria-label="Technologies"]').exists()).toBe(false)
  })

  it('starts with Elfume active and exposes the active project accessibly', () => {
    const wrapper = mount(ProjectsSection)
    const cards = wrapper.findAll('article')

    expect(cards[0].attributes('aria-current')).toBe('true')
    expect(cards[1].attributes('aria-current')).toBeUndefined()
    expect(cards[2].attributes('aria-current')).toBeUndefined()
    expect(wrapper.get('[aria-roledescription="carousel"]').attributes('aria-label')).toBe('Selected projects')
    expect(wrapper.get('[aria-live="polite"]').text()).toContain('01 / 03')
  })

  it('moves forward and backward through projects with circular navigation', async () => {
    const wrapper = mount(ProjectsSection)
    const activeName = () => wrapper.get('article[aria-current="true"] h3').text()

    await wrapper.get('button[aria-label="Next project"]').trigger('click')
    expect(activeName()).toBe('Helpdesk ULBI')
    await wrapper.get('button[aria-label="Previous project"]').trigger('click')
    expect(activeName()).toBe('Elfume')
    await wrapper.get('button[aria-label="Previous project"]').trigger('click')
    expect(activeName()).toBe('Diskominfo')
    await wrapper.get('button[aria-label="Next project"]').trigger('click')
    expect(activeName()).toBe('Elfume')
  })

  it('keeps canonical project order and maps each active project to circular positions', async () => {
    const wrapper = mount(ProjectsSection)
    const expectedMappings = [
      { previous: 'Diskominfo', active: 'Elfume', next: 'Helpdesk ULBI' },
      { previous: 'Elfume', active: 'Helpdesk ULBI', next: 'Diskominfo' },
      { previous: 'Helpdesk ULBI', active: 'Diskominfo', next: 'Elfume' },
    ]

    for (const [index, expected] of expectedMappings.entries()) {
      const actual = Object.fromEntries(
        wrapper.findAll('article').map((card) => [card.attributes('data-position'), card.get('h3').text()]),
      )
      expect(actual).toEqual(expected)

      if (index < expectedMappings.length - 1) {
        await wrapper.get('button[aria-label="Next project"]').trigger('click')
      }
    }
    expect(wrapper.findAll('h3').map((heading) => heading.text())).toEqual([
      'Elfume',
      'Helpdesk ULBI',
      'Diskominfo',
    ])
  })

  it('keeps each project card mounted with its stable project identity while positions change', async () => {
    const wrapper = mount(ProjectsSection)
    const originalElements = new Map(
      wrapper.findAll('article').map((card) => [card.get('h3').text(), card.element]),
    )

    await wrapper.get('button[aria-label="Next project"]').trigger('click')

    for (const card of wrapper.findAll('article')) {
      expect(card.element).toBe(originalElements.get(card.get('h3').text()))
    }
  })

  it('activates a side card when its select button is clicked', async () => {
    const wrapper = mount(ProjectsSection)

    await wrapper.get('button[aria-label="Show Diskominfo as the active project"]').trigger('click')

    expect(wrapper.get('article[aria-current="true"] h3').text()).toBe('Diskominfo')
  })

  it('keeps the hero work destination and project images without inventing links', async () => {
    const wrapper = mount(ProjectsSection)

    expect(wrapper.findAll('a')).toHaveLength(0)
    expect(wrapper.findAll('img')).toHaveLength(3)
    expect(wrapper.get('#work').attributes('id')).toBe('work')
    expect(wrapper.findAll('article[aria-current="true"] .project-carousel__select')).toHaveLength(0)
  })

  it('keeps the carousel limited to three supplied entries', () => {
    const wrapper = mount(ProjectsSection, {
      props: {
        projects: Array.from({ length: 5 }, (_, index) => ({
          id: `entry-${index + 1}`,
          name: `Project ${index + 1}`,
        })),
      },
    })

    expect(wrapper.findAll('article')).toHaveLength(3)
    expect(wrapper.text()).not.toContain('Project 4')
  })
})
