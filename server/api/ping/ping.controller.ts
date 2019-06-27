import { apiMethod } from '../helpers';

export const ping = apiMethod<{ ping: string }>(async () => {
  return {
    data: { ping: 'pong' },
    status: 200,
  }
})
