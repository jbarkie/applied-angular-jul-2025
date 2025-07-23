import { http, delay, HttpResponse } from 'msw';

const FAKE_LINKS = [
  {
    id: '1',
    title: 'Angular Documentation',
    url: 'https://angular.io/docs',
    tags: ['angular', 'documentation'],
    dateAdded: new Date('2023-01-01'),
    owner: 'b145842',
  },
  {
    id: '2',
    title: 'React Documentation',
    url: 'https://reactjs.org/docs',
    tags: ['react', 'documentation'],
    dateAdded: new Date('2024-06-30'),
    owner: 'c732491',
  },
  {
    id: '3',
    title: 'Typescript Handbook',
    url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
    tags: ['typescript', 'documentation'],
    dateAdded: new Date('2023-03-15'),
    owner: 'b875234',
  },
];

export const links_handlers = [
  http.get('https://links-api.fictionalcompany.com/api/links', async () => {
    await delay();
    return HttpResponse.json(FAKE_LINKS);
  }),
];
