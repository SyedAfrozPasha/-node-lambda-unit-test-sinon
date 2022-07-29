// Test case file

const { expect } = require("chai");
const sinon = require("sinon");

const lambda = require("../src/lambda/app");
const dataService = require("../src/dataService/data");

// Import mock function from mock.js
const { validInput, invalidInput, fetchSearchResultOutput } = require("./mock");

// Define a common test suite
describe("FetchSearchResult Lambda Unit Test", () => {
  context("Successful Invocation", () => {
    let sinonSandbox = null;
    let dataServiceStub = null;

    // Runs before each test case
    beforeEach(async () => {
      // create a sinon sandbox
      sinonSandbox = sinon.createSandbox();

      // Mock/Stub the db calls
      dataServiceStub = sinonSandbox.stub(dataService, "query");
      dataServiceStub.resolves(fetchSearchResultOutput());
    });

    // Runs after each test case
    afterEach(async () => {
      // delete the sandbox
      sinonSandbox.restore();
    });

    // Test Cases
    it("Request with email id only", async () => {
      // Call the lambda function -> Syntax -> lambda.handler(event)
      let result = await lambda.handler(
        validInput() // event
      );

      // Check if code exist
      expect(result.code).to.exist;

      // Check if code =200
      expect(result.code).to.equal(200);

      // Check if data exist
      expect(result.data).to.exist;

      // Check if data is an array
      expect(result.data).to.be.a("array");

      // Check if data is an array
      expect(result.data).to.be.a("array");

      // Check if data[0] is an object
      expect(result.data[0]).to.be.a("object");

      // Check if data[0] has keyword property
      expect(result.data[0]).to.have.own.property("keyword");

      // Check if data[0] has departmentId property
      expect(result.data[0]).to.have.own.property("departmentId");
    });
  });

  context("Error", () => {
    let sinonSandbox = null;
    let dataServiceStub = null;

    // Runs before each test case
    beforeEach(async () => {
      // create a sinon sandbox
      sinonSandbox = sinon.createSandbox();

      // Mock/Stub the db calls
      dataServiceStub = sinonSandbox.stub(dataService, "query");
      dataServiceStub.resolves(fetchSearchResultOutput());
    });

    // Runs after each test case
    afterEach(async () => {
      // delete the sandbox
      sinonSandbox.restore();
    });

    it("with code = 400, when searchText is null", async () => {
      // Mock request body
      const mockData = invalidInput(["searchText"]);

      // Call the lambda function -> Syntax -> lambda.handler(event)
      let result = await lambda.handler(
        mockData // event
      );

      // Check if code exist
      expect(result.code).to.exist;

      // Check if code = 400
      expect(result.code).to.equal(400);

      // Check if ErrorMessages exist
      expect(result.ErrorMessages).to.exist;

      // Check if ErrorMessages = `Invalid request body`
      expect(result.ErrorMessages[0]).to.equal("Invalid request body");
    });

    it("with code = 400, when filterBy is null", async () => {
      // Mock request body
      const mockData = invalidInput(["filterBy"]);

      // Call the lambda function -> Syntax -> lambda.handler(event)
      let result = await lambda.handler(
        mockData // event
      );

      // Check if code exist
      expect(result.code).to.exist;

      // Check if code = 400
      expect(result.code).to.equal(400);

      // Check if ErrorMessages exist
      expect(result.ErrorMessages).to.exist;

      // Check if ErrorMessages = `Invalid request body`
      expect(result.ErrorMessages[0]).to.equal("Invalid request body");
    });

    it("with code = 400, when all the required body params are null", async () => {
      // Mock request body
      const mockData = invalidInput([]);

      // Call the lambda function -> Syntax -> lambda.handler(event)
      let result = await lambda.handler(
        mockData // event
      );

      // Check if code exist
      expect(result.code).to.exist;

      // Check if code = 400
      expect(result.code).to.equal(400);

      // Check if ErrorMessages exist
      expect(result.ErrorMessages).to.exist;

      // Check if ErrorMessages = `Invalid request body`
      expect(result.ErrorMessages[0]).to.equal("Invalid request body");
    });
  });
});
