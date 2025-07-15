import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/spin-wheel/prizes', () => {
    return HttpResponse.json({
      response_code: '00',
      response_message: 'success',
      data: [
        {
          id: 'hadiah-1',
          title: 'Hadiah 1',
          bg_color: '#FFFFFF',
          'font-color': '#000000',
        },
        {
          id: 'zonk',
          title: '',
          bg_color: '#FF4848',
          'font-color': '#000000',
        },
        {
            id: 'zonk',
            title: '',
            bg_color: '#FF4848',
            'font-color': '#000000',
          },
        {
          id: 'hadiah-2',
          title: 'Hadiah 2',
          bg_color: '#FFFFFF',
          'font-color': '#000000',
        },
        {
            id: 'zonk',
            title: '',
            bg_color: '#FF4848',
            'font-color': '#000000',
          },
          {
              id: 'zonk',
              title: '',
              bg_color: '#FF4848',
              'font-color': '#000000',
            },
            {
                id: 'hadiah-3',
                title: 'Hadiah 3',
                bg_color: '#FFFFFF',
                'font-color': '#000000',
              },
              {
                  id: 'zonk',
                  title: '',
                  bg_color: '#FF4848',
                  'font-color': '#000000',
                },
                {
                    id: 'zonk',
                    title: '',
                    bg_color: '#FF4848',
                    'font-color': '#000000',
                  },
      ],
    });
  }),

  http.get('/api/spin-wheel/gatcha', () => {
    return HttpResponse.json({
      response_code: '00',
      response_message: 'Winners',
      data: {
        prize_type: 1,
        prize_id: 'x123',
        prize_name: 'Hadiah 1',
        prize_image_url: 'https://xxxx.xxxx/prize.jpg',
        remaining_chances: 10,
        event_name: 'Agustus 2025',
        event_image_url: 'https://xxxx.xxxx/prize.jpg'
      }
    });
  })
];
