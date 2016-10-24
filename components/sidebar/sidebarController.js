
app.component('sidebar', {
  bindings: {
    monthlyPayment: "=",
    test: "="
  },
  templateUrl: 'components/sidebar/sidebarView.html',
  controller: function (resultsService) {

  }
});
