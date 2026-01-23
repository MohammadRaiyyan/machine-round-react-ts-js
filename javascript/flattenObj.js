function flatObject(obj, prefix = "") {
  let output = {};

  for (let key in obj) {
    const value = obj[key];
    const newKey = prefix === "" ? key : `${prefix}.${key}`;
    if (value !== null && typeof value === "object") {
      Object.assign(output, flatObject(value, newKey));
    } else {
      output[newKey] = value;
    }
  }

  return output;
}

const employeeInfo = {
  employeeName: "John Doe",
  employeeId: 27,
  salary: {
    "2018 - 19": "400000INR",
    "2019 - 20": "500000INR",
    "2020 - 21": "650000INR",
  },
  address: {
    locality: {
      address1: "1600 pebble road",
      address2: "Nearby XYZ Bank",
    },
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
  },
};

console.log(flatObject(employeeInfo));
