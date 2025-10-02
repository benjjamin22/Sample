const fs = require('fs');

// Read input file
const input = JSON.parse(fs.readFileSync('lip.json', 'utf8'));

// Function to split full name
function splitFullName(fullName) {
  const parts = fullName.trim().split(/\s+/);

  let firstName = "";
  let middleName = "";
  let surname = "";

  if (parts.length === 1) {
    firstName = parts[0];
  } else if (parts.length === 2) {
    [firstName, surname] = parts;
  } else {
    firstName = parts[0];
    surname = parts[parts.length - 1];
    middleName = parts.slice(1, -1).join(" ");
  }

  return { firstName, middleName, surname };
}

// Loop through and update each record
input.forEach(record => {
  const fullName = record.Aname.Name;
  const { firstName, middleName, surname } = splitFullName(fullName);

  record.Aname.Name = firstName;
  record.Aname.Mname = middleName;
  record.Aname.Surname = surname;
});

// Save to output.json
fs.writeFileSync('output.json', JSON.stringify(input, null, 2));
console.log("All records processed and saved to output.json");
