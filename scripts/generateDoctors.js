// scripts/generateDoctors.js
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Doctor = require('../server/models/Doctor'); // Adjust the path if necessary

// MongoDB connection URI - replace with your actual connection string if different
const mongoURI = 'mongodb://localhost:27017/healthShieldDB';

// List of major US cities (extend as needed)
const cities = [
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Houston, TX',
  'Phoenix, AZ',
  'Philadelphia, PA',
  'San Antonio, TX',
  'San Diego, CA',
  'Dallas, TX',
  'San Jose, CA',
  'Austin, TX',
  'Jacksonville, FL',
  'Fort Worth, TX',
  'Columbus, OH',
  'Indianapolis, IN',
  'Charlotte, NC',
  'San Francisco, CA',
  'Seattle, WA',
  'Denver, CO',
  'Washington, D.C.',
  'Nashville, TN',
  'El Paso, TX',
  'Detroit, MI',
  'Boston, MA',
  'Memphis, TN',
  'Portland, OR',
  'Oklahoma City, OK',
  'Las Vegas, NV',
  'Louisville, KY',
  'Baltimore, MD',
  'Milwaukee, WI',
  'Albuquerque, NM',
  'Tucson, AZ',
  'Fresno, CA',
  'Sacramento, CA',
  'Kansas City, MO',
  'Long Beach, CA',
  'Mesa, AZ',
  'Atlanta, GA',
  'Colorado Springs, CO',
  'Virginia Beach, VA',
  'Raleigh, NC',
  'Omaha, NE',
  'Miami, FL',
  'Oakland, CA',
  'Minneapolis, MN',
  'Tulsa, OK',
  'Wichita, KS',
  'New Orleans, LA',
  'Arlington, TX',
  'Cleveland, OH',
  'Bakersfield, CA',
  'Tampa, FL',
  'Aurora, CO',
  'Honolulu, HI',
  'Anaheim, CA',
  'Santa Ana, CA',
  'Corpus Christi, TX',
  'Riverside, CA',
  'Lexington, KY',
  'Stockton, CA',
  'Henderson, NV',
  'Saint Paul, MN',
  'St. Louis, MO',
  'Cincinnati, OH',
  'Pittsburgh, PA',
  'Greensboro, NC',
  'Anchorage, AK',
  'Plano, TX',
  'Lincoln, NE',
  'Orlando, FL',
  'Irvine, CA',
  'Newark, NJ',
  'Toledo, OH',
  'Durham, NC',
  'Chula Vista, CA',
  'Fort Wayne, IN',
  'Jersey City, NJ',
  'St. Petersburg, FL',
  'Laredo, TX',
  'Madison, WI',
  'Chandler, AZ',
  'Buffalo, NY',
  'Lubbock, TX',
  'Scottsdale, AZ',
  'Reno, NV',
  'Glendale, AZ',
  'Norfolk, VA',
  'Winston–Salem, NC',
  'North Las Vegas, NV',
  'Gilbert, AZ',
  'Chesapeake, VA',
  'Irving, TX',
  'Hialeah, FL',
  'Garland, TX',
  'Fremont, CA',
  'Baton Rouge, LA',
  'Richmond, VA',
  'Boise, ID',
  'San Bernardino, CA',
  'Spokane, WA',
  'Des Moines, IA',
  'Modesto, CA',
  'Birmingham, AL',
  'Tacoma, WA',
  'Fontana, CA',
  'Oxnard, CA',
  'Fayetteville, NC',
  'Rochester, NY',
  'Moreno Valley, CA',
  'Glendale, CA',
  'Yonkers, NY',
  'Huntington Beach, CA',
  'Aurora, IL',
  'Salt Lake City, UT',
  'Amarillo, TX',
  'Montgomery, AL',
  'Little Rock, AR',
  'Akron, OH',
  'Huntsville, AL',
  'Augusta, GA',
  'Port St. Lucie, FL',
  'Grand Rapids, MI',
  'Columbus, GA',
  'Tallahassee, FL',
  'Overland Park, KS',
  'Grand Prairie, TX',
  'Worcester, MA',
  'Springfield, MO',
  'Santa Clarita, CA',
  'Salem, OR',
  // Add more cities as needed
];

// Top 5 medical specialties
const specialties = [
  'Primary Care Physician',
  'Cardiologist',
  'Neurologist',
  'Orthopedic Surgeon',
  'Psychiatrist',
];

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};


// Function to generate unique fake doctors
const generateDoctors = (num) => {
  const doctors = [];
  const namesSet = new Set();

  for (let i = 0; i < num; i++) {
    let firstName, lastName, name;

    // Ensure unique names
    do {
      firstName = faker.name.firstName();
      lastName = faker.name.lastName();
      name = `Dr. ${firstName} ${lastName}`;
    } while (namesSet.has(name));

    namesSet.add(name);

    const location = faker.helpers.arrayElement(cities);
    const type = faker.helpers.arrayElement(specialties);

    doctors.push({ name, location, type });
  }

  return doctors;
};

// Main function to generate and insert doctors
const main = async () => {
  await connectDB();

  try {
    // Optional: Clear existing doctor records to avoid duplicates
    await Doctor.deleteMany({});
    console.log('🗑️ Cleared existing doctor records.');

    // Generate 1,000 fake doctors
    const doctors = generateDoctors(1000);
    console.log(`📝 Generated ${doctors.length} fake doctor records.`);

    // Insert generated doctors into the database
    await Doctor.insertMany(doctors);
    console.log('✅ Successfully inserted fake doctor records into MongoDB.');
  } catch (error) {
    console.error('❌ Error generating or inserting doctors:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔒 Closed MongoDB connection.');
  }
};

// Execute the main function
main();
