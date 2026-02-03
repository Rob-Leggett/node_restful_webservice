import User from '../app/user/db/model/user.js';
import Company from '../app/user/db/model/company.js';
import Customer from '../app/user/db/model/customer.js';

const seed = async () => {
  try {
    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Company.deleteMany({}),
      Customer.deleteMany({})
    ]);

    // Create users
    await User.create([
      { name: 'example', password: 'password', role: 'admin' },
      { name: 'tester', password: 'password', role: 'user' }
    ]);

    // Create companies and customers
    const [corp, smallGuy] = await Company.create([
      { name: 'the corporation' },
      { name: 'the small guy' }
    ]);

    await Customer.create([
      { firstName: 'Big', lastName: 'Wig', company: corp._id },
      { firstName: 'Little', lastName: 'Fry', company: smallGuy._id }
    ]);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};

export default seed;
