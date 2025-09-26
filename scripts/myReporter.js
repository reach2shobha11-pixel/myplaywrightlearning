class MyReporter {
  onTestEnd(test, result) {
    console.log(`Test ${test.title} finished with status: ${result.status}`);
  }
}
module.exports = MyReporter;