export default function initItemsController(db) {
  const index = async (request, response) => {
    try {
      const items = await db.Item.findAll();
      response.send({ items });
    } catch (error) {
      console.log(error);
    }
  };

  const findItem = async (request, response) => {
    try {
      const item = await db.Item.findOne({ where: { id: request.params.id } });
      response.send({ item });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    index,
    findItem,
  };
}
