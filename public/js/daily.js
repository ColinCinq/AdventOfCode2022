$(document).ready(function () {
  let input = $("#input"),
    output = $("#output")
  $(".submit").click( () => {
    daily(input, output)
  })
})
