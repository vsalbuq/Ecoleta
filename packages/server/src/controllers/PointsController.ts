import { Request, Response, response } from 'express';
import knex from '../database/connection';

class PointsController {
  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query;

    const parsedItems = String(items)
      .split(',')
      .map((item) => Number(item.trim()));

    const query = knex('points')
      .join('points_items', 'points.id', '=', 'points_items.point_id')
      .distinct()
      .select('points.*');

    if (items) {
      query.whereIn('points_items.item_id', parsedItems);
    }
    if (city) query.where('city', String(city));
    if (uf) query.where('uf', String(uf));

    const points = await query;

    return res.json(
      points.map((point) => {
        return {
          ...point,
          url_image: `http://localhost:3333/uploads/${point.image}`,
        };
      })
    );
  }

  async create(req: Request, res: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      number,
      city,
      uf,
      items,
    } = req.body;

    const trx = await knex.transaction();
    try {
      const point = {
        image: 'no-image.png',
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        number,
        city,
        uf,
      };
      const insertedIds = await trx('points').insert(point);

      const point_id = insertedIds[0];

      const pointItems = items.map((item_id: number) => {
        return {
          item_id,
          point_id,
        };
      });

      await trx('points_items').insert(pointItems);

      return res.json({
        id: point_id,
        ...point,
      });
    } catch (err) {
      if (err.code == 'SQLITE_CONSTRAINT') {
        return res.status(500).json({
          message: 'Please, add an item that already exists',
        });
      } else {
        return res.status(500).json({
          message:
            'There was an error while trying to create your waste collection point.',
        });
      }
    } finally {
      await trx.commit();
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const point = await knex('points').where('id', id).first();

    if (!point) {
      return res.status(400).json({ message: 'Point not found.' });
    }

    const items = await knex('items')
      .join('points_items', 'items.id', '=', 'points_items.item_id')
      .where('points_items.point_id', id)
      .select('items.title');

    return res.json({ point, items });
  }
}

export default new PointsController();
