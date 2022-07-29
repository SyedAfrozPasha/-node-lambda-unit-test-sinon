// Mock Data File

/* ***** SAMPLE INPUT (requestBody) *******
{
    "searchText": "100",
    "filterBy": "departmentId"
}
********************************** */

/* ***** SAMPLE OUTPUT (response) *******
{
    "code": 200,
    "data": [
        { keyword: "EMP100101", departmentId: 1 },
        { keyword: "EMP100167", departmentId: 2 },
        { keyword: "EMP100199", departmentId: 4 },
        { keyword: "EMP181001", departmentId: 5 },
        { keyword: "EMP122100", departmentId: 9 }
    ],
    "message": "Results fetched!",
}
********************************** */

// Input with valid request parameters
const validInput = () => {
  let data = {
    searchText: "100",
    filterBy: "departmentId",
  };

  return {
    body: data,
  };
};

// Input with invalid request parameters
const invalidInput = (params) => {
  let data = {
    searchText: "100",
    filterBy: "departmentId",
  };

  if (params && params.length > 0) {
    if (params.includes("searchText")) {
      data.searchText = null;
    }

    if (params.includes("filterBy")) {
      data.filterBy = null;
    }

    if (data.searchText) {
      data = {
        searchText: null,
        filterBy: null,
      };
    }
  } else {
    data = {
      searchText: null,
      filterBy: null,
    };
  }
  return {
    body: data,
  };
};

// Output of fetchSearchResult function
const fetchSearchResultOutput = () => {
  // Mock success output
  return {
    records: [
      { keyword: "EMP100101", departmentId: 1 },
      { keyword: "EMP100167", departmentId: 2 },
      { keyword: "EMP100199", departmentId: 4 },
      { keyword: "EMP181001", departmentId: 5 },
      { keyword: "EMP122100", departmentId: 9 },
    ],
  };
};

module.exports = {
  validInput,
  invalidInput,
  fetchSearchResultOutput,
};
