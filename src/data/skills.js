import { publicAsset } from '../utils/publicAsset'

const skillIcon = (filename) => publicAsset(`/images/tools/${filename}.png`)

export const toolCategories = [
  {
    id: 'web-development',
    name: 'Web Development',
    tools: [
      { name: 'HTML', icon: skillIcon('html') },
      { name: 'CSS', icon: skillIcon('css') },
      { name: 'Tailwind CSS', icon: skillIcon('tailwind_css') },
      { name: 'Javascript', icon: skillIcon('js') },
      { name: 'Node.js', icon: skillIcon('nodejs') },
      { name: 'Vue.js', icon: skillIcon('vuejs') },
      { name: 'React.js', icon: skillIcon('reactjs') },
    ],
  },
  {
    id: 'backend-programming',
    name: 'Backend & Programming',
    tools: [
      { name: 'Go', icon: skillIcon('go') },
      { name: 'Go Fiber', icon: skillIcon('gofiber') },
      { name: 'Python', icon: skillIcon('python') },
      { name: 'PHP', icon: skillIcon('php') },
      { name: 'Laravel', icon: skillIcon('laravel') },
      { name: 'Kotlin', icon: skillIcon('kotlin') },
      { name: 'Flutter', icon: null },
    ],
  },
  {
    id: 'databases-local-environment',
    name: 'Databases & Local Environment',
    tools: [
      { name: 'MongoDB', icon: skillIcon('mongodb') },
      { name: 'MySQL', icon: skillIcon('mysql') },
      { name: 'Laragon', icon: skillIcon('laragon') },
    ],
  },
  {
    id: 'development-workflow',
    name: 'Development Workflow',
    tools: [
      { name: 'Git', icon: skillIcon('git') },
      { name: 'GitHub', icon: skillIcon('github') },
      { name: 'GitLab', icon: skillIcon('gitlab') },
      { name: 'VS Code', icon: skillIcon('vscode') },
      { name: 'Antigravity', icon: skillIcon('antigravity') },
      { name: 'Codex', icon: skillIcon('codex') },
    ],
  },
  {
    id: 'design-productivity',
    name: 'Design & Productivity',
    tools: [
      { name: 'Figma', icon: skillIcon('figma') },
      { name: 'Notion', icon: skillIcon('notion') },
      { name: 'Obsidian', icon: skillIcon('obsidian') },
      { name: 'Canva', icon: skillIcon('canva') },
      { name: 'Microsoft Office', icon: skillIcon('msoffice') },
    ],
  },
  {
    id: 'creative-production',
    name: 'Creative Production',
    tools: [
      { name: 'FL Studio', icon: skillIcon('flstudio') },
      { name: 'CapCut', icon: skillIcon('capcut') },
      { name: 'Davinci Resolve', icon: skillIcon('davinciresolve') },
    ],
  },
]

export const toolMarqueeRows = [
  {
    id: 'development-tools',
    direction: 'left',
    categories: toolCategories.slice(0, 3),
  },
  {
    id: 'workflow-creative-tools',
    direction: 'right',
    categories: toolCategories.slice(3),
  },
]
