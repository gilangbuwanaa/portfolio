import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import SkillsSection from '../components/sections/SkillsSection.vue'
import { toolCategories, toolMarqueeRows } from '../data/skills'

describe('SkillsSection', () => {
  it('renders a semantic section with the six supplied category labels', () => {
    const wrapper = mount(SkillsSection)

    expect(wrapper.get('section').attributes('id')).toBe('skills')
    expect(wrapper.get('section').attributes('aria-labelledby')).toBe('skills-title')
    expect(wrapper.findAll('.skills-marquee__set:not([aria-hidden]) h3').map((heading) => heading.text()))
      .toEqual(toolCategories.map(({ name }) => name))
  })

  it('shows each of the 31 tools once in the accessible row and provides local icons when available', () => {
    const wrapper = mount(SkillsSection)
    const visibleNames = wrapper
      .findAll('.skills-marquee__set:not([aria-hidden]) .skills-category li')
      .map((item) => item.text())
    const tools = toolCategories.flatMap(({ tools: categoryTools }) => categoryTools)

    expect(visibleNames).toEqual(tools.map(({ name }) => name))
    expect(new Set(visibleNames).size).toBe(31)
    expect(tools.filter(({ icon }) => !icon).map(({ name }) => name)).toEqual(['Flutter'])
    expect(tools.filter(({ icon }) => icon).every(({ icon }) =>
      existsSync(resolve('public', icon.slice(1))),
    )).toBe(true)
    expect(wrapper.findAll('.skills-marquee__set[aria-hidden="true"]')).toHaveLength(2)
  })

  it('splits the six categories into two counter-moving rows and includes no proficiency claims', () => {
    const wrapper = mount(SkillsSection)

    expect(toolMarqueeRows.map(({ direction, categories }) => [direction, categories.length])).toEqual([
      ['left', 3],
      ['right', 3],
    ])
    expect(wrapper.text()).not.toMatch(/\b(expert|advanced|intermediate|beginner)\b|\d+%/i)
  })
})
