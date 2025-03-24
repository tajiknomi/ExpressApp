const crypto = require('crypto');
const readline = require('readline');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to generate a seeded random integer
function generateSeededRandomInt(seed, min, max) {
  // Generate cryptographically secure random bytes
  const randomBytes = crypto.randomBytes(16); // 16 bytes = 128 bits

  // Combine the seed with the random bytes
  const combined = crypto.createHash('sha256')
    .update(seed + randomBytes.toString('hex'))
    .digest('hex');

  // Convert the combined hash to a number
  const randomValue = parseInt(combined.slice(0, 8), 16); // Use the first 8 characters (32 bits)

  // Scale the number to the desired range
  return Math.floor((randomValue / 0xFFFFFFFF) * (max - min + 1)) + min;
}

// Ask for input
rl.question('Enter the minimum value (default: 0): ', (minInput) => {
  const min = parseInt(minInput) || 0; // Default to 0 if input is invalid

  rl.question('Enter the maximum value (default: 100): ', (maxInput) => {
    const max = parseInt(maxInput) || 100; // Default to 100 if input is invalid

    // Validate the range
    if (min >= max) {
      console.log('Error: min must be less than max.');
      rl.close();
      return;
    }

    rl.question('Enter a seed (optional, press Enter to skip): ', (seed) => {
      seed = seed || 'default-seed'; // Use a default seed if none is provided

      rl.question('Enter the number of iterations: ', (iterationsInput) => {
        const iterations = parseInt(iterationsInput) || 70; // Default to 10 iterations

      // Generate and log random numbers
      console.log('\nGenerating random numbers...');
      var luckyClientsIndexArray = [];
      let i=1;
      while (i < iterations) {
        const randomInt = generateSeededRandomInt(seed, min, max);
        if(luckyClientsIndexArray.indexOf(randomInt) === -1){
          luckyClientsIndexArray.push(randomInt);
          //console.log(`Random Integer ${i + 1}:`, randomInt);
          ++i;
        }  
      }
      console.log(`Lucky Clients array:`, luckyClientsIndexArray);
      // Close the readline interface
      rl.close();
    });
    });
  });
});