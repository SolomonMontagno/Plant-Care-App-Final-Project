const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/Plant-Care-App-Final-Project_development",
      test: "postgres://postgres:postgres@localhost:5432/Plant-Care-App-Final-Project_test",
      e2e: "postgres://postgres:postgres@localhost:5432/Plant-Care-App-Final-Project_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
