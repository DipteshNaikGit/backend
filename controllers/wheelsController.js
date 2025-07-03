const prisma = require('../prisma/client');

const getAllWheels = async (req, res) => {
  try {
    const wheels = await prisma.wheels.findMany(); // 👈 No include, just plain wheels
    res.json(wheels);
  } catch (err) {
    console.error('Error fetching wheels:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAllWheels };
