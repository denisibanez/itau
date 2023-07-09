import request from '../plugins/request';
export class ExampleService {
  async random(payload: any, success: any, error: any, done: any) {
    const req: any = {
      method: 'get',
      url: `https://randomuser.me/api/${payload}`,
    };
    return await request(req, success, error, done);
  }
}
