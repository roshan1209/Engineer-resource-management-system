require('dotenv').config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./src/models/User");
const Project = require("./src/models/Project");
const Assignment = require("./src/models/Assignment");

const runSeeder = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");

    await User.deleteMany();
    await Project.deleteMany();
    await Assignment.deleteMany();
    console.log("Existing data cleared");

    const manager = await User.create({
      email: "admin@example.com",
      password: bcrypt.hashSync("admin123", 10),
      name: "Admin Manager",
      role: "manager",
      maxCapacity: 0
    });

    console.log("Manager created:", manager.email);

    const engineers = [];
    const skillsList = ["React", "Node.js", "Cypress", "Postman", "MongoDB"];

    for (let i = 0; i < 10; i++) {
      const isDev = i < 3;
      const isTester = i >= 3 && i < 5;
      const engineer = await User.create({
        email: `engineer${i + 1}@example.com`,
        password: bcrypt.hashSync("password123", 10),
        name: `Engineer ${i + 1}`,
        role: "engineer",
        skills: isDev ? ["React", "Node.js"] : isTester ? ["Cypress", "Postman"] : ["MongoDB"],
        seniority: i % 3 === 0 ? "junior" : i % 3 === 1 ? "mid" : "senior",
        maxCapacity: i % 2 === 0 ? 100 : 50,
        department: isDev ? "Development" : isTester ? "Testing" : "Backend"
      });
      engineers.push(engineer);
    }
    console.log("10 Engineers created");

    const projects = [];
    for (let i = 0; i < 5; i++) {
  const project = await Project.create({
    name: `Project ${i + 1}`,
    description: `Description for project ${i + 1}`,
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
    requiredSkills: skillsList,
    teamSize: Math.floor(Math.random() * 5) + 1,
    managerId: manager._id, // Pass manager ID properly
    status: "active" // Or "completed"/"planned" based on your schema enum
  });
  projects.push(project);
}
    console.log("5 Projects created");

  
    const assignments = [];

    for (let i = 0; i < 5; i++) {
      const eng = engineers[i];
      const project = projects[i % projects.length];

      const alloc = eng.maxCapacity >= 100 ? 50 : 25;

      const assign = await Assignment.create({
        engineer: eng._id,
        project: project._id,
        role: i % 2 === 0 ? "Developer" : "Tester",
        allocationPercentage: alloc,
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 2))
      });

      assignments.push(assign);
    }

    console.log("5 Assignments created");

    console.log("Seeder completed successfully ✅");
    process.exit(0);

  } catch (err) {
    console.error("Seeder failed:", err);
    process.exit(1);
  }
};

runSeeder();
