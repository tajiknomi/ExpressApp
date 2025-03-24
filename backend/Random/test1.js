const crypto = require('crypto');

// Function to generate a seeded random integer
function generateSeededRandomInt(seed, min, max) {
  // Generate cryptographically secure random bytes
  const randomBytes = crypto.randomBytes(4); // 4 bytes = 32 bits

  // Combine the seed with the random bytes
  const combined = crypto.createHash('sha256')
    .update(seed + randomBytes.toString('hex'))
    .digest('hex');

  // Convert the combined hash to a number
  const randomValue = parseInt(combined.slice(0, 8), 16); // Use the first 8 characters (32 bits)

  // Scale the number to the desired range
  return Math.floor((randomValue / 0xFFFFFFFF) * (max - min + 1)) + min;
}

// Example usage
const seed = 'my-seed'; // Seed value
const min = 10; // Minimum value (inclusive)
const max = 20; // Maximum value (inclusive)

// Generate and log random numbers
for (let i = 0; i < 15; i++) {
  const randomInt = generateSeededRandomInt(seed, min, max);
  console.log(`Random Integer ${i + 1}:`, randomInt);
}