const fs = require('fs');

// Load data.json
let data = JSON.parse(fs.readFileSync('schools.json'));

// Recursive function to trim strings in objects or arrays
function deepTrim(obj) {
  if (typeof obj === 'string') {
    return obj.trim();
  } else if (Array.isArray(obj)) {
    return obj.map(deepTrim);
  } else if (typeof obj === 'object' && obj !== null) {
    let newObj = {};
    for (let key in obj) {
      newObj[key] = deepTrim(obj[key]);
    }
    return newObj;
  } else {
    return obj;
  }
}

// Apply deepTrim to all records (if data is an array)
if (Array.isArray(data)) {
  data = data.map(record => deepTrim(record));
} else {
  data = deepTrim(data);
}

// Save cleaned data back
fs.writeFileSync('schools.json', JSON.stringify(data, null, 2));
console.log('✅ All string values trimmed successfully.');

