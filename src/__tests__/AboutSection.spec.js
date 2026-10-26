import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import AboutSection from '../components/sections/AboutSection.vue'
import { profile } from '../data/profile'

describe('AboutSection', () => {
  it('renders its semantic section and approved profile introduction', () => {
    const wrapper = mount(AboutSection)

    expect(wrapper.get('section').attributes('id')).toBe('about')
    expect(wrapper.get('section').attributes('aria-labelledby')).toBe('about-title')
    expect(wrapper.get('#about-title').text()).toBe('Building software with an inquiring mindset.')
    expect(wrapper.text()).toContain(profile.introduction)
  })

  it('presents approved education and experience details', () => {
    const wrapper = mount(AboutSection)

    expect(wrapper.text()).toContain('Applied Informatics Engineering')
    expect(wrapper.text()).toContain('Universitas Logistik dan Bisnis Internasional (ULBI)')
    expect(wrapper.text()).toContain('3.69 / 4.00')
    expect(wrapper.text()).toContain('Full-Stack Developer')
    expect(wrapper.text()).toContain('June–September 2024')
    expect(wrapper.text()).toContain('Developer Intern')
    expect(wrapper.text()).toContain('Dinas Komunikasi dan Informatika Kabupaten Purwakarta')
    expect(wrapper.text()).toContain('October 2025–January 2026')
  })

  it('groups expertise by discipline and includes the approved research topics', () => {
    const wrapper = mount(AboutSection)

    expect(wrapper.findAll('ol > li')).toHaveLength(3)
    expect(wrapper.text()).toContain('Software engineering')
    expect(wrapper.text()).toContain('Product development')
    expect(wrapper.text()).toContain('Technical research')
    expect(wrapper.text()).toContain('vision-transformer-based road-weather classification')
    expect(wrapper.text()).toContain('systematic review of image-based weather-classification research')
  })
})
