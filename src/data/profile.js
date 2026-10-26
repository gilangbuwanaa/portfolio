import { experiences } from './experience'

export const profile = {
  introduction:
    'I work across software engineering, product development, and technical research. My background combines applied informatics engineering, full-stack development, and public-sector software work. I am also interested in vision-transformer-based road-weather classification and image-based weather classification research.',
  education: {
    degree: 'Applied Informatics Engineering',
    institution: 'Universitas Logistik dan Bisnis Internasional (ULBI)',
    gpa: '3.69 / 4.00',
  },
  experience: [...experiences].reverse(),
  expertise: [
    {
      title: 'Software engineering',
      description: 'Full-stack development and application architecture.',
    },
    {
      title: 'Product development',
      description: 'Web and mobile product design and implementation.',
    },
    {
      title: 'Technical research',
      description:
        'Vision-transformer-based road-weather classification and a systematic review of image-based weather-classification research.',
    },
  ],
}
