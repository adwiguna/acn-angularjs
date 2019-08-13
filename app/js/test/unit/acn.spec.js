describe("Testing AngularJS test suite", function() {
  beforeEach(module("acnChecker"));
  describe("Testing AngularJS controller", function() {
    let scope = {};
    let ctrl;

    beforeEach(inject(function($controller) {
      ctrl = $controller("acn-ctrl", { $scope: scope });
    }));

    it("should initialize needed variables", function() {
      expect(scope.acnNumber).toBeDefined();
      expect(scope.isShown).toBeDefined();
      expect(scope.message).toBeDefined();
      expect(scope.isValid).toBeDefined();
    });

    // able to check valid data
    const truthyDatas = [
      "000 000 019",
      "002 249 998",
      "003499992",
      "003749988"
    ];
    function testToBeTruthy(input) {
      it(`${input} should be valid ACN`, function() {
        expect(scope.acnCheck).toBeDefined();
        expect(scope.acnCheck(input).valid).toBeTruthy();
      });
    }
    for (let i = 0; i < truthyDatas.length; i++) {
      testToBeTruthy(truthyDatas[i]);
    }

    // able to check invalid data but formatted correctly
    const falsyDatas = ["003 999 987", "004249982"];
    function testToBeFalsy(input) {
      it(`${input} should be formatted correctly but not a valid ACN`, function() {
        expect(scope.acnCheck).toBeDefined();
        expect(scope.acnCheck(input).valid).toBeFalsy();
      });
    }
    for (let i = 0; i < falsyDatas.length; i++) {
      testToBeFalsy(falsyDatas[i]);
    }

    // able to check wrong formatted data
    const incorrectFormatDatas = ["005 749987", "abc def ghi", "005749 abc"];
    function testIncorrectFormat(input) {
      it(`${input} should not be correct ACN format`, function() {
        expect(scope.acnCheck).toBeDefined();
        expect(scope.acnCheck(input).valid).toBeFalsy();
        expect(scope.acnCheck(input).message).toContain(
          "Given ACN is not correct format"
        );
      });
    }
    for (let i = 0; i < incorrectFormatDatas.length; i++) {
      testIncorrectFormat(incorrectFormatDatas[i]);
    }
  });
});
