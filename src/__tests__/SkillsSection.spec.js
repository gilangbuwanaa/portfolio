import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import SkillsSection from '../components/sections/SkillsSection.vue'
import { skillGroups } from '../data/skills'

describe('SkillsSection', () => {
  it('renders a semantic section with all skill categories', () => {
    const wrapper = mount(SkillsSection)

    expect(wrapper.get('section').attributes('id')).toBe('skills')
    expect(wrapper.get('section').attributes('aria-labelledby')).toBe('skills-title')
    expect(wrapper.get('#skills-title').text()).toBe('Tools for building and investigating digital products.')
    expect(wrapper.findAll('article')).toHaveLength(skillGroups.length)
    expect(wrapper.findAll('h3').map((heading) => heading.text())).toEqual(
      skillGroups.map((group) => group.name),
    )
  })

  it('renders each centralized skill under its category without proficiency claims', () => {
    const wrapper = mount(SkillsSection)

    for (const group of skillGroups) {
      const article = wrapper.get(`#skill-group-${group.id}`).element.closest('article')
      const renderedSkills = Array.from(article.querySelectorAll('li'), (item) => item.textContent.trim())

      expect(renderedSkills).toEqual(group.skills)
    }

    expect(wrapper.text()).not.toMatch(/\b(expert|advanced|intermediate|beginner)\b|\d+%/i)
  })

  it('contains the verified project, portfolio, and research technologies without duplicate labels', () => {
    const allSkills = skillGroups.flatMap(({ skills }) => skills)

    expect(new Set(allSkills).size).toBe(allSkills.length)
    expect(allSkills).toEqual(
      expect.arrayContaining([
        'Vue.js',
        'React.js',
        'JavaScript',
        'Tailwind CSS',
        'Node.js',
        'Go Fiber',
        'Laravel',
        'MongoDB',
        'MySQL',
        'Flutter',
        'Kotlin',
        'Computer Vision',
        'Vision Transformers',
        'Figma',
      ]),
    )
    expect(allSkills).not.toContain('PHP')
    expect(allSkills).not.toContain('Python')
  })
})
