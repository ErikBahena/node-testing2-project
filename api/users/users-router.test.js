const server = require("../server");
const request = require("supertest");
const db = require("../../data/db-config");

describe("sanity check", () => {
  test("environment is correct", () => {
    expect(process.env.NODE_ENV).toBe("testing");
  });
});
