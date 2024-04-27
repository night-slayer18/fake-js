export function generateUserData(count = 1000) {
    const users = [];
    const names = ['John Doe', 'Jane Smith', 'Michael Johnson', 'Sarah Williams'];
    const emails = ['john@example.com', 'jane@example.com', 'michael@example.com', 'sarah@example.com'];
    const phoneNumbers = ['123-456-7890', '234-567-8901', '345-678-9012', '456-789-0123'];
    const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston'];
    const addresses = ['123 Main St', '456 Elm St', '789 Oak St', '321 Pine St'];
   
    for (let i = 0; i < count; i++) {
       const user = {
         id: i + 1,
         name: names[i % names.length],
         email: emails[i % emails.length],
         phoneNumber: phoneNumbers[i % phoneNumbers.length],
         location: locations[i % locations.length],
         address: addresses[i % addresses.length],
       };
       users.push(user);
    }
    return users;
   }