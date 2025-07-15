import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/spin-wheel/prizes/', () => {
    return HttpResponse.json({
      response_code: '00',
      response_message: 'success',
      data: [
        {
          id: 'x123',
          title: 'Hadiah 1',
          bg_color: '#FFFFFF',
          'font-color': '#000000',
        },
        {
          id: 'zonk',
          title: 'Belum Beruntung',
          bg_color: '#FF4848',
          'font-color': '#000000',
        },
        {
          id: 'x456',
          title: 'Hadiah 2',
          bg_color: '#FFFFFF',
          'font-color': '#000000',
        },
      ],
    });
  }),
  http.get('/api/spin-wheel/prizes', () => {
    return HttpResponse.json({
      response_code: '00',
      response_message: 'success',
      data: [
        {
          id: 'x123',
          title: 'Hadiah 1',
          bg_color: '#FFFFFF',
          'font-color': '#000000',
        },
        {
          id: 'zonk',
          title: 'Belum Beruntung',
          bg_color: '#FF4848',
          'font-color': '#000000',
        },
        {
          id: 'zonk',
          title: 'Belum Beruntung',
          bg_color: '#FF4848',
          'font-color': '#000000',
        },
        {
          id: 'x456',
          title: 'Hadiah 2',
          bg_color: '#FFFFFF',
          'font-color': '#000000',
        },
      ],
    });
  })
];
