import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App', () => {
  it('renders the hero and navigation', () => {
    const wrapper = mount(App)
    expect(wrapper.get('h1').text()).toContain('Engineering ideas.')
    expect(wrapper.get('nav').text()).toContain('Work')
  })

  it('renders the selected projects and connects the hero CTA', () => {
    const wrapper = mount(App)

    expect(wrapper.get('#work h2').text()).toBe('Selected projects')
    expect(wrapper.findAll('#work article')).toHaveLength(3)
    expect(wrapper.findAll('#work h3').map((heading) => heading.text())).toEqual([
      'Elfume',
      'Helpdesk ULBI',
      'Diskominfo',
    ])
    expect(wrapper.get('#home a[href="#work"]').exists()).toBe(true)
    expect(wrapper.text()).not.toContain('Selected work will be introduced in a future milestone.')
  })

  it('places About after the projects and gives the navigation a working destination', () => {
    const wrapper = mount(App)

    expect(wrapper.findAll('main > section').map((section) => section.attributes('id'))).toEqual([
      'home',
      'work',
      'about',
      'skills',
      'experience',
    ])
    expect(wrapper.findAll('#about')).toHaveLength(1)
    expect(wrapper.get('nav a[href="#about"]').exists()).toBe(true)
  })

  it('announces the temporary contact behavior', async () => {
    const wrapper = mount(App)
    await wrapper.get('main button').trigger('click')

    expect(wrapper.text()).toContain('Contact details will be added in a future milestone.')
  })

  it('opens the mobile menu and closes it after selecting a destination', async () => {
    const wrapper = mount(App)
    const menuToggle = wrapper.get('[aria-controls="primary-navigation"]')

    expect(menuToggle.attributes('aria-expanded')).toBe('false')
    await menuToggle.trigger('click')
    expect(menuToggle.attributes('aria-expanded')).toBe('true')

    await wrapper.get('a[href="#work"]').trigger('click')
    expect(menuToggle.attributes('aria-expanded')).toBe('false')
  })
})
