import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ResearchSection from '../components/sections/ResearchSection.vue'
import { researchRecords } from '../data/research'

describe('ResearchSection', () => {
  it('renders both approved research records with dates and their distinct work types', () => {
    const wrapper = mount(ResearchSection)

    expect(wrapper.get('section').attributes('id')).toBe('research')
    expect(wrapper.get('section').attributes('aria-labelledby')).toBe('research-title')
    expect(wrapper.findAll('ol > li')).toHaveLength(2)
    expect(wrapper.findAll('h3').map((heading) => heading.text())).toEqual(
      researchRecords.map(({ title }) => title),
    )
    expect(wrapper.text()).toContain('Research project')
    expect(wrapper.text()).toContain('Systematic literature review')
    expect(wrapper.findAll('time').map((time) => [time.text(), time.attributes('datetime')])).toEqual([
      ['April 2026', '2026-04'],
      ['August 2026', '2026-08'],
    ])
  })

  it('shows each quantitative result beside its supported context', () => {
    const wrapper = mount(ResearchSection)
    const records = wrapper.findAll('a[href]')

    expect(records[0].text()).toContain('88%')
    expect(records[0].text()).toContain('Reported accuracy')
    expect(records[1].text()).toContain('73')
    expect(records[1].text()).toContain('Papers reviewed')
    expect(records.map((record) => record.attributes('href'))).toEqual([
      'https://ejournal.catursakti.ac.id/index.php/simtek/article/view/1719',
      'https://ejournal.nusamandiri.ac.id/index.php/inti/article/view/8615',
    ])
    expect(records.every((record) => record.attributes('target') === '_blank')).toBe(true)
    expect(records.every((record) => record.attributes('rel') === 'noopener noreferrer')).toBe(true)
    expect(wrapper.text()).not.toMatch(/published|peer.review|DOI|citation/i)
  })

  it('keeps titles, dates, and findings centralized in the research data', () => {
    expect(researchRecords).toEqual([
      {
        id: 'cctv-road-weather-classification',
        type: 'Research project',
        title: 'CCTV-Based Road Weather Condition Classification Using Vision Transformer',
        date: 'April 2026',
        dateTime: '2026-04',
        url: 'https://ejournal.catursakti.ac.id/index.php/simtek/article/view/1719',
        finding: { value: '88%', label: 'Reported accuracy' },
      },
      {
        id: 'image-weather-classification-review',
        type: 'Systematic literature review',
        title: 'Systematic Literature Review of Image-Based Weather Classification Using Deep Learning Methods',
        date: 'August 2026',
        dateTime: '2026-08',
        url: 'https://ejournal.nusamandiri.ac.id/index.php/inti/article/view/8615',
        finding: { value: '73', label: 'Papers reviewed' },
      },
    ])
  })
})
