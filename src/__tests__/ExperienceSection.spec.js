import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ExperienceSection from '../components/sections/ExperienceSection.vue'
import { experiences } from '../data/experience'

describe('ExperienceSection', () => {
  it('renders a semantic experience section and the approved records newest first', () => {
    const wrapper = mount(ExperienceSection)

    expect(wrapper.get('section').attributes('id')).toBe('experience')
    expect(wrapper.get('section').attributes('aria-labelledby')).toBe('experience-title')
    expect(wrapper.findAll('ol > li')).toHaveLength(2)
    expect(wrapper.findAll('h3').map((heading) => heading.text())).toEqual([
      'Developer Intern',
      'Full-Stack Developer',
    ])
    expect(wrapper.text()).toContain('October 2025–January 2026')
    expect(wrapper.text()).toContain('June–September 2024')
  })

  it('uses the approved employer logos with meaningful alternative text', () => {
    const wrapper = mount(ExperienceSection)

    expect(wrapper.findAll('img').map((image) => image.attributes('src'))).toEqual(
      experiences.map(({ logo }) => logo),
    )
    expect(wrapper.findAll('img').map((image) => image.attributes('alt'))).toEqual(
      experiences.map(({ logoAlt }) => logoAlt),
    )
    expect(experiences.map(({ logo }) => logo)).toEqual([
      '/images/experience/Diskominfo-Logo.png',
      '/images/experience/ULBI-Logo.png',
    ])
  })

  it('renders only concise role details supported by project records', () => {
    const wrapper = mount(ExperienceSection)

    expect(wrapper.text()).toContain('Figma UI/UX wireframing')
    expect(wrapper.text()).toContain('React.js frontend backed by Laravel and MySQL')
    expect(wrapper.text()).toContain('full-stack architecture for an academic helpdesk application')
    expect(wrapper.text()).not.toMatch(/\b(led|managed|increased|improved)\b/i)
  })
})
