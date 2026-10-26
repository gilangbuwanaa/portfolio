import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import OrganizationsSection from '../components/sections/OrganizationsSection.vue'
import { organizations } from '../data/organizations'

describe('OrganizationsSection', () => {
  it('renders the two verified records with their roles, dates, and local photos', () => {
    const wrapper = mount(OrganizationsSection)

    expect(wrapper.get('section').attributes('id')).toBe('organizations')
    expect(wrapper.findAll('ol > li')).toHaveLength(2)
    expect(wrapper.text()).toContain('Head of the Development Team')
    expect(wrapper.text()).toContain('Media & Information Staff')
    expect(wrapper.text()).toContain('2024–2025')
    expect(wrapper.findAll('img').map((image) => [image.attributes('src'), image.attributes('alt')]))
      .toEqual(organizations.map(({ image, imageAlt }) => [image, imageAlt]))
    expect(organizations.every(({ image }) =>
      existsSync(resolve('public', image.slice(1))),
    )).toBe(true)
  })
})
