export const initialCategories = [
  { id: 'c1', name: 'Java', subcategories: ['Core Java', 'Spring Boot', 'Hibernate'] },
  { id: 'c2', name: 'C#', subcategories: ['.NET Core', 'WPF', 'ASP.NET'] },
  { id: 'c3', name: 'Networking', subcategories: ['CCNA', 'Security'] },
  { id: 'c4', name: 'Flutter', subcategories: ['UI', 'State Management'] },
  { id: 'c5', name: 'Linux', subcategories: ['Commands', 'Bash Scripting'] },
];

export const initialNotes = [
  {
    id: '1',
    title: 'Understanding Spring Boot Auto-Configuration',
    category: 'Java',
    subcategory: 'Spring Boot',
    content: `# Spring Boot Auto-Configuration\n\nSpring Boot auto-configuration attempts to automatically configure your Spring application based on the jar dependencies that you have added.`,
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: '2',
    title: 'C# LINQ Basics',
    category: 'C#',
    subcategory: '.NET Core',
    content: `# LINQ (Language Integrated Query)\n\nLINQ provides a consistent query experience to query over collections. It allows you to write queries directly in C#.`,
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: '3',
    title: 'Dockerizing a Flutter Web App',
    category: 'Flutter',
    subcategory: 'UI',
    content: `# Running Flutter Web in Docker\n\nSometimes you want to host your Flutter web app using a standard Nginx container.`,
    date: new Date(Date.now() - 86400000 * 1).toISOString(),
  }
];
