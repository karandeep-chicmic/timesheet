import { Injectable } from '@angular/core';
import { milestone, projects, task } from '../Models/Courses';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  projects: projects[] = [
    {
      id: 1,
      name: 'Angular Introduction',
    },
    {
      id: 2,
      name: 'Node Introduction',
    },
  ];

  mileStone: milestone[] = [
    {
      id2: 1,
      name2: 'Angular',
      pid: 1,
    },
    {
      id2: 2,
      name2: 'Typescript',
      pid: 1,
    },
    {
      id2: 3,
      name2: 'Http Requests',
      pid: 2,
    },
    {
      id2: 4,
      name2: 'Node Event Loop and Basics',
      pid: 2,
    },
  ];

  Task: task[] = [
    {
      id3: 1,
      name3: 'Routing',
      pid2: 1,
    },
    {
      id3: 2,
      name3: 'Component Interactions',
      pid2: 1,
    },
    {
      id3: 3,
      name3: 'Strict Typing ',
      pid2: 2,
    },

    {
      id3: 4,
      name3: 'Generics',
      pid2: 2,
    },
    {
      id3: 5,
      name3: 'POST AND PUT',
      pid2: 3,
    },
    {
      id3: 6,
      name3: 'DELETE AND GET',
      pid2: 3,
    },

    {
      id3: 7,
      name3: 'Basics of NodeJs',
      pid2: 4,
    },
    {
      id3: 8,
      name3: 'EventLoop',
      pid2: 4,
    },
    {
      id3: 9,
      name3: 'Streaming In node js',
      pid2: 4,
    },
  ];

  constructor() {}
}
