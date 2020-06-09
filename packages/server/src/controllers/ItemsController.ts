import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsController {
  async index(req: Request, res: Response) {
    const items = await knex('items').select('*');

    const serializedItems = items.map((i) => {
      const { title, image, id } = i;
      return {
        id,
        title,
        image_url: `http://10.0.2.2:3333/uploads/${image}`,
      };
    });

    res.json(serializedItems);
  }
}

export default new ItemsController();
